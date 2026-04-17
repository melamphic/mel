import { ProductDetailLayout } from '../components/ProductDetailLayout';


export const AudioToFormsPage = () => {
  return (
    <ProductDetailLayout 
      title="Statutory Evidence Capture" 
      kicker="POINT OF CARE EVIDENCE"
      accentColor="#10B981"
    >
      <div className="container" style={{ padding: '8rem 0', maxWidth: '1100px' }}>
        
        {/* Pain Point Solution: Memory Gap */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', marginBottom: '10rem' }} className="mobile-stack">
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--salvia-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Eliminate the Memory Gap.
            </h2>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--salvia-text-muted)', marginBottom: '2rem' }}>
              The #1 cause of audit failure is delayed documentation. When notes are written hours after the consult, accuracy drops and "Adverse Inference" risk rises. Salvia's <strong>Point of Care Evidence Capture</strong> records reality in real-time, mapping audio directly to statutory forms at the bedside.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#ECFDF5', borderRadius: '12px', color: '#10B981' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Contemporaneous Fidelity</div>
                        <div style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem' }}>Capture evidence as it happens. Satisfy the highest standards of clinical record keeping.</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#ECFDF5', borderRadius: '12px', color: '#10B981' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Deterministic Logic Gates</div>
                        <div style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem' }}>Zero-hallucination transformation. Every field is mapped with high-confidence evidence tags.</div>
                    </div>
                </div>
            </div>
          </div>
          <div style={{ 
            backgroundColor: '#fff', borderRadius: '32px', padding: '1.5rem',
            border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 50px rgba(15,23,42,0.06)'
          }}>
             {/* Abstract: Nova Medical Confidence UI */}
             <div style={{ backgroundColor: '#F8F9FB', borderRadius: '200px', padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10B981', marginBottom: '0.5rem' }}>EVIDENCE DETECTED</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--salvia-primary)' }}>Point of Care v2.4</div>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    {[1, 2, 3, 4].map(i => <div key={i} style={{ width: '4px', height: '20px', backgroundColor: '#10B981', borderRadius: '2px', opacity: i/4 }} />)}
                </div>
             </div>
          </div>
        </div>

        {/* Value Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }} className="mobile-stack">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"Is it defensible in court?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>Yes. we provide the original transcript, the audio snippet, and the deterministic logic used for extraction. It is a complete <strong>Chain of Evidence</strong>.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"What about subject privacy?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>Our <strong>Institutional Privacy Shield</strong> ensures all recordings are encrypted with role-based access. We satisfy HIPAA, GDPR, and NZ Privacy Act 2020 requirements.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"How does it handle accents?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>Powered by <strong>Nova Medical</strong>, our acoustic models are specifically tuned for diverse clinical environments and multi-regional medical dialects.</p>
          </div>
        </div>

      </div>
    </ProductDetailLayout>
  );
};
