import React from 'react';
import { Link } from 'react-router-dom';

import salviaLogo from '../assets/salvia.png';
import { APP_URL } from '../config';

const PRIMARY_VERTICALS = [
  { to: '/veterinary',        label: 'Veterinary',       sub: 'VCI · NABH · CCSEA' },
  { to: '/dental',            label: 'Dental',           sub: 'DCI · NABH · CGHS' },
  { to: '/general-practice',  label: 'General Practice', sub: 'NMC · NABH · ABDM' },
  { to: '/allied-health',     label: 'Allied Health',    sub: 'NCAHP · NABH · ABDM' },
];

const ALLIED_DISCIPLINES = [
  { to: '/physiotherapy',         label: 'Physiotherapy',         accent: '#0891B2' },
  { to: '/osteopathy',            label: 'Osteopathy',            accent: '#8B5CF6' },
  { to: '/chiropractic',          label: 'Chiropractic',          accent: '#F97316' },
  { to: '/occupational-therapy',  label: 'Occupational Therapy',  accent: '#EC4899' },
  { to: '/podiatry',              label: 'Podiatry',              accent: '#06B6D4' },
  { to: '/speech-therapy',        label: 'Speech Therapy',        accent: '#6366F1' },
];

export const Header: React.FC = () => {
  return (
    <header style={{
      padding: '2rem 0',
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0,
      zIndex: 100,
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <img
            src={salviaLogo}
            alt="Salvia Logo"
            style={{ width: '56px', height: '56px', objectFit: 'contain' }}
          />
          <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--salvia-text)' }}>Salvia</span>
        </Link>

        <nav className="hide-mobile" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <Link to="/#products" style={{ color: 'var(--salvia-text)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>Product</Link>
          <Link to="/#how-it-works" style={{ color: 'var(--salvia-text)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>How it works</Link>

          {/* Verticals — hover dropdown */}
          <div className="vertical-dropdown" style={{ position: 'relative' }}>
            <Link
              to="/#domains"
              style={{
                color: 'var(--salvia-text)',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.5rem 0',
              }}
            >
              Verticals
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginTop: '2px' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Link>

            <div className="vertical-dropdown-panel" style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%) translateY(-8px)',
              opacity: 0,
              pointerEvents: 'none',
              minWidth: '560px',
              backgroundColor: '#fff',
              borderRadius: '20px',
              boxShadow: '0 24px 60px rgba(15,23,42,0.15)',
              border: '1px solid #EEF2F6',
              padding: '1.5rem',
              transition: 'opacity 0.18s ease, transform 0.18s ease',
              zIndex: 200,
              marginTop: '0.5rem',
            }}>
              {/* Invisible bridge so the panel survives the cursor gap */}
              <div style={{
                position: 'absolute', top: '-10px', left: 0, right: 0, height: '10px',
              }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Primary verticals */}
                <div>
                  <div style={{
                    fontSize: '0.6rem', fontWeight: 800, color: 'var(--salvia-text-muted)',
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.85rem',
                  }}>
                    By Practice
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {PRIMARY_VERTICALS.map((v) => (
                      <Link key={v.to} to={v.to} style={{ textDecoration: 'none' }} className="dropdown-item">
                        <div style={{
                          padding: '0.65rem 0.75rem',
                          borderRadius: '10px',
                          transition: 'background-color 0.15s ease',
                        }}>
                          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--salvia-primary)', marginBottom: '0.15rem' }}>{v.label}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--salvia-text-muted)' }}>{v.sub}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Allied disciplines */}
                <div>
                  <div style={{
                    fontSize: '0.6rem', fontWeight: 800, color: 'var(--salvia-text-muted)',
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.85rem',
                  }}>
                    Allied Disciplines
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {ALLIED_DISCIPLINES.map((d) => (
                      <Link key={d.to} to={d.to} style={{ textDecoration: 'none' }} className="dropdown-item">
                        <div style={{
                          padding: '0.55rem 0.75rem',
                          borderRadius: '10px',
                          display: 'flex', alignItems: 'center', gap: '0.65rem',
                          transition: 'background-color 0.15s ease',
                        }}>
                          <span style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            backgroundColor: d.accent, flexShrink: 0,
                          }} />
                          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--salvia-primary)' }}>{d.label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Frameworks browser footer link */}
              <div style={{
                marginTop: '1.25rem',
                paddingTop: '1rem',
                borderTop: '1px solid #EEF2F6',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--salvia-text-muted)' }}>
                  40+ regulatory frameworks across India
                </span>
                <Link to="/frameworks" style={{
                  fontSize: '0.82rem', fontWeight: 700,
                  color: 'var(--salvia-accent)', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                }}>
                  Browse all frameworks
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <Link to="/frameworks" style={{ color: 'var(--salvia-text)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>Frameworks</Link>
          <Link to="/pricing" style={{ color: 'var(--salvia-text)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>Pricing</Link>
          <Link to="/blog" style={{ color: 'var(--salvia-text)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>Blog</Link>
        </nav>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href={APP_URL} className="pill-button-light hide-mobile" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem', textDecoration: 'none' }}>
            Sign In
          </a>
          <Link to="/start" className="pill-button" style={{ fontSize: '0.85rem', padding: '0.6rem 1.4rem', textDecoration: 'none' }}>
            Book a demo
          </Link>
        </div>
      </div>

      <style>{`
        .vertical-dropdown:hover .vertical-dropdown-panel,
        .vertical-dropdown:focus-within .vertical-dropdown-panel {
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: translateX(-50%) translateY(0) !important;
        }
        .dropdown-item:hover > div {
          background-color: rgba(15, 23, 42, 0.04);
        }
      `}</style>
    </header>
  );
};
