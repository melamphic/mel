import React from 'react';
import { Link } from 'react-router-dom';

// "The 6-year test" — the worst-day scenario that closes the sale.
// Every figure is sourced (links in the footnote row); reused on the
// landing page and /hospitals. Fear comes LAST in the page flow by
// design — everyday capture value sells first, this anchors it.

const STATS: { value: string; label: string }[] = [
  { value: '6 yrs', label: 'average life of a medical-negligence consumer case — the longest run 18+' },
  { value: '22%', label: 'of proven NCDRC negligence cases involved a failure to keep accurate records' },
  { value: '₹2 crore', label: 'a single NCDRC award, 2022 — benchmark awards now run ₹75 lakh to ₹11 crore' },
  { value: '19%', label: 'of civil medical-negligence cases ever reach a judgment — the rest linger for years' },
];

const SOURCES: { label: string; url: string }[] = [
  { label: 'IJME — NCDRC 5-yr review (253 cases)', url: 'https://ijme.in/articles/medical-negligence-in-cases-decided-by-the-national-consumer-disputes-redressal-commission-a-five-year-retrospective-review/' },
  { label: 'Indian J Urology — records & case law', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2779965/' },
  { label: 'NCDRC ₹2 cr award (2022)', url: 'https://indialegallive.com/constitutional-law-news/courts-news/ncdrc-awards-rs-2-crore-compensation-for-medical-negligence-after-surgeon-removes-healthy-kidney/' },
  { label: 'TNM/Newslaundry — case timelines', url: 'https://www.newslaundry.com/2024/09/28/in-kerala-medical-negligence-victims-face-a-broken-system-of-delays-and-bias' },
];

export const SixYearTest: React.FC = () => (
  <section className="section" style={{ position: 'relative', zIndex: 10 }}>
    <div className="container" style={{ maxWidth: '1000px' }}>
      <div style={{
        backgroundColor: 'var(--salvia-primary)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(2.5rem, 5vw, 4rem)',
        color: '#fff',
      }}>
        <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '1.25rem' }}>
          The 6-year test
        </span>
        <h2 style={{
          fontSize: 'var(--text-3xl)', fontWeight: 800,
          letterSpacing: '-0.03em', lineHeight: 1.12,
          margin: '0 0 1.25rem', color: '#fff',
        }}>
          A complaint from 2020 just arrived.<br />
          The treating doctor left last year.
        </h2>
        <p style={{
          fontSize: 'var(--text-md)', lineHeight: 1.65,
          color: 'rgba(255,255,255,0.75)', maxWidth: '640px',
          margin: '0 0 2.5rem',
        }}>
          The consumer commission wants the complete file — notes, consents, drug charts, vitals.
          Reconstructing it after the notice reads as concealment, and courts draw an{' '}
          <em>adverse inference</em> from records you cannot produce. What do you hand over?
        </p>

        {/* Stat wall */}
        <div className="syt-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem',
          paddingBottom: '2.25rem', marginBottom: '2.25rem',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}>
          {STATS.map((s) => (
            <div key={s.value}>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--salvia-accent)', lineHeight: 1.1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', lineHeight: 1.5, color: 'rgba(255,255,255,0.65)', marginTop: '0.5rem' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <blockquote style={{
          margin: '0 0 2rem', padding: 0, border: 'none',
          fontSize: 'var(--text-lg)', fontWeight: 600, lineHeight: 1.45,
          color: '#fff', letterSpacing: '-0.01em',
        }}>
          "Poor records mean poor defense. No records mean no defense."
          <cite style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 500, fontStyle: 'normal', color: 'rgba(255,255,255,0.5)', marginTop: '0.6rem' }}>
            — Indian Journal of Urology, on NCDRC medical-negligence case law
          </cite>
        </blockquote>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link to="/blog/consumer-court-records" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--salvia-accent)',
            textDecoration: 'none',
          }}>
            Will I lose the case if my records aren't there?
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            {SOURCES.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.45)',
                textDecoration: 'underline', textUnderlineOffset: '2px',
              }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .syt-grid { grid-template-columns: repeat(2, 1fr) !important; }
      }
    `}</style>
  </section>
);
