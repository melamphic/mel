export const BridgeSection = () => (
  <section style={{
    padding: '4rem 0',
    borderTop: '1px solid rgba(0,0,0,0.06)',
    position: 'relative',
    zIndex: 10,
  }}>
    <div className="container" style={{ maxWidth: '1100px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
      }} className="mobile-stack">

        {/* Left — heading */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--salvia-accent)',
            marginBottom: '1rem',
          }}>
            <div style={{ width: 18, height: 2, backgroundColor: 'var(--salvia-accent)', borderRadius: '1px' }} />
            The workflow
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 600,
            color: 'var(--salvia-primary)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '1rem',
          }}>
            All three engines.<br />One seamless loop.
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--salvia-text-muted)',
            lineHeight: 1.65,
            maxWidth: '380px',
          }}>
            From voice capture to signed, auditable clinical record —
            Salvia runs the entire documentation pipeline, automatically, every time.
          </p>
        </div>

        {/* Right — stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { value: '< 60s',   label: 'From audio to a completed clinical note' },
            { value: '100%',    label: 'Policy compliance enforced on every form' },
            { value: 'Day one', label: 'Audit-ready records, locked on sign-off' },
          ].map(({ value, label }) => (
            <div key={value} style={{
              display: 'flex', alignItems: 'center', gap: '1.25rem',
              backgroundColor: '#fff',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              boxShadow: '0 4px 12px rgba(25,56,46,0.04)',
            }}>
              <span style={{
                fontSize: '1.4rem', fontWeight: 700,
                color: 'var(--salvia-primary)',
                letterSpacing: '-0.03em',
                minWidth: '72px', flexShrink: 0,
              }}>
                {value}
              </span>
              <span style={{ fontSize: '0.88rem', color: 'var(--salvia-text-muted)', lineHeight: 1.4 }}>
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  </section>
);
