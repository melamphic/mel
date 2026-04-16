import React from 'react';
import { ProductDetailLayout } from '../components/ProductDetailLayout';

export const AudioToFormsPage = () => {
  return (
    <ProductDetailLayout 
      title="Reclaim Your ‘Pajama Time’" 
      kicker="AUDIO TO FORMS"
      accentColor="#10B981"
    >
      <div className="container" style={{ padding: '8rem 0', maxWidth: '1100px' }}>
        
        {/* Pain Point Solution 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', marginBottom: '10rem' }} className="mobile-stack">
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--salvia-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Stop charting after hours.
            </h2>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--salvia-text-muted)', marginBottom: '2rem' }}>
              The #1 cause of clinician burnout is administrative overload. Salvia's <strong>Ambient Scribe</strong> captures your consultation in the background, using medical-grade AI to structure the data directly into your forms. Close your notes before you leave the room.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#ECFDF5', borderRadius: '12px', color: '#10B981' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Recover 2+ Hours Daily</div>
                        <div style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem' }}>Eliminate the "Pajama Time" spent on EHR data entry every night.</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#ECFDF5', borderRadius: '12px', color: '#10B981' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Patient-First Consultations</div>
                        <div style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem' }}>Maintain eye contact. Focus on the patient, while Salvia handles the record.</div>
                    </div>
                </div>
            </div>
          </div>
          <div style={{ 
            backgroundColor: '#fff', borderRadius: '32px', padding: '1.5rem',
            border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 50px rgba(15,23,42,0.06)'
          }}>
             {/* Abstract: Nova Medical Confidence UI */}
             <div style={{ backgroundColor: '#F8F9FB', borderRadius: '20px', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--salvia-text-muted)' }}>AI CONFIDENCE SCORE</div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10B981' }}>98.2% ACCURATE</div>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', marginBottom: '2rem' }}>
                    <div style={{ width: '98%', height: '100%', backgroundColor: '#10B981', borderRadius: '4px' }} />
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #10B981' }}>
                    <div style={{ fontSize: '0.9rem', color: '#10B981', fontWeight: 700, marginBottom: '0.4rem' }}>Extracted Truth:</div>
                    <div style={{ fontSize: '1rem', fontWeight: 600 }}>Amoxicillin 500mg (TID)</div>
                </div>
             </div>
          </div>
        </div>

        {/* Value Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }} className="mobile-stack">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"Can I trust the output?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>Our <strong>Nova Medical pipeline</strong> is specifically trained for clinical vocabulary. Combined with mandatory human-in-the-loop signoff, we ensure 100% data integrity.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"Does it work in my EMR?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>Salvia is designed to sit alongside your existing clinical systems. We offer seamless export and direct integration options to eliminate workflow friction.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"Is it secure?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>Every byte is encrypted in transit and at rest. Salvia is fully compliant with global medical data privacy standards, including <strong>HIPAA</strong> and <strong>GDPR</strong>.</p>
          </div>
        </div>

      </div>
    </ProductDetailLayout>
  );
};
