// Reusable content sections used across vertical pages (vet, dental,
// general practice, allied disciplines, allied umbrella). Each
// section takes an accent colour so the vertical's brand bleeds
// through. Pages can include or omit any section.

import { Link } from 'react-router-dom';

const accentSoftFor = (accent: string) => `${accent}12`; // ~7% alpha
const accentBorderFor = (accent: string) => `${accent}33`; // ~20% alpha

interface AccentProps {
  accent: string;
}

// ── How it works — 3-step workflow ──────────────────────────────
interface WorkflowSectionProps extends AccentProps {
  verticalLabel: string;
  audioStepCopy?: string;
  signOffStepCopy?: string;
}

export function WorkflowSection({
  accent,
  verticalLabel,
  audioStepCopy,
  signOffStepCopy,
}: WorkflowSectionProps) {
  const steps = [
    {
      n: '1',
      title: 'Speak the encounter',
      desc: audioStepCopy ?? `After the encounter, leave a brief voice note. 30 seconds to a few minutes — natural language, no template-bashing.`,
    },
    {
      n: '2',
      title: 'AI structures the record',
      desc: `Deepgram nova-3 (or Gemini in dev) transcribes the audio. Salvia maps it to the structured fields your framework requires — every value linked to the exact source line.`,
    },
    {
      n: '3',
      title: 'Review and sign',
      desc: signOffStepCopy ?? `You review the structured note in seconds. Sign it. It becomes part of the immutable audit trail with your registration number attached.`,
    },
  ];

  return (
    <section style={{
      padding: '7rem 0',
      backgroundColor: '#fff',
      borderTop: '1px solid #F1F5F9',
    }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 800, color: accent,
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem',
          }}>
            How it works
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800,
            color: 'var(--salvia-primary)', letterSpacing: '-0.03em', margin: 0,
          }}>
            From voice note to audit-ready record.
          </h2>
          <p style={{
            color: 'var(--salvia-text-muted)', fontSize: '1rem',
            maxWidth: '600px', margin: '0.75rem auto 0', lineHeight: 1.65,
          }}>
            Same loop, every {verticalLabel.toLowerCase()} encounter. Under two minutes from the end of the consult to a signed record.
          </p>
        </div>

        <div
          className="workflow-grid mobile-stack"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            position: 'relative',
          }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                padding: '2.25rem 2rem',
                borderRadius: '20px',
                backgroundColor: '#FAFBFC',
                border: '1px solid #EEF2F6',
                position: 'relative',
              }}
            >
              <div style={{
                position: 'absolute', top: '-18px', left: '2rem',
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: accent, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: '0.95rem',
                boxShadow: `0 8px 16px ${accent}30`,
              }}>{s.n}</div>
              <h3 style={{
                fontSize: '1.05rem', fontWeight: 800,
                color: 'var(--salvia-primary)',
                marginTop: '0.5rem', marginBottom: '0.65rem',
              }}>{s.title}</h3>
              <p style={{
                fontSize: '0.88rem', color: 'var(--salvia-text-muted)',
                lineHeight: 1.65, margin: 0,
              }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Stats / Trust bar ────────────────────────────────────────────
interface StatsBarProps extends AccentProps {
  stats?: Array<{ value: string; label: string }>;
}

const DEFAULT_STATS = [
  { value: '< 2 min', label: 'Voice note to signed record' },
  { value: 'Immutable', label: 'Every edit version locked' },
  { value: 'Framework-aware', label: 'Generated against your regulator' },
  { value: 'AES-256', label: 'At-rest encryption' },
];

export function StatsBar({ accent, stats = DEFAULT_STATS }: StatsBarProps) {
  return (
    <section style={{
      padding: '4rem 0',
      backgroundColor: 'var(--salvia-bg)',
      borderTop: '1px solid #F1F5F9',
      borderBottom: '1px solid #F1F5F9',
    }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div
          className="stats-grid mobile-stack"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{
              textAlign: 'center',
              padding: '0 1rem',
              borderLeft: i === 0 ? 'none' : '1px solid rgba(15,23,42,0.08)',
            }}>
              <div style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                fontWeight: 900, color: accent,
                letterSpacing: '-0.03em', lineHeight: 1.1,
                marginBottom: '0.4rem',
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: '0.78rem', fontWeight: 600,
                color: 'var(--salvia-text-muted)',
                lineHeight: 1.4,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Before vs After comparison ───────────────────────────────────
interface BeforeAfterProps extends AccentProps {
  beforeLines: string[];
  afterLines: string[];
  beforeHeading?: string;
  afterHeading?: string;
}

export function BeforeAfter({
  accent,
  beforeLines,
  afterLines,
  beforeHeading = 'Before Salvia',
  afterHeading = 'With Salvia',
}: BeforeAfterProps) {
  return (
    <section style={{
      padding: '7rem 0',
      backgroundColor: 'var(--salvia-bg)',
      borderTop: '1px solid #F1F5F9',
    }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 800, color: accent,
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem',
          }}>
            What changes
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800,
            color: 'var(--salvia-primary)', letterSpacing: '-0.03em', margin: 0,
          }}>
            Same workflow. Better records.
          </h2>
        </div>

        <div
          className="ba-grid mobile-stack"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
          }}
        >
          {/* Before */}
          <div style={{
            padding: '2.25rem 2rem',
            borderRadius: '20px',
            backgroundColor: '#fff',
            border: '1px solid #EEF2F6',
          }}>
            <div style={{
              fontSize: '0.7rem', fontWeight: 800,
              color: 'var(--salvia-text-muted)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              {beforeHeading}
            </div>
            <ul style={{
              listStyle: 'none', padding: 0, margin: 0,
              display: 'flex', flexDirection: 'column', gap: '0.85rem',
            }}>
              {beforeLines.map((line, i) => (
                <li key={i} style={{
                  display: 'flex', gap: '0.65rem', alignItems: 'flex-start',
                  fontSize: '0.9rem', color: 'var(--salvia-text)', lineHeight: 1.55,
                }}>
                  <span style={{
                    flexShrink: 0, color: 'rgba(15,23,42,0.35)',
                    fontWeight: 900, marginTop: '1px',
                  }}>×</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div style={{
            padding: '2.25rem 2rem',
            borderRadius: '20px',
            backgroundColor: '#fff',
            border: `1.5px solid ${accentBorderFor(accent)}`,
            boxShadow: `0 8px 24px ${accent}10`,
          }}>
            <div style={{
              fontSize: '0.7rem', fontWeight: 800,
              color: accent,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              {afterHeading}
            </div>
            <ul style={{
              listStyle: 'none', padding: 0, margin: 0,
              display: 'flex', flexDirection: 'column', gap: '0.85rem',
            }}>
              {afterLines.map((line, i) => (
                <li key={i} style={{
                  display: 'flex', gap: '0.65rem', alignItems: 'flex-start',
                  fontSize: '0.9rem', color: 'var(--salvia-text)', lineHeight: 1.55,
                  fontWeight: 500,
                }}>
                  <span style={{
                    flexShrink: 0, color: accent,
                    fontWeight: 900, marginTop: '1px',
                  }}>✓</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Honest scope — what we don't do ─────────────────────────────
interface HonestScopeProps extends AccentProps {
  doLines: string[];
  dontLines: string[];
}

export function HonestScope({ accent, doLines, dontLines }: HonestScopeProps) {
  return (
    <section style={{
      padding: '7rem 0',
      backgroundColor: '#fff',
      borderTop: '1px solid #F1F5F9',
    }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 800, color: accent,
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem',
          }}>
            Honest scope
          </div>
          <h2 style={{
            fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)', fontWeight: 800,
            color: 'var(--salvia-primary)', letterSpacing: '-0.03em', margin: 0,
          }}>
            What Salvia does — and what it doesn't.
          </h2>
          <p style={{
            color: 'var(--salvia-text-muted)', fontSize: '0.95rem',
            maxWidth: '600px', margin: '0.75rem auto 0', lineHeight: 1.65,
          }}>
            We do one thing well. We say so up front so you don't buy us expecting something we're not.
          </p>
        </div>

        <div
          className="scope-grid mobile-stack"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
          }}
        >
          <div style={{
            padding: '2rem 2.25rem',
            borderRadius: '20px',
            backgroundColor: accentSoftFor(accent),
            border: `1px solid ${accentBorderFor(accent)}`,
          }}>
            <div style={{
              fontSize: '0.7rem', fontWeight: 800, color: accent,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              We do
            </div>
            <ul style={{
              listStyle: 'none', padding: 0, margin: 0,
              display: 'flex', flexDirection: 'column', gap: '0.7rem',
            }}>
              {doLines.map((line, i) => (
                <li key={i} style={{
                  fontSize: '0.9rem', color: 'var(--salvia-text)', lineHeight: 1.55,
                  display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
                }}>
                  <span style={{ color: accent, fontWeight: 900 }}>✓</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            padding: '2rem 2.25rem',
            borderRadius: '20px',
            backgroundColor: '#FAFBFC',
            border: '1px solid #EEF2F6',
          }}>
            <div style={{
              fontSize: '0.7rem', fontWeight: 800,
              color: 'var(--salvia-text-muted)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              We don't
            </div>
            <ul style={{
              listStyle: 'none', padding: 0, margin: 0,
              display: 'flex', flexDirection: 'column', gap: '0.7rem',
            }}>
              {dontLines.map((line, i) => (
                <li key={i} style={{
                  fontSize: '0.9rem', color: 'var(--salvia-text-muted)', lineHeight: 1.55,
                  display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
                }}>
                  <span style={{ color: 'rgba(15,23,42,0.3)', fontWeight: 900 }}>—</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Pricing teaser strip ────────────────────────────────────────
interface PricingTeaserProps extends AccentProps {
  fromPriceCopy?: string;
  vertical?: string;
}

export function PricingTeaser({ accent, fromPriceCopy, vertical }: PricingTeaserProps) {
  return (
    <section style={{
      padding: '5rem 0',
      backgroundColor: 'var(--salvia-bg)',
      borderTop: '1px solid #F1F5F9',
    }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        <div style={{
          padding: '2.5rem',
          borderRadius: '24px',
          background: `linear-gradient(135deg, #fff 0%, ${accentSoftFor(accent)} 100%)`,
          border: `1px solid ${accentBorderFor(accent)}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '2rem', flexWrap: 'wrap',
        }} className="pricing-teaser-card">
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{
              fontSize: '0.72rem', fontWeight: 800, color: accent,
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem',
            }}>
              Practice plan
            </div>
            <h3 style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 800,
              color: 'var(--salvia-primary)', letterSpacing: '-0.02em', margin: '0 0 0.5rem',
            }}>
              {fromPriceCopy ?? 'Compliance-grade documentation, from ₹2,500/mo.'}
            </h3>
            <p style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', lineHeight: 1.55, margin: 0 }}>
              Up to 3 AI recording seats. Unlimited free seats for admin and reception. No credit card required to start.
            </p>
          </div>
          <Link to={vertical ? `/pricing?vertical=${vertical}` : '/pricing'} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: 'var(--salvia-primary)', color: '#fff',
            padding: '0.85rem 1.75rem', borderRadius: '12px',
            fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            See full pricing
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
