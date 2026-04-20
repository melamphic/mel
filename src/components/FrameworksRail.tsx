import React from 'react';

const VERTICALS = [
  {
    name: 'Clinics',
    accent: '#FF4E00',
    frameworks: [
      { code: 'HIPAA', region: 'US' },
      { code: 'NABH', region: 'India' },
      { code: 'BESTPRACTICE', region: 'NZ' },
      { code: 'NHS IG Toolkit', region: 'UK' },
      { code: 'NDHM', region: 'India' },
      { code: 'RACGP Standards', region: 'AU' },
    ],
  },
  {
    name: 'Vets',
    accent: '#0EA5E9',
    frameworks: [
      { code: 'AVMA PLIT', region: 'US' },
      { code: 'VMR', region: 'NZ' },
      { code: 'RCVS', region: 'UK' },
      { code: 'AVA Code', region: 'AU' },
      { code: 'VCI', region: 'India' },
      { code: 'AAHA', region: 'US' },
    ],
  },
  {
    name: 'Dental',
    accent: '#7C3AED',
    frameworks: [
      { code: 'ADA CDT', region: 'US' },
      { code: 'GDC Standards', region: 'UK' },
      { code: 'DCA', region: 'AU' },
      { code: 'DCNZ', region: 'NZ' },
      { code: 'DCI', region: 'India' },
      { code: 'HIPAA', region: 'US' },
    ],
  },
  {
    name: 'Aged Care',
    accent: '#059669',
    frameworks: [
      { code: 'SIRS', region: 'AU' },
      { code: 'Aged Care Quality Standards', region: 'AU' },
      { code: 'CQC KLOEs', region: 'UK' },
      { code: 'Te Tiriti Standards', region: 'NZ' },
      { code: 'CMS MDS 3.0', region: 'US' },
      { code: 'ISO 9001', region: 'Global' },
    ],
  },
];

export const FrameworksRail: React.FC = () => (
  <section style={{
    padding: '6rem 0',
    position: 'relative',
    zIndex: 10,
  }}>
    <div className="container" style={{ maxWidth: '1200px' }}>

      {/* Header */}
      <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <span style={{
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--salvia-accent)',
        }}>
          Meet the frameworks
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1,
          color: 'var(--salvia-primary)',
          marginTop: '0.6rem',
          maxWidth: '760px',
          marginInline: 'auto',
        }}>
          Your rulebook. Our policy engine.
        </h2>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--salvia-text-muted)',
          lineHeight: 1.65,
          marginTop: '1rem',
          maxWidth: '620px',
          marginInline: 'auto',
        }}>
          Upload your standards once. Salvia turns them into enforceable clauses linked to the fields
          they govern — across every vertical you run.
        </p>
      </div>

      {/* 4-vertical grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.25rem',
      }} className="mobile-stack">
        {VERTICALS.map((v) => (
          <div key={v.name} style={{
            backgroundColor: '#fff',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '16px',
            padding: '1.75rem 1.5rem',
            boxShadow: '0 4px 12px rgba(25,56,46,0.03)',
            display: 'flex', flexDirection: 'column', gap: '1rem',
          }}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <div style={{ width: 10, height: 10, backgroundColor: v.accent, borderRadius: '3px', flexShrink: 0 }} />
              <h3 style={{
                fontSize: '1.15rem', fontWeight: 800,
                color: 'var(--salvia-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                {v.name}
              </h3>
            </div>

            {/* Frameworks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {v.frameworks.map((f) => (
                <div key={f.code} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #F1F5F9',
                }}>
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--salvia-primary)',
                    letterSpacing: '-0.01em',
                  }}>
                    {f.code}
                  </span>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '0.62rem',
                    fontWeight: 600,
                    color: 'var(--salvia-text-muted)',
                    backgroundColor: '#F8FAFC',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '4px',
                    letterSpacing: '0.02em',
                  }}>
                    {f.region}
                  </span>
                </div>
              ))}
            </div>

            <div style={{
              fontSize: '0.72rem',
              color: 'var(--salvia-text-muted)',
              marginTop: 'auto',
              paddingTop: '0.5rem',
            }}>
              + your own internal policies
            </div>
          </div>
        ))}
      </div>

      {/* Footer line */}
      <p style={{
        textAlign: 'center',
        fontSize: '0.9rem',
        color: 'var(--salvia-text-muted)',
        marginTop: '2.5rem',
        maxWidth: '640px',
        marginInline: 'auto',
      }}>
        Don't see yours? Upload the PDF. Salvia imports it into the policy engine and links clauses to
        your form fields.
      </p>
    </div>
  </section>
);
