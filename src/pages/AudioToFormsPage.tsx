import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

const FEATURES = [
  {
    title: 'Voice note → structured record',
    desc: 'Leave a voice note after each consult. Salvia maps the audio to every required field — history, exam findings, assessment, plan, drugs administered — with a contemporaneous timestamp.',
  },
  {
    title: 'Weight-traced drug doses',
    desc: 'Every drug dose in the record traces back to the patient weight recorded at that visit. If the weight and dose don\'t align, Salvia flags it before you sign.',
  },
  {
    title: 'Controlled drug register auto-populated',
    desc: 'When a controlled drug is documented in the clinical record, the Schedule 3 register entry is created automatically — date, patient, drug, dose, route, administering clinician, running balance.',
  },
  {
    title: 'Consent captured in the workflow',
    desc: 'Written consent templates for surgical, anaesthetic, and euthanasia procedures. Cost estimate signed before treatment begins. All locked to the record.',
  },
  {
    title: 'Zero-hallucination extraction',
    desc: 'Salvia doesn\'t invent fields it didn\'t hear. Missing vitals are flagged, not filled with "WNL". You sign what was captured, not what the AI guessed.',
  },
  {
    title: 'Audit-ready on submission',
    desc: 'Once signed, the record is immutable. Every edit after signing creates a versioned addendum with reason and timestamp — the way regulators expect corrections to work.',
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Consult ends', desc: 'You step away from the patient. Takes 30–90 seconds.' },
  { step: '02', title: 'Voice note', desc: 'Speak naturally — what you found, what you gave, what you told the owner. No template to fill.' },
  { step: '03', title: 'Salvia maps the fields', desc: 'Audio is transcribed and mapped to the structured record. Drug entries flow to the register. Gaps are flagged.' },
  { step: '04', title: 'You review and sign', desc: 'Glance over the populated record, correct anything, sign. Done. The record is locked and audit-ready.' },
];

const FRAMEWORKS = ['RCVS PSS', 'VCNZ 2024 Code', 'VMR UK', 'VPB VIC/NSW', 'AVA Code', 'CMA Sep 2026'];

export const AudioToFormsPage = () => {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <SEO
        title="Point-of-Care Evidence Capture"
        description="Voice note after each consult — Salvia maps audio directly to compliance-grade clinical records, controlled drug logs, and audit trails. No manual charting, no memory gaps."
        path="/products/point-of-care-evidence"
        keywords={['veterinary clinical records', 'voice to clinical notes', 'controlled drug records', 'CMA compliance vets', 'RCVS records', 'VCNZ records']}
      />
      <Header />

      {/* Hero */}
      <section style={{ padding: '11rem 0 7rem', backgroundColor: 'var(--salvia-bg)', borderBottom: '1px solid #F1F5F9' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="mobile-stack">
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                backgroundColor: 'rgba(16,185,129,0.07)', border: '1.5px solid rgba(16,185,129,0.2)',
                borderRadius: '10px', padding: '0.35rem 0.85rem', marginBottom: '1.75rem',
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Point-of-Care Evidence</span>
              </div>
              <h1 style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.75rem)', fontWeight: 900,
                letterSpacing: '-0.04em', lineHeight: 1.05,
                color: 'var(--salvia-primary)', marginBottom: '1.5rem',
              }}>
                Voice note in.<br />Audit-ready record out.
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
                The #1 cause of audit failure is delayed documentation. Notes written hours after the consult lose accuracy and lose cases. Salvia captures at the point of care — structured, contemporaneous, defensible.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link to="/start" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  backgroundColor: '#10B981', color: '#fff',
                  padding: '0.85rem 1.75rem', borderRadius: '12px',
                  fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
                }}>
                  Book a demo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link to="/veterinary" style={{
                  display: 'inline-flex', alignItems: 'center',
                  backgroundColor: 'transparent', color: 'var(--salvia-primary)',
                  padding: '0.85rem 1.75rem', borderRadius: '12px',
                  fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
                  border: '1.5px solid rgba(15,23,42,0.15)',
                }}>
                  Vet compliance guide
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div style={{
              backgroundColor: '#fff', borderRadius: '24px',
              border: '1px solid #EEF2F6',
              boxShadow: '0 20px 60px rgba(15,23,42,0.07)',
              overflow: 'hidden',
            }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--salvia-text-muted)' }}>Salvia — Evidence Capture</span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                {[
                  { label: 'Patient', value: 'Max · Labrador · 6yo M/N · 28.4 kg' },
                  { label: 'Presenting complaint', value: 'Vomiting × 3 days, reduced appetite' },
                  { label: 'Temperature', value: '38.6 °C' },
                  { label: 'Pulse', value: '88 bpm' },
                  { label: 'Assessment', value: 'Dietary gastroenteritis — no haematemesis' },
                  { label: 'Treatment', value: 'Metronidazole 15mg/kg PO BID × 5 days' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.6rem 0', borderBottom: i < 5 ? '1px solid #F8FAFC' : 'none' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--salvia-text-muted)', minWidth: '140px', flexShrink: 0 }}>{row.label}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--salvia-primary)', fontWeight: 500 }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ marginTop: '1rem', padding: '0.65rem 1rem', backgroundColor: 'rgba(16,185,129,0.07)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981' }}>Record signed · locked · audit-ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section style={{ padding: '2rem 0', backgroundColor: '#fff', borderBottom: '1px solid #F1F5F9' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--salvia-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Satisfies</span>
            {FRAMEWORKS.map(f => (
              <span key={f} style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--salvia-primary)', opacity: 0.6 }}>{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '7rem 0', backgroundColor: 'var(--salvia-bg)', borderBottom: '1px solid #F1F5F9' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#10B981', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>The workflow</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              From consult to signed record in under 2 minutes.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="mobile-stack">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 900, color: '#10B981', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>{step.step}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--salvia-primary)', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
                {i < 3 && (
                  <div style={{
                    position: 'absolute', top: '0.5rem', right: '-1rem',
                    color: '#CBD5E1', fontSize: '1.25rem', fontWeight: 300,
                  }} className="hide-mobile">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '7rem 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#10B981', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>What's captured</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              Every field an inspector looks for.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="mobile-stack">
            {FEATURES.map((f, i) => (
              <div key={i} style={{ padding: '2rem', borderRadius: '16px', border: '1px solid #EEF2F6', backgroundColor: '#FAFBFC' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--salvia-primary)', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stat callout */}
      <section style={{ padding: '5rem 0', backgroundColor: 'rgba(16,185,129,0.04)', borderTop: '1px solid rgba(16,185,129,0.1)', borderBottom: '1px solid rgba(16,185,129,0.1)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', textAlign: 'center' }} className="mobile-stack">
            {[
              { stat: '< 2 min', label: 'Average time from voice note to signed record' },
              { stat: '100%', label: 'Required fields captured before record can be signed' },
              { stat: '0', label: 'Fields invented by AI — gaps are flagged, not fabricated' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10B981', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>{s.stat}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--salvia-text-muted)', lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '7rem 0', backgroundColor: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '580px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#10B981', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Get started</div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Audit-ready records, from day one.
          </h2>
          <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
            Book a 20-minute demo. We'll show you the voice-to-record workflow in a real clinical setting.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/start" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: '#10B981', color: '#fff',
              padding: '0.85rem 1.75rem', borderRadius: '12px',
              fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
            }}>
              Book a demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link to="/pricing" style={{
              display: 'inline-flex', alignItems: 'center',
              backgroundColor: 'transparent', color: 'var(--salvia-primary)',
              padding: '0.85rem 1.75rem', borderRadius: '12px',
              fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
              border: '1.5px solid rgba(15,23,42,0.15)',
            }}>
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
