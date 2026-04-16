import { ProductDetailLayout } from '../components/ProductDetailLayout';


export const FormEnginePage = () => {
  return (
    <ProductDetailLayout
      title="Eliminate Click Fatigue"
      kicker="CLINICAL FORM ENGINE"
      accentColor="#FF4E00"
    >
      <div className="container" style={{ padding: '8rem 0', maxWidth: '1100px' }}>

        {/* Pain Point Solution 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', marginBottom: '10rem' }} className="mobile-stack">
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--salvia-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Your documentation shouldn't be a chore.
            </h2>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--salvia-text-muted)', marginBottom: '2rem' }}>
              Standard EMR forms are cluttered with irrelevant fields that slow you down. Salvia’s Form Engine uses <strong>Contextual Logic</strong> to hide the noise, showing only what matters for the specific subject and visit type.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#FF4E00', color: '#fff', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                <span style={{ fontWeight: 600 }}>Specialty-Specific Field Types</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#FF4E00', color: '#fff', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                <span style={{ fontWeight: 600 }}>Zero-Double-Entry Architecture</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#FF4E00', color: '#fff', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                <span style={{ fontWeight: 600 }}>Mobile-Native Evidence Capture</span>
              </div>
            </div>
          </div>
          <div style={{
            backgroundColor: '#F8F9FB', borderRadius: '32px', padding: '3rem',
            border: '1px solid rgba(0,0,0,0.05)', position: 'relative'
          }}>
            <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '0.75rem', color: '#FF4E00', fontWeight: 800, marginBottom: '0.5rem' }}>LOGIC RULE ACTIVE</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Surgical Assessment</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ height: '40px', backgroundColor: '#F1F5F9', borderRadius: '8px', opacity: 0.5 }} />
                <div style={{ height: '40px', backgroundColor: '#FFF5F0', border: '1px solid #FF4E00', borderRadius: '8px' }} />
                <div style={{ height: '40px', backgroundColor: '#F1F5F9', borderRadius: '8px', opacity: 0.5 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Clinician Q&A / Value Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }} className="mobile-stack">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"Can I build this myself?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>Yes. Our drag-and-drop builder is as intuitive as Google Forms but with medical-grade constraints. No IT ticket required to update your workflow.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"Is it Legal/Audit proof?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>Every form version is cryptographically hashed. We provide a <strong>Digital Mirror</strong>—high-fidelity PDF exports that match legacy paper standards for court or audit.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"Does it handle complex data?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>From anesthesia sliders to dental charting and aged care vitals. Salvia handles the data types specific to <strong>your</strong> clinical domain.</p>
          </div>
        </div>

      </div>
    </ProductDetailLayout>
  );
};
