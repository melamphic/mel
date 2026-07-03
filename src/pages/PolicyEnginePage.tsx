import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

const FEATURES = [
  {
    title: 'Policy mapped to regulatory codes',
    desc: 'Tag each policy clause as legally enforceable and link it directly to a CQC regulation, VMR section, or GDC standard. Staff see the mandate behind every protocol — not just the rule.',
  },
  {
    title: 'Active staff attestation',
    desc: 'Policies aren\'t read once at onboarding. Staff attest to each relevant policy on a schedule. Every attestation is timestamped and auditable — "didn\'t know" is no longer a defence.',
  },
  {
    title: 'Point-of-care policy search',
    desc: 'Staff query your internal policies from the consult room. "What\'s our protocol for dispensing tramadol without a physical exam?" — answered from your own documents, not Google.',
  },
  {
    title: 'Retirement and version events',
    desc: 'When a policy is retired, every linked form and protocol is flagged. A Major Version Event requires a principal signature before practice continues on the affected area.',
  },
  {
    title: 'Regulatory framework mirror',
    desc: 'Salvia maps your policy set against CQC, VMR, RCVS PSS, and GDC requirements and shows you the gaps. Not a checklist — a live coverage map.',
  },
  {
    title: 'Incident-to-policy linking',
    desc: 'When an incident is logged, Salvia surfaces the relevant policy — was there a protocol for this? Was it followed? The link between incident and governance is visible and auditable.',
  },
];

const USE_CASES = [
  { label: 'New staff onboarding', desc: 'Required policies queued for attestation on first login. Done before they see their first patient.' },
  { label: 'CQC inspection prep', desc: 'Generate a coverage report: which CQC regulations your policies address, and which have no policy mapped.' },
  { label: 'Policy update rollout', desc: 'Update a policy, trigger re-attestation for all relevant staff. Completion tracked and logged.' },
  { label: 'Complaint response', desc: 'Pull the full governance picture for an incident — policies in effect at the time, attestation records, any gaps.' },
];

export const PolicyEnginePage = () => {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <SEO
        title="Institutional Compliance Hub"
        description="Turn static policy PDFs into active clinical governance. Salvia maps your internal rules to CQC, VMR, and GDC frameworks — every staff action backed by an auditable mandate."
        path="/products/institutional-compliance-hub"
        keywords={['clinical governance software', 'CQC compliance', 'VMR compliance', 'policy management veterinary', 'institutional compliance', 'GDC policy management']}
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
                backgroundColor: 'rgba(99,102,241,0.07)', border: '1.5px solid rgba(99,102,241,0.2)',
                borderRadius: 'var(--radius-md)', padding: '0.35rem 0.85rem', marginBottom: '1.75rem',
              }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 800, color: '#6366F1', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Institutional Compliance Hub</span>
              </div>
              <h1 style={{
                fontSize: 'var(--text-display)', fontWeight: 800,
                letterSpacing: '-0.04em', lineHeight: 1.05,
                color: 'var(--salvia-primary)', marginBottom: '1.5rem',
              }}>
                A policy no one reads is a liability.
              </h1>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
                Most practices have policies. Almost none can prove their staff have read them, understand them, or follow them. Salvia turns your static PDF manuals into active governance — mapped to regulatory codes, attested by staff, and auditable on demand.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link to="/start" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  backgroundColor: '#6366F1', color: '#fff',
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

            {/* Visual — policy coverage */}
            <div style={{
              backgroundColor: '#fff', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-3)',
              overflow: 'hidden',
            }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#6366F1' }} />
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--salvia-text-muted)' }}>Policy coverage — CQC Regulation 17</span>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { policy: 'Clinical Records Policy v2.1', status: 'Mapped', attested: '12/12 staff', color: '#10B981' },
                  { policy: 'Controlled Drug Protocol v1.4', status: 'Mapped', attested: '11/12 staff', color: '#10B981' },
                  { policy: 'Consent & Capacity Policy v1.0', status: 'Gap flagged', attested: '6/12 staff', color: '#F59E0B' },
                  { policy: 'Incident Reporting Procedure', status: 'No policy', attested: '—', color: '#EF4444' },
                ].map((p, i) => (
                  <div key={i} style={{
                    padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)',
                    border: `1px solid ${p.color}22`,
                    backgroundColor: `${p.color}08`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--salvia-primary)', flex: 1 }}>{p.policy}</span>
                      <span style={{ fontSize: 'var(--text-2xs)', fontWeight: 800, color: p.color, whiteSpace: 'nowrap' }}>{p.status}</span>
                    </div>
                    <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--salvia-text-muted)', marginTop: '0.25rem' }}>Attested: {p.attested}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: 'var(--section-pad) 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="eyebrow" style={{ color: '#6366F1', marginBottom: '0.75rem' }}>What it does</div>
            <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              Active governance, not a filing cabinet.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="mobile-stack">
            {FEATURES.map((f, i) => (
              <div key={i} style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', backgroundColor: '#FAFBFC' }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--salvia-primary)', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section style={{ padding: 'var(--section-pad) 0', backgroundColor: 'var(--salvia-bg)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="eyebrow" style={{ color: '#6366F1', marginBottom: '0.75rem' }}>Where it pays off</div>
            <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              The four moments it matters most.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }} className="mobile-stack">
            {USE_CASES.map((u, i) => (
              <div key={i} style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', backgroundColor: '#fff' }}>
                <div className="eyebrow" style={{ color: '#6366F1', marginBottom: '0.75rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--salvia-primary)', marginBottom: '0.5rem' }}>{u.label}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'var(--section-pad) 0', backgroundColor: '#fff', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '580px' }}>
          <div className="eyebrow" style={{ color: '#6366F1', marginBottom: '1rem' }}>Get started</div>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Governance you can prove.
          </h2>
          <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
            Book a 20-minute demo to see how the compliance hub works in a real practice setting.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/start" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: '#6366F1', color: '#fff',
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
