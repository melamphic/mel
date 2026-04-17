import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 'form',
    label: 'STATUTORY FORM INFRASTRUCTURE',
    title: 'Immutable clinical data architecture.',
    subtitle: 'High-stakes clinical forms engineered with statutory-grade versioning and immutable history. Built for organizations requiring total defensibility in legal and regulatory reviews.',
    bullets: [
      'Unbroken audit trails for every data field',
      'Immutable min/major/patch versioning system',
      'Protocol-aligned logic gates for zero-error capture'
    ],
    cta: 'EXPLORE INFRASTRUCTURE'
  },
  {
    id: 'policy',
    label: 'INSTITUTIONAL COMPLIANCE HUB',
    title: 'Codify governance. Enforce accountability.',
    subtitle: 'Institutionalize your organizational policies by mapping them directly to point-of-care data capture. Automated attestation tracking ensures staff compliance is a living reality, not a PDF.',
    bullets: [
      'Real-time regulatory mapping (NABH, VMR)',
      'Automated staff acknowledgment & attestation',
      'Audit-ready evidence generation in one click'
    ],
    cta: 'AUDIT THE HUB'
  },
  {
    id: 'audio',
    label: 'POINT OF CARE EVIDENCE CAPTURE',
    title: 'Ending the memory gap at the exam table.',
    subtitle: 'Point-of-care evidence recording eliminates the risk of delayed, inaccurate documentation. Salvia’s deterministic AI maps real-time audio to clinical forms while ensuring 100% human-verified fidelity.',
    bullets: [
      'Contemporaneous documentation standards',
      'Deterministic AI with zero-hallucination logic',
      'Eliminate adverse inference risk during audits'
    ],
    cta: 'DOCUMENT THE MOMENT'
  }
];

// Reusable DOM Diagram Card ensuring perfect typography and shadow rendering
const DiagramCard = ({ x, y, title, content, badge, type = 'input', highlight = false }: { x: number, y: number, title: string, content: string, badge?: string, type?: 'input' | 'output', highlight?: boolean }) => {
  return (
    <div style={{
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '1rem',
      minWidth: '140px',
      boxShadow: highlight ? '0 12px 40px rgba(255, 78, 0, 0.15), inset 0 0 0 2px var(--salvia-accent)' : '0 8px 30px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(0,0,0,0.02)',
      zIndex: 10,
    }}>
      {badge && (
        <div style={{
          position: 'absolute',
          top: '-12px',
          right: '-12px',
          backgroundColor: 'var(--salvia-text)',
          color: '#fff',
          fontSize: '0.65rem',
          fontWeight: 700,
          padding: '0.2rem 0.5rem',
          borderRadius: '4px',
          letterSpacing: '0.05em'
        }}>
          {badge}
        </div>
      )}

      {type === 'output' && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          backgroundColor: highlight ? 'var(--salvia-accent)' : '#0F172A',
          color: '#fff',
          fontSize: '0.65rem',
          fontWeight: 700,
          padding: '0.15rem 0.5rem',
          borderRadius: '99px',
          position: 'absolute',
          top: '-12px',
          right: '50%',
          transform: 'translateX(50%)',
          letterSpacing: '0.05em'
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          VALIDATED
        </div>
      )}

      <div style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--salvia-text-muted)', letterSpacing: '0.08em', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
        {title}
      </div>
      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--salvia-text)' }}>
        {content}
      </div>
    </div>
  );
};


export const ProductSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // High-fidelity conceptual diagrams utilizing HTML DOM rendering for the Cards
  const renderDiagram = () => {
    return (
      <div style={{ position: 'relative', width: '800px', height: '600px', transform: 'scale(0.85)' }}>

        {/* Deep SVG Architecture Layer - ONLY Connection Paths */}
        <svg width="800" height="600" viewBox="0 0 800 600" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {/* Technical Base Grid */}
          <g stroke="var(--salvia-text-muted)" strokeWidth="1" opacity="0.15">
            <line x1="0" y1="150" x2="800" y2="150" />
            <line x1="0" y1="300" x2="800" y2="300" />
            <line x1="0" y1="450" x2="800" y2="450" />
            <line x1="266" y1="0" x2="266" y2="600" />
            <line x1="533" y1="0" x2="533" y2="600" />
          </g>

          <g stroke="var(--salvia-primary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">

            {activeTab === 0 && ( /* FORM ENGINE CONCEPTUAL DIAGRAM */
              <>
                <path d="M 230 180 C 320 180 320 300 400 300" stroke="#94A3B8" />
                <path d="M 230 420 C 320 420 320 300 400 300" stroke="#94A3B8" />
                <path d="M 400 300 L 580 300" stroke="var(--salvia-accent)" strokeWidth="3" />

                <circle cx="400" cy="300" r="32" fill="#0F172A" stroke="none" />
                <circle cx="400" cy="300" r="12" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 396 296 L 404 304 M 404 296 L 396 304" stroke="#fff" strokeWidth="2" />
              </>
            )}

            {activeTab === 1 && ( /* POLICY ENGINE CONCEPTUAL DIAGRAM */
              <>
                <path d="M 400 160 L 400 240" stroke="#94A3B8" strokeWidth="2" />
                <path d="M 400 240 L 220 340 M 400 240 L 400 340 M 400 240 L 580 340" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6 6" />
                <circle cx="400" cy="240" r="8" fill="#94A3B8" stroke="none" />

                <path d="M 220 420 C 220 480 580 480 580 420" stroke="var(--salvia-accent)" strokeWidth="2" />
                <circle cx="400" cy="465" r="5" fill="var(--salvia-accent)" stroke="none" />
              </>
            )}

            {activeTab === 2 && ( /* AUDIO TO FORMS CLINCAL WORKFLOW PIPELINE */
              <>
                <path d="M 160 300 L 300 300" stroke="#94A3B8" strokeWidth="3" />
                <path d="M 300 300 L 460 300" stroke="var(--salvia-accent)" strokeWidth="3" strokeDasharray="6 6" />
                <path d="M 460 300 L 620 300" stroke="#0F172A" strokeWidth="4" />

                {/* AI Processing Node */}
                <circle cx="300" cy="300" r="24" fill="#0F172A" stroke="none" />
                <polygon points="295,292 308,300 295,308" fill="#fff" />

                {/* Human Validation Gate */}
                <rect x="440" y="270" width="40" height="60" fill="var(--salvia-accent)" rx="6" stroke="none" />
                <circle cx="460" cy="300" r="10" fill="none" stroke="#fff" strokeWidth="2" />
                <path d="M 455 300 L 458 304 L 465 296" stroke="#fff" strokeWidth="2" />
              </>
            )}
          </g>
        </svg>

        {/* Crisp HTML Node Architecture Layer */}
        {activeTab === 0 && (
          <>
            <DiagramCard x={70} y={145} title="Schema Builder" content="Clinical Data Types" badge="UI" />
            <DiagramCard x={70} y={385} title="System Context" content="AI Inference Prompts" badge="LLM" />

            <div style={{
              position: 'absolute', top: '235px', left: '400px', transform: 'translateX(-50%)',
              backgroundColor: '#fff', borderRadius: '4px', padding: '0.2rem 0.5rem',
              fontSize: '0.55rem', fontWeight: 800, color: 'var(--salvia-text)', letterSpacing: '0.05em',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)', zIndex: 10
            }}>
              SCHEMA COMPILATION
            </div>

            <DiagramCard x={590} y={265} title="Immutable Asset" content="Runtime Form v3.1" type="output" highlight={true} />
            <div style={{ position: 'absolute', left: '600px', top: '350px', fontSize: '0.65rem', color: 'var(--salvia-text-muted)', fontWeight: 600 }}>Active in Operations</div>
          </>
        )}

        {activeTab === 1 && (
          <>
            <DiagramCard x={330} y={85} title="Knowledge Base" content="Global Org Policy" badge="ROOT" />

            <div style={{
              position: 'absolute', top: '215px', left: '480px',
              backgroundColor: '#fff', borderRadius: '8px', padding: '0.3rem 0.6rem',
              fontSize: '0.6rem', fontWeight: 700, color: 'var(--salvia-text-muted)',
              border: '1px solid #E2E8F0', zIndex: 10
            }}>
              RULE EXTRACTION ENGINE
            </div>

            <DiagramCard x={120} y={345} title="Enforceable Clause" content="Rule 4.1.a" badge="HIGH" />
            <DiagramCard x={330} y={345} title="Guideline" content="Recommendation" badge="LOW" />
            <DiagramCard x={540} y={345} title="Enforceable Clause" content="Section 8 Drugs" badge="CRIT" />
          </>
        )}

        {activeTab === 2 && (
          <>
            <DiagramCard x={30} y={265} title="Point of Care" content="Captured Evidence" badge="REC" />

            <div style={{
              position: 'absolute', top: '190px', left: '300px', transform: 'translateX(-50%)',
              backgroundColor: '#fff', borderRadius: '8px', padding: '0.5rem 1rem', textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.06)', zIndex: 10, width: '160px'
            }}>
              <div style={{ fontSize: '0.55rem', fontWeight: 800, color: 'var(--salvia-text-muted)', letterSpacing: '0.05em' }}>NOVA MEDICAL AI</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--salvia-primary)', marginTop: '0.2rem' }}>Confidence Mapping</div>
            </div>

            <div style={{
              position: 'absolute', top: '190px', left: '460px', transform: 'translateX(-50%)',
              backgroundColor: 'var(--salvia-primary)', borderRadius: '8px', padding: '0.5rem 1rem', textAlign: 'center',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)', zIndex: 10, width: '140px'
            }}>
              <div style={{ fontSize: '0.55rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>MANDATORY GATE</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', marginTop: '0.2rem' }}>Human Check</div>
            </div>

            <DiagramCard x={630} y={265} title="Statutory Record" content="Defensible Doc" type="output" highlight={true} />
          </>
        )}
      </div>
    );
  };

  return (
    <section id="products" className="mobile-pad-reduce" style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
      {/* NO WHITE BOX WRAPPER. It breathes openly on the background. */}
      <div className="container" style={{ maxWidth: '1400px' }}>

        {/* Streamlined Header - Just the title and the pill */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--salvia-primary)', marginTop: '1.25rem', letterSpacing: '-0.03em' }}>
            Governance Ecosystem
          </h2>

          {/* --- DESKTOP VIEW: Tabs and Flowchart Grid --- */}
          <div className="desktop-only">
            {/* Segmented Control Pill directly below title */}
            <div style={{ marginTop: '1.5rem', width: '100%', overflow: 'hidden' }}>
              <div className="scroll-x-mobile" style={{ display: 'inline-flex', margin: '0 auto', maxWidth: '100%', backgroundColor: '#ffffff', borderRadius: '999px', padding: '0.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)' }}>
                {products.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveTab(idx)}
                    style={{
                      backgroundColor: activeTab === idx ? '#F8FAFC' : 'transparent',
                      boxShadow: activeTab === idx ? 'inset 0 0 0 1px rgba(0,0,0,0.05)' : 'none',
                      color: activeTab === idx ? 'var(--salvia-text)' : '#94A3B8',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      letterSpacing: '0.04em',
                      border: 'none',
                      padding: '0.85rem 2rem',
                      borderRadius: '999px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      minWidth: '200px'
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Two-Column Presentation Layout - Using the crisp white background solely for the display box */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '0', borderRadius: '24px', overflow: 'hidden', backgroundColor: '#ffffff', boxShadow: '0 24px 60px rgba(0,0,0,0.04)', border: '1px solid #EBECEF', marginTop: '3rem' }}>

              {/* Left Diagram Column - Light Sage Green Background instead of Dark */}
              <div style={{ backgroundColor: '#D9E6DE', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {renderDiagram()}
              </div>

              {/* Right Details Column */}
              <div style={{ padding: '5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--salvia-primary)', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  {products[activeTab].title}
                </h3>
                <p style={{ color: 'var(--salvia-text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                  {products[activeTab].subtitle}
                </p>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3.5rem' }}>
                  {products[activeTab].bullets.map((bullet, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ color: 'var(--salvia-accent)', display: 'flex', alignItems: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span style={{ color: 'var(--salvia-primary)', fontWeight: 500, fontSize: '0.95rem' }}>{bullet}</span>
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
                    fontSize: '0.9rem',
                    padding: '1rem 2rem',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    letterSpacing: '0.02em'
                  }}>
                    {products[activeTab].cta}
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* --- MOBILE VIEW: High-Fidelity Clinical Cards --- */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '3rem' }}>
            {products.map((p, index) => (
              <div key={p.id} className="feature-card" style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                padding: '2.5rem'
              }}>
                {/* Mini-Diagram Header */}
                <div style={{
                  height: '140px',
                  backgroundColor: '#D9E6DE',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {/* Simplified Visual Rep of the product */}
                  {index === 0 && (
                    <svg width="120" height="80" viewBox="0 0 120 80">
                      <path d="M 20 20 L 50 40 M 20 60 L 50 40" stroke="var(--salvia-primary)" strokeWidth="2" opacity="0.3" />
                      <rect x="15" y="15" width="20" height="12" rx="2" fill="#fff" stroke="var(--salvia-text-muted)" strokeWidth="1" />
                      <rect x="15" y="55" width="20" height="12" rx="2" fill="#fff" stroke="var(--salvia-text-muted)" strokeWidth="1" />
                      <circle cx="55" cy="40" r="14" fill="var(--salvia-primary)" />
                      <path d="M 52 40 L 58 40 M 55 37 L 55 43" stroke="#fff" strokeWidth="2" />
                      <path d="M 69 40 L 100 40" stroke="var(--salvia-accent)" strokeWidth="3" />
                      <rect x="90" y="32" width="20" height="16" rx="3" fill="var(--salvia-accent)" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg width="120" height="80" viewBox="0 0 120 80">
                      <circle cx="60" cy="20" r="8" fill="var(--salvia-text-muted)" opacity="0.4" />
                      <path d="M 60 20 L 60 40 M 60 40 L 30 60 M 60 40 L 60 60 M 60 40 L 90 60" stroke="var(--salvia-text-muted)" strokeWidth="2" opacity="0.3" />
                      <circle cx="60" cy="40" r="4" fill="var(--salvia-text-muted)" />
                      <rect x="20" y="58" width="20" height="12" rx="2" fill="#fff" stroke="var(--salvia-accent)" strokeWidth="1.5" />
                      <rect x="50" y="58" width="20" height="12" rx="2" fill="#fff" stroke="var(--salvia-accent)" strokeWidth="1.5" />
                      <rect x="80" y="58" width="20" height="12" rx="2" fill="#fff" stroke="var(--salvia-accent)" strokeWidth="1.5" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg width="120" height="80" viewBox="0 0 120 80">
                      <path d="M 10 40 Q 20 10 30 40 T 50 40 T 70 40 T 90 40" fill="none" stroke="var(--salvia-text-muted)" strokeWidth="2" strokeDasharray="4 2" />
                      <rect x="85" y="30" width="20" height="30" rx="4" fill="var(--salvia-accent)" />
                      <path d="M 90 45 L 93 48 L 98 42" stroke="#fff" strokeWidth="2" fill="none" />
                      <circle cx="50" cy="40" r="10" fill="var(--salvia-primary)" />
                    </svg>
                  )}
                </div>

                <div>
                  <div style={{ color: 'var(--salvia-accent)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                    {p.label}
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--salvia-primary)', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {p.title}
                  </h3>
                  <p style={{ color: 'var(--salvia-text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '0' }}>
                    {p.subtitle}
                  </p>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
                  {p.bullets.map((bullet, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ color: 'var(--salvia-accent)', display: 'flex', alignItems: 'center' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span style={{ color: 'var(--salvia-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Link to={p.id === 'audio' ? '/products/point-of-care-evidence' : (p.id === 'form' ? '/products/statutory-form-infrastructure' : '/products/institutional-compliance-hub')} style={{ textDecoration: 'none' }}>
                  <button className="pill-button" style={{ fontSize: '0.85rem', width: '100%' }}>
                    {p.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
