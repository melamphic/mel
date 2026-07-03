import { Link } from 'react-router-dom';
import salviaLogo from '../assets/salvia.png';
import wordmarkDesktop from '../assets/salvia-wordmark-desktop.jpg';
import wordmarkMobile from '../assets/salvia-wordmark-mobile.jpg';

const linkStyle = {
  color: 'var(--salvia-text-muted)',
  fontSize: 'var(--text-sm)',
  textDecoration: 'none',
};
const colHeadingStyle = {
  color: 'var(--salvia-primary)',
  marginBottom: '1.25rem',
};

export const Footer = () => (
  <footer style={{
    backgroundColor: 'transparent',
    borderTop: '1px solid var(--border-subtle)',
    position: 'relative',
    zIndex: 10,
    paddingTop: '4rem'
  }}>
    <div
      className="footer-grid mobile-stack"
      style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
        gap: '2.5rem',
        marginBottom: '4rem',
        maxWidth: '1200px',
        margin: '0 auto 4rem',
        padding: '0 2rem',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <img
            src={salviaLogo}
            alt="Salvia Logo"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <span style={{ fontSize: 'var(--text-md)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--salvia-text)' }}>Salvia</span>
        </div>
        <p style={{ color: 'var(--salvia-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.6, maxWidth: '300px' }}>
          Compliance-grade clinical documentation — built as a compliance suite, not a scribe. Audio in, audit-ready records out.
        </p>
      </div>

      <div>
        <div className="eyebrow" style={colHeadingStyle}>By Practice</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <Link to="/hospitals" style={linkStyle}>Hospitals</Link>
          <Link to="/veterinary" style={linkStyle}>Veterinary</Link>
          <Link to="/dental" style={linkStyle}>Dental</Link>
          <Link to="/general-practice" style={linkStyle}>General Practice</Link>
          <Link to="/allied-health" style={linkStyle}>Allied Health</Link>
        </div>
      </div>

      <div>
        <div className="eyebrow" style={colHeadingStyle}>Allied Disciplines</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <Link to="/physiotherapy" style={linkStyle}>Physiotherapy</Link>
          <Link to="/osteopathy" style={linkStyle}>Osteopathy</Link>
          <Link to="/chiropractic" style={linkStyle}>Chiropractic</Link>
          <Link to="/occupational-therapy" style={linkStyle}>Occupational Therapy</Link>
          <Link to="/podiatry" style={linkStyle}>Podiatry</Link>
          <Link to="/speech-therapy" style={linkStyle}>Speech Therapy</Link>
        </div>
      </div>

      <div>
        <div className="eyebrow" style={colHeadingStyle}>Modules</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <Link to="/products/point-of-care-evidence" style={linkStyle}>Audio → Forms</Link>
          <Link to="/products/statutory-form-infrastructure" style={linkStyle}>Form Engine</Link>
          <Link to="/products/institutional-compliance-hub" style={linkStyle}>Policy Engine</Link>
          <Link to="/blog" style={linkStyle}>Blog</Link>
          <Link to="/pricing" style={linkStyle}>Pricing</Link>
        </div>
      </div>

      <div>
        <div className="eyebrow" style={colHeadingStyle}>Company</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <Link to="/frameworks" style={linkStyle}>Frameworks we support</Link>
          <Link to="/start" style={linkStyle}>Book a demo</Link>
          <Link to="/start" style={linkStyle}>Contact sales</Link>
        </div>
      </div>

      <div>
        <div className="eyebrow" style={colHeadingStyle}>Legal</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <Link to="/privacy" style={linkStyle}>Privacy Policy</Link>
          <Link to="/terms" style={linkStyle}>Terms of Service</Link>
          <Link to="/dpa" style={linkStyle}>Data Processing (DPA)</Link>
          <Link to="/subprocessors" style={linkStyle}>Sub-processors</Link>
          <Link to="/security" style={linkStyle}>Security</Link>
          <Link to="/cookies" style={linkStyle}>Cookie Policy</Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('salvia:cookie-settings'))}
            style={{ ...linkStyle, background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', font: 'inherit' }}
          >
            Cookie settings
          </button>
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
          loading="lazy"
          decoding="async"
          width={1456}
          height={724}
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
      borderTop: '1px solid var(--border-subtle)',
      padding: '1.5rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '0.75rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          backgroundColor: 'var(--salvia-accent)',
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: 'var(--text-xs)',
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
              fontSize: 'var(--text-xs)',
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

      <span style={{
        fontSize: 'var(--text-2xs)',
        fontWeight: 400,
        color: 'var(--salvia-text-muted)',
        opacity: 0.6,
      }}>
        © {new Date().getFullYear()} Melamphic AI Pvt Ltd.
      </span>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .footer-grid {
          grid-template-columns: 1fr 1fr !important;
          gap: 2rem !important;
        }
      }
      @media (max-width: 560px) {
        .footer-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
  </footer>
);
