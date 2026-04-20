import { Link } from 'react-router-dom';
import salviaLogo from '../assets/salvia.png';

export const Footer = () => (
  <footer style={{
    backgroundColor: 'var(--salvia-bg)',
    borderTop: '1px solid rgba(0,0,0,0.07)',
    position: 'relative',
    zIndex: 10,
    paddingTop: '4rem'
  }}>
    <div className="container mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <img
            src={salviaLogo}
            alt="Salvia Logo"
            style={{ width: '100px', height: '100px', objectFit: 'contain' }}
          />
          <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--salvia-text)' }}>Salvia</span>
        </div>
        <p style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '300px' }}>
          Compliance-grade AI clinical documentation for clinics, vets, dental practices, and aged care. Audio in, audit-ready records out.
        </p>
      </div>

      <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '0.05em' }}>MODULES</div>
          <Link to="/products/point-of-care-evidence" style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Audio → Forms</Link>
          <Link to="/products/statutory-form-infrastructure" style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Form Engine</Link>
          <Link to="/products/institutional-compliance-hub" style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Policy Engine</Link>
          <Link to="/blog" style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Blog</Link>
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>Company</h4>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <a href="#" style={{ textDecoration: 'none', color: 'var(--salvia-text-muted)', fontSize: '0.9rem' }}>About</a>
          <a href="#" style={{ textDecoration: 'none', color: 'var(--salvia-text-muted)', fontSize: '0.9rem' }}>Security</a>
          <Link to="/blog" style={{ textDecoration: 'none', color: 'var(--salvia-text-muted)', fontSize: '0.9rem' }}>Blog</Link>
          <Link to="/contact-sales" style={{ textDecoration: 'none', color: 'var(--salvia-text-muted)', fontSize: '0.9rem' }}>Contact sales</Link>
        </nav>
      </div>
    </div>

    {/* Big wordmark */}
    <div style={{ textAlign: 'center', padding: '0rem 1rem 1.5rem', overflow: 'hidden' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span style={{
          fontSize: 'clamp(3.5rem, 13vw, 9.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: 'var(--salvia-primary)',
          opacity: 0.1,
          userSelect: 'none',
          display: 'inline-block',
        }}>
          SALVIA
        </span>
      </Link>
    </div>

    {/* Bottom bar */}
    <div style={{
      borderTop: '1px solid rgba(0,0,0,0.06)',
      padding: '1.5rem 2rem',
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

      <nav style={{ display: 'flex', gap: '1.5rem' }}>
        {['Privacy', 'Legal'].map(item => (
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
