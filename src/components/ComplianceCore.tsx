import React from 'react';
import { ParticleSphere } from './ParticleSphere';

const CHIPS = ['Consent', 'Drug register', 'Pain · NPRS', 'Incidents', 'Witness', 'Policy checks', '31 report templates'];

export const ComplianceCore: React.FC = () => (
  <section style={{ padding: '6rem 0', backgroundColor: 'var(--salvia-surface)', position: 'relative', zIndex: 10, overflow: 'hidden' }}>
    <style>{`
      .core-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
      @media (max-width: 860px) { .core-grid { grid-template-columns: 1fr; text-align: center; } .core-chips { justify-content: center; } }
    `}</style>
    <div className="container" style={{ maxWidth: '1080px' }}>
      <div className="core-grid">
        <div>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--salvia-accent)' }}>One compliance core</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.1rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--salvia-primary)', margin: '0.7rem 0 1rem', lineHeight: 1.08 }}>
            Every record orbits one protected core
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--salvia-text-muted)', lineHeight: 1.6, maxWidth: '460px' }}>
            Consent, drugs, pain and incidents are captured as typed widgets, checked against your
            policies, then spun out as signed, audit-ready reports — all from one spoken note.
          </p>
          <div className="core-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.75rem' }}>
            {CHIPS.map((c) => (
              <span key={c} style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--salvia-primary)', backgroundColor: 'var(--salvia-bg)', padding: '0.4rem 0.85rem', borderRadius: '999px', border: '1px solid rgba(15,23,42,0.08)' }}>{c}</span>
            ))}
          </div>
        </div>
        <ParticleSphere />
      </div>
    </div>
  </section>
);
