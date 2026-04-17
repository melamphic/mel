import React from 'react';

const steps = [
  {
    id: '01',
    title: 'The Right Template',
    desc: 'Select a clinical form that matches your specialty. Every field is designed to capture the exact data you need for professional excellence.',
    metadata: 'CLINICAL v4.0 · READY',
    linkType: 'Form Structure'
  },
  {
    id: '02',
    title: 'Standards Linked',
    desc: 'Your practice policies and clinical standards are linked directly to your forms. No more guessing—the guidance you need is built-in.',
    metadata: 'POLICY v12.2 · ACTIVE',
    linkType: 'Policy Safety'
  },
  {
    id: '03',
    title: 'Point of Care Capture',
    desc: 'Our audio engine captures the visit in real-time. Focus on your patient while Salvia handles the technical record-keeping.',
    metadata: 'ASSET #8821 · SECURE',
    linkType: 'Patient Evidence'
  },
  {
    id: '04',
    title: 'The Precision Check',
    desc: 'Every note is verified for absolute accuracy. Human-in-the-loop validation ensures your records are perfect before they are signed.',
    metadata: 'AUDITED · VERIFIED',
    linkType: 'Quality Gate'
  },
  {
    id: '05',
    title: 'Safe & Protected',
    desc: 'Records are locked and archived with professional-grade security. A permanent, auditable proof of your clinical excellence.',
    metadata: 'ARCHIVE v2026 · LOCKED',
    linkType: 'Permanent Proof'
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
                    The Governance Loop
                </span>
                <h2 style={{ 
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, 
                    color: 'var(--salvia-primary)', marginTop: '1.5rem', letterSpacing: '-0.04em' 
                }}>
                    Institutional Connectivity. <br />
                    <span style={{ color: 'var(--salvia-text-muted)', fontWeight: 400 }}>Unbroken Chain of Evidence.</span>
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
