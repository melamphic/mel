import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

const FAQS = [
  {
    q: 'Does Salvia meet CQC Regulation 17 requirements for dental practices?',
    a: 'Yes. Salvia structures records to include the elements CQC inspectors check: medical history review at every appointment, BPE scoring, soft tissue examination, radiograph justification, and written treatment plans signed before treatment begins.',
  },
  {
    q: 'Does it capture BPE scores and periodontal records?',
    a: 'Yes. BPE scoring is a required field in every examination record — it cannot be skipped before the note is saved. Six-point pocket depths are captured for patients with identified periodontal disease.',
  },
  {
    q: 'What about radiograph justification for CQC and ARPANSA compliance?',
    a: 'Every radiograph requires a documented justification — clinical indication, patient history, and decision rationale — at the time of exposure. The record produces an ARPANSA-compliant justification trail automatically.',
  },
  {
    q: 'Does it work for AHPRA and the Australian Dental Board?',
    a: "Yes. Salvia's records meet Dental Board of Australia guidelines: contemporaneous notes, medical history reviewed at every visit, treatment plans in writing with costs documented before treatment, and a complete radiograph audit trail.",
  },
  {
    q: 'How does the consent workflow work for treatment plans?',
    a: 'Salvia generates a written treatment plan with itemised costs before the treatment appointment. The patient signs digitally. The signed plan, cost estimate, and date are locked into the record — exactly what GDC Standard 4 and AHPRA require.',
  },
];

const REGULATORS = [
  { label: 'CQC', sub: 'UK', color: '#0EA5E9' },
  { label: 'GDC', sub: 'UK', color: '#FF4E00' },
  { label: 'AHPRA', sub: 'Australia', color: '#10B981' },
  { label: 'ARPANSA', sub: 'Australia', color: '#F59E0B' },
  { label: 'NZDA', sub: 'New Zealand', color: '#8B5CF6' },
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
    title: 'Voice → dental chart',
    desc: 'Post-consult voice note maps to examination findings, BPE, STE, treatment notes. Contemporaneous timestamp on every record.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: 'BPE required at every exam',
    desc: 'BPE cannot be skipped before saving a check-up record. CQC finds missing BPE in the majority of "requires improvement" dental inspections.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Soft tissue exam records',
    desc: 'STE result is a required field per check-up. Every record shows oral cancer screening was performed — critical in malpractice cases involving late diagnosis.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    title: 'Radiograph justification',
    desc: 'Clinical indication logged per exposure. ARPANSA-compliant justification trail. Produces documentation for any "unnecessary X-ray" complaint.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: 'Written treatment plans',
    desc: 'Itemised treatment plan with costs generated before treatment. Patient signs digitally. Satisfies GDC Standard 4 and AHPRA consent requirements.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Medical history at every visit',
    desc: 'System prompts medical history review at appointment start. Review date locked to the record. CQC finds this missing in most sampled charts.',
  },
];

const RECENT_POSTS = [
  { slug: 'cqc-dental-2026', title: 'CQC dental inspection 2026 — what Regulation 17 actually requires in your clinical notes', tag: 'CQC Inspection' },
  { slug: 'ahpra-dental-records', title: 'AHPRA dental complaints are records-first — is your charting defensible?', tag: 'AHPRA' },
  { slug: 'malpractice-dental', title: "Missed a perio pocket two years ago — patient now has bone loss. How do I defend my charting?", tag: 'Malpractice' },
  { slug: 'signed-edits-dental', title: "Billed the wrong CDT code on a signed note — how do I fix it without looking dodgy?", tag: 'Corrections' },
];

export const DentalPage = () => {
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
        title="Dental Compliance Software"
        description="Salvia keeps dental practice records audit-ready for CQC, GDC, and AHPRA. BPE, STE, radiograph justification, and treatment plans captured at every visit — no inspection catches you off guard."
        path="/dental"
        keywords={[
          'dental compliance software', 'CQC dental records', 'GDC records requirements',
          'AHPRA dental compliance', 'dental charting software', 'BPE recording software',
          'radiograph justification dental', 'dental audit trail', 'dental governance software',
          'CQC Regulation 17 dental',
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <Header />

      {/* Hero */}
      <section style={{ padding: '11rem 0 7rem', backgroundColor: 'var(--salvia-bg)' }}>
        <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: 'rgba(5,150,105,0.07)', border: '1.5px solid rgba(5,150,105,0.2)',
            borderRadius: '10px', padding: '0.35rem 0.85rem', marginBottom: '2rem',
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Dental Practices
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 1,
            color: 'var(--salvia-primary)', marginBottom: '1.75rem',
          }}>
            Every field CQC<br />looks for, captured.
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--salvia-text-muted)', lineHeight: 1.65,
            maxWidth: '640px', margin: '0 auto 3rem',
          }}>
            CQC Regulation 17. GDC Standards. AHPRA Dental Board guidelines. Voice note after each consult — BPE, STE, radiograph justification, treatment plan, and audit trail all handled.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact-sales" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: '#059669', color: '#fff',
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

      {/* CQC callout */}
      <section style={{ padding: '5rem 0', backgroundColor: 'rgba(5,150,105,0.03)', borderBottom: '1px solid rgba(5,150,105,0.08)' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'center' }} className="mobile-stack">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>CQC Finding</div>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--salvia-primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>9/20</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--salvia-text-muted)', marginTop: '0.25rem' }}>records missing BPE</div>
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--salvia-primary)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                CQC finds BPE missing in nearly half of sampled records.
              </h2>
              <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                In a typical "requires improvement" inspection, 9 of 20 records are missing BPE scores, 11 lack written treatment plans, and 7 have no radiograph reporting. These aren't complex clinical failures — they're missing fields. Salvia makes them required.
              </p>
              <Link to="/blog/cqc-dental-2026" style={{
                fontSize: '0.85rem', fontWeight: 700, color: '#059669',
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none',
              }}>
                Read the CQC inspection breakdown
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
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              What Salvia does
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              Every required field, every time.
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
                  backgroundColor: 'rgba(5,150,105,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#059669', marginBottom: '1.25rem',
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
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Common questions
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              What dental practices ask us
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
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', letterSpacing: '0.12em', textTransform: 'uppercase' }}>From the compliance desk</div>
            <Link to="/blog" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--salvia-text-muted)', textDecoration: 'none' }}>All posts →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} className="mobile-stack">
            {RECENT_POSTS.map(p => (
              <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }} className="dental-blog-card">
                <div style={{
                  padding: '1.5rem', borderRadius: '14px',
                  border: '1px solid #EEF2F6', backgroundColor: '#FAFBFC',
                  height: '100%', transition: 'all 0.2s ease',
                }}>
                  <div style={{
                    fontSize: '0.65rem', fontWeight: 800, color: '#059669',
                    backgroundColor: 'rgba(5,150,105,0.07)', padding: '0.2rem 0.55rem',
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
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Get started
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Pass your next inspection, first time.
          </h2>
          <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
            See how Salvia works in a real dental practice — no slides, no pitch. Book a 20-minute demo.
          </p>
          <Link to="/contact-sales" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: '#059669', color: '#fff',
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
        .dental-blog-card:hover > div {
          border-color: rgba(5,150,105,0.2);
          background-color: rgba(5,150,105,0.015);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(15,23,42,0.05);
        }
      `}</style>
    </div>
  );
};
