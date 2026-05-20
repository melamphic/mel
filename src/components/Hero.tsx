import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardPreview } from './DashboardPreview';
import { MobileDevicePreview } from './MobileDevicePreview';

const phrases = [
  'built into every note.',
  'checked before sign-off.',
  'audit-ready by default.',
];

export const Hero: React.FC = () => {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setPhraseIdx((prev) => (prev + 1) % phrases.length);
        setIsExiting(false);
      }, 1200); // Wait for exit animation
    }, 3200);

    return () => {
      clearInterval(phraseInterval);
    };
  }, []);

  return (
    <section style={{
      padding: 'var(--hero-padding, 7rem 0 5rem)',
      textAlign: 'center',
      position: 'relative'
    }}>
      <style>{`
        @media (max-width: 768px) {
          section { --hero-padding: 3rem 0 2rem !important; }
        }
      `}</style>
      <div className="container" style={{ maxWidth: '900px' }}>

        {/* Social Proof Badge */}
        <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center' }}>
          <div className="review-badge" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
            Built for every clinical specialty
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          fontWeight: 900,
          color: 'var(--salvia-primary)',
          lineHeight: 1.1,
          letterSpacing: '-0.04em',
          marginBottom: '2rem',
          maxWidth: '1000px'
        }}>
          Clinical compliance, <br />
          <div className="headline-cycler">
            <span
              key={phraseIdx}
              className={`headline-text ${isExiting ? 'headline-exit' : ''}`}
              style={{ position: 'relative', display: 'inline-block' }}
            >
              {phrases[phraseIdx]}
              <svg
                viewBox="0 0 400 60"
                style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: '-5%',
                  width: '110%',
                  height: 'auto',
                  zIndex: -1,
                  overflow: 'visible'
                }}
              >
                <path
                  d="M10,45 Q150,55 380,42"
                  fill="none"
                  stroke="#FF4E00"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(255,78,0,0.2))' }}
                />
              </svg>
            </span>
          </div>
        </h1>

        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
          color: 'var(--salvia-text-muted)',
          lineHeight: 1.6,
          maxWidth: '720px',
          margin: '0 auto 3rem auto'
        }}>
          Salvia turns a post-encounter voice note into a policy-checked, audit-locked
          clinical record — before anyone signs off. Link your <strong>compliance framework</strong>.
          Every note checks itself. Every record <strong>defends itself</strong>.
          Not a scribe — a <strong>compliance suite</strong>.
        </p>

        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center' }} className="mobile-stack">
          <Link to="/start" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', fontWeight: 700, textDecoration: 'none' }}>
            <div className="shimmer" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            Book a demo
          </Link>
        </div>

        {/* Responsive Previews */}
        <div style={{ position: 'relative', zIndex: 10, marginTop: '3rem' }}>
          <div className="hide-mobile">
            <DashboardPreview />
          </div>
          <div className="show-mobile" style={{ display: 'none' }}>
            <MobileDevicePreview />
          </div>
        </div>
      </div>
    </section>
  );
};
