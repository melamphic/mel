import React, { useState, useEffect } from 'react';
import { DashboardPreview } from './DashboardPreview';
import { MobileDevicePreview } from './MobileDevicePreview';

const audiences = ['Clinics', 'Vets', 'Dentists'];
const phrases = [
  'Automated Clinical Evidence.',
  'Statutory Audit Trails.',
  'Immutable Documentation.',
  'Adverse Inference Protection.',
  'Contemporaneous Record Capture.',
  'Protocol-Aligned Verification.',
  'Deterministic Data Mapping.',
  'Chain of Evidence Security.',
  'Regulatory Workflow Integrity.',
  'Professional Liability Defense.',
  'Audit-Ready Infrastructure.',
  'Human-in-the-Loop Validation.',
  'Algorithmic Fidelity.',
  'Clinical Risk Mitigation.',
  'Policy-Engine Connectivity.',
  'Versioned Evidence Assets.',
  'Defensive Record Logic.',
  'Statutory Compliance Hub.',
  'Unbroken Governance Trail.',
  'Institutional Accountability.'
];

export const Hero: React.FC = () => {
  const [audienceIdx, setAudienceIdx] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const audienceInterval = setInterval(() => {
      setAudienceIdx((prev) => (prev + 1) % audiences.length);
    }, 2500);

    const phraseInterval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setPhraseIdx((prev) => (prev + 1) % phrases.length);
        setIsExiting(false);
      }, 600); // Wait for exit animation
    }, 3200);

    return () => {
      clearInterval(audienceInterval);
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
            <div className="avatar-stack" style={{ marginRight: '0.5rem' }}>
              <img src="https://i.pravatar.cc/100?img=1" alt="Avatar 1" />
              <img src="https://i.pravatar.cc/100?img=2" alt="Avatar 2" />
              <img src="https://i.pravatar.cc/100?img=3" alt="Avatar 3" />
            </div>
            Trusted by Elite {audiences[audienceIdx]}
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
          Institutional Governance. <br />
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
          maxWidth: '700px',
          margin: '0 auto 3rem auto'
        }}>
          Close the memory gap with <strong>Point of Care Evidence Capture</strong>.
          Salvia provides the statutory infrastructure needed to guarantee defensible clinical records
          and unbroken institutional oversight across any domain.
        </p>

        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center' }} className="mobile-stack">
          <button className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', fontWeight: 700 }}>
            <div className="shimmer" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            Deploy Salvia
          </button>
          <button className="btn-secondary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', fontWeight: 700 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Audit the Engine
          </button>
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
