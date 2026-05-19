import { useMemo, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SAL_API_BASE } from '../config';
import type { Vertical } from '../data/pricing';

// Vertical labels — also used to seed the dropdown when no vertical is in the URL.
const VERTICAL_LABEL: Record<Vertical, string> = {
  veterinary: 'Veterinary clinic',
  dental: 'Dental practice',
  general_clinic: 'General practice',
  aged_care: 'Aged care home',
};

const VERTICAL_OPTIONS: { value: Vertical; label: string }[] = [
  { value: 'veterinary', label: VERTICAL_LABEL.veterinary },
  { value: 'dental', label: VERTICAL_LABEL.dental },
  { value: 'general_clinic', label: VERTICAL_LABEL.general_clinic },
  { value: 'aged_care', label: VERTICAL_LABEL.aged_care },
];

const COUNTRY_OPTIONS = [
  { value: 'NZ', label: 'New Zealand' },
  { value: 'AU', label: 'Australia' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'IE', label: 'Ireland' },
  { value: 'CA', label: 'Canada' },
  { value: 'US', label: 'United States' },
  { value: 'OTHER', label: 'Other' },
];

function isVertical(v: string | null): v is Vertical {
  return v === 'veterinary' || v === 'dental' || v === 'general_clinic' || v === 'aged_care';
}

export const SignupPage = () => {
  const [params] = useSearchParams();
  const initialVertical: Vertical = useMemo(() => {
    const v = params.get('vertical');
    return isVertical(v) ? v : 'veterinary';
  }, [params]);

  const [vertical, setVertical] = useState<Vertical>(initialVertical);
  const [country, setCountry] = useState('NZ');
  const [clinicName, setClinicName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [numStaff, setNumStaff] = useState('');
  const [pain, setPain] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        clinic_name: clinicName.trim(),
        contact_name: contactName.trim(),
        contact_email: contactEmail.trim(),
        vertical,
        country,
        ...(numStaff.trim() ? { num_staff: Number(numStaff.trim()) } : {}),
        ...(pain.trim() ? { current_workflow_pain: pain.trim() } : {}),
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
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please email hello@hellosalvia.com instead.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <>
        <Header />
        <section style={{ padding: '10rem 0 8rem', backgroundColor: 'var(--salvia-bg)', minHeight: '80vh' }}>
          <div className="container" style={{ maxWidth: '520px', textAlign: 'center' }}>
            <div
              style={{
                color: 'var(--salvia-accent)',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              Request received
            </div>
            <h1
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 2.75rem)',
                fontWeight: 800,
                color: 'var(--salvia-primary)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}
            >
              Thanks — we'll be in touch within 24 hours.
            </h1>
            <p style={{ color: 'var(--salvia-text-muted)', fontSize: '1rem', marginBottom: '2rem' }}>
              We review every clinic personally to make sure Salvia is the right fit. Expect a short email
              from us at <strong>{contactEmail || 'your inbox'}</strong> — usually within a few hours during business hours,
              always within a day.
            </p>
            <Link to="/" className="pill-button">Back to home</Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <section style={{ padding: '10rem 0 6rem', backgroundColor: 'var(--salvia-bg)', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '560px' }}>
          <div
            style={{
              color: 'var(--salvia-accent)',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            Early access · 21-day free trial
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--salvia-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '0.75rem',
            }}
          >
            Request early access.
          </h1>
          <p style={{ color: 'var(--salvia-text-muted)', fontSize: '1rem', marginBottom: '2rem' }}>
            We onboard every clinic personally. Here's how it works:
          </p>

          <ol
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              counterReset: 'step',
            }}
          >
            {[
              {
                title: 'Submit this form',
                body: 'Tells us your clinic name, vertical, and what you\'re currently struggling with. Takes 2 minutes.',
              },
              {
                title: 'We call you within 24 hours',
                body: 'A 20-minute walkthrough of Salvia in your actual workflow — no slides, no pitch deck. We make sure it fits before we let you in.',
              },
              {
                title: '21 days, full access, no card',
                body: 'If we\'re a fit, you get a magic-link sign-in. Capture audio, generate notes, run policy checks — everything is unlocked.',
              },
              {
                title: 'Pay only if you continue',
                body: 'On day 22 we email you to confirm. Cancel any time before then — we don\'t charge a cent until you say yes.',
              },
            ].map((step, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '1.75rem',
                    height: '1.75rem',
                    borderRadius: '999px',
                    backgroundColor: 'var(--salvia-accent)',
                    color: '#fff',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {idx + 1}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--salvia-primary)', fontSize: '0.95rem', marginBottom: '0.15rem' }}>
                    {step.title}
                  </div>
                  <div style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', lineHeight: 1.55 }}>
                    {step.body}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <form
            onSubmit={onSubmit}
            style={{
              backgroundColor: 'var(--salvia-surface)',
              borderRadius: 'var(--salvia-radius-large)',
              padding: '2rem',
              boxShadow: 'var(--salvia-shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <Field label="Clinic name" htmlFor="clinicName">
              <input id="clinicName" type="text" required minLength={2} maxLength={200}
                value={clinicName} onChange={(e) => setClinicName(e.target.value)}
                autoComplete="organization" placeholder="Greenwood Vets" style={inputStyle}/>
            </Field>

            <Field label="Your full name" htmlFor="contactName">
              <input id="contactName" type="text" required minLength={2} maxLength={200}
                value={contactName} onChange={(e) => setContactName(e.target.value)}
                autoComplete="name" placeholder="Dr. Jane Smith" style={inputStyle}/>
            </Field>

            <Field label="Work email" htmlFor="contactEmail">
              <input id="contactEmail" type="email" required
                value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                autoComplete="email" placeholder="you@clinic.com" style={inputStyle}/>
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Type of practice" htmlFor="vertical">
                <select id="vertical" value={vertical} onChange={(e) => setVertical(e.target.value as Vertical)}
                  required style={inputStyle}>
                  {VERTICAL_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </Field>

              <Field label="Country" htmlFor="country">
                <select id="country" value={country} onChange={(e) => setCountry(e.target.value)}
                  required style={inputStyle}>
                  {COUNTRY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="How many staff (optional)" htmlFor="numStaff">
              <input id="numStaff" type="number" min={1} max={10000}
                value={numStaff} onChange={(e) => setNumStaff(e.target.value)}
                placeholder="e.g. 5" style={inputStyle}/>
            </Field>

            <Field label="What's frustrating about your current clinical note workflow? (optional)" htmlFor="pain">
              <textarea id="pain" maxLength={4000} rows={4}
                value={pain} onChange={(e) => setPain(e.target.value)}
                placeholder="e.g. 'I'm spending 2 hours after every appointment typing up notes' or 'auditors keep flagging missing consent documentation'"
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}/>
            </Field>

            {error && (
              <div
                role="alert"
                style={{
                  color: '#B91C1C',
                  fontSize: '0.9rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--salvia-radius-base)',
                  backgroundColor: 'rgba(185, 28, 28, 0.08)',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="pill-button"
              style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'progress' : 'pointer' }}
            >
              {submitting ? 'Submitting…' : 'Request early access'}
            </button>

            <p style={{ fontSize: '0.8rem', color: 'var(--salvia-text-muted)', textAlign: 'center' }}>
              By submitting you agree to our Terms and Privacy Policy.{' '}
              <Link to="/pricing" style={{ color: 'var(--salvia-accent)', fontWeight: 600 }}>
                See pricing
              </Link>
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
  border: '1px solid rgba(15, 23, 42, 0.15)',
  borderRadius: 'var(--salvia-radius-base)',
  backgroundColor: 'var(--salvia-surface)',
  color: 'var(--salvia-text)',
  outline: 'none',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  boxSizing: 'border-box',
};

interface FieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
}

function Field({ label, htmlFor, children }: FieldProps) {
  return (
    <label htmlFor={htmlFor} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--salvia-primary)' }}>{label}</span>
      {children}
    </label>
  );
}

async function safeJson(res: Response): Promise<Record<string, unknown> | null> {
  try {
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}
