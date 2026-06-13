import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import {
  WorkflowSection,
  StatsBar,
  BeforeAfter,
  HonestScope,
  PricingTeaser,
} from '../components/VerticalSections';
import { ALLIED_DISCIPLINES } from '../data/alliedDisciplines';

const ACCENT = '#0891B2';
const ACCENT_SOFT = 'rgba(8,145,178,0.07)';

const COUNTRY_GROUPS = [
  {
    code: 'IN',
    label: 'India',
    accent: '#0891B2',
    note: 'NCAHP statutory register; RCI registration for rehabilitation professionals.',
  },
  {
    code: 'IN',
    label: 'India',
    accent: '#FF4E00',
    note: 'NCAHP profession councils for physio, OT, podiatry; RCI for audiology & speech-language pathology.',
  },
  {
    code: 'IN',
    label: 'India',
    accent: '#F59E0B',
    note: 'State Allied & Healthcare Councils under NCAHP for physio, OT, osteo, chiro, podiatry.',
  },
  {
    code: 'IN',
    label: 'India',
    accent: '#10B981',
    note: 'NCAHP discipline-specific categories plus RCI for rehabilitation and communication disorders.',
  },
  {
    code: 'IN',
    label: 'India',
    accent: '#6366F1',
    note: 'ABDM-aligned record-keeping and DPDP Act data-protection duties across every discipline.',
  },
];

const FAQS = [
  {
    q: 'Why one umbrella vertical for six disciplines?',
    a: 'Allied health disciplines share the same workflow shape: post-encounter notes, outcome measures, episode-of-care tracking, discharge summary. We deliver the engine once and tune it per discipline with framework-aware AI context. Cleaner for us to ship, simpler for you to buy.',
  },
  {
    q: 'Does it actually know my discipline-specific frameworks?',
    a: 'Yes. Each clinic registers a discipline at onboarding (physio / osteo / chiro / OT / podiatry / SLT) and a country. Salvia loads the matching framework pack (NCAHP record-keeping norms, RCI standards, ABDM record formats etc) into every AI generation. You can adjust the active framework set in settings.',
  },
  {
    q: 'What if my clinic has clinicians from multiple disciplines?',
    a: 'Common in MDT practices. Each clinician is registered with their own discipline and registration number. Their records reflect their discipline-specific framework. Records remain visible across the practice with role-based access.',
  },
  {
    q: 'Can we pick which frameworks apply to our records?',
    a: 'Yes. Settings → Compliance Frameworks lists every framework valid for your country and discipline. Multi-select what applies (e.g. NCAHP + DPDP Act + ABDM record formats if relevant). All AI generation honours the selected set.',
  },
  {
    q: 'How is the pricing different from your dental or vet pricing?',
    a: 'Same tier structure (Practice 1–3 clinicians, Pro 4–7 clinicians), same per-market pricing. Allied health has a slightly higher monthly note cap because allied caseloads typically run more frequent, shorter sessions than vet or GP.',
  },
  {
    q: 'Can clinicians dictate in their own language?',
    a: 'Yes. A clinician can speak the note in English, Hindi, or another Indian language and Salvia returns a clean, structured English record. The time saved on typing is the same whichever language you work in.',
  },
];

export const AlliedHealthPage = () => {
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
        title="Allied Health Documentation & Records Software"
        description="Salvia keeps allied health records audit-ready for NCAHP, RCI, ABDM and the DPDP Act. Voice note after each session in any Indian language — SOAP record, outcome measures, treatment log, discharge summary, audit trail. Physio, osteo, chiro, OT, podiatry, speech."
        path="/allied-health"
        keywords={[
          'allied health software India', 'allied health records', 'physiotherapy documentation software',
          'NCAHP allied health', 'RCI records', 'ABDM allied', 'physio osteo chiro OT podiatry speech',
          'allied health audit trail', 'allied health practice management India',
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <Header />

      {/* Hero */}
      <section style={{ padding: '11rem 0 7rem', backgroundColor: 'var(--salvia-bg)' }}>
        <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: ACCENT_SOFT, border: `1.5px solid ${ACCENT}33`,
            borderRadius: '10px', padding: '0.35rem 0.85rem', marginBottom: '2rem',
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Allied Health
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 1,
            color: 'var(--salvia-primary)', marginBottom: '1.75rem',
          }}>
            Records that map to<br />your regulator.
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--salvia-text-muted)', lineHeight: 1.65,
            maxWidth: '700px', margin: '0 auto 3rem',
          }}>
            NCAHP. RCI. ABDM. DPDP Act. One voice note per session, in any Indian language — Salvia generates the structured record, outcome measures, consent, treatment log, and discharge summary against the framework that governs you.
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
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

      {/* Discipline grid */}
      <section style={{ borderTop: '1px solid #F1F5F9', padding: '6rem 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              fontSize: '0.72rem', fontWeight: 800, color: ACCENT,
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem',
            }}>
              Six disciplines, one product
            </div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800,
              color: 'var(--salvia-primary)', letterSpacing: '-0.03em', margin: 0,
            }}>
              Find your discipline.
            </h2>
            <p style={{
              color: 'var(--salvia-text-muted)', fontSize: '1rem',
              maxWidth: '620px', margin: '0.75rem auto 0', lineHeight: 1.65,
            }}>
              Each page covers the regulator pack, record format, and FAQ specific to your work.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}>
            {ALLIED_DISCIPLINES.map((d) => (
              <Link
                key={d.slug}
                to={`/${d.slug}`}
                style={{ textDecoration: 'none' }}
                className={`allied-discipline-card-${d.key}`}
              >
                <div style={{
                  padding: '2rem',
                  borderRadius: '20px',
                  border: '1px solid #EEF2F6',
                  backgroundColor: '#FAFBFC',
                  height: '100%',
                  display: 'flex', flexDirection: 'column', gap: '1rem',
                  transition: 'all 0.2s ease',
                }}>
                  <div style={{
                    width: '46px', height: '46px', borderRadius: '14px',
                    backgroundColor: d.accentSoft,
                    color: d.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, fontSize: '1.05rem',
                    letterSpacing: '-0.02em',
                  }}>
                    {d.shortName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '0.65rem', fontWeight: 800, color: d.accent,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      marginBottom: '0.35rem',
                    }}>
                      Salvia for
                    </div>
                    <h3 style={{
                      fontSize: '1.15rem', fontWeight: 800,
                      color: 'var(--salvia-primary)', letterSpacing: '-0.02em',
                      margin: '0 0 0.5rem',
                    }}>
                      {d.name}
                    </h3>
                    <div style={{
                      display: 'flex', flexWrap: 'wrap', gap: '0.35rem',
                      marginBottom: '0.5rem',
                    }}>
                      {d.regulators.slice(0, 4).map((r) => (
                        <span key={`${d.slug}-${r.body}`} style={{
                          fontSize: '0.62rem', fontWeight: 800,
                          padding: '0.15rem 0.5rem', borderRadius: '5px',
                          backgroundColor: '#fff',
                          color: r.color,
                          border: '1px solid #EEF2F6',
                          letterSpacing: '0.04em',
                        }}>{r.body}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{
                    marginTop: 'auto',
                    fontSize: '0.82rem', fontWeight: 700, color: d.accent,
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  }}>
                    {d.name.replace(' & Language Therapy', '')} page
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <StatsBar accent={ACCENT} />

      {/* How it works */}
      <WorkflowSection
        accent={ACCENT}
        verticalLabel="Allied health"
      />

      {/* Country frameworks grid */}
      <section style={{ padding: '7rem 0', backgroundColor: 'var(--salvia-bg)', borderTop: '1px solid #F1F5F9' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              fontSize: '0.72rem', fontWeight: 800, color: ACCENT,
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem',
            }}>
              Built for your country's frameworks
            </div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800,
              color: 'var(--salvia-primary)', letterSpacing: '-0.03em', margin: 0,
            }}>
              One product, every framework that governs you.
            </h2>
            <p style={{
              color: 'var(--salvia-text-muted)', fontSize: '1rem',
              maxWidth: '600px', margin: '0.75rem auto 0', lineHeight: 1.65,
            }}>
              The AI loads your regulator's record-keeping pack into every generation. You see which framework is active, and you can adjust the set in settings.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}>
            {COUNTRY_GROUPS.map((c) => (
              <div key={c.code} style={{
                padding: '1.75rem',
                borderRadius: '18px',
                backgroundColor: '#fff',
                border: '1px solid #EEF2F6',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: '1rem',
                }}>
                  <div>
                    <div style={{
                      fontSize: '0.62rem', fontWeight: 800,
                      color: 'var(--salvia-text-muted)',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      marginBottom: '0.2rem',
                    }}>
                      {c.code}
                    </div>
                    <div style={{
                      fontSize: '1.05rem', fontWeight: 800,
                      color: 'var(--salvia-primary)',
                      letterSpacing: '-0.02em',
                    }}>
                      {c.label}
                    </div>
                  </div>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    backgroundColor: `${c.accent}15`,
                    color: c.accent,
                    fontSize: '0.85rem', fontWeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {c.code}
                  </div>
                </div>
                <p style={{
                  fontSize: '0.82rem', color: 'var(--salvia-text)',
                  lineHeight: 1.55, marginBottom: '1rem', margin: '0 0 1rem',
                }}>
                  {c.note}
                </p>
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
                }}>
                  {/* All unique framework bodies for this country across disciplines */}
                  {[...new Set(
                    ALLIED_DISCIPLINES
                      .flatMap((d) => d.regulators)
                      .filter((r) => r.countryCode === c.code)
                      .map((r) => r.body)
                  )].map((body) => (
                    <span key={`${c.code}-${body}`} style={{
                      fontSize: '0.7rem', fontWeight: 800,
                      padding: '0.25rem 0.55rem', borderRadius: '6px',
                      backgroundColor: '#FAFBFC',
                      color: c.accent,
                      border: '1px solid #EEF2F6',
                      letterSpacing: '0.03em',
                    }}>{body}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After */}
      <BeforeAfter
        accent={ACCENT}
        beforeLines={[
          `End-of-day typing into a generic SOAP template. Hour spent on records that should've been spent with the next patient.`,
          `Outcome measures captured on paper — sometimes — never compared episode-over-episode.`,
          `Consent form signed once, filed once, lost twice during the audit.`,
          `Inspector asks for a complete file. You spend the afternoon searching.`,
          `Locum signs the same generic note your principal does — no clear attribution.`,
          `NCAHP norms change every couple of years. You scramble to update your templates.`,
        ]}
        afterLines={[
          `Voice note after each session. AI lays the structured record out. You review and sign in seconds.`,
          `Validated outcome scales as first-class fields. Trend across the episode shows on the discharge summary automatically.`,
          `Procedure-specific consent locked to the record at signing. Always there, always attributed.`,
          `Inspector asks for a complete file. You export it in under a minute.`,
          `Every signature carries the clinician's registration. Locum and principal records visually distinct.`,
          `Regulator publishes new standards. We update the framework pack. Your future records use it automatically.`,
        ]}
      />

      {/* Honest scope */}
      <HonestScope
        accent={ACCENT}
        doLines={[
          `Audio → structured allied health record (SOAP, intake, treatment, discharge)`,
          `Outcome measures + episode tracking`,
          `Procedure-specific consent templates with e-signature`,
          `Immutable audit trail with per-clinician attribution`,
          `Framework-aware generation against your regulator's standards`,
          `Multi-clinician, multi-discipline MDT practice support`,
        ]}
        dontLines={[
          `Replace your practice management software`,
          `Bill insurers or process payments directly`,
          `Claim regulatory sign-off on your behalf`,
          `Auto-publish records without your review`,
          `Provide clinical decision-making — you stay in the loop`,
          `Substitute for your own knowledge of your discipline's standards`,
        ]}
      />

      {/* Pricing teaser */}
      <PricingTeaser
        accent={ACCENT}
        vertical="allied_health"
        fromPriceCopy="Allied health documentation, from ₹2,500/mo."
      />

      {/* FAQ */}
      <section style={{ padding: '7rem 0', backgroundColor: 'var(--salvia-bg)', borderTop: '1px solid #F1F5F9' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Common questions
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              What allied health practices ask us
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

      {/* CTA */}
      <section style={{ padding: '7rem 0', backgroundColor: '#fff', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Get started
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Audit-ready records, from day one.
          </h2>
          <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
            See how Salvia works in a real allied health practice workflow — no slides, no pitch. Book a 20-minute demo.
          </p>
          <Link to="/start" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: 'var(--salvia-accent)', color: '#fff',
            padding: '0.9rem 2rem', borderRadius: '12px',
            fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
          }}>
            Book a demo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />

      <style>{`
        ${ALLIED_DISCIPLINES.map((d) => `
          .allied-discipline-card-${d.key}:hover > div {
            border-color: ${d.accent}33;
            background-color: ${d.accentSoft};
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(15,23,42,0.05);
          }
        `).join('\n')}
      `}</style>
    </div>
  );
};
