import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

const FAQS = [
  {
    q: 'Does Salvia meet CQC requirements for aged care and care homes?',
    a: 'Yes. Salvia structures clinical records to satisfy CQC Regulation 17 and Regulation 9 (person-centred care) — contemporaneous notes, medication administration records, incident trails, and care plan documentation all captured and audit-ready.',
  },
  {
    q: 'How does it handle medication administration records (MAR)?',
    a: 'Controlled and prescribed medications are logged at the point of administration — drug, dose, route, time, administering clinician. MAR sheets are generated from the record rather than maintained separately, eliminating transcription errors.',
  },
  {
    q: 'Can it track incidents and safeguarding events?',
    a: 'Yes. Incidents, falls, near-misses, and safeguarding events each have a structured record type. The trail is immutable — date, time, reporter, actions taken, and escalation steps are all locked in on submission.',
  },
  {
    q: 'Does it work for both residential and domiciliary care?',
    a: 'Yes. The workflow is the same whether care is delivered in a residential setting or at home — voice note after each visit, mapped to a structured record with the required clinical and safeguarding fields.',
  },
];

const FEATURES = [
  { title: 'Medication administration records', desc: 'Drug, dose, route, time logged at point of care. MAR generated from the record — no separate paper sheet.' },
  { title: 'Incident and fall reporting', desc: 'Structured incident records: event, witnesses, injuries, actions taken, escalation. Immutable once submitted.' },
  { title: 'Care plan documentation', desc: 'Person-centred care plans linked to daily records. Changes versioned and signed — auditable trail of every update.' },
  { title: 'Contemporaneous timestamps', desc: 'Records timestamped at point of care, not retrospectively. Satisfies CQC Regulation 17 contemporaneous requirement.' },
  { title: 'Safeguarding trails', desc: 'Safeguarding events captured in a dedicated structured record. Escalation steps, referral details, and outcomes all logged.' },
  { title: 'Multi-site and multi-carer support', desc: 'Role-based access for care workers, senior carers, nurses, and managers. Every record signed by the responsible clinician.' },
];

export const AgedCarePage = () => {
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
        title="Aged Care Compliance Software"
        description="Salvia keeps aged care and care home records audit-ready for CQC. Medication administration, incident trails, safeguarding records, and care plans — structured and signed at the point of care."
        path="/aged-care"
        keywords={[
          'aged care compliance software', 'care home records CQC', 'CQC Regulation 17 care home',
          'medication administration records software', 'care home audit trail', 'safeguarding records software',
          'domiciliary care records', 'residential care documentation',
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <Header />

      <section style={{ padding: '11rem 0 7rem', backgroundColor: 'var(--salvia-bg)' }}>
        <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: 'rgba(99,102,241,0.07)', border: '1.5px solid rgba(99,102,241,0.2)',
            borderRadius: '10px', padding: '0.35rem 0.85rem', marginBottom: '2rem',
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366F1', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Aged Care &amp; Care Homes
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 1,
            color: 'var(--salvia-primary)', marginBottom: '1.75rem',
          }}>
            Records CQC can't<br />find fault with.
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--salvia-text-muted)', lineHeight: 1.65,
            maxWidth: '640px', margin: '0 auto 3rem',
          }}>
            CQC Regulation 17. Medication administration. Incidents and safeguarding. Voice note after each visit — Salvia structures the record, signs it, and locks the audit trail.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/start" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: '#6366F1', color: '#fff',
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

      <section style={{ padding: '7rem 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6366F1', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>What Salvia does</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              Every record CQC pulls in an inspection.
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

      <section style={{ padding: '7rem 0', backgroundColor: 'var(--salvia-bg)', borderTop: '1px solid #F1F5F9' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6366F1', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Common questions</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>What care providers ask us</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ padding: '1.75rem 2rem', borderRadius: '14px', border: '1px solid #EEF2F6', backgroundColor: '#fff' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--salvia-primary)', marginBottom: '0.65rem' }}>{faq.q}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--salvia-text-muted)', lineHeight: 1.65, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '7rem 0', backgroundColor: '#fff', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Ready for any CQC inspection.
          </h2>
          <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
            Book a 20-minute demo to see how Salvia works in a care home or domiciliary care setting.
          </p>
          <Link to="/start" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: '#6366F1', color: '#fff',
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
    </div>
  );
};
