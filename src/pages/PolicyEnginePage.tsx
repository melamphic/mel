import { ProductDetailLayout } from '../components/ProductDetailLayout';


export const PolicyEnginePage = () => {
  return (
    <ProductDetailLayout
      title="Survey-Ready Governance"
      kicker="POLICY ENGINE"
      accentColor="#6366F1"
    >
      <div className="container" style={{ padding: '8rem 0', maxWidth: '1100px' }}>

        {/* Pain Point Solution 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '6rem', alignItems: 'center', marginBottom: '10rem' }} className="mobile-stack">
          <div style={{ order: 2 }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--salvia-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Stop chasing signatures.
            </h2>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--salvia-text-muted)', marginBottom: '2rem' }}>
              Policies stuck in dusty binders or passive PDFs are a liability. Salvia turns your guidelines into <strong>Actionable Blocks</strong> and tracks staff acknowledgment in real-time. Know exactly who is compliant and who needs a reminder—without the manual follow-up.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#F8F9FB', padding: '1.5rem', borderRadius: '16px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6366F1' }}>100%</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Attestation Tracking</div>
              </div>
              <div style={{ backgroundColor: '#F8F9FB', padding: '1.5rem', borderRadius: '16px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6366F1' }}>Insta</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Audit Evidence</div>
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
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"Are we audit-ready?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>Always. Map your organization's internal policies directly to <strong>National Standards</strong> (NABH, BESTPRACTICE, VMR). When the auditor walks in, the evidence is one click away.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"Can staff easily find things?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>We use a <strong>Notion-inspired interface</strong> that's searchable and interconnected. No more searching through 100-page manuals to find a single clinical clause.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>"What about version control?"</h3>
            <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.6 }}>Updating a policy automatically notifies affected staff and marks the old version as archived. The <strong>Golden Thread</strong> of clinical governance remains unbroken.</p>
          </div>
        </div>

      </div>
    </ProductDetailLayout>
  );
};
