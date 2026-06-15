import React from 'react';
import { useIsIndia } from '../lib/market';

const verticalsFor = (isIndia: boolean) => [
  {
    name: 'Clinics',
    accent: '#FF4E00',
    frameworks: isIndia ? [
      { code: 'NABH', region: 'India' },
      { code: 'NABH Entry-Level', region: 'India' },
      { code: 'Clinical Establishments Act 2010', region: 'India' },
      { code: 'ABDM', region: 'India' },
      { code: 'ABHA', region: 'India' },
      { code: 'CGHS', region: 'India' },
    ] : [
      { code: 'CQC', region: 'UK' },
      { code: 'GMC', region: 'UK' },
      { code: 'AHPRA', region: 'Australia' },
      { code: 'MCNZ', region: 'New Zealand' },
      { code: 'HIPC 2020', region: 'New Zealand' },
      { code: 'UK GDPR', region: 'UK / EU' },
    ],
  },
  {
    name: 'Vets',
    accent: '#0EA5E9',
    frameworks: isIndia ? [
      { code: 'VCI', region: 'India' },
      { code: 'IVC Standards', region: 'India' },
      { code: 'CDSCO', region: 'India' },
      { code: 'Schedule H1', region: 'India' },
      { code: 'Drugs & Cosmetics Act', region: 'India' },
      { code: 'DPDP Act 2023', region: 'India' },
    ] : [
      { code: 'RCVS', region: 'UK' },
      { code: 'CMA', region: 'UK' },
      { code: 'VCNZ', region: 'New Zealand' },
      { code: 'AVBC', region: 'Australia' },
      { code: 'Controlled Drugs', region: 'Global' },
      { code: 'UK GDPR', region: 'UK / EU' },
    ],
  },
  {
    name: 'Dental',
    accent: '#7C3AED',
    frameworks: isIndia ? [
      { code: 'DCI', region: 'India' },
      { code: 'DCI Standards', region: 'India' },
      { code: 'NABH Dental', region: 'India' },
      { code: 'Clinical Establishments Act 2010', region: 'India' },
      { code: 'ABDM', region: 'India' },
      { code: 'DPDP Act 2023', region: 'India' },
    ] : [
      { code: 'GDC', region: 'UK' },
      { code: 'CQC', region: 'UK' },
      { code: 'AHPRA Dental Board', region: 'Australia' },
      { code: 'DCNZ', region: 'New Zealand' },
      { code: 'Radiography standards', region: 'Global' },
      { code: 'UK GDPR', region: 'UK / EU' },
    ],
  },
  {
    name: 'Allied Health',
    accent: '#0891B2',
    frameworks: isIndia ? [
      { code: 'NMC Guidelines', region: 'India' },
      { code: 'IMC Guidelines', region: 'India' },
      { code: 'NABL', region: 'India' },
      { code: 'PM-JAY / AB-PMJAY', region: 'India' },
      { code: 'CGHS', region: 'India' },
      { code: 'DPDP Act 2023', region: 'India' },
    ] : [
      { code: 'HCPC', region: 'UK' },
      { code: 'CORU', region: 'Ireland' },
      { code: 'AHPRA', region: 'Australia' },
      { code: 'PBNZ / OTBNZ', region: 'New Zealand' },
      { code: 'ASHA', region: 'US' },
      { code: 'UK GDPR', region: 'UK / EU' },
    ],
  },
];

export const FrameworksRail: React.FC = () => {
  const isIndia = useIsIndia();
  const VERTICALS = verticalsFor(isIndia);
  return (
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
};
