import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { Rv } from '../components/grass/Rv';

// /melamphic — Melamphic AI Private Limited, the parent-company page.
// Grass design language: white, Archivo, one green accent. The substance
// (mission, vision, tagline) carries the page; Salvia is the proof.

export function MelamphicPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <SEO
        title="Melamphic AI Private Limited"
        description="Melamphic AI Private Limited, India — the company behind Salvia. We build AI for work under pressure: trustworthy documentation that takes care of itself."
        path="/melamphic"
        keywords={['Melamphic AI', 'Melamphic AI Private Limited', 'Salvia company', 'healthcare AI India']}
      />
      <GrassHeader />
      <main style={{ flex: 1, zIndex: 10, background: '#fff' }}>

        {/* Hero */}
        <section className="g-section g-center" style={{ padding: '168px 0 96px' }}>
          <div className="g-container">
            <Rv as="p" className="g-small" style={{ fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Melamphic AI Private Limited · India
            </Rv>
            <Rv as="h1" className="g-h1" delay={1} style={{ margin: '18px auto 22px', maxWidth: '16ch' }}>
              We build AI for work <span className="g-hl">under pressure.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={2}>
              Clinics, wards and consult rooms don't slow down so the paperwork can catch up.
              We build the layer that keeps the record true while the work happens —
              starting with <b>Salvia</b>, the evidence layer for Indian healthcare.
            </Rv>
          </div>
        </section>

        {/* Mission */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              The mission.
            </Rv>
            <Rv as="p" delay={1} style={{
              fontFamily: 'var(--g-font)', fontWeight: 700,
              fontSize: 'clamp(24px, 3.4vw, 44px)', letterSpacing: '-0.025em',
              lineHeight: 1.25, color: 'var(--g-ink)', maxWidth: '24ch', marginTop: 10,
            }}>
              Make trustworthy documentation effortless — so people can give their attention
              to the work, and <span className="g-hl">the record takes care of itself.</span>
            </Rv>
          </div>
        </section>

        {/* Vision */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              The vision.
            </Rv>
            <Rv as="p" delay={1} style={{
              fontFamily: 'var(--g-font)', fontWeight: 700,
              fontSize: 'clamp(24px, 3.4vw, 44px)', letterSpacing: '-0.025em',
              lineHeight: 1.25, color: 'var(--g-ink)', maxWidth: '22ch', marginTop: 10,
            }}>
              A world where doing the right thing and proving it are <span className="g-hl">the same act.</span>
            </Rv>
          </div>
        </section>

        {/* Salvia */}
        <section className="g-section">
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h2" className="g-h2">
                  What we've built: <span className="g-hl">Salvia.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  Salvia turns what clinicians say — ambient in the OPD or a quick voice note —
                  into verified, sealed clinical records checked against your policies.
                  Complete files you can produce when a complaint arrives.
                </Rv>
                <Rv className="g-facts" delay={2}>
                  <div className="g-fact"><span>Product</span><b>Salvia — the evidence layer for healthcare</b></div>
                  <div className="g-fact"><span>First market</span><b>India — clinics and hospitals</b></div>
                  <div className="g-fact"><span>Company</span><b>Melamphic AI Private Limited</b></div>
                </Rv>
                <Rv delay={3} style={{ marginTop: 30 }}>
                  <Link className="g-btn g-btn--green" to="/">
                    Explore Salvia
                  </Link>
                </Rv>
              </div>
              <Rv className="g-split-art" delay={1}>
                <img
                  src="/illustrations/ill_globe_india.webp"
                  alt="A globe with a location pin on India"
                  loading="lazy"
                />
              </Rv>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="g-final">
          <div className="g-container g-center">
            <Rv as="h2" className="g-h2" style={{ margin: '0 auto' }}>
              Talk to us.
            </Rv>
            <Rv as="p" className="g-sub" delay={1} style={{ margin: '14px auto 0' }}>
              For anything — product, partnerships, press — one address reaches the people
              who build it.
            </Rv>
            <Rv className="g-hero-ctas" delay={2} style={{ marginTop: 30 }}>
              <a className="g-btn g-btn--green" href="mailto:hello@hellosalvia.com">
                hello@hellosalvia.com
              </a>
            </Rv>
            <Rv as="p" className="g-hero-note" delay={3}>
              © {year} Melamphic AI Private Limited
            </Rv>
          </div>
        </section>

      </main>
      <GrassFooter />
    </>
  );
}
