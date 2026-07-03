import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

const FEATURES = [
  {
    title: 'Immutable record versioning',
    desc: 'Every signed record is locked. Corrections create a versioned addendum with reason, timestamp, and clinician signature — never an overwrite. Exactly how regulators expect edits to work.',
  },
  {
    title: 'Required fields before signing',
    desc: 'Missing vitals, drug doses, or consent entries block submission. The form cannot be signed incomplete. No more "TPR not recorded" citations.',
  },
  {
    title: 'Statutory PDF export',
    desc: 'Every record exports to a high-fidelity PDF — preserving all metadata, version history, and signatures. Satisfies paper audit requirements without paper.',
  },
  {
    title: 'Condition-based logic',
    desc: 'Fields appear or become required based on what\'s been entered. Controlled drug fields appear when a Schedule 3 drug is selected. Consent fields appear for surgical procedures.',
  },
  {
    title: 'Addendum trail',
    desc: 'Every post-sign edit is an addendum — date, clinician, reason for change. The original record is always preserved. Turns a billing correction into a defensible paper trail.',
  },
  {
    title: 'Multi-jurisdiction form sets',
    desc: 'Form templates built to the specific field requirements of RCVS, VCNZ, CQC, GDC, and AHPRA. Switch jurisdiction — the required fields update automatically.',
  },
];

const RECORD_TYPES = [
  { label: 'Clinical consultation', frameworks: 'RCVS · VCNZ · AHPRA' },
  { label: 'Surgical & anaesthetic', frameworks: 'RCVS · VMR · CQC' },
  { label: 'Controlled drug administration', frameworks: 'VMR · VCNZ · VPB' },
  { label: 'Procedure consent', frameworks: 'GDC · CQC · AHPRA' },
  { label: 'Euthanasia record', frameworks: 'RCVS · VCNZ · AVA' },
  { label: 'Incident & complaint log', frameworks: 'CQC · CMA · GDC' },
  { label: 'Discharge & follow-up plan', frameworks: 'RCVS · AHPRA · MCNZ' },
  { label: 'Periodontal & BPE chart', frameworks: 'GDC · CQC · AHPRA' },
];

export const FormEnginePage = () => {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <SEO
        title="Statutory Form Infrastructure"
        description="Salvia's form infrastructure turns clinical notes into immutable, versioned records — audit-ready for CQC, VMR, RCVS, and GDC compliance. Required fields enforced. Addendum trail built in."
        path="/products/statutory-form-infrastructure"
        keywords={['clinical form compliance', 'immutable clinical records', 'dental charting software', 'audit-ready notes', 'CQC records', 'RCVS form requirements']}
      />
      <Header />
      <main style={{ flex: 1, zIndex: 10 }}>

      {/* Hero */}
      <section style={{ padding: '11rem 0 7rem', backgroundColor: 'var(--salvia-bg)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="mobile-stack">
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                backgroundColor: 'rgba(255,78,0,0.07)', border: '1.5px solid rgba(255,78,0,0.18)',
                borderRadius: 'var(--radius-md)', padding: '0.35rem 0.85rem', marginBottom: '1.75rem',
              }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 800, color: 'var(--salvia-accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Statutory Form Infrastructure</span>
              </div>
              <h1 style={{
                fontSize: 'var(--text-display)', fontWeight: 800,
                letterSpacing: '-0.04em', lineHeight: 1.05,
                color: 'var(--salvia-primary)', marginBottom: '1.5rem',
              }}>
                Records that can't be argued with.
              </h1>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
                Immutable from the moment you sign. Every field enforced before submission. Every correction an addendum. Built to the exact structure regulators look for — not a general form tool adapted for clinics.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link to="/start" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  backgroundColor: 'var(--salvia-accent)', color: '#fff',
                  padding: '0.85rem 1.75rem', borderRadius: 'var(--radius-md)',
                  fontWeight: 700, fontSize: 'var(--text-base)', textDecoration: 'none',
                }}>
                  Book a demo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link to="/pricing" style={{
                  display: 'inline-flex', alignItems: 'center',
                  backgroundColor: 'transparent', color: 'var(--salvia-primary)',
                  padding: '0.85rem 1.75rem', borderRadius: 'var(--radius-md)',
                  fontWeight: 700, fontSize: 'var(--text-base)', textDecoration: 'none',
                  border: '1.5px solid var(--border-strong)',
                }}>
                  See pricing
                </Link>
              </div>
            </div>

            {/* Visual — version history */}
            <div style={{
              backgroundColor: '#fff', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-3)',
              overflow: 'hidden',
            }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--salvia-accent)' }} />
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--salvia-text-muted)' }}>Record — Consultation 14 May 2026</span>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { ver: 'v1.0', label: 'Original record signed', time: '14 May · 14:32', locked: true },
                  { ver: 'v1.1', label: 'Addendum: corrected drug dose', time: '14 May · 16:05', locked: true },
                  { ver: 'v1.2', label: 'Addendum: follow-up plan added', time: '15 May · 09:18', locked: true },
                ].map((v, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                    backgroundColor: i === 2 ? 'rgba(255,78,0,0.04)' : '#F8FAFC',
                    border: i === 2 ? '1px solid rgba(255,78,0,0.12)' : '1px solid transparent',
                  }}>
                    <span style={{ fontSize: 'var(--text-2xs)', fontWeight: 800, color: 'var(--salvia-accent)', minWidth: '28px' }}>{v.ver}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--salvia-primary)' }}>{v.label}</div>
                      <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--salvia-text-muted)' }}>{v.time}</div>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                ))}
                <div style={{ padding: '0.65rem 1rem', backgroundColor: 'rgba(255,78,0,0.06)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF4E00" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span style={{ fontSize: 'var(--text-2xs)', fontWeight: 700, color: 'var(--salvia-accent)' }}>Original always preserved · edits never overwrite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Record types */}
      <section style={{ padding: 'var(--section-pad) 0', backgroundColor: '#fff', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>Record types</div>
            <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              Built for every clinical encounter type.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }} className="mobile-stack">
            {RECORD_TYPES.map((r, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)', backgroundColor: '#FAFBFC',
                gap: '1rem',
              }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--salvia-primary)' }}>{r.label}</span>
                <span style={{ fontSize: 'var(--text-2xs)', fontWeight: 600, color: 'var(--salvia-text-muted)', whiteSpace: 'nowrap' }}>{r.frameworks}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: 'var(--section-pad) 0', backgroundColor: 'var(--salvia-bg)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>How it works</div>
            <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              The structure regulators actually look for.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="mobile-stack">
            {FEATURES.map((f, i) => (
              <div key={i} style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', backgroundColor: '#fff' }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--salvia-primary)', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'var(--section-pad) 0', backgroundColor: '#fff', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '580px' }}>
          <div className="eyebrow" style={{ marginBottom: '1rem' }}>Get started</div>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Records that hold up in any inspection.
          </h2>
          <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
            Book a 20-minute demo to see how the form engine works in your clinical setting.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/start" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: 'var(--salvia-accent)', color: '#fff',
              padding: '0.85rem 1.75rem', borderRadius: 'var(--radius-md)',
              fontWeight: 700, fontSize: 'var(--text-base)', textDecoration: 'none',
            }}>
              Book a demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link to="/pricing" style={{
              display: 'inline-flex', alignItems: 'center',
              backgroundColor: 'transparent', color: 'var(--salvia-primary)',
              padding: '0.85rem 1.75rem', borderRadius: 'var(--radius-md)',
              fontWeight: 700, fontSize: 'var(--text-base)', textDecoration: 'none',
              border: '1.5px solid var(--border-strong)',
            }}>
              See pricing
            </Link>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};
