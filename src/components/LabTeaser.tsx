import React from 'react';
import { Link } from 'react-router-dom';

const FEATURED_QS = [
  { id: 'pajama-time', q: "Is it okay to finish clinical notes at home after my shift?" },
  { id: 'informed-refusal', q: "How can I prove a patient refused a diagnostic test?" },
  { id: 'copy-paste', q: "Why do I get flagged for copy-pasting SOAP notes?" }
];

export const LabTeaser: React.FC = () => {
  return (
    <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ 
            fontSize: '0.85rem', fontWeight: 800, color: 'var(--salvia-accent)', 
            letterSpacing: '0.12em', textTransform: 'uppercase' 
          }}>
            LATEST FROM THE BLOG
          </span>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, 
            color: 'var(--salvia-primary)', marginTop: '1rem', letterSpacing: '-0.03em' 
          }}>
            Critical Insights
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="mobile-stack">
          {FEATURED_QS.map(art => (
            <Link to={`/blog/${art.id}`} key={art.id} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '2rem',
                backgroundColor: '#fff',
                borderRadius: '16px',
                border: '1px solid rgba(15,23,42,0.06)',
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} className="lab-teaser-card">
                <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: 'var(--salvia-accent)', fontWeight: 700, marginBottom: '1rem' }}>
                  CLINICAL_INSIGHT // 2026
                </div>
                <h4 style={{ 
                  fontSize: '1.2rem', fontWeight: 700, 
                  color: 'var(--salvia-primary)', lineHeight: 1.3,
                  margin: 0
                }}>
                  {art.q}
                </h4>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link to="/blog" style={{ 
            color: 'var(--salvia-primary)', fontWeight: 700, 
            fontSize: '0.95rem', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
          }}>
            Read the Blog 
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        .lab-teaser-card:hover {
          background-color: #fff;
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(15,23,42,0.05);
          border-color: var(--salvia-accent);
        }
      `}</style>
    </section>
  );
};
