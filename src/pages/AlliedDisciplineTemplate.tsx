import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { Rv } from '../components/grass/Rv';
import type { AlliedDiscipline } from '../data/alliedDisciplines';
import { ALLIED_DISCIPLINES } from '../data/alliedDisciplines';

// One template, six discipline pages (physio / osteo / chiro / OT /
// podiatry / speech). Grass design language — same skeleton as the
// main vertical pages; per-discipline content comes from data.

const POST_ICONS = [
  '/illustrations/tpl_soap.webp',
  '/illustrations/tpl_painad.webp',
  '/illustrations/tpl_allied.webp',
  '/illustrations/tpl_referral.webp',
];

const BEFORE_FACTS: { label: string; value: string }[] = [
  { label: 'End of day', value: 'Typing into a generic SOAP template — time that belonged to the next patient' },
  { label: 'Outcome measures', value: 'On paper, sometimes — never compared episode-over-episode' },
  { label: 'Consent', value: 'Signed once, filed once, lost twice during the audit' },
  { label: 'Locums', value: 'The same generic note as the principal — no clear attribution' },
  { label: 'The inspector asks', value: 'An afternoon of searching for one complete file' },
];

const AFTER_FACTS: { label: string; value: string }[] = [
  { label: 'End of session', value: 'A short voice note; the structured record laid out for sign-off in seconds' },
  { label: 'Outcome measures', value: 'First-class fields, trended across the episode onto the discharge summary' },
  { label: 'Consent', value: 'Locked to the record at signing — always there, always attributed' },
  { label: 'Locums', value: 'Every signature carries the clinician’s own registration' },
  { label: 'The inspector asks', value: 'The complete file, exported in under a minute' },
];

const SCOPE_DONT: string[] = [
  'Replace your practice management software',
  'Bill insurers or process payments directly',
  'Claim regulatory sign-off on your behalf',
  'Auto-publish records without your review',
  'Provide clinical decision-making — you stay in the loop',
];

interface AlliedDisciplineTemplateProps {
  slug: string;
}

export const AlliedDisciplineTemplate = ({ slug }: AlliedDisciplineTemplateProps) => {
  const discipline = ALLIED_DISCIPLINES.find((d) => d.slug === slug);
  if (!discipline) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', fontFamily: 'var(--g-font)' }}>
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
    heroHeadline, heroSubtitle,
    regulators, features, faqs, recentPosts,
    name, shortName,
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
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        path={`/${slug}`}
        keywords={metaKeywords}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <GrassHeader />
      <main style={{ flex: 1, zIndex: 10, background: '#fff' }}>

        {/* Hero */}
        <section className="g-section" style={{ padding: '148px 0 72px' }}>
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h1" className="g-h1" style={{ fontSize: 'clamp(38px, 4.6vw, 66px)', marginBottom: 20 }}>
                  {heroHeadline[0]} <span className="g-hl">{heroHeadline[1]}</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  {heroSubtitle}
                </Rv>
                <Rv className="g-hero-ctas" delay={2} style={{ justifyContent: 'flex-start', marginTop: 30 }}>
                  <Link className="g-btn g-btn--green" to="/start">
                    Book a demo
                  </Link>
                  <Link className="g-btn g-btn--ghost" to="/pricing">
                    See pricing
                  </Link>
                </Rv>
              </div>
              <Rv className="g-split-art" delay={1}>
                <img
                  src="/illustrations/allied_world.webp"
                  alt="A miniature rehabilitation studio where a session becomes documents sealed in a vault"
                />
              </Rv>
            </div>
            <Rv delay={3} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 52 }}>
              <span className="g-small" style={{ fontWeight: 600 }}>Framework-aware for</span>
              {regulators.map((r) => (
                <span
                  key={`${r.body}-${r.countryCode}`}
                  style={{
                    fontFamily: 'var(--g-font)', fontSize: 12.5, fontWeight: 700,
                    color: 'var(--g-ink-soft)', border: '1px solid var(--g-line)',
                    borderRadius: 999, padding: '5px 13px',
                  }}
                >
                  {r.body}
                </span>
              ))}
            </Rv>
          </div>
        </section>

        {/* Regulator mapping */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              {name} records, <span className="g-hl">framework-aware.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              Salvia loads your regulator's record-keeping pack into every AI generation —
              these are the frameworks behind every {shortName.toLowerCase()} record it writes.
            </Rv>
            <div className="g-grid">
              {regulators.map((r, i) => (
                <Rv className="g-card" key={`card-${r.body}-${r.countryCode}`} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                  <h3 className="g-h3">{r.body}</h3>
                  <p style={{ marginTop: 6 }}>{r.bodyFull}</p>
                  {r.note && (
                    <p className="g-small" style={{ marginTop: 8, fontStyle: 'italic' }}>{r.note}</p>
                  )}
                </Rv>
              ))}
            </div>
          </div>
        </section>

        {/* Features as checks */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              Every record element a {shortName.toLowerCase()} inspection <span className="g-hl">looks for.</span>
            </Rv>
            <div className="g-split" style={{ alignItems: 'start', marginTop: 16 }}>
              <div>
                {features.slice(0, Math.ceil(features.length / 2)).map((f, i) => (
                  <Rv className="g-check" key={f.title} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                    <span className="g-ck">✓</span>
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </Rv>
                ))}
              </div>
              <div>
                {features.slice(Math.ceil(features.length / 2)).map((f, i) => (
                  <Rv className="g-check" key={f.title} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                    <span className="g-ck">✓</span>
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </Rv>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Before / after */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              What changes <span className="g-hl">on day one.</span>
            </Rv>
            <div className="g-split" style={{ alignItems: 'start', marginTop: 40 }}>
              <Rv delay={1}>
                <h3 className="g-h3">Without Salvia</h3>
                <div className="g-facts" style={{ marginTop: 16 }}>
                  {BEFORE_FACTS.map((f) => (
                    <div className="g-fact" key={f.label}>
                      <span>{f.label}</span>
                      <b>{f.value}</b>
                    </div>
                  ))}
                </div>
              </Rv>
              <Rv delay={2}>
                <h3 className="g-h3">
                  With <span className="g-hl">Salvia</span>
                </h3>
                <div className="g-facts" style={{ marginTop: 16 }}>
                  {AFTER_FACTS.map((f) => (
                    <div className="g-fact" key={f.label}>
                      <span>{f.label}</span>
                      <b>{f.value}</b>
                    </div>
                  ))}
                </div>
              </Rv>
            </div>
          </div>
        </section>

        {/* Honest scope */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              What it does — <span className="g-hl">and what it doesn't.</span>
            </Rv>
            <div className="g-split" style={{ alignItems: 'start', marginTop: 24 }}>
              <Rv delay={1}>
                <div className="g-facts">
                  <div className="g-fact"><span>Records</span><b>Audio → structured {name.toLowerCase()} record — SOAP, intake, treatment, discharge</b></div>
                  <div className="g-fact"><span>Outcomes</span><b>Outcome measures + episode tracking</b></div>
                  <div className="g-fact"><span>Consent</span><b>Procedure-specific templates with e-signature</b></div>
                  <div className="g-fact"><span>Audit trail</span><b>Immutable, with per-clinician attribution</b></div>
                  <div className="g-fact"><span>AI generation</span><b>Framework-aware against your regulator's standards</b></div>
                  <div className="g-fact"><span>Teams</span><b>Multi-clinician practice with role-based access</b></div>
                </div>
              </Rv>
              <Rv delay={2}>
                <h3 className="g-h3">Salvia won't</h3>
                <div className="g-facts" style={{ marginTop: 14 }}>
                  {SCOPE_DONT.map((line) => (
                    <div className="g-fact" key={line} style={{ justifyContent: 'flex-start' }}>
                      <span style={{ flex: 'none' }}>✕</span>
                      <b style={{ textAlign: 'left', fontWeight: 500, color: 'var(--g-ink-soft)' }}>{line}</b>
                    </div>
                  ))}
                </div>
              </Rv>
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="g-section g-center">
          <div className="g-container">
            <Rv delay={1}>
              <img
                src="/illustrations/tpl_allied.webp"
                alt=""
                loading="lazy"
                style={{ width: 120, height: 'auto', margin: '0 auto 18px', display: 'block' }}
              />
            </Rv>
            <Rv as="h2" className="g-h2">
              From ₹999 a month. <span className="g-hl">Everything included.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              The Starter plan covers 400 AI notes a month with the full compliance suite —
              outcome measures, consent, incidents, branded PDF export — and <b>unlimited
              staff</b>. You pay per note, never per clinician.
            </Rv>
            <Rv className="g-hero-ctas" delay={2} style={{ marginTop: 30 }}>
              <Link className="g-btn g-btn--green" to="/start">
                Start free
              </Link>
              <Link className="g-btn g-btn--ghost" to="/pricing">
                Full pricing
              </Link>
            </Rv>
            <Rv as="p" className="g-hero-note" delay={3}>
              First 50 notes free · Annual billing = 2 months free · Prices exclude GST
            </Rv>
          </div>
        </section>

        {/* FAQ */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              What {name.toLowerCase()} practices <span className="g-hl">ask us.</span>
            </Rv>
            <div style={{ maxWidth: 820, marginTop: 40 }}>
              {faqs.map((faq, i) => (
                <Rv key={faq.q} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4} style={{ borderTop: '1px solid var(--g-line-soft)', padding: '26px 0' }}>
                  <h3 className="g-h3" style={{ marginBottom: 8 }}>{faq.q}</h3>
                  <p style={{ fontFamily: 'var(--g-font)', fontSize: 15, color: 'var(--g-ink-soft)', lineHeight: 1.7, margin: 0 }}>
                    {faq.a}
                  </p>
                </Rv>
              ))}
            </div>
          </div>
        </section>

        {/* Blog links */}
        {recentPosts.length > 0 && (
          <section className="g-section">
            <div className="g-container">
              <Rv as="h2" className="g-h2">
                From the compliance desk.
              </Rv>
              <div className="g-tpl-grid">
                {recentPosts.map((p, i) => (
                  <Rv key={p.slug} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                    <Link to={`/blog/${p.slug}`} className="g-tpl" style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                      <img className="g-tpl-ic" src={POST_ICONS[i % POST_ICONS.length]} alt="" loading="lazy" />
                      <div className="g-tpl-name">{p.title}</div>
                      <div className="g-tpl-meta">
                        <span className="g-tpl-vert">{p.tag}</span>
                      </div>
                    </Link>
                  </Rv>
                ))}
              </div>
              <Rv as="p" className="g-small" delay={3} style={{ marginTop: 24 }}>
                <Link to="/blog" style={{ color: 'var(--g-green)', fontWeight: 600 }}>
                  All posts →
                </Link>
              </Rv>
            </div>
          </section>
        )}

        {/* Sibling disciplines */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              Other allied disciplines <span className="g-hl">on Salvia.</span>
            </Rv>
            <div className="g-grid">
              {ALLIED_DISCIPLINES.filter((d) => d.slug !== slug).map((d, i) => (
                <Rv key={d.slug} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                  <Link to={`/${d.slug}`} className="g-card" style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                    <h3 className="g-h3">{d.name}</h3>
                    <p style={{ marginTop: 6, color: 'var(--g-green)', fontWeight: 600 }}>
                      Salvia for {d.shortName} →
                    </p>
                  </Link>
                </Rv>
              ))}
              <Rv delay={4}>
                <Link to="/allied-health" className="g-card" style={{ display: 'block', textDecoration: 'none', height: '100%', borderStyle: 'dashed' }}>
                  <h3 className="g-h3">All allied health</h3>
                  <p style={{ marginTop: 6, color: 'var(--g-ink-soft)', fontWeight: 600 }}>
                    The overview →
                  </p>
                </Link>
              </Rv>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="g-final">
          <div className="g-container">
            <div className="g-final-grid">
              <div>
                <Rv as="h2" className="g-h2">
                  Audit-ready records, <span className="g-hl">from day one.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1} style={{ marginTop: 14 }}>
                  See how Salvia works in a real {name.toLowerCase()} practice workflow — no
                  slides, no pitch. Book a 20-minute demo.
                </Rv>
                <Rv className="g-hero-ctas" delay={2} style={{ marginTop: 30 }}>
                  <Link className="g-btn g-btn--green" to="/start">
                    Book a demo
                  </Link>
                  <Link className="g-btn g-btn--ghost" to="/start">
                    Start free
                  </Link>
                </Rv>
              </div>
              <Rv className="g-final-art" delay={1}>
                <img
                  src="/illustrations/ill_seal.webp"
                  alt="A clinical record sealed inside a vault"
                  loading="lazy"
                  onError={(e) => ((e.target as HTMLImageElement).src = '/illustrations/vault.webp')}
                />
              </Rv>
            </div>
          </div>
        </section>

      </main>
      <GrassFooter />
    </>
  );
}
