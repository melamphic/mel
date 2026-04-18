import React from 'react';
import { Link } from 'react-router-dom';

import salviaLogo from '../assets/salvia.png';

export const Header: React.FC = () => {
  return (
    <header style={{
      padding: '2rem 0',
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0,
      zIndex: 100
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          {/* Logo element representing Melamphic / Salvia */}
          <img
            src={salviaLogo}
            alt="Salvia Logo"
            style={{ width: '56px', height: '56px', objectFit: 'contain' }}
          />
          <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--salvia-text)' }}>Salvia</span>
        </Link>

        <nav className="hide-mobile" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', cursor: 'pointer' }} className="nav-group">
            <span style={{ color: 'var(--salvia-text)', fontSize: '0.9rem', fontWeight: 600 }}>Clinical Hub</span>
          </div>
          <a href="/#pipeline" style={{ color: 'var(--salvia-text)', fontSize: '0.9rem', fontWeight: 600 }}>The Loop</a>
          <Link to="/pricing" style={{ color: 'var(--salvia-text)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>Pricing</Link>
          <Link to="/blog" style={{ color: 'var(--salvia-text)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>Blog</Link>
          <a href="/#domains" style={{ color: 'var(--salvia-text)', fontSize: '0.9rem', fontWeight: 600 }}>Specialties</a>
        </nav>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/pricing" className="pill-button-light hide-mobile" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem', textDecoration: 'none' }}>
            Sign In
          </Link>
          <Link to="/pricing" className="pill-button" style={{ fontSize: '0.85rem', padding: '0.6rem 1.4rem', textDecoration: 'none' }}>
            Start free trial
          </Link>
        </div>
      </div>
    </header>
  );
};
