import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { SixYearTest } from '../components/SixYearTest';
import { CaptureModes } from '../components/CaptureModes';

// /hospitals — the page for medical directors, quality heads and owners.
// Story: your HMIS runs the business; Salvia is the evidence layer on top.
// Closes with the 6-year test and a custom-plan CTA.

const HMIS_ROWS = [
  { system: 'Your HMIS / HIMS', does: 'Billing, ADT, pharmacy stock, lab orders, appointments', misses: 'What was said, decided and consented in the room' },
  { system: 'Your EMR fields', does: 'Diagnosis codes, prescriptions, discharge summaries', misses: 'The clinical reasoning that defends a decision years later' },
  { system: 'Salvia', does: 'Verified, sealed record of every encounter — notes, consent, drug entries, incidents — with the original audio attached', misses: '' },
];

const NABH_POINTS = [
  { stat: '62%', label: 'of NABH non-compliances can only be fixed by creating or revising documentation — it is the dominant audit gap (BMC Health Services Research, 2026)' },
  { stat: '+10%', label: 'higher PM-JAY package rates at the Silver quality tier — NABH Entry-Level qualifies you (Gold at +15% with full NABH)' },
  { stat: '3–6 mo', label: 'typical prep-to-certificate timeline — mostly spent producing the documentation evidence assessors ask for' },
];

export const HospitalsPage = () => {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <SEO
        title="Evidence & Compliance Platform for Indian Hospitals"
        description="Your HMIS bills and schedules — it was never built to defend you. Salvia sits on top: every consult becomes a clinician-verified, sealed record you can produce when a complaint arrives. NABH-ready by default."
        path="/hospitals"
        keywords={['hospital compliance software India', 'medical records software hospital', 'NABH documentation software', 'HMIS evidence layer', 'medical negligence defence records', 'hospital audit trail software']}
      />
      <Header />
      <main style={{ flex: 1, zIndex: 10 }}>

        {/* Hero */}
        <section style={{ padding: '11rem 0 4rem', backgroundColor: 'var(--salvia-bg)' }}>
          <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
            <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
              For hospitals
            </span>
            <h1 style={{
              fontSize: 'var(--text-display)', fontWeight: 800,
              letterSpacing: '-0.035em', lineHeight: 1.08,
              color: 'var(--salvia-primary)', margin: '0 0 1.5rem',
            }}>
              Your HMIS was never built<br />to defend you.
            </h1>
            <p style={{
              fontSize: 'var(--text-md)', color: 'var(--salvia-text-muted)',
              lineHeight: 1.65, maxWidth: '640px', margin: '0 auto 2.5rem',
            }}>
              It bills, schedules and manages stock. But when a complaint arrives about a patient
              treated years ago, the question is different: <em>what exactly happened, and can you
              prove it?</em> Salvia is the evidence layer that sits on top of whatever you run —
              every encounter captured, clinician-verified, policy-checked and sealed.
            </p>
            <div style={{ display: 'flex', gap: '0.9rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/start" style={{
                backgroundColor: 'var(--salvia-primary)', color: '#fff',
                fontWeight: 700, fontSize: 'var(--text-base)',
                padding: '0.95rem 2rem', borderRadius: 'var(--salvia-radius-full)',
                textDecoration: 'none', boxShadow: 'var(--shadow-2)',
              }}>
                Talk to us
              </Link>
              <Link to="/pricing" style={{
                backgroundColor: 'var(--salvia-surface)', color: 'var(--salvia-primary)',
                fontWeight: 700, fontSize: 'var(--text-base)',
                padding: '0.95rem 2rem', borderRadius: 'var(--salvia-radius-full)',
                textDecoration: 'none', border: '1px solid var(--border-strong)',
              }}>
                See pricing
              </Link>
            </div>
          </div>
        </section>

        {/* HMIS vs evidence layer */}
        <section className="section">
          <div className="container container--content">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>On top, not instead</span>
              <h2 style={{
                fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: '-0.03em',
                lineHeight: 1.1, color: 'var(--salvia-primary)', margin: 0,
              }}>
                Keep your HMIS. Add the layer it's missing.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {HMIS_ROWS.map((r) => (
                <div key={r.system} className="mobile-stack" style={{
                  display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: '1.5rem',
                  padding: '1.5rem 1.75rem',
                  backgroundColor: r.system === 'Salvia' ? 'rgba(255,78,0,0.04)' : '#fff',
                  border: `1px solid ${r.system === 'Salvia' ? 'rgba(255,78,0,0.2)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-lg)',
                }}>
                  <div style={{ fontWeight: 800, color: r.system === 'Salvia' ? 'var(--salvia-accent)' : 'var(--salvia-primary)', fontSize: 'var(--text-base)' }}>
                    {r.system}
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--salvia-text-muted)', lineHeight: 1.55 }}>
                    {r.does}
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: r.misses ? 'var(--salvia-error)' : 'var(--salvia-success)', lineHeight: 1.55, fontWeight: 600 }}>
                    {r.misses ? `Doesn't hold: ${r.misses}` : 'That gap is the product.'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capture modes — OPD + IP */}
        <CaptureModes />

        {/* NABH math */}
        <section className="section" style={{ backgroundColor: 'var(--salvia-bg)' }}>
          <div className="container container--content">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>The NABH math</span>
              <h2 style={{
                fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: '-0.03em',
                lineHeight: 1.1, color: 'var(--salvia-primary)', margin: 0,
              }}>
                Documentation is the audit.
              </h2>
            </div>
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
              {NABH_POINTS.map((p) => (
                <div key={p.stat} style={{
                  backgroundColor: '#fff', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)', padding: '1.75rem',
                  boxShadow: 'var(--shadow-2)',
                }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--salvia-accent)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.6rem' }}>
                    {p.stat}
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--salvia-text-muted)', lineHeight: 1.6, margin: 0 }}>
                    {p.label}
                  </p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: 'var(--text-sm)', color: 'var(--salvia-text-muted)' }}>
              Salvia keeps the records side of NABH ready as a by-product of daily work —{' '}
              <Link to="/blog/nabh-small-clinic-worth-it" style={{ color: 'var(--salvia-accent)', fontWeight: 700 }}>
                the honest breakdown
              </Link>.
            </p>
          </div>
        </section>

        {/* Worst-day closer */}
        <SixYearTest />

        {/* CTA */}
        <section style={{ padding: '4rem 0 7rem' }}>
          <div className="container" style={{ maxWidth: '760px', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: '-0.03em',
              color: 'var(--salvia-primary)', margin: '0 0 1rem',
            }}>
              Hospitals run on custom plans.
            </h2>
            <p style={{ fontSize: 'var(--text-md)', color: 'var(--salvia-text-muted)', lineHeight: 1.6, margin: '0 0 2rem' }}>
              Volume-based, per-note pricing with committed minimums — not per-seat. Tell us your
              bed count and monthly OPD volume; we'll come back with numbers.
            </p>
            <Link to="/start" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: 'var(--salvia-accent)', color: '#fff',
              padding: '0.95rem 2.1rem', borderRadius: 'var(--salvia-radius-full)',
              fontWeight: 700, fontSize: 'var(--text-base)', textDecoration: 'none',
            }}>
              Start the conversation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};
