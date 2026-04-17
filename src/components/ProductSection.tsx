import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 'form',
    label: 'CLINICAL FORM INFRASTRUCTURE',
    title: 'Perfect records. Every single time.',
    subtitle: 'High-fidelity clinical forms that are impossible to fill out incorrectly. Engineer your practice workflow with zero-error capture, ensuring your records are audit-ready without the extra effort.',
    bullets: [
      'Automatic error-checking as you document',
      'Clean, professional version history for life',
      'Logic gates that ensure every field is perfect'
    ],
    cta: 'EXPLORE FORMS'
  },
  {
    id: 'policy',
    label: 'CLINICAL GOVERNANCE HUB',
    title: 'Total peace of mind for your practice.',
    subtitle: 'Stay aligned with professional standards without having to memorize the rulebook. We link your practice policies directly to your forms, ensuring your team is compliant with every click.',
    bullets: [
      'Latest standards (NABH, VMR) built-in',
      'Keep your entire team on the same page',
      'Generate audit-ready evidence in one click'
    ],
    cta: 'EXPLORE GOVERNANCE'
  },
  {
    id: 'audio',
    label: 'POINT OF CARE CAPTURE',
    title: 'Go home when the patient does.',
    subtitle: 'Capture perfect notes at the exam table so you never have to stay late for charting. Salvia turns your audio into precise clinical records, so your paperwork is finished before the visit ends.',
    bullets: [
      'Finish your notes 2x faster than typing',
      'Focus strictly on the patient, not the screen',
      'High-precision audio mapped to your forms'
    ],
    cta: 'RECLAIM YOUR TIME'
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
                <path d="M 210 190 C 290 190 310 260 380 260" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 210 390 C 290 390 310 260 380 260" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 440 260 L 590 285" stroke="var(--salvia-accent)" strokeWidth="3" />
                <circle cx="380" cy="260" r="6" fill="var(--salvia-accent)" />
                <circle cx="440" cy="260" r="6" fill="var(--salvia-accent)" />
              </>
            )}

            {activeTab === 1 && ( /* POLICY ENGINE CONCEPTUAL DIAGRAM */
              <>
                <path d="M 250 140 C 280 140 280 235 320 235" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 370 235 C 410 235 410 120 470 120" stroke="var(--salvia-accent)" strokeWidth="3" />
                <path d="M 370 235 L 470 270" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 370 235 C 410 235 410 420 470 420" stroke="#0F172A" strokeWidth="3" />
              </>
            )}

            {activeTab === 2 && ( /* AUDIO TO FORMS CLINCAL WORKFLOW PIPELINE */
              <>
                <path d="M 190 305 C 230 305 230 180 280 180" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 320 180 C 400 180 400 370 440 370" stroke="var(--salvia-accent)" strokeWidth="3" />
                <path d="M 480 370 L 590 305" stroke="#0F172A" strokeWidth="4" />
                <circle cx="280" cy="180" r="4" fill="#94A3B8" />
                <circle cx="440" cy="370" r="6" fill="var(--salvia-accent)" />
              </>
            )}
          </g>
        </svg>

        {/* Crisp HTML Node Architecture Layer */}
        {activeTab === 0 && (
          <>
            <DiagramCard x={60} y={150} title="Zero-Error Capture" content="Automatic Checking" badge="INPUT" />
            <DiagramCard x={60} y={350} title="Field Logic Gates" content="Ensures Perfection" badge="GUARD" />

            <div style={{
              position: 'absolute', top: '235px', left: '410px', transform: 'translateX(-50%)',
              backgroundColor: '#fff', borderRadius: '4px', padding: '0.4rem 0.8rem',
              fontSize: '0.65rem', fontWeight: 800, color: 'var(--salvia-text)', letterSpacing: '0.05em',
              boxShadow: '0 8px 20px rgba(0,0,0,0.08)', zIndex: 10, textAlign: 'center'
            }}>
              LIFETIME VERSION HISTORY
              <div style={{ color: 'var(--salvia-accent)', fontSize: '0.8rem', marginTop: '4px' }}>Clean, Professional Log</div>
            </div>

            <DiagramCard x={600} y={245} title="Final Assessment" content="Audit-Ready Record" type="output" highlight={true} badge="INSTANT" />
          </>
        )}

        {activeTab === 1 && (
          <>
            <DiagramCard x={100} y={100} title="Rulebook Intake" content="Standards (NABH/VMR)" badge="POLICY" />

            <div style={{
              position: 'absolute', top: '235px', left: '345px', transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff', borderRadius: '8px', padding: '0.4rem 0.8rem',
              fontSize: '0.65rem', fontWeight: 800, color: 'var(--salvia-text-muted)',
              border: '1px solid #E2E8F0', zIndex: 10, textAlign: 'center'
            }}>
              TEAM ALIGNMENT HUB
              <div style={{ color: 'var(--salvia-primary)', fontSize: '0.8rem', marginTop: '2px' }}>Everyone on same page</div>
            </div>

            <DiagramCard x={480} y={80} title="Compliance Link" content="Active Enforcement" badge="FORMS" highlight={true} />
            <DiagramCard x={480} y={230} title="Live Dashboard" content="Team Monitoring" badge="SYNC" />
            <DiagramCard x={480} y={380} title="1-Click Export" content="Audit Evidence Gen" type="output" />
          </>
        )}

        {activeTab === 2 && (
          <>
            <DiagramCard x={40} y={265} title="Exam Room" content="Focus on patient" badge="AUDIO" />

            <div style={{
              position: 'absolute', top: '160px', left: '300px', transform: 'translateX(-50%)',
              backgroundColor: '#fff', borderRadius: '8px', padding: '0.6rem 1.2rem', textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.06)', zIndex: 10, width: '180px'
            }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--salvia-text-muted)', letterSpacing: '0.05em' }}>HIGH-PRECISION ENGINE</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--salvia-primary)', marginTop: '0.2rem' }}>Audio Mapped to Forms</div>
            </div>

            <div style={{
              position: 'absolute', top: '350px', left: '460px', transform: 'translateX(-50%)',
              backgroundColor: 'var(--salvia-primary)', borderRadius: '8px', padding: '0.6rem 1.2rem', textAlign: 'center',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)', zIndex: 10, width: '160px'
            }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>SPEED MULTIPLIER</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginTop: '0.2rem' }}>2x Faster Charting</div>
            </div>

            <DiagramCard x={600} y={265} title="Completed Visit" content="Finished Paperwork" type="output" highlight={true} badge="ON TIME" />
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
                      {/* Form Engine Versioning Concept */}
                      <rect x="20" y="20" width="80" height="12" rx="3" fill="#fff" stroke="var(--salvia-text-muted)" strokeWidth="1" />
                      <rect x="20" y="38" width="60" height="12" rx="3" fill="#fff" stroke="var(--salvia-text-muted)" strokeWidth="1" />
                      <path d="M 85 44 L 95 44 M 90 39 L 90 49" stroke="var(--salvia-accent)" strokeWidth="2" strokeLinecap="round" />
                      <rect x="20" y="56" width="40" height="8" rx="2" fill="var(--salvia-primary)" opacity="0.1" />
                      <circle cx="95" cy="26" r="6" fill="#0EA5E9" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg width="120" height="80" viewBox="0 0 120 80">
                      {/* Policy Engine Block Concept */}
                      <rect x="30" y="15" width="60" height="15" rx="2" fill="#0F172A" />
                      <rect x="30" y="35" width="45" height="12" rx="2" fill="var(--salvia-primary)" opacity="0.1" />
                      <rect x="30" y="52" width="55" height="12" rx="2" fill="#fff" stroke="var(--salvia-text-muted)" strokeWidth="1" />
                      <circle cx="100" cy="22" r="5" fill="var(--salvia-accent)" />
                      <circle cx="85" cy="41" r="4" fill="#0EA5E9" />
                      <path d="M 90 22 L 100 22 M 75 41 L 85 41" stroke="var(--salvia-text-muted)" strokeWidth="1" strokeDasharray="2 2" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg width="120" height="80" viewBox="0 0 120 80">
                      {/* Audio waveform to JSON extraction Concept */}
                      <path d="M 15 40 Q 25 10 35 40 T 55 40 Q 65 70 75 40 M 15 40 L 5 40 M 75 40 L 85 40" fill="none" stroke="var(--salvia-primary)" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                      <rect x="80" y="25" width="30" height="30" rx="6" fill="var(--salvia-accent)" />
                      <path d="M 87 40 L 92 45 L 100 35" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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
