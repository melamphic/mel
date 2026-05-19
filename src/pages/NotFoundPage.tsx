import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const QUICK_LINKS = [
  {
    label: 'Point-of-Care Evidence',
    desc: 'Voice note in, audit-ready record out',
    href: '/products/point-of-care-evidence',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    label: 'Statutory Form Infrastructure',
    desc: 'Immutable, versioned clinical records',
    href: '/products/statutory-form-infrastructure',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: 'Institutional Compliance Hub',
    desc: 'Turn policy PDFs into active governance',
    href: '/products/institutional-compliance-hub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    label: 'Compliance Blog',
    desc: 'Records, audits, and governance insights',
    href: '/blog',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
];

export const NotFoundPage = () => {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Header />

      <main style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>
        <div className="container" style={{ maxWidth: '720px', textAlign: 'center' }}>

          {/* 404 visual */}
          <div style={{ marginBottom: '2rem', position: 'relative', display: 'inline-block' }}>
            <div style={{
              fontSize: 'clamp(5rem, 18vw, 9rem)',
              fontWeight: 900,
              letterSpacing: '-0.06em',
              color: '#F1F5F9',
              lineHeight: 1,
              userSelect: 'none',
            }}>
              404
            </div>
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '56px', height: '56px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255,78,0,0.08)',
                border: '1.5px solid rgba(255,78,0,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF4E00" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="12" />
                  <line x1="11" y1="16" x2="11.01" y2="16" />
                </svg>
              </div>
            </div>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 800,
            color: 'var(--salvia-primary)',
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
          }}>
            That page doesn't exist
          </h1>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--salvia-text-muted)',
            lineHeight: 1.65,
            marginBottom: '2.5rem',
          }}>
            The link may have moved, been renamed, or never existed.
            Here's where you probably want to go:
          </p>

          {/* Primary CTA */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <Link to="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: 'var(--salvia-primary)',
              color: '#fff',
              padding: '0.7rem 1.5rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Back to home
            </Link>
            <Link to="/contact-sales" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: 'transparent',
              color: 'var(--salvia-accent)',
              padding: '0.7rem 1.5rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: '1.5px solid rgba(255,78,0,0.25)',
              textDecoration: 'none',
            }}>
              Book a demo
            </Link>
          </div>

          {/* Quick links */}
          <div style={{
            textAlign: 'left',
            borderTop: '1px solid #F1F5F9',
            paddingTop: '2.5rem',
          }}>
            <p style={{
              fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--salvia-accent)',
              marginBottom: '1.25rem',
            }}>
              Quick links
            </p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {QUICK_LINKS.map(link => (
                <Link key={link.href} to={link.href} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 1.25rem',
                  border: '1px solid #EEF2F6',
                  borderRadius: '12px',
                  backgroundColor: '#FAFBFC',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }} className="nf-link-card">
                  <div style={{
                    width: '40px', height: '40px', flexShrink: 0,
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255,78,0,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--salvia-accent)',
                  }}>
                    {link.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--salvia-primary)' }}>
                      {link.label}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--salvia-text-muted)', marginTop: '0.15rem' }}>
                      {link.desc}
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />

      <style>{`
        .nf-link-card:hover {
          border-color: rgba(255,78,0,0.2);
          background-color: rgba(255,78,0,0.02);
          transform: translateX(3px);
        }
        .nf-link-card:hover svg:last-child {
          stroke: var(--salvia-accent);
        }
      `}</style>
    </div>
  );
};
