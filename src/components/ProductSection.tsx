import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsIndia } from '../lib/market';

const productsFor = (isIndia: boolean) => [
  {
    id: 'form',
    label: 'FORM ENGINE',
    title: 'Your forms. Your fields. Your words.',
    subtitle: 'Build the exact clinical forms your team already uses — inspired by Google Forms, but with rich field types, per-field AI prompts, and real version control. Every change is a major/minor/patch bump, every rollback is logged.',
    bullets: [
      'Rich field types: text, sliders, images, button groups, percentages',
      'Per-field AI prompts for precise audio-to-form output',
      'Semantic versioning with full edit history — forms never get deleted, only retired',
    ],
    cta: 'EXPLORE FORM ENGINE'
  },
  {
    id: 'policy',
    label: 'POLICY ENGINE',
    title: 'Your rulebook, turned into enforceable clauses.',
    subtitle: 'Block-based policy editor (think Notion, but for compliance). Upload your existing PDFs and Salvia imports them. Mark clauses as must-follow, maybe-follow, or try-to-follow — then link them to the forms they govern.',
    bullets: [
      isIndia ? 'Built-in frameworks: DPDP, NABH, ABDM, Clinical Establishments Act' : 'Built-in frameworks: CQC, GDC, RCVS, AHPRA — and your own SOPs',
      'Upload your own policy docs — Salvia converts them into editable blocks',
      'Clause parity tagging: High / Medium / Low enforceability',
    ],
    cta: 'EXPLORE POLICY ENGINE'
  },
  {
    id: 'audio',
    label: 'AUDIO → FORMS',
    title: 'Go home when the patient does.',
    subtitle: isIndia
      ? 'Record the visit in any Indian language. Deepgram Nova Medical transcribes the audio. Our AI maps the transcript into your forms — with evidence scoring so every field traces back to the exact words that generated it.'
      : 'Record the visit in any language. Deepgram Nova Medical transcribes the audio. Our AI maps the transcript into your forms — with evidence scoring so every field traces back to the exact words that generated it.',
    bullets: [
      'Deterministic confidence scoring per field',
      'Every value tagged with source line + transformation type',
      'Human-in-the-loop review step before any note is published',
    ],
    cta: 'EXPLORE AUDIO CAPTURE'
  }
];

// ── Window chrome frame shared across mock UIs ─────────────────────────────
const MockWindow: React.FC<{ title: string; subtitle?: string; accent?: string; children: React.ReactNode }> = ({ title, subtitle, accent = '#FF4E00', children }) => (
  <div style={{
    backgroundColor: '#fff',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-3)',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '640px',
    fontFamily: 'inherit',
  }}>
    <div style={{
      padding: '0.7rem 1rem',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex', alignItems: 'center', gap: '0.75rem',
      backgroundColor: '#FAFBFC',
    }}>
      <div style={{ display: 'flex', gap: '0.35rem' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#28C840' }} />
      </div>
      <div style={{ flex: 1, textAlign: 'left', marginLeft: '0.5rem' }}>
        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--salvia-primary)', letterSpacing: '-0.01em' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 'var(--text-2xs)', color: '#94A3B8', marginTop: '1px' }}>{subtitle}</div>}
      </div>
      <div style={{
        fontSize: 'var(--text-2xs)', fontWeight: 700,
        color: accent, backgroundColor: `${accent}12`,
        padding: '0.22rem 0.55rem', borderRadius: 'var(--salvia-radius-full)',
        letterSpacing: '0.05em',
      }}>
        LIVE
      </div>
    </div>
    <div style={{ padding: '1.1rem 1.2rem' }}>{children}</div>
  </div>
);

// ── FORM ENGINE mock — a form editor ─────────────────────────────────────
const FormEngineMock: React.FC = () => {
  const isIndia = useIsIndia();
  const fields = [
    { label: 'Patient ID (ABHA)', type: 'Text', required: true, hint: 'Auto-linked' },
    { label: 'Vitals · BP/HR', type: 'Number', required: true, hint: 'auto-validated' },
    { label: 'Presenting symptoms', type: 'Long text', required: true, hint: 'AI: pulls from audio' },
    { label: 'Pain score', type: 'Slider', required: false, hint: '0–10' },
    { label: 'Treatment plan', type: 'Button group', required: true, hint: 'AI: multi-select ok' },
  ];
  return (
    <MockWindow title="OPD consult form" subtitle={`v4.2 · draft · linked to ${isIndia ? 'NABH §4.1–§4.3' : 'policy §4.1–§4.3'}`}>
      {/* Field list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1rem' }}>
        {fields.map((f, i) => (
          <div key={f.label} style={{
            display: 'grid', gridTemplateColumns: '14px 1fr 90px 70px', gap: '0.75rem',
            alignItems: 'center', padding: '0.65rem 0.75rem',
            border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)',
            backgroundColor: i === 2 ? '#FFF7F2' : '#fff',
            boxShadow: i === 2 ? 'inset 0 0 0 1px rgba(255,78,0,0.25)' : 'none',
          }}>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 2,
              color: '#CBD5E1',
            }}>
              <div style={{ width: 10, height: 1.5, backgroundColor: 'currentColor', borderRadius: 1 }} />
              <div style={{ width: 10, height: 1.5, backgroundColor: 'currentColor', borderRadius: 1 }} />
              <div style={{ width: 10, height: 1.5, backgroundColor: 'currentColor', borderRadius: 1 }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--salvia-primary)', letterSpacing: '-0.01em' }}>
                {f.label} {f.required && <span style={{ color: 'var(--salvia-accent)' }}>*</span>}
              </div>
              <div style={{ fontSize: 'var(--text-2xs)', color: '#94A3B8', marginTop: '1px' }}>
                {f.hint}
              </div>
            </div>
            <div style={{
              fontSize: 'var(--text-2xs)', fontWeight: 700,
              color: 'var(--salvia-text-muted)', backgroundColor: '#F8FAFC',
              padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)',
              textAlign: 'center', letterSpacing: '0.02em',
            }}>
              {f.type}
            </div>
            <div style={{
              fontSize: 'var(--text-2xs)', fontWeight: 600,
              color: i === 2 ? 'var(--salvia-accent)' : '#94A3B8',
              textAlign: 'right', letterSpacing: '0.02em',
            }}>
              {i === 2 ? 'AI PROMPT' : `field·${i + 1}`}
            </div>
          </div>
        ))}
      </div>

      {/* Version bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0.65rem 0.75rem', borderTop: '1px dashed var(--border-strong)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-2xs)', color: 'var(--salvia-text-muted)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          <span><strong style={{ color: 'var(--salvia-primary)' }}>v4.2</strong> · 17 revisions · last: 2h ago</span>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <div style={{
            fontSize: 'var(--text-2xs)', fontWeight: 700, color: 'var(--salvia-text-muted)',
            padding: '0.3rem 0.6rem', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-sm)',
          }}>
            Preview PDF
          </div>
          <div style={{
            fontSize: 'var(--text-2xs)', fontWeight: 700, color: '#fff',
            padding: '0.3rem 0.65rem', backgroundColor: 'var(--salvia-accent)', borderRadius: 'var(--radius-sm)',
          }}>
            Publish v4.3
          </div>
        </div>
      </div>
    </MockWindow>
  );
};

// ── POLICY ENGINE mock — a block-based policy doc ────────────────────────
const PolicyEngineMock: React.FC = () => {
  const isIndia = useIsIndia();
  const clauses = [
    { parity: 'MUST', text: 'Record patient ID, vitals, and presenting complaint on every visit.', forms: 4 },
    { parity: 'MUST', text: 'Patient consent is required for any Schedule H1 medication prescribed.', forms: 2 },
    { parity: 'MAYBE', text: 'Pain score should be documented using a validated 0–10 scale.', forms: 3 },
    { parity: 'TRY', text: 'Photographs of visible conditions are preferred when practical.', forms: 1 },
  ];
  const parityColor = (p: string) => p === 'MUST' ? 'var(--salvia-error)' : p === 'MAYBE' ? 'var(--salvia-warning)' : 'var(--accent-dental)';
  const parityBg = (p: string) => p === 'MUST' ? '#FEF2F2' : p === 'MAYBE' ? '#FFFBEB' : '#ECFDF5';

  return (
    <MockWindow title={isIndia ? 'NABH Clinical Records' : 'Clinical Records'} subtitle="v12.2 · linked to 4 forms · imported from PDF" accent="#0EA5E9">
      {/* Section heading */}
      <div style={{ textAlign: 'left', marginBottom: '0.75rem' }}>
        <div className="eyebrow" style={{ color: '#94A3B8' }}>
          § 4. Record-keeping requirements
        </div>
      </div>

      {/* Clauses */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {clauses.map((c, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '70px 1fr auto', gap: '0.75rem',
            alignItems: 'center',
            padding: '0.75rem 0.85rem',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: '#fff',
          }}>
            <div style={{
              fontSize: 'var(--text-2xs)', fontWeight: 800,
              color: parityColor(c.parity),
              backgroundColor: parityBg(c.parity),
              padding: '0.28rem 0.45rem',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center', letterSpacing: '0.06em',
            }}>
              {c.parity}<br />FOLLOW
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--salvia-primary)', lineHeight: 1.45, textAlign: 'left' }}>
              {c.text}
            </div>
            <div style={{
              fontSize: 'var(--text-2xs)', fontWeight: 700, color: 'var(--salvia-text-muted)',
              backgroundColor: '#F8FAFC', padding: '0.25rem 0.5rem',
              borderRadius: 'var(--salvia-radius-full)', whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }}>
              {c.forms} form{c.forms > 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0.65rem 0.25rem 0', marginTop: '0.75rem',
        borderTop: '1px dashed var(--border-strong)', paddingTop: '0.75rem',
      }}>
        <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--salvia-text-muted)' }}>
          <strong style={{ color: 'var(--salvia-primary)' }}>12 clauses</strong> · 4 must-follow · 6 maybe · 2 try
        </div>
        <div style={{
          fontSize: 'var(--text-2xs)', fontWeight: 700, color: '#fff',
          padding: '0.3rem 0.65rem', backgroundColor: 'var(--accent-vet)', borderRadius: 'var(--radius-sm)',
        }}>
          Link to forms
        </div>
      </div>
    </MockWindow>
  );
};

// ── AUDIO → FORMS mock — processing result view ──────────────────────────
const AudioFormsMock: React.FC = () => {
  const waveform = [18, 24, 34, 22, 40, 32, 46, 30, 38, 28, 44, 36, 50, 42, 34, 48, 30, 40, 26, 32, 38, 44, 30, 22, 36, 42, 28, 34, 46, 32];
  return (
    <MockWindow title="Processing · 0:42" subtitle="Deepgram Nova Medical · 96% avg confidence" accent="#FF4E00">
      {/* Waveform */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '3px',
        padding: '0.6rem 0.75rem', backgroundColor: '#F8FAFC',
        borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem',
        height: '56px',
      }}>
        {waveform.map((h, i) => (
          <div key={i} style={{
            flex: 1,
            height: `${h}px`,
            backgroundColor: i < 22 ? 'var(--salvia-accent)' : '#CBD5E1',
            borderRadius: '2px',
            opacity: i < 22 ? 1 : 0.6,
          }} />
        ))}
      </div>

      {/* Transcript with evidence highlights */}
      <div style={{
        padding: '0.75rem 0.9rem',
        backgroundColor: '#FFFBF7',
        borderLeft: '3px solid var(--salvia-accent)',
        borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--text-xs)',
        lineHeight: 1.6,
        color: '#334155',
        textAlign: 'left',
        marginBottom: '0.9rem',
        fontStyle: 'italic',
      }}>
        "Mr. Rakesh Nair, 54-year-old male, reports vomiting{' '}
        <mark style={{ backgroundColor: 'rgba(255,78,0,0.18)', color: 'var(--salvia-primary)', padding: '0 3px', borderRadius: 'var(--radius-sm)', fontStyle: 'normal', fontWeight: 600 }}>once daily for three days</mark>,
        partially digested food. Weight <mark style={{ backgroundColor: 'rgba(255,78,0,0.18)', color: 'var(--salvia-primary)', padding: '0 3px', borderRadius: 'var(--radius-sm)', fontStyle: 'normal', fontWeight: 600 }}>72 kilograms</mark>,
        temp <mark style={{ backgroundColor: 'rgba(255,78,0,0.18)', color: 'var(--salvia-primary)', padding: '0 3px', borderRadius: 'var(--radius-sm)', fontStyle: 'normal', fontWeight: 600 }}>38.6°C</mark>..."
      </div>

      {/* Filled form fields with confidence + source */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {[
          { field: 'Complaint', value: 'Vomiting ×3 days', conf: 98, line: 'L1' },
          { field: 'Weight',    value: '72 kg',            conf: 99, line: 'L2' },
          { field: 'Temp',      value: '38.6°C',           conf: 99, line: 'L2' },
          { field: 'Assessment', value: 'Acute GI upset',  conf: 78, line: '—',  inferred: true },
        ].map((r) => (
          <div key={r.field} style={{
            display: 'grid', gridTemplateColumns: '80px 1fr 68px 40px', gap: '0.5rem',
            alignItems: 'center',
            padding: '0.55rem 0.7rem',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
          }}>
            <div style={{ fontSize: 'var(--text-2xs)', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'left' }}>
              {r.field}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--salvia-primary)', textAlign: 'left', letterSpacing: '-0.01em' }}>
              {r.value}
            </div>
            <div style={{
              fontSize: 'var(--text-2xs)', fontWeight: 700,
              color: r.conf >= 90 ? 'var(--accent-dental)' : 'var(--salvia-warning)',
              backgroundColor: r.conf >= 90 ? '#ECFDF5' : '#FFFBEB',
              padding: '0.2rem 0.45rem', borderRadius: 'var(--salvia-radius-full)',
              textAlign: 'center', letterSpacing: '0.02em',
            }}>
              {r.conf}%
            </div>
            <div style={{
              fontFamily: 'monospace',
              fontSize: 'var(--text-2xs)', fontWeight: 700,
              color: r.inferred ? 'var(--salvia-warning)' : 'var(--salvia-text-muted)',
              textAlign: 'right',
            }}>
              {r.line}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginTop: '0.9rem', paddingTop: '0.7rem',
        borderTop: '1px dashed var(--border-strong)',
      }}>
        <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--salvia-text-muted)' }}>
          1 field flagged for review · human-in-the-loop
        </div>
        <div style={{
          fontSize: 'var(--text-2xs)', fontWeight: 700, color: '#fff',
          padding: '0.3rem 0.65rem', backgroundColor: 'var(--salvia-accent)', borderRadius: 'var(--radius-sm)',
        }}>
          Review &amp; approve
        </div>
      </div>
    </MockWindow>
  );
};


export const ProductSection: React.FC = () => {
  const isIndia = useIsIndia();
  const products = productsFor(isIndia);
  const [activeTab, setActiveTab] = useState(0);

  const renderDiagram = () => {
    if (activeTab === 0) return <FormEngineMock />;
    if (activeTab === 1) return <PolicyEngineMock />;
    return <AudioFormsMock />;
  };

  return (
    <section id="products" className="mobile-pad-reduce" style={{ padding: 'var(--section-pad) 0', position: 'relative', zIndex: 10 }}>
      {/* NO WHITE BOX WRAPPER. It breathes openly on the background. */}
      <div className="container" style={{ maxWidth: '1400px' }}>

        {/* Streamlined Header - Just the title and the pill */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="eyebrow">
            The modules
          </div>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--salvia-primary)', marginTop: '0.6rem', letterSpacing: '-0.03em' }}>
            Three engines. One platform.
          </h2>
          <p style={{ color: 'var(--salvia-text-muted)', fontSize: 'var(--text-md)', lineHeight: 1.6, marginTop: '1rem', maxWidth: '620px', marginInline: 'auto' }}>
            Build the forms, upload the policies, feed in the audio. Salvia stitches them together into a
            single compliance-grade record.
          </p>

          {/* Segmented Control Pill — scrolls horizontally on mobile */}
          <div style={{ marginTop: '1.5rem', width: '100%', overflow: 'auto' }}>
            <div style={{ display: 'inline-flex', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: 'var(--salvia-radius-full)', padding: '0.5rem', boxShadow: 'var(--shadow-2)', border: '1px solid var(--border-subtle)' }}>
              {products.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(idx)}
                  className="product-tab"
                  style={{
                    backgroundColor: activeTab === idx ? '#F8FAFC' : 'transparent',
                    boxShadow: activeTab === idx ? 'inset 0 0 0 1px rgba(0,0,0,0.05)' : 'none',
                    color: activeTab === idx ? 'var(--salvia-text)' : '#94A3B8',
                    fontWeight: 700,
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.04em',
                    border: 'none',
                    padding: '0.85rem 2rem',
                    borderRadius: 'var(--salvia-radius-full)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    minWidth: '160px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Unified Two-Column Layout — stacks on mobile via .mobile-stack */}
          <div
            className="mobile-stack product-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
              gap: '0',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: 'var(--shadow-3)',
              border: '1px solid var(--border-subtle)',
              marginTop: '3rem',
            }}
          >
            {/* Left Diagram Column */}
            <div className="product-diagram-cell" style={{ background: 'radial-gradient(75% 60% at 22% 12%, rgba(255,78,0,0.20), transparent 60%), linear-gradient(150deg, var(--salvia-primary) 0%, #1E293B 100%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '3rem' }}>
              {renderDiagram()}
            </div>

            {/* Right Details Column */}
            <div className="product-details-cell" style={{ padding: '3.5rem 3.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
              <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>
                {products[activeTab].label}
              </div>
              <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--salvia-primary)', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {products[activeTab].title}
              </h3>
              <p style={{ color: 'var(--salvia-text-muted)', fontSize: 'var(--text-base)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                {products[activeTab].subtitle}
              </p>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3.5rem', padding: 0, margin: '0 0 3.5rem', listStyle: 'none' }}>
                {products[activeTab].bullets.map((bullet, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ color: 'var(--salvia-accent)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span style={{ color: 'var(--salvia-primary)', fontWeight: 500, fontSize: 'var(--text-base)' }}>{bullet}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={products[activeTab].id === 'audio' ? '/products/point-of-care-evidence' : (products[activeTab].id === 'form' ? '/products/statutory-form-infrastructure' : '/products/institutional-compliance-hub')}
                style={{ alignSelf: 'flex-start', textDecoration: 'none' }}
              >
                <button style={{
                  backgroundColor: 'var(--salvia-accent)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 'var(--text-sm)',
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                }}>
                  {products[activeTab].cta}
                </button>
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .product-grid { border-radius: var(--radius-lg) !important; margin-top: 2rem !important; }
            .product-diagram-cell { padding: 1.75rem !important; }
            .product-details-cell { padding: 2.5rem 1.75rem !important; }
          }
        `}</style>
      </div>
    </section>
  );
};
