import React from 'react';

const LAYERS = [
  {
    tier: '01',
    label: 'Scribe',
    tag: 'Table stakes',
    headline: 'AI turns audio into a clinical note.',
    body: 'What every AI scribe ships: transcription, form-fill, confidence scoring. Salvia does this with Deepgram Nova Medical + evidence-tagged field output — every value traceable back to the word in the transcript.',
    items: ['Audio → transcript', 'Transcript → structured form', 'Per-field confidence + source line'],
    accent: 'rgba(15,23,42,0.04)',
    border: 'rgba(15,23,42,0.08)',
    tagColor: '#475569',
  },
  {
    tier: '02',
    label: 'Compliance',
    tag: 'Our wedge',
    headline: 'Every note is checked against your policies — before it\'s signed.',
    body: 'This is the layer other scribes skip. Upload your rulebook (NABH, VMR, BESTPRACTICE, ADA, aged-care standards — whatever governs you), link clauses to form fields, and Salvia enforces them on every single record.',
    items: ['Policy engine (block-based, versioned)', 'Clause-to-field enforcement', 'Policy-satisfaction score per note', 'Flags surfaced at human-review step'],
    accent: 'rgba(255,78,0,0.06)',
    border: 'var(--salvia-accent)',
    tagColor: 'var(--salvia-accent)',
    highlight: true,
  },
  {
    tier: '03',
    label: 'Governance',
    tag: 'The outcome',
    headline: 'The record is locked, hashed, and audit-ready the moment it\'s published.',
    body: 'Every change is captured: who edited what, when, why. Rollbacks are a major version. Archive-not-delete. Timeline view per patient, per clinic, per org. Export the Audit Pack on demand.',
    items: ['Immutable timeline per subject', 'Full edit history (never deleted)', 'Versioned forms + policies', 'One-click Audit Pack export'],
    accent: 'rgba(15,23,42,0.04)',
    border: 'rgba(15,23,42,0.08)',
    tagColor: '#475569',
  },
];

export const ThreeLayers: React.FC = () => (
  <section style={{
    padding: '6rem 0',
    position: 'relative',
    zIndex: 10,
  }}>
    <div className="container" style={{ maxWidth: '1100px' }}>

      {/* Header */}
      <div style={{ marginBottom: '3.5rem', maxWidth: '680px' }}>
        <span style={{
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--salvia-accent)',
        }}>
          How we're different
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1,
          color: 'var(--salvia-primary)', marginTop: '0.6rem',
        }}>
          Three layers. Most scribes ship the first.
        </h2>
        <p style={{
          fontSize: '1.05rem', color: 'var(--salvia-text-muted)',
          lineHeight: 1.65, marginTop: '1rem', maxWidth: '620px',
        }}>
          Salvia contains what the AI scribe category sells — and keeps building until the record is
          defensible on its own.
        </p>
      </div>

      {/* Three stacked layer cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {LAYERS.map((L) => (
          <div
            key={L.tier}
            style={{
              backgroundColor: '#fff',
              border: `${L.highlight ? '2px' : '1px'} solid ${L.border}`,
              borderRadius: '20px',
              padding: '2.25rem 2.5rem',
              boxShadow: L.highlight
                ? '0 16px 40px rgba(255,78,0,0.08)'
                : '0 4px 12px rgba(25,56,46,0.03)',
              display: 'grid',
              gridTemplateColumns: '140px 1fr 1fr',
              gap: '2rem',
              alignItems: 'start',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="mobile-stack"
          >
            {/* Left: tier + label */}
            <div>
              <div style={{
                fontFamily: 'monospace', fontSize: '0.72rem', fontWeight: 700,
                color: 'var(--salvia-text-muted)', letterSpacing: '0.08em',
                marginBottom: '0.5rem',
              }}>
                {L.tier}
              </div>
              <div style={{
                fontSize: '1.8rem', fontWeight: 800,
                color: 'var(--salvia-primary)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: '0.75rem',
              }}>
                {L.label}
              </div>
              <div style={{
                display: 'inline-block',
                fontSize: '0.65rem', fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: L.tagColor,
                backgroundColor: L.accent,
                padding: '0.28rem 0.6rem',
                borderRadius: '999px',
              }}>
                {L.tag}
              </div>
            </div>

            {/* Middle: headline + body */}
            <div>
              <h3 style={{
                fontSize: '1.15rem', fontWeight: 700,
                color: 'var(--salvia-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
                marginBottom: '0.7rem',
              }}>
                {L.headline}
              </h3>
              <p style={{
                fontSize: '0.92rem',
                color: 'var(--salvia-text-muted)',
                lineHeight: 1.65,
                margin: 0,
              }}>
                {L.body}
              </p>
            </div>

            {/* Right: items */}
            <ul style={{
              listStyle: 'none', margin: 0, padding: 0,
              display: 'flex', flexDirection: 'column', gap: '0.55rem',
            }}>
              {L.items.map((item) => (
                <li key={item} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: 'var(--salvia-primary)',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={L.highlight ? 'var(--salvia-accent)' : 'var(--salvia-primary)'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '3px', flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);
