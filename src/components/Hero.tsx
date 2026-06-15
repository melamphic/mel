import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardPreview } from './DashboardPreview';
import { track } from '../lib/posthog';
import { useIsIndia } from '../lib/market';

export const Hero: React.FC = () => {
  const isIndia = useIsIndia();
  const regulators: string[] = isIndia
    ? ['NABH', 'ABDM', 'DPDP', 'VCI', 'DCI', 'NCAHP']
    : ['RCVS', 'CQC', 'GDC', 'AHPRA', 'VCNZ', 'HCPC'];
  return (
    <section className="hero-v1">
      <style>{`
        .hero-v1 {
          background-color: transparent;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 10rem 0 2.5rem;
          position: relative;
          overflow: hidden;
        }
        .hv1-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 3rem;
          align-items: center;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .hv1-headline {
          font-size: clamp(2.7rem, 4.6vw, 4.2rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--salvia-primary);
          margin: 0 0 1.5rem;
        }
        .hv1-grid > div { min-width: 0; }
        .hv1-preview-wrap { position: relative; }
        .hv1-preview-inner { width: 100%; }
        .hv1-glow {
          position: absolute;
          inset: -18% -12%;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(closest-side, rgba(255, 78, 0, 0.14), transparent 72%);
        }
        .hv1-orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 126%;
          height: 126%;
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
          animation: hv1spin 90s linear infinite;
        }
        @keyframes hv1spin { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .hv1-orbit { animation: none; } }
        .hv1-card {
          position: absolute;
          background: var(--salvia-surface);
          border-radius: 16px;
          box-shadow: 0 18px 44px rgba(15, 23, 42, 0.14), 0 0 0 1px rgba(15, 23, 42, 0.04);
          padding: 0.95rem 1.15rem;
          display: flex;
          align-items: center;
          gap: 0.7rem;
          z-index: 20;
        }
        .hv1-card-top { top: -5%; right: 6%; }
        .hv1-card-low { bottom: -5%; left: 6%; }
        @media (max-width: 900px) {
          .hero-v1 { min-height: auto; padding: 7rem 0 3rem; }
          .hv1-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            text-align: left;
          }
          .hv1-left { text-align: left; }
          .hv1-headline { font-size: clamp(2.2rem, 9vw, 2.9rem); }
          .hv1-card { display: none; }
          .hv1-orbit, .hv1-glow { display: none; }
          .hv1-rail-row { gap: 1rem 1.4rem !important; }
          /* scale the wide dashboard down into a clean mini-preview that fits */
          .hv1-preview-wrap { overflow: hidden; height: 248px; border-radius: 24px; }
          .hv1-preview-inner {
            width: 700px;
            transform: scale(0.46);
            transform-origin: top left;
            margin-left: calc(50% - 161px);
          }
        }
      `}</style>

      <div className="hv1-grid">
        {/* LEFT */}
        <div className="hv1-left" style={{ textAlign: 'left' }}>
          <h1 className="hv1-headline">
            Clinical compliance, built into{' '}
            <span style={{ position: 'relative', whiteSpace: 'nowrap', color: 'var(--salvia-accent)' }}>
              every note
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: '0.05em',
                  height: '3px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--salvia-accent)',
                  opacity: 0.55,
                }}
              />
            </span>
            .
          </h1>

          <p
            style={{
              color: 'var(--salvia-text-muted)',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              maxWidth: '460px',
              margin: '0 0 2.25rem',
            }}
          >
            Salvia&apos;s AI turns a post-consult audio note — spoken in {isIndia ? 'any Indian language' : 'any language'} — into a
            policy-checked, audit-ready clinical record before anyone signs off. Not a scribe — a
            compliance suite.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem' }}>
            <Link
              to="/start"
              onClick={() => track('cta_clicked', { cta_id: 'hero_book_demo' })}
              style={{
                backgroundColor: 'var(--salvia-primary)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '1.02rem',
                padding: '0.95rem 2rem',
                borderRadius: '999px',
                textDecoration: 'none',
                boxShadow: '0 10px 24px rgba(15, 23, 42, 0.18)',
              }}
            >
              Book a demo
            </Link>
            <Link
              to="/#how-it-works"
              style={{
                backgroundColor: 'var(--salvia-surface)',
                color: 'var(--salvia-primary)',
                fontWeight: 700,
                fontSize: '1.02rem',
                padding: '0.95rem 2rem',
                borderRadius: '999px',
                textDecoration: 'none',
                border: '1px solid rgba(15, 23, 42, 0.18)',
              }}
            >
              See how it works
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hv1-preview-wrap">
          <div className="hv1-glow" />
          <svg className="hv1-orbit" viewBox="0 0 600 600" fill="none" aria-hidden="true">
            <circle cx="300" cy="300" r="150" stroke="rgba(15, 23, 42, 0.10)" strokeWidth="1.5" strokeDasharray="2 9" />
            <circle cx="300" cy="300" r="222" stroke="rgba(15, 23, 42, 0.08)" strokeWidth="1.5" strokeDasharray="2 9" />
            <circle cx="300" cy="300" r="295" stroke="rgba(255, 78, 0, 0.16)" strokeWidth="1.5" strokeDasharray="2 9" />
            <circle cx="300" cy="5" r="5" fill="#FF4E00" />
            <circle cx="595" cy="300" r="4" fill="#0F172A" />
          </svg>
          <div className="hv1-preview-inner">
            <DashboardPreview />
          </div>

          <div className="hv1-card hv1-card-top">
            <span
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                backgroundColor: 'rgba(22, 163, 74, 0.12)',
                color: '#16A34A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1rem',
              }}
            >
              ↑
            </span>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--salvia-text-muted)', fontWeight: 600 }}>
                Avg confidence
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#16A34A', lineHeight: 1.1 }}>
                95.4%
              </div>
            </div>
          </div>

          <div className="hv1-card hv1-card-low">
            <span
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                backgroundColor: 'rgba(22, 163, 74, 0.12)',
                color: '#16A34A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.05rem',
              }}
            >
              ✓
            </span>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--salvia-text-muted)', fontWeight: 600 }}>
                Policy check
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#16A34A', lineHeight: 1.1 }}>
                Satisfied
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST RAIL */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '2.5rem auto 0',
          padding: '0 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        <div
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--salvia-text-muted)',
            opacity: 0.7,
          }}
        >
          Trusted against
        </div>
        <div
          className="hv1-rail-row"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.25rem 2.25rem',
          }}
        >
          {regulators.map((name, i) => (
            <React.Fragment key={name}>
              {i > 0 && (
                <span style={{ color: 'rgba(15, 23, 42, 0.18)', fontWeight: 700 }} aria-hidden="true">
                  ·
                </span>
              )}
              <span
                style={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: '0.02em',
                  color: 'rgba(71, 85, 105, 0.55)',
                  filter: 'grayscale(1)',
                }}
              >
                {name}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
