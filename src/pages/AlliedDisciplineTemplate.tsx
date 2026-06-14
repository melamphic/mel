import type { ReactNode } from 'react';
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
import type {
  AlliedDiscipline,
  DisciplineFeature,
  IconSlug,
} from '../data/alliedDisciplines';
import { ALLIED_DISCIPLINES } from '../data/alliedDisciplines';

// Shared SVG icon set referenced by IconSlug. Adding a new slug? Add
// a case here and to the IconSlug union in alliedDisciplines.ts.
const ICON_FOR: Record<IconSlug, ReactNode> = {
  voice: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  outcome: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="14 7 21 7 21 14" />
    </svg>
  ),
  consent: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  discharge: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  treatment: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  audit: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  team: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  framework: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  incident: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  wound: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
};

interface AlliedDisciplineTemplateProps {
  slug: string;
}

export const AlliedDisciplineTemplate = ({ slug }: AlliedDisciplineTemplateProps) => {
  const discipline = ALLIED_DISCIPLINES.find((d) => d.slug === slug);
  if (!discipline) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h1>Discipline not found</h1>
        <Link to="/allied-health">Back to Allied Health</Link>
      </div>
    );
  }
  return <DisciplinePage discipline={discipline} />;
};

interface DisciplinePageProps {
  discipline: AlliedDiscipline;
}

function DisciplinePage({ discipline }: DisciplinePageProps) {
  const {
    accent, accentSoft,
    heroBadge, heroHeadline, heroSubtitle,
    regulators, features, faqs, recentPosts,
    name, shortName, pluralLowercase,
    metaTitle, metaDescription, metaKeywords,
    slug,
  } = discipline;

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <SEO
        title={metaTitle}
        description={metaDescription}
        path={`/${slug}`}
        keywords={metaKeywords}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <Header />
      <main style={{ flex: 1, zIndex: 10 }}>

      {/* Hero */}
      <section style={{ padding: '11rem 0 7rem', backgroundColor: 'var(--salvia-bg)' }}>
        <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: accentSoft, border: `1.5px solid ${accent}33`,
            borderRadius: '10px', padding: '0.35rem 0.85rem', marginBottom: '2rem',
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {heroBadge}
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 1,
            color: 'var(--salvia-primary)', marginBottom: '1.75rem',
          }}>
            {heroHeadline[0]}<br />{heroHeadline[1]}
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--salvia-text-muted)', lineHeight: 1.65,
            maxWidth: '700px', margin: '0 auto 3rem',
          }}>
            {heroSubtitle}
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

      {/* Regulators rail */}
      <section style={{ borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9', padding: '2rem 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--salvia-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Framework-aware for
            </span>
            {regulators.map((r) => (
              <div key={`${r.body}-${r.countryCode}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem' }}>
                <span style={{ fontSize: '1rem', fontWeight: 900, color: r.color, letterSpacing: '-0.02em' }}>{r.body}</span>
                <span style={{ fontSize: '0.62rem', fontWeight: 600, color: 'var(--salvia-text-muted)', letterSpacing: '0.04em' }}>{r.country}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework cards — give each regulator a card so it doesn't get lost in the rail */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--salvia-bg)', borderBottom: '1px solid #F1F5F9' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              How we map to your regulator
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em', margin: 0 }}>
              {name} records, framework-aware.
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}>
            {regulators.map((r) => (
              <div
                key={`card-${r.body}-${r.countryCode}`}
                style={{
                  padding: '1.5rem',
                  borderRadius: '14px',
                  backgroundColor: '#fff',
                  border: '1px solid #EEF2F6',
                  boxShadow: '0 2px 8px rgba(15,23,42,0.02)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: r.color, letterSpacing: '-0.02em' }}>{r.body}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--salvia-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{r.country}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--salvia-text)', lineHeight: 1.5, marginBottom: r.note ? '0.5rem' : 0 }}>
                  {r.bodyFull}
                </div>
                {r.note && (
                  <div style={{ fontSize: '0.72rem', color: 'var(--salvia-text-muted)', lineHeight: 1.5, fontStyle: 'italic' }}>
                    {r.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <StatsBar accent={accent} />

      {/* Workflow — 3-step */}
      <WorkflowSection
        accent={accent}
        verticalLabel={name}
        audioStepCopy={`After each ${shortName.toLowerCase()} session, leave a brief voice note. 30 seconds to a few minutes — natural language, no template-bashing.`}
        signOffStepCopy={`You review the structured note in seconds. Sign it. It becomes part of the immutable audit trail with your ${pluralLowercase.slice(0, -1)} registration number attached.`}
      />

      {/* Feature grid */}
      <section style={{ padding: '7rem 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              What Salvia does
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              Every record element a {shortName.toLowerCase()} inspection looks for.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="mobile-stack">
            {features.map((f, i) => (
              <FeatureCard key={i} feature={f} accent={accent} accentSoft={accentSoft} />
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After */}
      <BeforeAfter
        accent={accent}
        beforeLines={[
          `End-of-day typing into a generic SOAP template. Hour spent on records that should've been spent with the next patient.`,
          `Outcome measures captured on paper — sometimes — never compared episode-over-episode.`,
          `Consent form signed once, filed once, lost twice during the audit.`,
          `Inspector asks for a complete file. You spend the afternoon searching.`,
          `Locum signs the same generic note your principal does — no clear attribution.`,
        ]}
        afterLines={[
          `Voice note after each session. AI lays the structured record out. You review and sign in seconds.`,
          `Validated outcome scales as first-class fields. Trend across the episode shows on the discharge summary automatically.`,
          `Procedure-specific consent locked to the record at signing. Always there, always attributed.`,
          `Inspector asks for a complete file. You export it in under a minute.`,
          `Every signature carries the clinician's registration. Locum and principal records visually distinct.`,
        ]}
      />

      {/* Honest scope */}
      <HonestScope
        accent={accent}
        doLines={[
          `Audio → structured ${name.toLowerCase()} record (SOAP, intake, treatment, discharge)`,
          `Outcome measures + episode tracking`,
          `Procedure-specific consent templates with e-signature`,
          `Immutable audit trail with per-clinician attribution`,
          `Framework-aware generation against your regulator's standards`,
          `Multi-clinician practice with role-based access`,
        ]}
        dontLines={[
          `Replace your practice management software`,
          `Bill insurers or process payments directly`,
          `Claim regulatory sign-off on your behalf`,
          `Auto-publish records without your review`,
          `Provide clinical decision-making — you stay in the loop`,
        ]}
      />

      {/* FAQ */}
      <section style={{ padding: '7rem 0', backgroundColor: 'var(--salvia-bg)', borderTop: '1px solid #F1F5F9' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Common questions
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
              What {name.toLowerCase()} practices ask us
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
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

      {/* Pricing teaser */}
      <PricingTeaser
        accent={accent}
        vertical="allied_health"
        fromPriceCopy={`${name} compliance, from ₹2,500/mo.`}
      />

      {/* Blog links */}
      {recentPosts.length > 0 && (
        <section style={{ padding: '6rem 0', backgroundColor: '#fff', borderTop: '1px solid #F1F5F9' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>From the compliance desk</div>
              <Link to="/blog" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--salvia-text-muted)', textDecoration: 'none' }}>All posts →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} className="mobile-stack">
              {recentPosts.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }} className={`allied-blog-card-${discipline.key}`}>
                  <div style={{
                    padding: '1.5rem', borderRadius: '14px',
                    border: '1px solid #EEF2F6', backgroundColor: '#FAFBFC',
                    height: '100%', transition: 'all 0.2s ease',
                  }}>
                    <div style={{
                      fontSize: '0.65rem', fontWeight: 800, color: accent,
                      backgroundColor: accentSoft, padding: '0.2rem 0.55rem',
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
      )}

      {/* Sibling disciplines */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--salvia-bg)', borderTop: '1px solid #F1F5F9' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--salvia-accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Allied Health
            </div>
            <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em', margin: 0 }}>
              Other allied disciplines on Salvia
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
            {ALLIED_DISCIPLINES.filter((d) => d.slug !== slug).map((d) => (
              <Link key={d.slug} to={`/${d.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '1.25rem', borderRadius: '12px',
                  border: '1px solid #EEF2F6', backgroundColor: '#fff',
                  display: 'flex', flexDirection: 'column', gap: '0.3rem',
                  transition: 'all 0.2s ease',
                }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: d.accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {d.shortName}
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--salvia-primary)' }}>
                    {d.name}
                  </span>
                </div>
              </Link>
            ))}
            <Link to="/allied-health" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '1.25rem', borderRadius: '12px',
                border: '1px dashed rgba(15,23,42,0.2)', backgroundColor: 'transparent',
                display: 'flex', flexDirection: 'column', gap: '0.3rem',
              }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--salvia-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Overview
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--salvia-primary)' }}>
                  All allied →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '7rem 0', backgroundColor: '#fff', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Get started
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Audit-ready records, from day one.
          </h2>
          <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
            See how Salvia works in a real {name.toLowerCase()} practice workflow — no slides, no pitch. Book a 20-minute demo.
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

      </main>
      <Footer />

      <style>{`
        .allied-blog-card-${discipline.key}:hover > div {
          border-color: ${accent}33;
          background-color: ${accentSoft};
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(15,23,42,0.05);
        }
      `}</style>
    </div>
  );
}

interface FeatureCardProps {
  feature: DisciplineFeature;
  accent: string;
  accentSoft: string;
}

function FeatureCard({ feature, accent, accentSoft }: FeatureCardProps) {
  return (
    <div style={{
      padding: '2rem', borderRadius: '16px',
      border: '1px solid #EEF2F6', backgroundColor: '#FAFBFC',
    }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '12px',
        backgroundColor: accentSoft,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: accent, marginBottom: '1.25rem',
      }}>
        {ICON_FOR[feature.icon]}
      </div>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--salvia-primary)', marginBottom: '0.5rem' }}>{feature.title}</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>{feature.desc}</p>
    </div>
  );
}
