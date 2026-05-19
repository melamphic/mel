import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

const FAQS = [
  {
    q: 'Does Salvia work for UK vets under the CMA remedies?',
    a: 'Yes. Salvia covers the four CMA remedies with direct records implications: itemised billing accuracy, written treatment estimates, controlled drug dispensing transparency, and complaint audit trails. The September 2026 deadline is hard — Salvia gets you there without changing how you see patients.',
  },
  {
    q: 'Does it handle the Schedule 3 controlled drug register?',
    a: 'Yes. Every drug administration flows into the controlled drug register automatically — date, patient, drug, quantity, dose, route, administering vet. Running balance is maintained. The register is audit-ready on demand.',
  },
  {
    q: 'Is it compatible with our existing practice management software?',
    a: 'Salvia sits alongside your PMS — it handles the compliance and governance layer (structured records, drug logs, consent, audit trail) rather than replacing appointment booking or billing.',
  },
  {
    q: 'What regulatory frameworks does it support?',
    a: 'RCVS Practice Standards, VCNZ Code of Professional Conduct (2024), AVA Code of Conduct, VPB requirements for Victoria, NSW and Queensland, and the UK Veterinary Medicines Regulations.',
  },
  {
    q: 'How does the voice note workflow work?',
    a: 'After each consult, you leave a brief voice note — anything from 30 seconds to a few minutes. Salvia maps the audio to a structured clinical record: history, exam findings, assessment, plan, drugs administered. You review and sign. No typing, no templates to fill.',
  },
];

const REGULATORS = [
  { label: 'RCVS', sub: 'UK', color: '#0EA5E9' },
  { label: 'CMA', sub: 'UK', color: '#FF4E00' },
  { label: 'VMR', sub: 'UK', color: '#8B5CF6' },
  { label: 'VCNZ', sub: 'New Zealand', color: '#10B981' },
  { label: 'AVA', sub: 'Australia', color: '#F59E0B' },
  { label: 'VPB', sub: 'Australia', color: '#6366F1' },
];

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    title: 'Voice → structured record',
    desc: 'Post-consult voice note maps to history, exam, assessment, plan, and drug entry. Contemporaneous timestamps built in.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: 'Controlled drug register',
    desc: 'Schedule 2 & 3 entries auto-populated on drug administration. Running balance, witness fields, reconciliation reports.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: 'Procedure-specific consent',
    desc: 'Written consent templates per procedure type — pre-op, dental, euthanasia. Cost estimate captured and signed before treatment.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Immutable audit trail',
    desc: 'Every record version, edit, and signature timestamped and locked. Produce a complete file for any complaint or inspection in seconds.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'CMA September 2026 ready',
    desc: 'Itemised billing maps to clinical record. Written estimates captured before treatment. Complaint trail with full encounter record.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Multi-vet practice support',
    desc: 'Role-based access for principals, associates, nurses, and locums. Each clinician signs their own records with their registration number.',
  },
];

const RECENT_POSTS = [
  { slug: 'cma-vet-deadline', title: 'September 23 2026: which of the 21 CMA remedies does your vet practice actually need to act on?', tag: 'CMA Compliance' },
  { slug: 'rcvs-record-inspection', title: 'What do RCVS Practice Standards assessors actually check in your clinical records?', tag: 'RCVS Standards' },
  { slug: 'vcnz-records-standard', title: "VCNZ's 2024 Code of Professional Conduct — what changed for clinical records?", tag: 'VCNZ Code' },
  { slug: 'au-vet-board-records', title: 'What do Australian vet boards actually cite in complaints?', tag: 'VPB Compliance' },
];

export const VeterinaryPage = () => {
  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <SEO
        title="Veterinary Compliance Software"
        description="Salvia keeps vet practice records audit-ready for RCVS, VCNZ, VPB and CMA. Voice note after each consult — clinical records, controlled drug logs, consent, and audit trail out the other side."
        path="/veterinary"
        keywords={[
          'veterinary compliance software', 'vet records software UK', 'RCVS records', 'CMA vet compliance',
          'controlled drug register vets', 'VCNZ records', 'VPB compliance', 'veterinary audit trail',
          'vet clinical documentation', 'veterinary governance software',
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <Header />

      {/* Hero */}
      <section style={{ padding: '11rem 0 7rem', backgroundColor: 'var(--salvia-bg)' }}>
        <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: 'rgba(255,78,0,0.07)', border: '1.5px solid rgba(255,78,0,0.18)',
            borderRadius: '10px', padding: '0.35rem 0.85rem', marginBottom: '2rem',
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF4E00', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Veterinary Practices
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 1,
            color: 'var(--salvia-primary)', marginBottom: '1.75rem',
          }}>
            Records that survive<br />any inspection.
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--salvia-text-muted)', lineHeight: 1.65,
            maxWidth: '640px', margin: '0 auto 3rem',
          }}>
            RCVS PSS. VCNZ 2024 Code. CMA September 2026 deadline. One voice note after each consult — Salvia handles the structured record, controlled drug log, consent, and audit trail.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/start" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: 'var(--salvia-accent)', color: '#fff',
              padding: '0.85rem 1.75rem', borderRadius: '12px',
              fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
            }}>
              Book a demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link to="/pricing" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
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

      {/* Regulators rail */}
      <section style={{ borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9', padding: '2rem 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--salvia-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Designed for
            </span>
            {REGULATORS.map(r => (
              <div key={r.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem' }}>
                <span style={{ fontSize: '1rem', fontWeight: 900, color: r.color, letterSpacing: '-0.02em' }}>{r.label}</span>
                <span style={{ fontSize: '0.62rem', fontWeight: 600, color: 'var(--salvia-text-muted)', letterSpacing: '0.04em' }}>{r.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CMA deadline callout */}
      <section style={{ padding: '5rem 0', backgroundColor: 'rgba(255,78,0,0.03)', borderBottom: '1px solid rgba(255,78,0,0.08)' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'center',
          }} className="mobile-stack">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#FF4E00', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>CMA Deadline</div>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--salvia-primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>23 Sep</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--salvia-primary)' }}>2026</div>
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--salvia-primary)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                21 mandatory CMA remedies are legally binding from September.
              </h2>
              <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                Most practices have ticked the price list box. The four remedies with direct records implications — itemised billing, written estimates, controlled drug transparency, and complaint trail — are where practices will be caught. Salvia covers all four.
              </p>
              <Link to="/blog/cma-vet-deadline" style={{
                fontSize: '0.85rem', fontWeight: 700, color: 'var(--salvia-accent)',
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none',
              }}>
                Read the full breakdown
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section style={{ padding: '7rem 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--salvia-accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              What Salvia does
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              Every record element an inspector looks for.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="mobile-stack">
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                padding: '2rem', borderRadius: '16px',
                border: '1px solid #EEF2F6', backgroundColor: '#FAFBFC',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  backgroundColor: 'rgba(255,78,0,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--salvia-accent)', marginBottom: '1.25rem',
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--salvia-primary)', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section style={{ padding: '7rem 0', backgroundColor: 'var(--salvia-bg)', borderTop: '1px solid #F1F5F9' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--salvia-accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Common questions
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              What vet practices ask us
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{
                padding: '1.75rem 2rem', borderRadius: '14px',
                border: '1px solid #EEF2F6', backgroundColor: '#fff',
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--salvia-primary)', marginBottom: '0.65rem' }}>{faq.q}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--salvia-text-muted)', lineHeight: 1.65, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog links */}
      <section style={{ padding: '6rem 0', backgroundColor: '#fff', borderTop: '1px solid #F1F5F9' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--salvia-accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>From the compliance desk</div>
            <Link to="/blog" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--salvia-text-muted)', textDecoration: 'none' }}>All posts →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} className="mobile-stack">
            {RECENT_POSTS.map(p => (
              <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }} className="vet-blog-card">
                <div style={{
                  padding: '1.5rem', borderRadius: '14px',
                  border: '1px solid #EEF2F6', backgroundColor: '#FAFBFC',
                  height: '100%', transition: 'all 0.2s ease',
                }}>
                  <div style={{
                    fontSize: '0.65rem', fontWeight: 800, color: 'var(--salvia-accent)',
                    backgroundColor: 'rgba(255,78,0,0.07)', padding: '0.2rem 0.55rem',
                    borderRadius: '5px', display: 'inline-block',
                    letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem',
                  }}>
                    {p.tag}
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--salvia-primary)', lineHeight: 1.4, margin: 0 }}>
                    {p.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '7rem 0', backgroundColor: 'var(--salvia-bg)', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--salvia-accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Get started
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Audit-ready records, from day one.
          </h2>
          <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
            See how Salvia works in a real vet practice workflow — no slides, no pitch. Book a 20-minute demo.
          </p>
          <Link to="/start" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: 'var(--salvia-accent)', color: '#fff',
            padding: '0.9rem 2rem', borderRadius: '12px',
            fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
          }}>
            Book a demo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />

      <style>{`
        .vet-blog-card:hover > div {
          border-color: rgba(255,78,0,0.2);
          background-color: rgba(255,78,0,0.015);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(15,23,42,0.05);
        }
      `}</style>
    </div>
  );
};
