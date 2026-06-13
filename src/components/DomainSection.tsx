import { useState } from 'react';

const DOMAINS = [
  {
    id: 'clinic',
    label: 'Clinics',
    tagline: 'GP, specialists & allied health',
    accent: '#F43F5E',
    title: 'Policy-checked before it\u2019s signed.',
    desc: 'Upload NABH, ABDM, Clinical Establishments Act, CGHS — or your own internal SOPs. Salvia links clauses to form fields and scores every note against them before the clinician approves it.',
    metric: '98%',
    metricLabel: 'CLAUSE COVERAGE',
    ui: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#F43F5E', letterSpacing: '0.08em' }}>REGULATORY COMPLIANCE: NABH</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { label: 'Patient Identification', status: 'Satisfied', detail: 'Clause 4.1' },
            { label: 'Clinical Justification', status: 'Satisfied', detail: 'Clause 5.2' },
            { label: 'Follow-up Plan', status: 'Pending', detail: 'Missing Context' },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '1.25rem', background: '#fff', borderRadius: '16px', border: '1px solid rgba(15, 23, 42, 0.06)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
            }}>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--salvia-primary)' }}>{item.label}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--salvia-text-muted)', fontWeight: 600 }}>{item.detail}</div>
              </div>
              <div style={{
                fontSize: '0.65rem', fontWeight: 800, padding: '0.35rem 0.75rem',
                borderRadius: '8px', background: item.status === 'Satisfied' ? '#F0FDF4' : '#FEF2F2',
                color: item.status === 'Satisfied' ? '#16A34A' : '#DC2626',
                border: `1px solid ${item.status === 'Satisfied' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(220, 38, 38, 0.1)'}`
              }}>{item.status}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'vet',
    label: 'Vets',
    tagline: 'Small animal, equine & mixed practice',
    accent: '#0EA5E9',
    title: 'Every field, tied to the exact words you said.',
    desc: 'Deepgram Nova Medical transcribes the audio. Salvia shows you the source line that generated each value — so you (and any auditor) can verify the note in seconds.',
    metric: '42s',
    metricLabel: 'MEDIAN TIME TO FILLED FORM',
    ui: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0EA5E9', letterSpacing: '0.08em' }}>AUDIT TRACE: NOVA MEDICAL</div>

        {/* Normalized Light Transcript View */}
        <div style={{
          padding: '1.5rem', background: '#fff', border: '1px solid rgba(15, 23, 42, 0.08)',
          borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, margin: 0, color: 'var(--salvia-primary)', fontWeight: 500 }}>
            "...the patient displayed mild <span style={{ background: 'rgba(14, 165, 233, 0.08)', color: '#0EA5E9', fontWeight: 700, padding: '0.1rem 0.3rem', borderRadius: '4px' }}>joint instability</span> in the right hip. Recommend <span style={{ background: 'rgba(14, 165, 233, 0.08)', color: '#0EA5E9', fontWeight: 700, padding: '0.1rem 0.3rem', borderRadius: '4px' }}>Meloxicam 2.5mg</span>..."
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1, padding: '1.25rem', background: '#fff', border: '1px solid rgba(15, 23, 42, 0.06)', borderRadius: '16px' }}>
            <div style={{ color: 'rgba(15, 23, 42, 0.4)', fontSize: '0.65rem', fontWeight: 800, marginBottom: '0.25rem' }}>DRUG_NAME</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--salvia-primary)' }}>Meloxicam</div>
          </div>
          <div style={{ flex: 1, padding: '1.25rem', background: '#fff', border: '1px solid rgba(15, 23, 42, 0.06)', borderRadius: '16px' }}>
            <div style={{ color: 'rgba(15, 23, 42, 0.4)', fontSize: '0.65rem', fontWeight: 800, marginBottom: '0.25rem' }}>DOSAGE</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--salvia-primary)' }}>2.5mg</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'allied',
    label: 'Allied Health',
    tagline: 'Physio, osteo, chiro, OT, podiatry, speech',
    accent: '#0891B2',
    title: 'Outcome measures, tracked episode-over-episode.',
    desc: 'NCAHP, IAP, RCI, NABH. Validated scales (NPRS, ODI, COPM, AAC) as first-class fields — score at intake, repeat at review, trend on the discharge summary. Framework-aware record generation tuned to your discipline.',
    metric: '6',
    metricLabel: 'DISCIPLINES, ONE PRODUCT',
    ui: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0891B2', letterSpacing: '0.08em' }}>EPISODE OF CARE · PHYSIOTHERAPY</div>

        {/* Outcome trend card */}
        <div style={{
          padding: '2rem', background: '#fff', borderRadius: '24px',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            marginBottom: '1.5rem',
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--salvia-text-muted)', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                NPRS (PAIN, 0–10)
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--salvia-primary)' }}>Lumbar strain · 6 sessions</div>
            </div>
            <div style={{
              fontSize: '0.65rem', fontWeight: 800,
              padding: '0.3rem 0.7rem', borderRadius: '8px',
              background: '#F0FDF4', color: '#16A34A',
              border: '1px solid rgba(22,163,74,0.12)',
            }}>−5 over episode</div>
          </div>

          {/* Mini chart */}
          <div style={{
            display: 'flex', alignItems: 'flex-end',
            gap: '0.65rem', height: '64px', marginBottom: '0.5rem',
          }}>
            {[8, 7, 6, 5, 4, 3].map((v, i) => (
              <div key={i} style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '0.3rem',
              }}>
                <div style={{
                  width: '100%', height: `${(v / 10) * 100}%`,
                  background: `linear-gradient(180deg, #0891B2 0%, #06B6D4 100%)`,
                  borderRadius: '4px 4px 0 0',
                  opacity: i === 5 ? 1 : 0.55,
                }} />
              </div>
            ))}
          </div>
          <div style={{
            display: 'flex', gap: '0.65rem',
            fontSize: '0.65rem', fontWeight: 700, color: 'var(--salvia-text-muted)',
          }}>
            {['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].map((s) => (
              <div key={s} style={{ flex: 1, textAlign: 'center' }}>{s}</div>
            ))}
          </div>
        </div>

        <div style={{
          padding: '1rem 1.25rem', background: 'rgba(8,145,178,0.05)',
          border: '1px solid rgba(8,145,178,0.15)', borderRadius: '14px',
          fontSize: '0.82rem', color: '#0E7490', fontWeight: 600, lineHeight: 1.45,
        }}>
          Framework: NCAHP Physiotherapy Professional Council · Episode summary auto-drafted for discharge.
        </div>
      </div>
    ),
  },
  {
    id: 'dental',
    label: 'Dental',
    tagline: 'General & specialist practices',
    accent: '#10B981',
    title: 'Treatment plans, cross-checked against NHCX.',
    desc: 'Voice-note the case. Salvia fills the form, assigns the right NHCX billing codes, and checks the plan against the practice guidelines and PM-JAY pre-auth rules you\u2019ve linked.',
    metric: '92%',
    metricLabel: 'NHCX ALIGNMENT',
    ui: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10B981', letterSpacing: '0.08em' }}>COMPLIANCE SCORE: NHCX 2024</div>

        {/* Spacious Decompressed Scoreboard */}
        <div style={{ padding: '2.5rem', background: '#fff', borderRadius: '24px', border: '1px solid rgba(15, 23, 42, 0.08)', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
          <div style={{ height: '10px', background: '#F1F5F9', borderRadius: '10px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{ height: '100%', width: '92%', background: '#10B981', borderRadius: '10px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--salvia-primary)' }}>High Guideline Alignment</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--salvia-text-muted)', fontWeight: 600, marginTop: '0.25rem' }}>11 of 12 internal rules satisfied</div>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10B981', letterSpacing: '-0.04em' }}>92%</div>
          </div>
        </div>

        <div style={{
          padding: '1.25rem 1.5rem', background: '#F0FDF4',
          border: '1px solid rgba(16, 185, 129, 0.08)', borderRadius: '16px',
          fontSize: '0.85rem', color: '#065F46', fontWeight: 600,
          display: 'flex', gap: '0.75rem', alignItems: 'center', lineHeight: 1.4
        }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.9rem', flexShrink: 0 }}>✓</div>
          Treatment plan satisfies all mandatory billing codes for this consultation.
        </div>
      </div>
    )
  },
];

export const DomainSection = () => {
  const [active, setActive] = useState(0);
  const d = DOMAINS[active];

  return (
    <section id="domains" style={{
      padding: '6rem 0',
      backgroundColor: 'transparent',
      position: 'relative',
      zIndex: 10,
      overflow: 'hidden' // Added to clip the full-bleed stage
    }}>
      <div className="container" style={{ maxWidth: '1200px', marginBottom: '5rem' }}>
        <style>{`
          @media (max-width: 768px) {
            .stage-header {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 1.5rem !important;
            }
            .stage-header-desc {
              max-width: 100% !important;
              font-size: 1rem !important;
            }
          }
        `}</style>
        {/* Title Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }} className="stage-header">
          <div style={{ flex: 1, minWidth: '300px' }}>
            <span style={{
              fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em',
              color: 'var(--salvia-accent)', textTransform: 'uppercase',
              display: 'block', marginBottom: '1rem'
            }}>Built for your vertical</span>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1,
              color: 'var(--salvia-primary)', margin: 0
            }}>
              One platform.<br />Every vertical you run.
            </h2>
          </div>
          <div style={{ flex: 1, maxWidth: '450px' }} className="stage-header-desc">
            <p style={{
              fontSize: '1.15rem', color: 'var(--salvia-text-muted)',
              lineHeight: 1.7, margin: 0
            }}>
              Clinics, vet practices, dental surgeries, allied health. Same engine, same compliance guarantees — tuned to the regulations, terminology, and forms that govern your specialty.
            </p>
          </div>
        </div>
      </div>

      {/* The Asymmetric Full-Bleed Layout */}
      <div className="domains-stage-grid mobile-stack" style={{
        display: 'grid', gridTemplateColumns: 'minmax(280px, 0.8fr) 2fr',
        gap: '5rem', alignItems: 'start',
        paddingLeft: 'var(--stage-pad-left, max(2rem, calc((100vw - 1200px) / 2 + 2rem)))',
        width: '100vw', maxWidth: '100vw', overflowX: 'hidden',
      }}>
        <style>{`
          @media (max-width: 768px) {
            #domains { padding: 4rem 0 !important; overflow-x: hidden !important; }
            .domains-stage-grid {
              display: flex !important;
              flex-direction: column !important;
              width: 100% !important;
              max-width: 100% !important;
              padding-left: 1.25rem !important;
              padding-right: 1.25rem !important;
              gap: 1.5rem !important;
            }
            .stage-sidebar {
              position: static !important;
              flex-direction: row !important;
              gap: 0.5rem !important;
              overflow-x: auto !important;
              -webkit-overflow-scrolling: touch !important;
              padding-bottom: 0.5rem !important;
              margin: 0 -1.25rem !important;
              padding-left: 1.25rem !important;
              padding-right: 1.25rem !important;
              scrollbar-width: none !important;
            }
            .stage-sidebar::-webkit-scrollbar { display: none !important; }
            .stage-sidebar-btn {
              flex: 0 0 auto !important;
              padding: 0.85rem 1.1rem !important;
              border-radius: 14px !important;
              min-width: max-content !important;
            }
            .stage-sidebar-label { font-size: 0.95rem !important; }
            .stage-sidebar-sub { display: none !important; }
            .stage-app-box {
              padding: 1.5rem !important;
              border-radius: 24px !important;
              border-right: 1px solid rgba(15, 23, 42, 0.08) !important;
              width: 100% !important;
              min-height: auto !important;
              box-shadow: 0 12px 32px rgba(15,23,42,0.06) !important;
            }
            .stage-content-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
              max-width: 100% !important;
            }
            .stage-title { font-size: 1.65rem !important; }
            .stage-metric { font-size: 3rem !important; }
            .stage-evidence { padding: 1.5rem !important; border-radius: 20px !important; }
          }
        `}</style>

        {/* Sidebar Selector (Pinned on desktop, horizontal scroll chip strip on mobile) */}
        <div className="stage-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: '100px' }}>
          {DOMAINS.map((domain, index) => (
            <button
              key={domain.id}
              className="stage-sidebar-btn"
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              style={{
                textAlign: 'left',
                padding: '2rem 2.5rem',
                borderRadius: '24px',
                border: '1px solid',
                borderColor: active === index ? 'rgba(15, 23, 42, 0.08)' : 'transparent',
                backgroundColor: active === index ? '#fff' : 'transparent',
                boxShadow: active === index ? '0 20px 48px -12px rgba(15, 23, 42, 0.08)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex', flexDirection: 'column', gap: '0.35rem'
              }}
            >
              <span className="stage-sidebar-label" style={{
                fontSize: '1.5rem', fontWeight: 800,
                color: active === index ? 'var(--salvia-primary)' : 'rgba(15, 23, 42, 0.3)',
                letterSpacing: '-0.02em',
                transition: 'color 0.3s ease'
              }}>
                {domain.label}
              </span>
              <span className="stage-sidebar-sub" style={{
                fontSize: '0.8rem', fontWeight: 600,
                color: active === index ? domain.accent : 'rgba(15, 23, 42, 0.25)',
                transition: 'color 0.3s ease',
                letterSpacing: '0.02em'
              }}>
                {domain.tagline}
              </span>
            </button>
          ))}
        </div>

        {/* The App Stage (Extends to right edge) */}
        <div style={{
          background: '#fff', borderRadius: '48px 0 0 48px', padding: '5rem',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          borderRight: 'none',
          boxShadow: '0 40px 100px -20px rgba(15, 23, 42, 0.12)',
          minHeight: '600px',
          width: 'calc(100% + 2rem)', // Small overlap to ensure bleed
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative'
        }} className="stage-app-box">

          {/* Morphing View Content */}
          <div key={active} style={{
            position: 'relative', zIndex: 1,
            display: 'grid', gridTemplateColumns: '1.2fr 1.5fr', gap: '5rem',
            animation: 'fadeIn 0.5s ease-out',
            maxWidth: 'calc(100vw - (100vw - 1200px) / 2 - 400px)' // Constraint back to roughly container width inside
          }} className="mobile-stack stage-content-grid">

            {/* Left Column: Context & Metric */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <h3 className="stage-title" style={{ fontSize: '2.6rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--salvia-primary)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
                  {d.title}
                </h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--salvia-text-muted)', lineHeight: 1.6, margin: 0 }}>
                  {d.desc}
                </p>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '2.5rem', borderTop: '1px solid rgba(15, 23, 42, 0.05)' }}>
                <div
                  style={{ fontSize: '4.5rem', fontWeight: 900, color: 'var(--salvia-primary)', letterSpacing: '-0.05em', lineHeight: 1 }}
                  className="stage-metric"
                >
                  {d.metric}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--salvia-text-muted)', letterSpacing: '0.12em', marginTop: '0.5rem', textTransform: 'uppercase' }}>
                  {d.metricLabel}
                </div>
              </div>
            </div>

            {/* Right Column: Mini UI Slice (The "Evidence") */}
            <div className="stage-evidence" style={{
              background: '#F8FAFC', borderRadius: '32px',
              border: '1px solid rgba(15, 23, 42, 0.04)',
              padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.01)'
            }}>
              <div style={{ width: '100%' }}>
                {d.ui}
              </div>
            </div>

          </div>
        </div>

      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
