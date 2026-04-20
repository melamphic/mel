import React from 'react';

const STOPS = [
  {
    n: '1',
    tag: 'Start',
    title: 'Pick the subject',
    body: 'Select the patient, animal, or resident you just worked with. One tap, from staff or admin roles.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    n: '2',
    tag: 'Capture',
    title: 'Record what you did',
    body: 'Voice note, any length — post-encounter, not mid-visit. Keep it natural; talk it out in your own words.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
      </svg>
    ),
  },
  {
    n: '3',
    tag: 'Process',
    title: 'Pick 1–3 forms',
    body: 'Select the forms this note should fill. If a form has a policy linked to it, Salvia runs the compliance check automatically after fill-in.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="16" y2="14" />
        <line x1="8" y1="18" x2="12" y2="18" />
      </svg>
    ),
  },
  {
    n: '4',
    tag: 'Review',
    title: 'Review, edit, approve',
    body: 'Each field shows its confidence score and source line. Edit what needs fixing — every change is versioned. Then you (human-in-the-loop) approve it.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    ),
  },
  {
    n: '5',
    tag: 'Publish',
    title: 'Posted to the timeline',
    body: 'Record goes onto the subject\u2019s timeline, hashed and audit-locked. Edit history, policy trace, audio, transcript — all bundled into a one-click Audit Pack.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <rect x="8" y="12" width="8" height="6" rx="1" />
      </svg>
    ),
  },
];

export const DayWithSalvia: React.FC = () => (
  <section style={{
    padding: '6rem 0',
    position: 'relative',
    zIndex: 10,
    backgroundColor: 'var(--salvia-bg)',
  }}>
    <style>{`
      @media (max-width: 768px) {
        .day-grid { grid-template-columns: 1fr !important; }
        .day-connector { display: none !important; }
      }
    `}</style>
    <div className="container" style={{ maxWidth: '1200px' }}>

      {/* Header */}
      <div style={{ marginBottom: '3.5rem', maxWidth: '720px' }}>
        <span style={{
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--salvia-accent)',
        }}>
          How a note gets made
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1,
          color: 'var(--salvia-primary)', marginTop: '0.6rem',
        }}>
          Five steps. Voice note in, audit-locked record out.
        </h2>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--salvia-text-muted)',
          lineHeight: 1.65,
          marginTop: '1rem',
          maxWidth: '640px',
        }}>
          The staff member drives the whole loop — subject, audio, forms, review, approval —
          with Salvia handling the transcription, the form-fill, the compliance check, and the versioning
          in the background.
        </p>
      </div>

      {/* 5-stop strip */}
      <div
        className="day-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1rem',
          position: 'relative',
        }}
      >
        {STOPS.map((s, i) => (
          <div key={s.n} style={{ position: 'relative' }}>

            {/* Connector line */}
            {i < STOPS.length - 1 && (
              <div
                className="day-connector hide-mobile"
                style={{
                  position: 'absolute',
                  top: '24px', right: '-0.6rem',
                  width: '1.2rem', height: '1px',
                  backgroundColor: 'rgba(15,23,42,0.18)',
                  zIndex: 1,
                }}
              />
            )}

            <div style={{
              backgroundColor: '#fff',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '16px',
              padding: '1.5rem 1.35rem',
              boxShadow: '0 4px 12px rgba(25,56,46,0.03)',
              height: '100%',
              display: 'flex', flexDirection: 'column', gap: '0.8rem',
              position: 'relative',
            }}>
              {/* Icon + num */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '10px',
                  backgroundColor: i === 2 ? 'rgba(255,78,0,0.08)' : 'rgba(15,23,42,0.04)',
                  color: i === 2 ? 'var(--salvia-accent)' : 'var(--salvia-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {s.icon}
                </div>
                <span style={{
                  fontSize: '0.62rem', fontWeight: 700,
                  color: i === 2 ? 'var(--salvia-accent)' : 'var(--salvia-text-muted)',
                  backgroundColor: i === 2 ? 'rgba(255,78,0,0.08)' : '#F8FAFC',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '999px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  {s.tag}
                </span>
              </div>

              {/* Step number + title */}
              <div>
                <div style={{
                  fontSize: '0.66rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--salvia-text-muted)',
                  marginBottom: '0.35rem',
                }}>
                  Step {s.n}
                </div>
                <h3 style={{
                  fontSize: '1.05rem', fontWeight: 700,
                  color: 'var(--salvia-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  margin: 0,
                }}>
                  {s.title}
                </h3>
              </div>

              <p style={{
                fontSize: '0.84rem',
                color: 'var(--salvia-text-muted)',
                lineHeight: 1.55,
                margin: 0,
              }}>
                {s.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
