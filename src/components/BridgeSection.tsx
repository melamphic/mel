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
            fontSize: 'var(--text-2xs)', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--salvia-accent)',
            marginBottom: '1rem',
          }}>
            <div style={{ width: 18, height: 2, backgroundColor: 'var(--salvia-accent)', borderRadius: '1px' }} />
            The numbers
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 600,
            color: 'var(--salvia-primary)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '1rem',
          }}>
            What you actually get.
          </h2>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--salvia-text-muted)',
            lineHeight: 1.65,
            maxWidth: '380px',
          }}>
            Not AI theatre. Measurable outputs on every note — so you can prove, defend, and
            audit the record the second anyone asks.
          </p>
        </div>

        {/* Right — stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { value: '~60s',     label: 'From a voice note in any Indian language to a fully filled clinical form' },
            { value: 'Every',    label: 'Linked policy is auto-checked on the filled record' },
            { value: '1-click',  label: 'Audit Pack export — note, audio, transcript, policy trace' },
          ].map(({ value, label }) => (
            <div key={value} style={{
              display: 'flex', alignItems: 'center', gap: '1.25rem',
              backgroundColor: '#fff',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              boxShadow: 'var(--shadow-2)',
            }}>
              <span style={{
                fontSize: 'var(--text-xl)', fontWeight: 700,
                color: 'var(--salvia-primary)',
                letterSpacing: '-0.03em',
                minWidth: '72px', flexShrink: 0,
              }}>
                {value}
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--salvia-text-muted)', lineHeight: 1.4 }}>
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  </section>
);
