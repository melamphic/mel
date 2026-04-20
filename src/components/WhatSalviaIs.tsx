import React from 'react';

// ── Tiny mock tiles ──────────────────────────────────────────────────
const AudioTile: React.FC = () => {
  const bars = [14, 22, 32, 20, 38, 28, 44, 30, 38, 24, 34, 28];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '48px', padding: '0 0.25rem' }}>
      {bars.map((h, i) => (
        <div key={i} style={{
          flex: 1, height: `${h}px`,
          backgroundColor: i < 8 ? '#FF4E00' : '#CBD5E1',
          opacity: i < 8 ? 1 : 0.55,
          borderRadius: '1.5px',
        }} />
      ))}
    </div>
  );
};

const FormTile: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '0.25rem 0.1rem' }}>
    {[
      { w: '70%', c: '#0F172A' },
      { w: '55%', c: '#475569' },
      { w: '80%', c: '#FF4E00' },
      { w: '40%', c: '#475569' },
    ].map((r, i) => (
      <div key={i} style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '0.3rem 0.4rem',
        backgroundColor: i === 2 ? '#FFF7F2' : '#F8FAFC',
        borderRadius: '3px',
        border: i === 2 ? '1px solid rgba(255,78,0,0.25)' : '1px solid transparent',
      }}>
        <div style={{ width: 5, height: 5, backgroundColor: r.c, borderRadius: '50%' }} />
        <div style={{ width: r.w, height: 4, backgroundColor: r.c, opacity: 0.55, borderRadius: '2px' }} />
      </div>
    ))}
  </div>
);

const PolicyTile: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '0.25rem 0.1rem' }}>
    {[
      { tag: 'MUST', color: '#DC2626', bg: '#FEF2F2', w: '70%' },
      { tag: 'MUST', color: '#DC2626', bg: '#FEF2F2', w: '55%' },
      { tag: 'MAYBE', color: '#D97706', bg: '#FFFBEB', w: '65%' },
      { tag: 'TRY', color: '#059669', bg: '#ECFDF5', w: '45%' },
    ].map((r, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <div style={{
          fontSize: '0.48rem', fontWeight: 800, color: r.color, backgroundColor: r.bg,
          padding: '0.12rem 0.3rem', borderRadius: '2px', letterSpacing: '0.05em',
          width: 34, textAlign: 'center',
        }}>
          {r.tag}
        </div>
        <div style={{ flex: 1, height: 3, backgroundColor: '#CBD5E1', borderRadius: '2px', width: r.w }} />
      </div>
    ))}
  </div>
);

const AuditTile: React.FC = () => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: '4px', padding: '0.15rem 0',
  }}>
    <div style={{
      width: 46, height: 56,
      backgroundColor: '#fff',
      border: '1.5px solid #0F172A',
      borderRadius: '4px',
      position: 'relative',
      boxShadow: '2px 2px 0 #0F172A',
    }}>
      <div style={{ position: 'absolute', top: 6, left: 6, right: 6, height: 2, backgroundColor: '#CBD5E1', borderRadius: 1 }} />
      <div style={{ position: 'absolute', top: 12, left: 6, right: 12, height: 2, backgroundColor: '#CBD5E1', borderRadius: 1 }} />
      <div style={{ position: 'absolute', top: 18, left: 6, right: 10, height: 2, backgroundColor: '#CBD5E1', borderRadius: 1 }} />
      <div style={{
        position: 'absolute', bottom: -8, right: -6,
        width: 22, height: 22, borderRadius: '50%',
        backgroundColor: '#FF4E00',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: '0.55rem', fontWeight: 800,
        boxShadow: '0 2px 6px rgba(255,78,0,0.35)',
      }}>
        ✓
      </div>
    </div>
    <div style={{
      fontFamily: 'monospace', fontSize: '0.52rem', fontWeight: 600,
      color: '#94A3B8', letterSpacing: '0.05em', marginTop: '6px',
    }}>
      SHA 7f3a…
    </div>
  </div>
);

const Arrow: React.FC = () => (
  <svg width="28" height="16" viewBox="0 0 28 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M1 8 H22 M17 3 L22 8 L17 13" stroke="#FF4E00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Main section ─────────────────────────────────────────────────────
export const WhatSalviaIs: React.FC = () => {
  const tiles = [
    { label: 'Audio', sub: 'Voice note', ui: <AudioTile /> },
    { label: 'Forms', sub: 'AI-filled fields', ui: <FormTile /> },
    { label: 'Policy', sub: 'Your rulebook', ui: <PolicyTile /> },
    { label: 'Audit Pack', sub: 'Sealed + signed', ui: <AuditTile /> },
  ];

  return (
    <section style={{
      padding: '5rem 0 6rem',
      position: 'relative',
      zIndex: 10,
    }}>
      <div className="container" style={{ maxWidth: '1060px' }}>

        {/* Eyebrow */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--salvia-accent)',
          marginBottom: '1.5rem',
        }}>
          <div style={{ width: 18, height: 2, backgroundColor: 'var(--salvia-accent)', borderRadius: '1px' }} />
          What Salvia is
          <div style={{ width: 18, height: 2, backgroundColor: 'var(--salvia-accent)', borderRadius: '1px' }} />
        </div>

        {/* Hero statement */}
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          lineHeight: 1.1,
          color: 'var(--salvia-primary)',
          textAlign: 'center',
          maxWidth: '880px',
          margin: '0 auto 1.5rem',
        }}>
          <span style={{ color: 'var(--salvia-accent)' }}>AI clinical documentation</span> for clinics,
          vets, dental practices, and aged care — built as a <em style={{ fontStyle: 'normal', textDecoration: 'underline', textDecorationColor: 'var(--salvia-accent)', textDecorationThickness: '3px', textUnderlineOffset: '6px' }}>compliance suite</em>, not a scribe.
        </h2>

        {/* Two-paragraph explainer */}
        <div style={{ maxWidth: '720px', margin: '0 auto 3.5rem', textAlign: 'center' }}>
          <p style={{
            fontSize: 'clamp(1rem, 1.6vw, 1.1rem)',
            color: 'var(--salvia-text-muted)',
            lineHeight: 1.7,
            margin: '0 0 1rem',
          }}>
            Staff picks the subject, records a voice note, and selects the forms to fill. Salvia
            transcribes the audio, drops evidence into each field with a confidence score, and — if
            the form has a linked policy — runs the policy check automatically.
          </p>
          <p style={{
            fontSize: 'clamp(1rem, 1.6vw, 1.1rem)',
            color: 'var(--salvia-text-muted)',
            lineHeight: 1.7,
            margin: 0,
          }}>
            Other AI scribes end at the note. Salvia keeps going — every record is versioned,
            edit-tracked, compliance-checked, and audit-ready the moment it's approved.
          </p>
        </div>

        {/* The equation — 4 tiles with arrows */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: '20px',
          padding: '2.25rem 2rem',
          boxShadow: '0 8px 32px rgba(25,56,46,0.05)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)',
            backgroundColor: 'var(--salvia-primary)',
            color: '#fff',
            fontSize: '0.62rem', fontWeight: 800,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            padding: '0.4rem 0.9rem', borderRadius: '999px',
            whiteSpace: 'nowrap',
          }}>
            The Salvia stack
          </div>

          <div className="salvia-equation" style={{
            display: 'flex', alignItems: 'stretch', justifyContent: 'space-between',
            gap: '0.5rem',
          }}>
            {tiles.map((t, i) => (
              <React.Fragment key={t.label}>
                <div style={{
                  flex: 1,
                  display: 'flex', flexDirection: 'column',
                  padding: '0.75rem 0.5rem 1rem',
                  minWidth: 0,
                }}>
                  <div style={{
                    fontSize: '0.58rem', fontWeight: 800,
                    color: 'var(--salvia-text-muted)',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    textAlign: 'center', marginBottom: '0.5rem',
                  }}>
                    Step {i + 1}
                  </div>

                  {/* mock UI */}
                  <div style={{
                    backgroundColor: '#FAFBFC',
                    border: '1px solid #F1F5F9',
                    borderRadius: '10px',
                    padding: '0.75rem 0.6rem',
                    minHeight: '96px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    marginBottom: '0.85rem',
                  }}>
                    {t.ui}
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '0.95rem', fontWeight: 800,
                      color: 'var(--salvia-primary)',
                      letterSpacing: '-0.02em',
                    }}>
                      {t.label}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--salvia-text-muted)',
                      marginTop: '0.15rem',
                    }}>
                      {t.sub}
                    </div>
                  </div>
                </div>

                {i < tiles.length - 1 && (
                  <div className="salvia-eq-arrow" style={{
                    display: 'flex', alignItems: 'center',
                  }}>
                    <Arrow />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* What it's NOT line */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          marginTop: '2.25rem',
          flexWrap: 'wrap',
          fontSize: '0.85rem',
          color: 'var(--salvia-text-muted)',
          textAlign: 'center',
        }}>
          <span style={{ color: '#94A3B8', textDecoration: 'line-through', textDecorationColor: '#CBD5E1' }}>
            Not a bedside dictation app.
          </span>
          <span style={{ color: '#94A3B8', textDecoration: 'line-through', textDecorationColor: '#CBD5E1' }}>
            Not a SOAP-only scribe.
          </span>
          <span style={{ color: '#94A3B8', textDecoration: 'line-through', textDecorationColor: '#CBD5E1' }}>
            Not just transcription.
          </span>
          <span style={{ fontWeight: 700, color: 'var(--salvia-primary)' }}>
            → A compliance-grade documentation suite.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .salvia-equation {
            flex-direction: column !important;
            gap: 0.75rem !important;
          }
          .salvia-eq-arrow {
            justify-content: center !important;
            transform: rotate(90deg);
          }
        }
      `}</style>
    </section>
  );
};
