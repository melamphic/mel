import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

const FAQS = [
  {
    q: 'Which regulatory frameworks does Salvia support for general practice?',
    a: 'Salvia supports CQC Regulation 17 (UK), AHPRA Medical Board guidelines (Australia), the Medical Council of New Zealand Code of Professional Conduct, and AMC/RACGP standards for clinical record-keeping.',
  },
  {
    q: 'Does it handle controlled drug and prescribing records?',
    a: 'Yes. Every prescription and controlled drug administration is logged with the required fields — drug, dose, route, patient, date, prescribing clinician. Schedule 2 and 3 drugs maintain a running register with witness fields.',
  },
  {
    q: 'How does it handle after-hours and locum documentation?',
    a: 'Locum records are signed by the treating clinician with their own registration number. The practice record shows exactly who saw the patient and when — no ambiguity about authorship for complaints or audits.',
  },
  {
    q: 'Can it be used for multi-GP practices?',
    a: "Yes. Role-based access means each GP signs their own records. Practice managers can view the full practice record set. Each clinician's records are independent and auditable separately.",
  },
];

const FEATURES = [
  { title: 'Voice → clinical note', desc: 'Post-consult voice note maps to structured SOAP record — history, examination, assessment, plan. Contemporaneous timestamp on every entry.' },
  { title: 'Prescribing and drug records', desc: 'Every prescription logged with drug, dose, route, indication. Controlled drug register maintained automatically on administration.' },
  { title: 'Referral and follow-up trail', desc: "Referral sent, referral received, follow-up due — all tracked in the record. No 'lost in the system' defence at a complaints hearing." },
  { title: 'Consent documentation', desc: 'Procedure-specific consent with risk discussion captured and signed. Treatment plan in writing before invasive procedures.' },
  { title: 'Immutable audit trail', desc: 'Every edit, addendum, and version locked with timestamp. Produce a complete encounter record for any complaint or medico-legal request in seconds.' },
  { title: 'CQC and AHPRA ready', desc: 'Record structure satisfies CQC Regulation 17, AHPRA Medical Board guidelines, and MCNZ Code of Professional Conduct contemporaneous record requirements.' },
];

export const GeneralClinicPage = () => {
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
        title="General Practice Compliance Software"
        description="Salvia keeps GP and general clinic records audit-ready for CQC, AHPRA, and MCNZ. Voice note after each consult — structured clinical records, prescribing logs, referral trails, and consent documentation."
        path="/general-practice"
        keywords={[
          'general practice compliance software', 'GP records software', 'CQC general practice',
          'AHPRA medical records', 'MCNZ records', 'clinical documentation GP',
          'general clinic audit trail', 'GP prescribing records',
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <Header />

      <section style={{ padding: '11rem 0 7rem', backgroundColor: 'var(--salvia-bg)' }}>
        <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: 'rgba(245,158,11,0.07)', border: '1.5px solid rgba(245,158,11,0.2)',
            borderRadius: '10px', padding: '0.35rem 0.85rem', marginBottom: '2rem',
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D97706', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              General Practice &amp; Clinics
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 1,
            color: 'var(--salvia-primary)', marginBottom: '1.75rem',
          }}>
            Clinical records that<br />hold up under scrutiny.
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--salvia-text-muted)', lineHeight: 1.65,
            maxWidth: '640px', margin: '0 auto 3rem',
          }}>
            CQC, AHPRA, MCNZ. Voice note after each consult — Salvia structures the clinical record, prescribing log, referral trail, and consent. Audit-ready before you leave the room.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/start" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: '#D97706', color: '#fff',
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
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#D97706', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>What Salvia does</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              Every record a regulator expects to see.
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
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#D97706', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Common questions</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>What general practices ask us</h2>
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
            Defensible records, every consult.
          </h2>
          <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
            Book a 20-minute demo to see how Salvia works in a GP or general clinic workflow.
          </p>
          <Link to="/start" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: '#D97706', color: '#fff',
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
