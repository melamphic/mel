import React, { useState, useEffect } from 'react';
import { DashboardPreview } from './DashboardPreview';

const audiences = ['Clinics', 'Vets', 'Dentists'];

export const Hero: React.FC = () => {
  const [audienceIdx, setAudienceIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAudienceIdx((prev) => (prev + 1) % audiences.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{
      padding: '4rem 0 0rem',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Social Proof Badge */}
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <div className="review-badge">
            <div className="avatar-stack" style={{ marginRight: '0.5rem' }}>
              <img src="https://i.pravatar.cc/100?img=1" alt="Avatar 1" />
              <img src="https://i.pravatar.cc/100?img=2" alt="Avatar 2" />
              <img src="https://i.pravatar.cc/100?img=3" alt="Avatar 3" />
            </div>
             Loved by {audiences[audienceIdx]}
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: '4.5rem',
          fontWeight: 600,
          marginBottom: '2rem',
          lineHeight: 1.15,
          color: 'var(--salvia-text)'
        }}>
          Stop documenting, <br />
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ position: 'relative', zIndex: 1 }}>start caring.</span>
            {/* Hand-drawn style circle highlight SVG */}
            <svg style={{ position: 'absolute', top: '-10%', left: '-5%', width: '110%', height: '120%', zIndex: 0 }} viewBox="0 0 200 60" preserveAspectRatio="none">
              <path d="M10,30 C30,10 170,10 190,30 C200,50 170,55 100,55 C30,55 0,40 10,25" fill="none" stroke="var(--salvia-accent)" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        
        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
          <button className="pill-button">
            Get Salvia now
          </button>
          <button className="pill-button-light">
            Discover Salvia
          </button>
        </div>

        {/* Centered Dashboard Preview overlaying the swoops */}
        <div style={{ position: 'relative', zIndex: 10, marginTop: '2rem', transform: 'translateY(10%)' }}>
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
};
