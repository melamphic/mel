import { Link } from 'react-router-dom';
import salviaLogo from '../assets/salvia.png';
import wordmarkDesktop from '../assets/salvia-wordmark-desktop.svg';
import wordmarkMobile from '../assets/salvia-wordmark-mobile.svg';

export const Footer = () => (
  <footer style={{
    backgroundColor: 'var(--salvia-bg)',
    borderTop: '1px solid rgba(0,0,0,0.07)',
    position: 'relative',
    zIndex: 10,
    paddingTop: '4rem'
  }}>
    <div className="container mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <img
            src={salviaLogo}
            alt="Salvia Logo"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--salvia-text)' }}>Salvia</span>
        </div>
        <p style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '300px' }}>
          Compliance-grade clinical documentation — built as a compliance suite, not a scribe. Audio in, audit-ready records out.
        </p>
      </div>

      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>By Practice</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link to="/veterinary" style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Veterinary</Link>
          <Link to="/dental" style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Dental</Link>
          {/* Aged Care link removed 2026-05-24 — vertical paused */}
          <Link to="/general-practice" style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>General Practice</Link>
        </div>
      </div>

      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Modules</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link to="/products/point-of-care-evidence" style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Audio → Forms</Link>
          <Link to="/products/statutory-form-infrastructure" style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Form Engine</Link>
          <Link to="/products/institutional-compliance-hub" style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Policy Engine</Link>
          <Link to="/blog" style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Blog</Link>
          <Link to="/pricing" style={{ color: 'var(--salvia-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Pricing</Link>
        </div>
      </div>

      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Company</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link to="/start" style={{ textDecoration: 'none', color: 'var(--salvia-text-muted)', fontSize: '0.9rem' }}>Book a demo</Link>
          <Link to="/start" style={{ textDecoration: 'none', color: 'var(--salvia-text-muted)', fontSize: '0.9rem' }}>Contact sales</Link>
        </div>
      </div>
    </div>

    {/* Big wordmark — responsive SVG art, full-bleed */}
    <Link to="/" style={{ textDecoration: 'none', display: 'block', lineHeight: 0, width: '100%' }} aria-label="Salvia home">
      <picture>
        <source media="(max-width: 768px)" srcSet={wordmarkMobile} />
        <img
          src={wordmarkDesktop}
          alt="Salvia"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            userSelect: 'none',
            pointerEvents: 'none',
            mixBlendMode: 'multiply',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)',
          }}
        />
      </picture>
    </Link>

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
