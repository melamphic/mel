import { useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SAL_API_BASE, SUPPORT_EMAIL } from '../config';

type Vertical = 'veterinary' | 'dental' | 'general_clinic';

interface FormState {
  fullName: string;
  email: string;
  clinicName: string;
  country: string;
  vertical: Vertical;
  seats: string;
  role: string;
  notes: string;
}

const INITIAL: FormState = {
  fullName: '',
  email: '',
  clinicName: '',
  country: 'NZ',
  vertical: 'veterinary',
  seats: '8',
  role: '',
  notes: '',
};

export const ContactSalesPage = () => {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`${SAL_API_BASE}/api/v1/signup/enterprise-lead`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          full_name: form.fullName.trim(),
          email: form.email.trim(),
          clinic_name: form.clinicName.trim(),
          country: form.country,
          vertical: form.vertical,
          seats: Number(form.seats),
          role: form.role.trim() || null,
          notes: form.notes.trim() || null,
        }),
      });
      if (!res.ok && res.status !== 404) {
        const body = await safeJson(res);
        const detail = typeof body?.detail === 'string' ? body.detail : null;
        throw new Error(detail ?? `HTTP ${res.status}`);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <>
        <Header />
        <section style={{ padding: '10rem 0 6rem', backgroundColor: 'var(--salvia-bg)', minHeight: '80vh' }}>
          <div className="container" style={{ maxWidth: '520px', textAlign: 'center' }}>
            <div
              style={{
                color: 'var(--salvia-accent)',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Thanks — we got it
            </div>
            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--salvia-primary)',
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
              }}
            >
              We'll be in touch within one business day.
            </h1>
            <p style={{ color: 'var(--salvia-text-muted)', fontSize: '1rem', marginBottom: '2rem' }}>
              Our enterprise team will email <strong>{form.email || 'you'}</strong> to schedule a
              call covering pricing, SSO, and onboarding for <strong>{form.clinicName || 'your clinic'}</strong>.
            </p>
            <Link to="/pricing" className="pill-button" style={{ textDecoration: 'none' }}>
              Back to pricing
            </Link>
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
            Enterprise · 8+ clinicians
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
            Let's talk.
          </h1>
          <p style={{ color: 'var(--salvia-text-muted)', fontSize: '1rem', marginBottom: '2.5rem' }}>
            Tell us about your practice. We'll reach out with custom pricing, SSO, volume commits,
            and a dedicated onboarding plan. Prefer email?{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: 'var(--salvia-accent)', fontWeight: 600 }}>
              {SUPPORT_EMAIL}
            </a>
          </p>

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
            <Field label="Your full name" htmlFor="fullName">
              <input
                id="fullName"
                type="text"
                required
                minLength={2}
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                autoComplete="name"
                placeholder="Dr. Jane Smith"
                style={inputStyle}
              />
            </Field>

            <Field label="Work email" htmlFor="email">
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                autoComplete="email"
                placeholder="you@clinic.com"
                style={inputStyle}
              />
            </Field>

            <Field label="Clinic or group name" htmlFor="clinicName">
              <input
                id="clinicName"
                type="text"
                required
                minLength={2}
                value={form.clinicName}
                onChange={(e) => update('clinicName', e.target.value)}
                autoComplete="organization"
                placeholder="Greenwood Vet Group"
                style={inputStyle}
              />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Country" htmlFor="country">
                <select
                  id="country"
                  value={form.country}
                  onChange={(e) => update('country', e.target.value)}
                  style={inputStyle}
                >
                  <option value="NZ">New Zealand</option>
                  <option value="AU">Australia</option>
                  <option value="GB">United Kingdom</option>
                  <option value="OTHER">Other</option>
                </select>
              </Field>

              <Field label="Practice type" htmlFor="vertical">
                <select
                  id="vertical"
                  value={form.vertical}
                  onChange={(e) => update('vertical', e.target.value as Vertical)}
                  style={inputStyle}
                >
                  <option value="veterinary">Veterinary · Paws</option>
                  <option value="dental">Dental · Smile</option>
                  <option value="general_clinic">General · Clinic</option>
                </select>
              </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Seats needed" htmlFor="seats">
                <input
                  id="seats"
                  type="number"
                  min={1}
                  required
                  value={form.seats}
                  onChange={(e) => update('seats', e.target.value)}
                  style={inputStyle}
                />
              </Field>
              <Field label="Your role" htmlFor="role">
                <input
                  id="role"
                  type="text"
                  value={form.role}
                  onChange={(e) => update('role', e.target.value)}
                  placeholder="Owner, CEO, IT lead"
                  style={inputStyle}
                />
              </Field>
            </div>

            <Field label="Anything we should know?" htmlFor="notes">
              <textarea
                id="notes"
                rows={3}
                value={form.notes}
                onChange={(e) => update('notes', e.target.value)}
                placeholder="Timeline, compliance requirements, current scribe, etc."
                style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
              />
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
              {submitting ? 'Sending…' : 'Request a call'}
            </button>

            <p style={{ fontSize: '0.8rem', color: 'var(--salvia-text-muted)', textAlign: 'center' }}>
              Under 8 clinicians?{' '}
              <Link to="/pricing" style={{ color: 'var(--salvia-accent)', fontWeight: 600 }}>
                Browse our self-serve plans
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
