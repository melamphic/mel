import React from 'react';

const SCRIBE_GIVES = [
  'A SOAP note from the visit audio',
  'A structured form field here and there',
  'A "looks about right" confidence score',
  'A copy-paste into your EHR',
];

const SALVIA_GIVES = [
  'A SOAP note — plus every field traced to its source line',
  'Your own forms, versioned, with evidence scoring',
  'A real policy-satisfaction check against your rulebook',
  'Flags surfaced before the note is signed, not during the audit',
  'An immutable record with hashed history and one-click export',
  'A governance timeline per patient, per clinic, per org',
];

export const ScribeVsSalvia: React.FC = () => (
  <section style={{
    padding: '6rem 0',
    backgroundColor: 'var(--salvia-bg)',
    position: 'relative',
    zIndex: 10,
  }}>
    <div className="container" style={{ maxWidth: '1100px' }}>

      {/* Eyebrow + headline */}
      <div style={{ marginBottom: '4rem', maxWidth: '760px' }}>
        <span style={{
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--salvia-accent)',
        }}>
          Scribe vs. Salvia
        </span>
        <h2 style={{
          fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
          fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.08,
          color: 'var(--salvia-primary)', marginTop: '0.7rem',
        }}>
          An AI scribe ends at the note.<br />
          <span style={{ color: 'var(--salvia-accent)' }}>Salvia starts there.</span>
        </h2>
      </div>

      {/* Two-column comparison */}
      <div className="scribe-vs-grid mobile-stack" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        backgroundColor: '#fff',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(25,56,46,0.04)',
      }}>

        {/* Left: what a scribe gives you */}
        <div className="scribe-vs-cell-left" style={{
          padding: '2.5rem 2.25rem',
          borderRight: '1px solid rgba(0,0,0,0.06)',
          backgroundColor: '#F8FAFC',
        }}>
          <div style={{
            fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--salvia-text-muted)',
            marginBottom: '0.75rem',
          }}>
            A typical AI scribe
          </div>
          <h3 style={{
            fontSize: '1.35rem', fontWeight: 700,
            color: 'var(--salvia-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            marginBottom: '1.5rem',
          }}>
            Gets you a note. Then stops.
          </h3>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {SCRIBE_GIVES.map((item) => (
              <li key={item} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                fontSize: '0.92rem',
                color: 'var(--salvia-text-muted)',
                lineHeight: 1.5,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ marginTop: '4px', flexShrink: 0, opacity: 0.6 }}>
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: what Salvia gives you */}
        <div style={{
          padding: '2.5rem 2.25rem',
          backgroundColor: '#fff',
          position: 'relative',
        }}>
          {/* Orange accent bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: 4, height: '100%',
            backgroundColor: 'var(--salvia-accent)',
          }} />
          <div style={{
            fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--salvia-accent)',
            marginBottom: '0.75rem',
          }}>
            Salvia — compliance suite
          </div>
          <h3 style={{
            fontSize: '1.35rem', fontWeight: 700,
            color: 'var(--salvia-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            marginBottom: '1.5rem',
          }}>
            Gets you a note that defends itself.
          </h3>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {SALVIA_GIVES.map((item) => (
              <li key={item} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                fontSize: '0.92rem',
                color: 'var(--salvia-primary)',
                lineHeight: 1.5,
                fontWeight: 500,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--salvia-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '4px', flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .scribe-vs-cell-left {
            border-right: none !important;
            border-bottom: 1px solid rgba(0,0,0,0.06) !important;
          }
        }
      `}</style>

      {/* Closing line */}
      <p style={{
        textAlign: 'center',
        fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
        color: 'var(--salvia-text-muted)',
        lineHeight: 1.55,
        marginTop: '3rem',
        maxWidth: '720px',
        marginInline: 'auto',
        fontStyle: 'italic',
      }}>
        If an auditor calls tomorrow, an AI scribe can't tell you which note has a problem.
        Salvia can — and can hand them the evidence before they finish the sentence.
      </p>
    </div>
  </section>
);
