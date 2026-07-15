import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { Rv } from '../components/grass/Rv';
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
        title="Start your free Salvia trial"
        description="Get started with Salvia — AI clinical documentation and compliance for Indian clinics, hospitals, dental and veterinary practices. 21 days free, no card, cancel anytime."
        path="/start"
        keywords={['Salvia free trial', 'AI clinical documentation India', 'clinic compliance software trial', 'AI medical scribe India signup']}
      />
      <GrassHeader />
      <main style={{ flex: 1, zIndex: 10, background: '#fff' }}>
        <SignupStyles />
        <section className="g-section" style={{ padding: '140px 0 96px' }}>
          <div className="g-container">
            <div className="su-grid">

              {/* ── Left: the pitch ── */}
              <div>
                <Rv as="h1" className="g-h1" style={{ fontSize: 'clamp(36px, 4.2vw, 58px)', marginBottom: 18 }}>
                  Get started with <span className="g-hl">Salvia.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  Tell us about your clinic and we'll set you up in Salvia — your actual forms,
                  your workflow, <b>no slides, no pitch deck</b>. 21 days of full access, free,
                  no card.
                </Rv>
                <Rv delay={2}>
                  <img
                    src="/illustrations/signup_scene.webp"
                    alt="A friendly Salvia team member welcoming you, waving hello"
                    style={{ width: 'min(380px, 88%)', height: 'auto', display: 'block', margin: '30px 0 4px' }}
                  />
                </Rv>
                <Rv className="g-facts" delay={3}>
                  {STEPS.map((s) => (
                    <div className="g-fact" key={s.label}>
                      <span>{s.label}</span>
                      <b>{s.value}</b>
                    </div>
                  ))}
                </Rv>
                <Rv as="p" className="g-small" delay={3} style={{ marginTop: 18 }}>
                  No credit card during the trial · 21 days of full access · Cancel any time
                  before day 22
                </Rv>
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

                    {country === 'IN' && (
                      <p className="su-note">
                        Salvia supports recording in <b>English, Hindi, Malayalam, Tamil</b> or
                        any mix — notes come out in clean English automatically.
                      </p>
                    )}

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
                      <Link to="/pricing" style={{ color: 'var(--g-green)', fontWeight: 600 }}>
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
      <GrassFooter />
    </>
  );
};

// ── Success page ─────────────────────────────────────────────────────────────

function SuccessPage({ email, clinicName, country }: { email: string; clinicName: string; country: string }) {
  const countryLabel =
    COUNTRY_OPTIONS.find((c) => c.value === country)?.label ?? 'local';
  return (
    <>
      <GrassHeader />
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
      <GrassFooter />
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
        fontFamily: 'var(--g-font)', fontSize: 13, fontWeight: 600, color: 'var(--g-ink)',
      }}>
        <span>{label}</span>
        {hint && <span style={{ fontWeight: 500, fontSize: 12, color: 'var(--g-ink-faint)' }}>{hint}</span>}
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

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  fontFamily: 'var(--g-font)',
  fontSize: 14.5,
  border: '1px solid var(--g-line)',
  borderRadius: 12,
  backgroundColor: '#fff',
  color: 'var(--g-ink)',
  outline: 'none',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  boxSizing: 'border-box',
};

function SignupStyles() {
  return (
    <style>{`
      .su-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 56px;
        align-items: start;
      }
      .su-sticky { position: sticky; top: 84px; }
      .su-card {
        background: #fff;
        border: 1px solid var(--g-line);
        border-radius: 18px;
        padding: 30px 30px 26px;
        box-shadow: var(--g-shadow);
      }
      .su-form { display: flex; flex-direction: column; gap: 16px; }
      .su-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .su-form input:focus, .su-form select:focus, .su-form textarea:focus {
        border-color: var(--g-green);
        box-shadow: 0 0 0 3px rgba(72, 205, 95, 0.18);
      }
      .su-note {
        font-family: var(--g-font); font-size: 13px; line-height: 1.55;
        color: var(--g-ink-soft); background: var(--g-green-soft);
        border: 1px solid rgba(72, 205, 95, 0.3); border-radius: 12px;
        padding: 10px 14px; margin: 0;
      }
      .su-note b { color: var(--g-ink); }
      .su-details {
        border: 1px dashed var(--g-line); border-radius: 12px; padding: 12px 14px;
      }
      .su-details summary {
        cursor: pointer; font-family: var(--g-font); font-size: 13px;
        font-weight: 600; color: var(--g-ink-soft);
      }
      .su-error {
        font-family: var(--g-font); font-size: 13.5px; line-height: 1.5;
        color: #B91C1C; background: #FEF2F2;
        border: 1px solid rgba(185, 28, 28, 0.2); border-radius: 12px;
        padding: 12px 14px;
      }
      @media (max-width: 960px) {
        .su-grid { grid-template-columns: 1fr; gap: 40px; }
        .su-sticky { position: static; }
      }
      @media (max-width: 560px) {
        .su-card { padding: 22px 18px; }
        .su-row { grid-template-columns: 1fr; }
      }
    `}</style>
  );
}
