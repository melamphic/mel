import React from 'react';
import { useIsIndia } from '../lib/market';

// Capture is flexible, evidence is constant — the everyday half of the
// evidence story. Three ways in (ambient OPD, post-consult note,
// form-directed IP rounds); one ending (verified, sealed record).
// Reused on the landing page and /hospitals.

const MODES = (isIndia: boolean) => [
  {
    title: 'OPD — just talk',
    body: isIndia
      ? 'Mic on, consult as you always do — Malayalam, Hindi, English or all three in one sentence. The record builds itself while you work.'
      : 'Mic on, consult as you always do — in any language. The record builds itself while you work.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
      </svg>
    ),
  },
  {
    title: 'After the consult — 30 seconds',
    body: 'Prefer not to record the room? Speak a short note once the patient leaves. Same structured record, same timestamp discipline.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'IP rounds — speak into the form',
    body: 'On the ward, open the form the moment needs — a pain assessment, a drug entry — and speak. The fields fill; nothing waits for a desktop.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

export const CaptureModes: React.FC = () => {
  const isIndia = useIsIndia();
  return (
    <section className="section" style={{ position: 'relative', zIndex: 10 }}>
      <div className="container container--content">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1rem' }}>Capture, your way</span>
          <h2 style={{
            fontSize: 'var(--text-3xl)', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: 'var(--salvia-primary)', margin: '0 0 1rem',
          }}>
            Works the way your floor works.
          </h2>
          <p style={{ fontSize: 'var(--text-md)', color: 'var(--salvia-text-muted)', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto' }}>
            No hard rules about how your clinicians capture. Three ways in — one ending.
          </p>
        </div>

        <div className="cm-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.75rem' }}>
          {MODES(isIndia).map((m) => (
            <div key={m.title} style={{
              backgroundColor: '#fff',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-2)',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255,78,0,0.08)', color: 'var(--salvia-accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                {m.icon}
              </div>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.01em', marginBottom: '0.5rem' }}>
                {m.title}
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--salvia-text-muted)', lineHeight: 1.6, margin: 0 }}>
                {m.body}
              </p>
            </div>
          ))}
        </div>

        {/* The constant */}
        <div style={{
          backgroundColor: '#F8FAFC',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.75rem',
          display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap',
          justifyContent: 'center',
          fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--salvia-primary)',
        }}>
          <span>Every path ends the same:</span>
          <span style={{ color: 'var(--salvia-text-muted)', fontWeight: 500 }}>
            structured into the right form → <strong style={{ color: 'var(--salvia-primary)' }}>verified by your clinician</strong> → policy-checked → sealed.
            The original audio stays attached — replayable when memory is contested, retention under your control.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .cm-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
