import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import '../styles/site.css';
import { Rv } from '../components/Rv';
import { SAL_API_BASE, INDIA_ONLY } from '../config';
import type { Vertical } from '../data/pricing';
import { identify, track } from '../lib/posthog';

// ── Abuse protection ─────────────────────────────────────────────────────────
// Optional Cloudflare Turnstile. When VITE_TURNSTILE_SITE_KEY is set, the
// widget renders above the submit button and its token ships in the payload
// as `turnstile_token` for the backend to verify. Absent key → no widget,
// no behaviour change (honeypot + speed-trap still apply).
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

type TurnstileAPI = {
  render: (
    el: HTMLElement,
    opts: { sitekey: string; callback: (token: string) => void; 'error-callback'?: () => void },
  ) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileAPI;
    __salviaTurnstileReady?: () => void;
  }
}

function TurnstileWidget({ onToken }: { onToken: (t: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const el = ref.current;
    if (!el) return;
    const render = () => {
      if (window.turnstile && el.childNodes.length === 0) {
        window.turnstile.render(el, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: onToken,
          'error-callback': () => onToken(''),
        });
      }
    };
    if (window.turnstile) { render(); return; }
    window.__salviaTurnstileReady = render;
    if (!document.querySelector('script[data-turnstile]')) {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__salviaTurnstileReady';
      s.async = true;
      s.setAttribute('data-turnstile', '');
      document.head.appendChild(s);
    }
  }, [onToken]);
  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={ref} style={{ marginBottom: 8 }} />;
}

// ── Static option data ───────────────────────────────────────────────────────

const VERTICAL_LABEL: Record<Vertical, string> = {
  veterinary: 'Veterinary clinic',
  dental: 'Dental practice',
  general_clinic: 'General practice',
  allied_health: 'Allied health practice',
};

const VERTICAL_OPTIONS: { value: Vertical; label: string }[] = [
  { value: 'veterinary', label: VERTICAL_LABEL.veterinary },
  { value: 'dental', label: VERTICAL_LABEL.dental },
  { value: 'general_clinic', label: VERTICAL_LABEL.general_clinic },
  { value: 'allied_health', label: VERTICAL_LABEL.allied_health },
];

const COUNTRY_OPTIONS = [
  { value: 'NZ', label: 'New Zealand' },
  { value: 'AU', label: 'Australia' },
  { value: 'IN', label: 'India' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'IE', label: 'Ireland' },
  { value: 'CA', label: 'Canada' },
  { value: 'US', label: 'United States' },
];

// Country → default E.164 dial code. Used to seed the phone prefix when
// the user picks a country; the dial-code field stays editable so a clinic
// can override it (e.g. an NZ clinic with a UK mobile).
const DIAL_CODE_BY_COUNTRY: Record<string, string> = {
  NZ: '+64',
  AU: '+61',
  IN: '+91',
  UK: '+44',
  IE: '+353',
  CA: '+1',
  US: '+1',
};

const CALL_WINDOW_OPTIONS = [
  { value: 'weekday_morning', label: 'Weekday morning' },
  { value: 'weekday_afternoon', label: 'Weekday afternoon' },
  { value: 'weekday_evening', label: 'Weekday evening' },
  { value: 'weekend', label: 'Weekend' },
];

const STEPS: { label: string; value: string }[] = [
  { label: 'Today', value: 'Sign up — six quick fields, under a minute' },
  { label: 'Within a day', value: 'Your Salvia workspace is set up with your clinic’s forms' },
  { label: 'Next 21 days', value: 'Full access, no card — everything unlocked' },
  { label: 'Day 22', value: 'Continue only if you say yes — cancel any time, no charge' },
];

function isVertical(v: string | null): v is Vertical {
  return v === 'veterinary' || v === 'dental' || v === 'general_clinic' || v === 'allied_health';
}

// ── Page ─────────────────────────────────────────────────────────────────────

export const SignupPage = () => {
  const [params] = useSearchParams();
  const initialVertical: Vertical = useMemo(() => {
    const v = params.get('vertical');
    return isVertical(v) ? v : 'veterinary';
  }, [params]);

  const [vertical, setVertical] = useState<Vertical>(initialVertical);
  const [country, setCountry] = useState(INDIA_ONLY ? 'IN' : 'NZ');

  // Abuse protection: honeypot field (bots autofill it), form-mount
  // timestamp (bots submit in <3s), optional Turnstile token.
  const [website, setWebsite] = useState('');
  const mountedAt = useRef(Date.now());
  const [turnstileToken, setTurnstileToken] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [dialCode, setDialCode] = useState(INDIA_ONLY ? '+91' : '+64');
  const [phoneLocal, setPhoneLocal] = useState('');
  const [callWindow, setCallWindow] = useState('weekday_morning');
  const [numStaff, setNumStaff] = useState('');
  const [pain, setPain] = useState('');

  // When the user picks a country, seed the dial code with that country's
  // default. They can still override the dial code afterward.
  function onCountryChange(next: string) {
    setCountry(next);
    setDialCode(DIAL_CODE_BY_COUNTRY[next] ?? '');
  }

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    // Honeypot / speed-trap tripped → fake success. No API call, no
    // analytics, nothing for the bot to learn from.
    if (website.trim() !== '' || Date.now() - mountedAt.current < 3000) {
      setSubmitted(true);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const dial = dialCode.trim();
      const local = phoneLocal.trim();
      const fullPhone = dial && local ? `${dial} ${local}` : local;
      const payload: Record<string, unknown> = {
        clinic_name: clinicName.trim(),
        contact_name: contactName.trim(),
        contact_email: contactEmail.trim(),
        phone: fullPhone,
        preferred_call_window: callWindow,
        vertical,
        country,
        ...(numStaff.trim() ? { num_staff: Number(numStaff.trim()) } : {}),
        ...(pain.trim() ? { current_workflow_pain: pain.trim() } : {}),
        ...(turnstileToken ? { turnstile_token: turnstileToken } : {}),
      };

      const res = await fetch(`${SAL_API_BASE}/api/v1/access-requests`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await safeJson(res);
        const detail = typeof body?.detail === 'string' ? body.detail : null;
        const title = typeof body?.title === 'string' ? body.title : null;
        throw new Error(detail ?? title ?? `HTTP ${res.status}`);
      }
      const email = contactEmail.trim();
      if (email) {
        identify(email, {
          email,
          clinic_name: clinicName.trim(),
          contact_name: contactName.trim(),
          vertical,
          country,
        });
      }
      track('signup_submitted', {
        vertical,
        country,
        num_staff: numStaff.trim() ? Number(numStaff.trim()) : null,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please email hello@hellosalvia.com instead.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return <SuccessPage email={contactEmail} clinicName={clinicName} country={country} />;
  }

  return (
    <>
      <SEO
        title="Talk to us"
        description="Tell us where the paperwork breaks in your practice. We set Salvia up with your own forms and the framework you are assessed against — CQC, HIQA, CMS, NABH or JCI."
        path="/start"
        keywords={['clinical compliance software', 'CQC record keeping software', 'NABH documentation software', 'audit readiness']}
      />
      <SiteHeader />
      <main style={{ flex: 1 }}>
        <SignupStyles />
        <section className="s-section">
          <div className="s-wrap">
            <div className="su-grid">

              {/* ── Left: the pitch ── */}
              <div>
                <h1 style={{ fontSize: 'clamp(2rem, 4.2vw, 3.1rem)', maxWidth: '15ch' }}>
                  Tell us where the paperwork breaks.
                </h1>
                <p className="s-lede" style={{ marginTop: 'var(--space-5)' }}>
                  We set Salvia up with your own forms and the framework you are assessed
                  against, then walk your last inspection findings with you. No slides.
                </p>

                <ol className="su-steps">
                  {STEPS.map((s2, i) => (
                    <li key={s2.label}>
                      <span className="num">{String(i + 1).padStart(2, '0')}</span>
                      <span><b>{s2.label}</b><em>{s2.value}</em></span>
                    </li>
                  ))}
                </ol>

                <p style={{ marginTop: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
                  We are building this with a small number of practices. If you know exactly
                  which part of the record never gets written, that is worth more to us than
                  a sale.
                </p>
              </div>

              {/* ── Right: the form ── */}
              <div className="su-sticky">
                <Rv className="su-card" delay={1}>
                  <h2 className="g-h3" style={{ marginBottom: 4 }}>Get started</h2>
                  <p className="g-small" style={{ marginBottom: 22 }}>
                    Six quick fields — under a minute, and your clinic is set up.
                  </p>

                  <form onSubmit={onSubmit} className="su-form">
                    {/* Honeypot — visually hidden and untabbable; humans never
                        see it, autofill bots complete it and get fake-success */}
                    <input
                      type="text"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                    />

                    <div className="su-row">
                      <Field label="Your full name" htmlFor="contactName" required>
                        <input
                          id="contactName"
                          type="text"
                          required
                          minLength={2}
                          maxLength={200}
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          autoComplete="name"
                          placeholder="Dr. Jane Smith"
                          style={inputStyle}
                        />
                      </Field>
                      <Field label="Clinic name" htmlFor="clinicName" required>
                        <input
                          id="clinicName"
                          type="text"
                          required
                          minLength={2}
                          maxLength={200}
                          value={clinicName}
                          onChange={(e) => setClinicName(e.target.value)}
                          autoComplete="organization"
                          placeholder="Greenwood Clinic"
                          style={inputStyle}
                        />
                      </Field>
                    </div>

                    <Field label="Work email" htmlFor="contactEmail" required>
                      <input
                        id="contactEmail"
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        autoComplete="email"
                        placeholder="you@clinic.com"
                        style={inputStyle}
                      />
                    </Field>

                    <Field label="Phone" htmlFor="phoneLocal" required hint="so we can reach you">
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input
                          id="dialCode"
                          type="text"
                          required
                          aria-label="Country dial code"
                          value={dialCode}
                          onChange={(e) => setDialCode(e.target.value)}
                          placeholder="+91"
                          maxLength={5}
                          style={{ ...inputStyle, width: 76, textAlign: 'center', fontWeight: 600 }}
                        />
                        <input
                          id="phoneLocal"
                          type="tel"
                          required
                          minLength={4}
                          maxLength={32}
                          value={phoneLocal}
                          onChange={(e) => setPhoneLocal(e.target.value)}
                          autoComplete="tel-national"
                          placeholder="98470 12345"
                          style={{ ...inputStyle, flex: 1 }}
                        />
                      </div>
                    </Field>

                    <div className="su-row">
                      <Field label="Type of practice" htmlFor="vertical" required>
                        <select
                          id="vertical"
                          value={vertical}
                          onChange={(e) => setVertical(e.target.value as Vertical)}
                          required
                          style={inputStyle}
                        >
                          {VERTICAL_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Country" htmlFor="country" required>
                        <select
                          id="country"
                          value={country}
                          onChange={(e) => onCountryChange(e.target.value)}
                          required
                          style={inputStyle}
                        >
                          {COUNTRY_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label="Best time to reach you" htmlFor="callWindow" required>
                      <select
                        id="callWindow"
                        value={callWindow}
                        onChange={(e) => setCallWindow(e.target.value)}
                        required
                        style={inputStyle}
                      >
                        {CALL_WINDOW_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </Field>

                    <details className="su-details">
                      <summary>Anything that helps us prepare? (optional)</summary>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 14 }}>
                        <Field label="How many clinical staff?" htmlFor="numStaff">
                          <input
                            id="numStaff"
                            type="number"
                            min={1}
                            max={10000}
                            value={numStaff}
                            onChange={(e) => setNumStaff(e.target.value)}
                            placeholder="e.g. 5"
                            style={inputStyle}
                          />
                        </Field>
                        <Field label="What's frustrating about your current workflow?" htmlFor="pain">
                          <textarea
                            id="pain"
                            maxLength={4000}
                            rows={3}
                            value={pain}
                            onChange={(e) => setPain(e.target.value)}
                            placeholder="e.g. 'I spend 2 hours after clinic writing notes'"
                            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
                          />
                        </Field>
                      </div>
                    </details>

                    {error && (
                      <div role="alert" className="su-error">
                        {error}
                      </div>
                    )}

                    <TurnstileWidget onToken={setTurnstileToken} />

                    <button
                      type="submit"
                      disabled={submitting}
                      className="g-btn g-btn--green"
                      style={{ width: '100%', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'progress' : 'pointer' }}
                    >
                      {submitting ? 'Submitting…' : 'Get started →'}
                    </button>

                    <p className="g-small" style={{ textAlign: 'center', margin: 0 }}>
                      By submitting you agree to our Terms and Privacy Policy.{' '}
                      <Link to="/pricing" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                        See pricing
                      </Link>
                    </p>
                  </form>
                </Rv>
              </div>

            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
};

// ── Success page ─────────────────────────────────────────────────────────────

function SuccessPage({ email, clinicName, country }: { email: string; clinicName: string; country: string }) {
  const countryLabel =
    COUNTRY_OPTIONS.find((c) => c.value === country)?.label ?? 'local';
  return (
    <>
      <SiteHeader />
      <main style={{ flex: 1, zIndex: 10, background: '#fff' }}>
        <section className="g-section g-center" style={{ padding: '168px 0 120px' }}>
          <div className="g-container">
            <Rv>
              <img
                src="/illustrations/signup_scene.webp"
                alt="A friendly Salvia team member welcoming you, waving hello"
                style={{ width: 'min(340px, 80%)', height: 'auto', display: 'block', margin: '0 auto 26px' }}
              />
            </Rv>
            <Rv as="h1" className="g-h2" delay={1} style={{ margin: '0 auto 14px' }}>
              Thanks{clinicName ? <>, <span className="g-hl">{clinicName}</span></> : ''}. You're all set.
            </Rv>
            <Rv as="p" className="g-sub" delay={2}>
              We're setting up your workspace now — watch <b>{email || 'your inbox'}</b> for
              your login, usually within {countryLabel} business hours.
            </Rv>
            <Rv className="g-hero-ctas" delay={3} style={{ marginTop: 30 }}>
              <Link className="g-btn g-btn--green" to="/">
                Back to home
              </Link>
              <Link className="g-btn g-btn--ghost" to="/pricing">
                See pricing
              </Link>
            </Rv>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

// ── Field component ──────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  hint?: string;
}

function Field({ label, htmlFor, children, hint }: FieldProps) {
  return (
    <label htmlFor={htmlFor} style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
      <span style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600, color: 'var(--ink)',
      }}>
        <span>{label}</span>
        {hint && <span style={{ fontWeight: 500, fontSize: 12, color: 'var(--muted)' }}>{hint}</span>}
      </span>
      {children}
    </label>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

async function safeJson(res: Response): Promise<Record<string, unknown> | null> {
  try {
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

// ── Styles ───────────────────────────────────────────────────────────────────

/* Inline, because these win over the <style> block below — and the previous
   values pointed at grass.css variables that no longer exist, so the border
   resolved to nothing and a white field sat on a white card with no edge at
   all. The field is recessed: warm inset ground, a rule you can actually see. */
const inputStyle: CSSProperties = {
  width: '100%',
  minHeight: 46,
  padding: '11px 14px',
  fontFamily: 'var(--font-body)',
  fontSize: 15,
  border: '1.5px solid var(--faint)',
  borderRadius: 'var(--radius)',
  backgroundColor: 'var(--surface-2)',
  color: 'var(--ink)',
  outline: 'none',
  transition: 'border-color 160ms ease, box-shadow 160ms ease, background 160ms ease',
  boxSizing: 'border-box',
};

function SignupStyles() {
  return (
    <style>{`
      .su-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: var(--space-9);
        align-items: start;
      }
      .su-sticky { position: sticky; top: var(--space-7); }
      .su-card {
        background: var(--surface);
        border: 1.5px solid var(--ink);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
        box-shadow: var(--shadow);
      }
      .su-form { display: flex; flex-direction: column; gap: var(--space-4); }
      .su-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }
      .su-form label { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--ink); }
      /* The card is white, so a white field is invisible. Fields sit on the
         warm inset tone with a darker rule — the typable area is the thing that
         should read as recessed, not as more card. */
      .su-form input, .su-form select, .su-form textarea {
        width: 100%; min-height: 46px; padding: var(--space-3);
        border: 1.5px solid var(--faint); border-radius: var(--radius);
        background: var(--surface-2); color: var(--ink);
        font: var(--weight-normal) var(--text-base)/1.4 var(--font-body);
        transition: border-color var(--t-hover) var(--ease-out);
      }
      .su-form textarea { min-height: 92px; resize: vertical; }
      .su-form input::placeholder, .su-form textarea::placeholder { color: var(--muted); }
      .su-form input:hover, .su-form select:hover, .su-form textarea:hover { border-color: var(--body); }
      .su-form input:focus, .su-form select:focus, .su-form textarea:focus {
        outline: none; border-color: var(--accent); background: var(--surface);
        box-shadow: 0 0 0 3px var(--accent-line);
      }
      /* The plan, as a numbered sequence rather than four boxes. */
      .su-steps { list-style: none; padding: 0; margin: var(--space-8) 0 0; border-top: 1.5px solid var(--ink); }
      .su-steps li {
        display: grid; grid-template-columns: 34px 1fr; gap: var(--space-4);
        padding: var(--space-4) 0; border-bottom: 1px solid var(--line);
      }
      .su-steps .num { color: var(--faint); font-weight: var(--weight-semi); font-size: var(--text-sm); }
      .su-steps b { display: block; font-size: var(--text-base); color: var(--ink); }
      .su-steps em { display: block; font-style: normal; font-size: var(--text-sm); color: var(--muted); margin-top: 3px; }
      .su-note {
        font-size: var(--text-sm); line-height: 1.55;
        color: var(--body); background: var(--accent-soft);
        border: 1px solid var(--accent-line); border-radius: var(--radius);
        padding: var(--space-3) var(--space-4); margin: 0;
      }
      .su-note b { color: var(--ink); }
      .su-details { border: 1px dashed var(--line); border-radius: var(--radius); padding: var(--space-3) var(--space-4); }
      .su-details summary { cursor: pointer; font-size: var(--text-sm); font-weight: var(--weight-semi); color: var(--body); }
      .su-error {
        font-size: var(--text-sm); line-height: 1.5;
        color: var(--danger); background: hsl(9 70% 97%);
        border: 1px solid hsl(9 50% 84%); border-radius: var(--radius);
        padding: var(--space-3) var(--space-4);
      }
      @media (max-width: 960px) {
        .su-grid { grid-template-columns: 1fr; gap: var(--space-8); }
        .su-sticky { position: static; }
      }
      @media (max-width: 560px) {
        .su-card { padding: var(--space-5) var(--space-4); }
        .su-row { grid-template-columns: 1fr; }
      }
    `}</style>
  );
}
