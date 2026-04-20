import React from 'react';

const steps = [
  {
    id: '01',
    title: 'Build the form',
    desc: 'Clinic admin creates the forms the team uses daily — rich field types, per-field AI prompts, mandatory flags. Versioned with semver from day one.',
    metadata: 'FORM v4.0 · DRAFT',
    linkType: 'Form Engine'
  },
  {
    id: '02',
    title: 'Link the policy',
    desc: 'Admin links the relevant clauses from the policy engine to the form. Each clause tagged must-follow, maybe-follow, or try-to-follow.',
    metadata: 'POLICY v12.2 · LINKED',
    linkType: 'Policy Engine'
  },
  {
    id: '03',
    title: 'Staff captures audio',
    desc: 'In daily use: staff picks the subject, records a voice note, selects one to three forms. AI transcribes and fills the fields — with confidence scores.',
    metadata: 'AUDIO #8821 · PROCESSED',
    linkType: 'Audio → Forms'
  },
  {
    id: '04',
    title: 'Evidence + policy check',
    desc: 'Every field traced back to the transcript. If a policy is linked, Salvia scores clause-by-clause satisfaction. The same staff member reviews, edits, and approves.',
    metadata: 'COMPLIANCE · VERIFIED',
    linkType: 'Compliance Engine'
  },
  {
    id: '05',
    title: 'Posted to the timeline',
    desc: 'Record hashed, archived, and pinned to the subject\u2019s timeline with full edit history. Audit Pack is one click away, forever.',
    metadata: 'RECORD v2026 · LOCKED',
    linkType: 'Audit Pack'
  }
];

export const GovernanceLoop: React.FC = () => {
  return (
    <section style={{ backgroundColor: 'var(--salvia-bg)', padding: '6rem 0', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
            
            {/* Context Heading */}
            <div style={{ marginBottom: '6rem', textAlign: 'center' }}>
                <span style={{
                    fontSize: '0.75rem', fontWeight: 800, color: 'var(--salvia-accent)',
                    letterSpacing: '0.15em', textTransform: 'uppercase'
                }}>
                    The full loop
                </span>
                <h2 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800,
                    color: 'var(--salvia-primary)', marginTop: '1.5rem', letterSpacing: '-0.04em'
                }}>
                    Forms + policies + audio. <br />
                    <span style={{ color: 'var(--salvia-text-muted)', fontWeight: 400 }}>A single compliance-grade record.</span>
                </h2>
            </div>

            {/* Visual Process Flow */}
            <div style={{ position: 'relative' }}>
                
                {/* Horizontal flow line for desktop */}
                <div style={{ 
                    position: 'absolute', top: '20px', left: '50px', right: '50px', height: '1px',
                    backgroundColor: 'rgba(15,23,42,0.1)', zIndex: 0
                }} className="hide-mobile" />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }} className="mobile-stack">
                    {steps.map((step, i) => (
                        <div key={step.id} style={{ position: 'relative', textAlign: 'center' }}>
                            
                            {/* Step Indicator Dot */}
                            <div style={{ 
                                width: '40px', height: '40px', borderRadius: '50%', 
                                backgroundColor: i === 2 ? 'var(--salvia-accent)' : 'var(--salvia-primary)',
                                color: '#fff', fontSize: '0.75rem', fontWeight: 800,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 2.5rem', position: 'relative', zIndex: 10,
                                boxShadow: i === 2 ? '0 0 20px rgba(255,78,0,0.3)' : 'none',
                                border: '4px solid var(--salvia-bg)'
                             }}>
                                {step.id}
                            </div>

                            {/* Elite Feature Card */}
                            <div style={{ 
                                backgroundColor: '#fff', padding: '1.75rem', borderRadius: '24px',
                                border: '1px solid rgba(0,0,0,0.05)', boxShadow: 'var(--salvia-shadow-card)',
                                textAlign: 'left', height: '100%', position: 'relative',
                                display: 'flex', flexDirection: 'column'
                            }}>
                                <div style={{ 
                                    fontFamily: 'monospace', fontSize: '0.6rem', 
                                    color: 'var(--salvia-accent)', fontWeight: 700, 
                                    marginBottom: '1rem', opacity: 0.8
                                }}>
                                    {step.metadata}
                                </div>
                                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--salvia-primary)' }}>
                                    {step.title}
                                </h4>
                                <p style={{ fontSize: '0.82rem', color: 'var(--salvia-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                                    {step.desc}
                                </p>
                                <div style={{ 
                                    marginTop: 'auto', fontSize: '0.65rem', fontWeight: 700, 
                                    color: 'var(--salvia-primary)', opacity: 0.4, borderTop: '1px solid #F1F5F9',
                                    paddingTop: '0.75rem'
                                }}>
                                    {step.linkType}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>

      </div>
    </section>
  );
};
