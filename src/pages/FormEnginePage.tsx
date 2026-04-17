import { ProductDetailLayout } from '../components/ProductDetailLayout';


export const FormEnginePage = () => {
  return (
    <ProductDetailLayout
      title="Statutory Form Infrastructure"
      kicker="IMMUTABLE DATA ASSETS"
      accentColor="#FF4E00"
    >
      <div className="container" style={{ padding: '8rem 0', maxWidth: '1100px' }}>

        {/* Pain Point Solution: Audit Trail */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', marginBottom: '10rem' }} className="mobile-stack">
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--salvia-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Built for the Auditor's Lens.
            </h2>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--salvia-text-muted)', marginBottom: '2rem' }}>
              Standard forms are flimsy. Salvia's <strong>Statutory Form Infrastructure</strong> treats every clinical note as an immutable asset. With a built-in <strong>Min/Major/Patch versioning system</strong>, every change is tracked, hashed, and defensible. We don't just record data; we preserve the chain of custody.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#FF4E00', color: '#fff', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                <span style={{ fontWeight: 600 }}>Unbreakable Version History</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#FF4E00', color: '#fff', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                <span style={{ fontWeight: 600 }}>Zero-Delete Archive Policy</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#FF4E00', color: '#fff', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                <span style={{ fontWeight: 600 }}>Real-time Protocol Alignment Checks</span>
              </div>
            </div>
          </div>
          <div style={{
            backgroundColor: '#F8F9FB', borderRadius: '32px', padding: '3rem',
            border: '1px solid rgba(0,0,0,0.05)', position: 'relative'
          }}>
            <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '0.75rem', color: '#FF4E00', fontWeight: 800, marginBottom: '0.5rem' }}>VERSION ASSET v3.1.2</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Surgical Protocol Alpha</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px' }} />
                <div style={{ height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px' }} />
                <div style={{ height: '8px', backgroundColor: '#FF4E00', borderRadius: '4px', width: '60%' }} />
              </div>
              <div style={{ marginTop: '1rem', fontSize: '0.65rem', color: 'var(--salvia-text-muted)' }}>Last Audit Trace: 4m ago</div>
            </div>
          </div>
        </div>

        {/* Value Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }} className="mobile-stack">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"Can we rollback changes?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>Yes. Salvia allows for seamless rollbacks to any historical version, but each rollback is itself <strong>logged as a major institutional event</strong> with a mandatory reason-for-change signature.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"Is data capture mandatory?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>Our logic engine can enforce mandatory fields based on the <strong>clinical severity</strong> of the encounter. Ensure every "Must-Follow" step of your protocol is validated before submission.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"How is the output rendered?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>We provide a <strong>Statutory PDF Mirror</strong>—a perfect, high-fidelity export of the digital record that satisfies legacy paper audit requirements while maintaining digital metadata.</p>
          </div>
        </div>

      </div>
    </ProductDetailLayout>
  );
};
