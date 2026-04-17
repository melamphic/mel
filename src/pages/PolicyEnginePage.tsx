import { ProductDetailLayout } from '../components/ProductDetailLayout';


export const PolicyEnginePage = () => {
  return (
    <ProductDetailLayout
      title="Institutional Compliance Hub"
      kicker="ACTIVE GOVERNANCE"
      accentColor="#6366F1"
    >
      <div className="container" style={{ padding: '8rem 0', maxWidth: '1100px' }}>

        {/* Pain Point Solution: Accountability */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '6rem', alignItems: 'center', marginBottom: '10rem' }} className="mobile-stack">
          <div style={{ order: 2 }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--salvia-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Codify Accountability.
            </h2>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--salvia-text-muted)', marginBottom: '2rem' }}>
              A policy that isn't read is a liability. Salvia's <strong>Institutional Compliance Hub</strong> transforms static PDF manuals into active clinical blocks. We map your internal rules directly to national frameworks—guaranteeing that every staff action is backed by an explicit institutional mandate.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#F8F9FB', padding: '1.5rem', borderRadius: '16px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6366F1' }}>Active</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Staff Attestation</div>
              </div>
              <div style={{ backgroundColor: '#F8F9FB', padding: '1.5rem', borderRadius: '16px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6366F1' }}>Ready</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Regulatory Mirror</div>
              </div>
            </div>
          </div>
          <div style={{
            order: 1, backgroundColor: 'var(--salvia-primary)', borderRadius: '32px',
            padding: '4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'
          }}>
            {/* Abstract: Visualizing "Status" of policies */}
            {[1, 0.6, 0.8].map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: i === 0 ? '#10B981' : '#F59E0B' }} />
                <div style={{ flex: 1, height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                  <div style={{ width: `${w * 100}%`, height: '100%', backgroundColor: i === 0 ? '#10B981' : '#F59E0B', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Value Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }} className="mobile-stack">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"Can we map to specific codes?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>Yes. Salvia allows you to tag specific policy blocks as <strong>"Legally Enforceable Clauses"</strong> with assigned parity (Must Follow vs. Maybe Follow). Map these to NABH, VMR, or BESTPRACTICE codes instantly.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"How do we handle policy unlinking?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>If a policy is retired, Salvia triggers a <strong>Major Version Event</strong> across all linked forms, highlighting the governance gap and requiring a protocol signature for continued operation.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"Is there a staff search?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>Indeed. Our <strong>Active Knowledge RAG</strong> allows staff to query organizational policies directly from the point of care, eliminating doubts during high-stakes clinical decision moments.</p>
          </div>
        </div>

      </div>
    </ProductDetailLayout>
  );
};
