import { useMemo, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SAL_API_BASE } from '../config';
import type { Vertical } from '../data/pricing';

const VERTICAL_LABEL: Record<Vertical, string> = {
  veterinary: 'Salvia Paws · Veterinary',
  dental: 'Salvia Smile · Dental',
  general_clinic: 'Salvia Clinic · General practice',
};

function isVertical(v: string | null): v is Vertical {
  return v === 'veterinary' || v === 'dental' || v === 'general_clinic';
}

export const SignupPage = () => {
  const [params] = useSearchParams();
  const vertical: Vertical = useMemo(() => {
    const v = params.get('vertical');
    return isVertical(v) ? v : 'veterinary';
  }, [params]);
  const planCode = params.get('plan') ?? '';
  const checkoutCanceled = params.get('canceled') === '1';

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        email: email.trim(),
        full_name: fullName.trim(),
        clinic_name: clinicName.trim(),
        vertical,
        plan_code: planCode || undefined,
      };

      // When a plan was selected on the pricing page we send the user
      // through Stripe Checkout (card up front, 14-day trial). When no
      // plan is set the legacy trial-only handoff still applies.
      if (planCode) {
        const res = await fetch(`${SAL_API_BASE}/api/v1/signup/checkout-start`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ...payload, plan_code: planCode }),
        });
        if (!res.ok) {
          const body = await safeJson(res);
          const detail = typeof body?.detail === 'string' ? body.detail : null;
          const title = typeof body?.title === 'string' ? body.title : null;
          throw new Error(detail ?? title ?? `HTTP ${res.status}`);
        }
        const data: { checkout_url?: string } = await res.json();
        if (!data.checkout_url) throw new Error('Missing checkout_url in response');
        window.location.assign(data.checkout_url);
        return;
      }

      const res = await fetch(`${SAL_API_BASE}/api/v1/signup/start`, {
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
      const data: { handoff_url?: string } = await res.json();
      if (!data.handoff_url) throw new Error('Missing handoff_url in response');
      window.location.assign(data.handoff_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />

      <section style={{ padding: '10rem 0 6rem', backgroundColor: 'var(--salvia-bg)', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '520px' }}>
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
            {planCode ? '14-day free trial · cancel anytime' : '14-day free trial · no card'}
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
            Start with {VERTICAL_LABEL[vertical]}.
          </h1>
          <p style={{ color: 'var(--salvia-text-muted)', fontSize: '1rem', marginBottom: '2.5rem' }}>
            Tell us about your clinic. We'll set up your workspace and email a magic link to sign in.
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
            <Field label="Work email" htmlFor="email">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="you@clinic.com"
                style={inputStyle}
              />
            </Field>

            <Field label="Your full name" htmlFor="fullName">
              <input
                id="fullName"
                type="text"
                required
                minLength={2}
                maxLength={200}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                placeholder="Dr. Jane Smith"
                style={inputStyle}
              />
            </Field>

            <Field label="Clinic name" htmlFor="clinicName">
              <input
                id="clinicName"
                type="text"
                required
                minLength={2}
                maxLength={200}
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                autoComplete="organization"
                placeholder="Greenwood Vets"
                style={inputStyle}
              />
            </Field>

            {planCode && (
              <div
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--salvia-text-muted)',
                  padding: '0.75rem',
                  borderRadius: 'var(--salvia-radius-base)',
                  backgroundColor: 'rgba(15, 23, 42, 0.04)',
                }}
              >
                Selected plan: <code>{planCode}</code>. You'll be sent to Stripe to add a payment method.
                We won't charge until your 14-day trial ends — cancel anytime before then.
              </div>
            )}

            {checkoutCanceled && !error && (
              <div
                role="status"
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--salvia-primary)',
                  padding: '0.75rem',
                  borderRadius: 'var(--salvia-radius-base)',
                  backgroundColor: 'rgba(245, 158, 11, 0.12)',
                }}
              >
                Checkout canceled — your details are still here, click continue to try again.
              </div>
            )}

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
              {submitting
                ? planCode
                  ? 'Redirecting to checkout…'
                  : 'Setting up…'
                : planCode
                  ? 'Continue to checkout'
                  : 'Continue to Salvia'}
            </button>

            <p style={{ fontSize: '0.8rem', color: 'var(--salvia-text-muted)', textAlign: 'center' }}>
              By continuing you agree to our Terms and Privacy Policy.{' '}
              <Link to="/pricing" style={{ color: 'var(--salvia-accent)', fontWeight: 600 }}>
                Compare plans
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
