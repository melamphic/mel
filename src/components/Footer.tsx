export const Footer = () => (
  <footer style={{
    backgroundColor: 'var(--salvia-bg)',
    borderTop: '1px solid rgba(0,0,0,0.07)',
    position: 'relative',
    zIndex: 10,
  }}>

    {/* Big wordmark */}
    <div style={{ textAlign: 'center', padding: '2.5rem 1rem 1.5rem', overflow: 'hidden' }}>
      <span style={{
        fontSize: 'clamp(3.5rem, 13vw, 9.5rem)',
        fontWeight: 600,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        color: 'var(--salvia-primary)',
        opacity: 0.5,
        userSelect: 'none',
        display: 'inline-block',
      }}>
        SALVIA
      </span>
    </div>

    {/* Bottom bar */}
    <div style={{
      borderTop: '1px solid rgba(0,0,0,0.06)',
      padding: '1rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '0.75rem',
    }}>
      {/* Made in Malabar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          backgroundColor: 'var(--salvia-accent)',
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: '0.82rem',
          fontWeight: 500,
          letterSpacing: '-0.01em',
          color: 'var(--salvia-text-muted)',
        }}>
          Made in Malabar, for the world
        </span>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', gap: '1.5rem' }}>
        {['Privacy', 'Contact'].map(item => (
          <a
            key={item}
            href="#"
            style={{
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'var(--salvia-text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--salvia-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--salvia-text-muted)')}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Copyright */}
      <span style={{
        fontSize: '0.72rem',
        fontWeight: 400,
        color: 'var(--salvia-text-muted)',
        opacity: 0.6,
      }}>
        © {new Date().getFullYear()} Melamphic Inc.
      </span>
    </div>
  </footer>
);
