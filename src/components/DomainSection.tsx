import React from 'react';

const DomainLabel = ({ children, color }: { children: React.ReactNode, color: string }) => (
  <span style={{
    fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: color,
    backgroundColor: `${color}10`, padding: '0.3rem 0.65rem',
    borderRadius: '6px', display: 'inline-block', marginBottom: '1.25rem',
    border: `1px solid ${color}20`,
  }}>
    {children}
  </span>
);

export const DomainSection = () => {
  return (
    <section style={{
      padding: '8rem 0',
      backgroundColor: '#FCFAF8',
      position: 'relative',
      zIndex: 10,
    }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Header - Minimalist & Spacious */}
        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.95,
            color: 'var(--salvia-primary)', maxWidth: '800px',
          }}>
            One platform.<br />
            <span style={{ color: 'var(--salvia-accent)' }}>Three clinical domains.</span>
          </h2>
          <p style={{
            fontSize: '1.15rem', color: 'var(--salvia-text-muted)',
            lineHeight: 1.6, maxWidth: '440px', marginTop: '2rem',
          }}>
            Engineered to handle the unique compliance, charting, and audit requirements of your specific field.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid mobile-stack">
          
          {/* Main Hero: Salvia Clinic */}
          <div className="bento-card subtle-shadow-airy" style={{
            gridColumn: 'span 8',
            gridRow: 'span 2',
            padding: '3.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <DomainLabel color="var(--salvia-accent)">General Practice & Specialist</DomainLabel>
            <h3 style={{
              fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.04em',
              color: 'var(--salvia-primary)', lineHeight: 1.1, marginBottom: '1.5rem',
            }}>
              Salvia Clinic
            </h3>
            <p style={{
              fontSize: '1.05rem', color: 'var(--salvia-text-muted)',
              lineHeight: 1.7, maxWidth: '400px',
            }}>
              The clinical gold standard for NABH and international compliance. Automated SOAP notes that satisfy the toughest auditors.
            </p>

            {/* Visual: Minimalist Audit Meter */}
            <div style={{
              position: 'absolute', right: '10%', bottom: '15%',
              width: '240px', height: '180px',
              background: '#fff', borderRadius: '24px',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              boxShadow: '0 20px 40px rgba(15, 23, 42, 0.04)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '1.5rem',
            }}>
               <div style={{ 
                 width: '80px', height: '80px', borderRadius: '50%',
                 border: '8px solid rgba(15, 23, 42, 0.05)',
                 borderTopColor: 'var(--salvia-accent)',
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 fontSize: '1.25rem', fontWeight: 800, color: 'var(--salvia-primary)',
                 marginBottom: '1rem',
               }}>100%</div>
               <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--salvia-text-muted)', letterSpacing: '0.05em' }}>
                 AUDIT READINESS
               </div>
            </div>
          </div>

          {/* Secondary: Salvia Paws */}
          <div className="bento-card subtle-shadow-airy" style={{
            gridColumn: 'span 4',
            backgroundColor: '#0F172A',
          }}>
            <DomainLabel color="#0EA5E9">Veterinary Medicine</DomainLabel>
            <h3 style={{
              fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.04em',
              color: '#fff', lineHeight: 1.1, marginBottom: '1rem',
            }}>
              Salvia Paws
            </h3>
            <p style={{
              fontSize: '0.92rem', color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.6,
            }}>
              Species-aware note generation and owner consent tracking.
            </p>
            <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
               {['Canine', 'Feline', 'Equine'].map(s => (
                 <div key={s} style={{ 
                   fontSize: '0.65rem', fontWeight: 700, color: '#0EA5E9',
                   padding: '0.2rem 0.5rem', border: '1px solid rgba(14, 165, 233, 0.3)',
                   borderRadius: '4px'
                 }}>{s}</div>
               ))}
            </div>
          </div>

          {/* Secondary: Salvia Smile */}
          <div className="bento-card subtle-shadow-airy" style={{
            gridColumn: 'span 4',
          }}>
            <DomainLabel color="#8B5CF6">Dental Practice</DomainLabel>
            <h3 style={{
              fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.04em',
              color: 'var(--salvia-primary)', lineHeight: 1.1, marginBottom: '1rem',
            }}>
              Salvia Smile
            </h3>
            <p style={{
              fontSize: '0.92rem', color: 'var(--salvia-text-muted)',
              lineHeight: 1.6,
            }}>
              Automated CDT coding and periodic charting from voice.
            </p>
            <div style={{ marginTop: 'auto', height: '4px', width: '100%', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '2px' }}>
               <div style={{ height: '100%', width: '82%', background: '#8B5CF6', borderRadius: '2px' }} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
