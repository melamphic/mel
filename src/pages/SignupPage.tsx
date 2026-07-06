import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { SEO } from '../components/SEO';
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
  return <div ref={ref} style={{ marginBottom: '0.5rem' }} />;
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

const STEPS = [
  {
    title: 'Submit this form',
    body: 'Under a minute. Six quick fields — clinic, vertical, and how to reach you.',
  },
  {
    title: 'We call you within 24 hours',
    body: '20-minute walkthrough in your real workflow — no slides, no pitch deck. We make sure Salvia fits before we let you in.',
  },
  {
    title: '21 days, full access, no card',
    body: 'If we’re a fit you get a magic-link sign-in. Capture audio, generate notes, run policy checks — everything unlocked.',
  },
  {
    title: 'Pay only if you continue',
    body: 'On day 22 we email to confirm. Cancel any time before then — we don’t charge a cent until you say yes.',
  },
];

const TRUST_BULLETS = [
  'No credit card during your trial',
  'Reviewed and approved by a human, not a bot',
  'Cancel any time before day 22 — no charge',
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
  // default. They can still override the dial code afterward (e.g. an NZ
  // clinic with a UK mobile).
  function onCountryChange(next: string) {
    setCountry(next);
    const next_dial = DIAL_CODE_BY_COUNTRY[next] ?? '';
    setDialCode(next_dial);
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
        description="Request early access to Salvia — AI clinical documentation and compliance for Indian clinics, hospitals, dental and veterinary practices. 21 days free, no card, cancel anytime."
        path="/start"
        keywords={['Salvia free trial', 'AI clinical documentation India', 'clinic compliance software trial', 'AI medical scribe India signup']}
      />
      <GrassHeader />
      <main style={{ flex: 1, zIndex: 10 }}>
      <ResponsiveStyles />

      <section style={pageSectionStyle} className="signup-section">
        {/* Decorative background gradient */}
        <div style={bgGradientStyle} aria-hidden="true" />

        <div className="container signup-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="signup-grid">
            {/* ── Left column: pitch + steps ── */}
            <div className="signup-left">
              <h1 style={h1Style}>
                Salvia onboards every clinic
                <span className="g-hl"> personally.</span>
              </h1>
              <p style={leadStyle}>
                We’re not letting just anyone in yet. Tell us about your clinic and we’ll get back
                to you within 24 hours to walk you through Salvia in your actual workflow.
              </p>

              <ol style={stepsListStyle}>
                {STEPS.map((step, idx) => (
                  <li key={idx} style={stepItemStyle}>
                    <div style={stepNumberStyle}>{idx + 1}</div>
                    <div>
                      <div style={stepTitleStyle}>{step.title}</div>
                      <div style={stepBodyStyle}>{step.body}</div>
                    </div>
                    {idx < STEPS.length - 1 && <div style={stepConnectorStyle} aria-hidden="true" />}
                  </li>
                ))}
              </ol>

              <img
                src="/illustrations/signup_scene.webp"
                alt="A friendly Salvia team member on a welcome call, waving hello"
                loading="lazy"
                style={{ width: 300, height: 'auto', display: 'block', margin: '0 0 1.25rem' }}
              />

              <ul style={trustListStyle}>
                {TRUST_BULLETS.map((b) => (
                  <li key={b} style={trustItemStyle}>
                    <CheckIcon />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Right column: form card ── */}
            <div className="signup-right">
              <div style={formCardStyle} className="signup-form-card">
                <div style={formHeaderStyle}>
                  <h2 style={formTitleStyle}>Request early access</h2>
                  <p style={formSubStyle}>
                    Six quick fields — under a minute. We review every clinic personally.
                  </p>
                </div>

                <form onSubmit={onSubmit} style={formStyle}>
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

                  <div style={fieldRowStyle} className="signup-field-row">
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

                  <div style={fieldRowStyle} className="signup-field-row">
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
                    <div style={indiaLangNoteStyle}>
                      <span style={{ fontSize: 'var(--text-base)', lineHeight: 1 }}>🇮🇳</span>
                      <span>
                        Salvia supports recording in <strong>English, Hindi, Malayalam, Tamil</strong>, or any mix — notes are extracted to English automatically. No extra setup needed.
                      </span>
                    </div>
                  )}

                  <Field
                    label="Phone"
                    htmlFor="phoneLocal"
                    required
                    hint="So we can call to walk you through Salvia"
                  >
                    <div style={phoneRowStyle}>
                      <input
                        id="dialCode"
                        type="text"
                        required
                        aria-label="Country dial code"
                        value={dialCode}
                        onChange={(e) => setDialCode(e.target.value)}
                        placeholder="+64"
                        maxLength={5}
                        style={{ ...inputStyle, width: 80, textAlign: 'center', fontWeight: 600 }}
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
                        placeholder="21 555 0123"
                        style={{ ...inputStyle, flex: 1 }}
                      />
                    </div>
                  </Field>

                  <Field
                    label="When's the best time for us to call?"
                    htmlFor="callWindow"
                    required
                    hint="20-minute walkthrough — pick a slot in your local time"
                  >
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

                  <details style={detailsStyle}>
                    <summary style={summaryStyle}>Anything that helps us prepare? (optional)</summary>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginTop: '1rem' }}>
                      <Field label="How many clinical staff?" htmlFor="numStaff" hint="Optional">
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

                      <Field
                        label="What’s frustrating about your current note workflow?"
                        htmlFor="pain"
                        hint="Optional"
                      >
                        <textarea
                          id="pain"
                          maxLength={4000}
                          rows={3}
                          value={pain}
                          onChange={(e) => setPain(e.target.value)}
                          placeholder="e.g. 'I spend 2 hours after every appointment writing notes'"
                          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5 }}
                        />
                      </Field>
                    </div>
                  </details>

                  {error && (
                    <div role="alert" style={errorBoxStyle}>
                      {error}
                    </div>
                  )}

                  <TurnstileWidget onToken={setTurnstileToken} />

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      ...primaryButtonStyle,
                      opacity: submitting ? 0.7 : 1,
                      cursor: submitting ? 'progress' : 'pointer',
                    }}
                  >
                    {submitting ? 'Submitting…' : 'Request early access →'}
                  </button>

                  <p style={fineprintStyle}>
                    By submitting you agree to our Terms and Privacy Policy.{' '}
                    <Link to="/pricing" style={{ color: 'var(--g-green)', fontWeight: 600 }}>
                      See pricing
                    </Link>
                  </p>
                </form>
              </div>
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
      <main style={{ flex: 1, zIndex: 10 }}>
      <ResponsiveStyles />
      <section style={pageSectionStyle} className="signup-section signup-success">
        <div style={bgGradientStyle} aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '640px', textAlign: 'center' }}>
          <div style={{ ...eyebrowStyle, justifyContent: 'center', display: 'inline-flex' }}>
            <CheckIconLarge />
            <span style={{ marginLeft: '0.5rem' }}>Request received</span>
          </div>
          <h1 style={{ ...h1Style, fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', marginTop: '1rem' }}>
            Thanks {clinicName ? <span className="g-hl">{clinicName}</span> : 'for reaching out'}.
          </h1>
          <p style={{ ...leadStyle, maxWidth: '480px', margin: '0 auto 3rem' }}>
            We’ll be in touch at{' '}
            <strong style={{ color: 'var(--salvia-primary)' }}>{email || 'your inbox'}</strong>{' '}
            within 24 hours — usually faster during {countryLabel} business hours.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="g-btn g-btn--green">Back to home</Link>
            <Link
              to="/pricing"
              className="g-btn g-btn--ghost"
              style={{ textDecoration: 'none' }}
            >
              See pricing while you wait →
            </Link>
          </div>
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

function Field({ label, htmlFor, children, required, hint }: FieldProps) {
  return (
    <label htmlFor={htmlFor} style={fieldLabelStyle}>
      <span style={fieldLabelTextStyle}>
        <span>{label}</span>
        {!required && hint && <span style={fieldHintStyle}>{hint}</span>}
      </span>
      {children}
    </label>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="var(--g-green)" opacity="0.15" />
      <path d="M4.5 8.2 L7 10.7 L11.5 5.5" stroke="var(--g-green)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIconLarge() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="var(--g-green)" />
      <path d="M5.5 10.5 L8.5 13.5 L14.5 6.5" stroke="#083D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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

// ── Responsive styles ────────────────────────────────────────────────────────
// Scoped CSS for the signup page — handles desktop two-column / mobile
// single-column, plus input :focus rings and the submit button hover state
// (inline styles can't express :focus / :hover / media queries).

function ResponsiveStyles() {
  return (
    <style>{`
      .signup-section { padding: 8rem 0 6rem; }
      .signup-success { padding: 10rem 0 8rem; min-height: 80vh; display: flex; align-items: center; }
      .signup-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 4rem;
        align-items: start;
      }
      .signup-left { padding-right: 1rem; }
      .signup-right { position: sticky; top: 6rem; }

      .signup-form-card input:focus,
      .signup-form-card select:focus,
      .signup-form-card textarea:focus {
        border-color: var(--g-green);
        box-shadow: 0 0 0 3px rgba(72, 205, 95, 0.18);
      }

      .signup-form-card button[type='submit']:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 14px 28px -8px rgba(72, 205, 95, 0.5);
      }
      .signup-form-card button[type='submit']:active:not(:disabled) {
        transform: translateY(0);
      }

      /* Tablet: tighten the gap */
      @media (max-width: 1024px) {
        .signup-grid { gap: 2.5rem; }
        .signup-left { padding-right: 0; }
        .signup-right { position: static; }
      }

      /* Mobile: stack columns, reduce padding */
      @media (max-width: 768px) {
        .signup-section { padding: 6rem 0 4rem; }
        .signup-success { padding: 7rem 0 5rem; }
        .signup-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        .signup-form-card { padding: 1.5rem !important; }
        .signup-form-card .signup-field-row { grid-template-columns: 1fr !important; }
      }

      @media (max-width: 480px) {
        .signup-section { padding: 5rem 0 3rem; }
        .signup-form-card { padding: 1.25rem !important; }
      }
    `}</style>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

const pageSectionStyle: CSSProperties = {
  position: 'relative',
  backgroundColor: '#fff',
  fontFamily: 'var(--g-font)',
  minHeight: '90vh',
  overflow: 'hidden',
};

const bgGradientStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  backgroundImage:
    'radial-gradient(circle at 12% 18%, rgba(72, 205, 95, 0.08), transparent 38%), ' +
    'radial-gradient(circle at 88% 78%, rgba(242, 169, 59, 0.07), transparent 42%)',
};

const eyebrowStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: 12.5,
  fontWeight: 700,
  color: 'var(--g-ink-soft)',
  backgroundColor: '#fff',
  border: '1px solid var(--g-line)',
  padding: '6px 14px',
  borderRadius: 999,
  marginBottom: '1.25rem',
};

const h1Style: CSSProperties = {
  fontFamily: 'var(--g-font)',
  fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
  fontWeight: 800,
  color: 'var(--g-ink)',
  letterSpacing: '-0.035em',
  lineHeight: 1.05,
  marginBottom: '1.25rem',
};

const leadStyle: CSSProperties = {
  color: 'var(--g-ink-soft)',
  fontSize: 'var(--text-md)',
  lineHeight: 1.6,
  marginBottom: '2.5rem',
  maxWidth: '480px',
};

const stepsListStyle: CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: '0 0 2.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
};

const stepItemStyle: CSSProperties = {
  position: 'relative',
  display: 'flex',
  gap: '1.1rem',
  alignItems: 'flex-start',
};

const stepNumberStyle: CSSProperties = {
  flexShrink: 0,
  width: '2.2rem',
  height: '2.2rem',
  borderRadius: 999,
  background: 'var(--g-green)',
  color: '#083D1B',
  fontSize: 'var(--text-sm)',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
  zIndex: 1,
};

const stepConnectorStyle: CSSProperties = {
  position: 'absolute',
  left: '1.1rem',
  top: '2.4rem',
  bottom: '-1.25rem',
  width: '1px',
  backgroundImage: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.18), transparent)',
};

const stepTitleStyle: CSSProperties = {
  fontWeight: 700,
  color: 'var(--g-ink)',
  fontSize: 'var(--text-base)',
  marginBottom: '0.25rem',
};

const stepBodyStyle: CSSProperties = {
  color: 'var(--g-ink-soft)',
  fontSize: 'var(--text-sm)',
  lineHeight: 1.55,
};

const trustListStyle: CSSProperties = {
  listStyle: 'none',
  padding: '1.25rem 1.5rem',
  margin: 0,
  borderRadius: 14,
  background: '#fff',
  border: '1px solid var(--g-line)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
};

const trustItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.65rem',
  fontSize: 'var(--text-sm)',
  color: 'var(--g-ink-soft)',
};

const formCardStyle: CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: 18,
  padding: '2.25rem',
  boxShadow: '0 24px 56px -24px rgba(15, 23, 42, 0.14), 0 6px 16px -6px rgba(15, 23, 42, 0.06)',
  border: '1px solid var(--g-line)',
};

const formHeaderStyle: CSSProperties = {
  marginBottom: '1.75rem',
  paddingBottom: '1.25rem',
  borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
};

const formTitleStyle: CSSProperties = {
  fontSize: 'var(--text-lg)',
  fontWeight: 700,
  color: 'var(--g-ink)',
  margin: '0 0 0.4rem',
  letterSpacing: '-0.015em',
};

const formSubStyle: CSSProperties = {
  fontSize: 'var(--text-sm)',
  color: 'var(--salvia-text-muted)',
  margin: 0,
};

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.1rem',
};

const fieldRowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0.9rem',
};

const phoneRowStyle: CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'stretch',
};

const fieldLabelStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
};

const fieldLabelTextStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  fontSize: 'var(--text-xs)',
  fontWeight: 600,
  color: 'var(--g-ink)',
  letterSpacing: '-0.005em',
};

const fieldHintStyle: CSSProperties = {
  fontSize: 'var(--text-xs)',
  fontWeight: 500,
  color: 'var(--salvia-text-muted)',
  textTransform: 'lowercase',
};

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '0.75rem 0.95rem',
  fontSize: 'var(--text-base)',
  fontFamily: 'inherit',
  border: '1px solid var(--g-line)',
  borderRadius: 12,
  backgroundColor: '#fff',
  color: 'var(--g-ink)',
  outline: 'none',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  boxSizing: 'border-box',
};

const errorBoxStyle: CSSProperties = {
  color: '#B91C1C',
  fontSize: 'var(--text-sm)',
  padding: '0.85rem 1rem',
  borderRadius: 'var(--salvia-radius-base)',
  backgroundColor: 'rgba(185, 28, 28, 0.06)',
  border: '1px solid rgba(185, 28, 28, 0.18)',
  lineHeight: 1.5,
};

const primaryButtonStyle: CSSProperties = {
  padding: '0.95rem 1.5rem',
  fontSize: 'var(--text-base)',
  fontWeight: 700,
  borderRadius: 'var(--salvia-radius-full)',
  border: 'none',
  background: 'var(--g-green)',
  color: '#083D1B',
  cursor: 'pointer',
  letterSpacing: '0.005em',
  boxShadow: '0 10px 24px -8px rgba(72, 205, 95, 0.45)',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
};

const detailsStyle: CSSProperties = {
  border: '1px dashed var(--g-line)',
  borderRadius: 12,
  padding: '0.8rem 1rem',
};

const summaryStyle: CSSProperties = {
  cursor: 'pointer',
  fontSize: 'var(--text-xs)',
  fontWeight: 600,
  color: 'var(--g-ink-soft)',
};

const fineprintStyle: CSSProperties = {
  fontSize: 'var(--text-xs)',
  color: 'var(--salvia-text-muted)',
  textAlign: 'center',
  margin: 0,
  lineHeight: 1.55,
};

const indiaLangNoteStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.6rem',
  padding: '0.75rem 1rem',
  borderRadius: 'var(--salvia-radius-base)',
  backgroundColor: 'var(--g-green-soft)',
  border: '1px solid rgba(72, 205, 95, 0.3)',
  fontSize: 'var(--text-xs)',
  color: 'var(--salvia-text)',
  lineHeight: 1.5,
};
