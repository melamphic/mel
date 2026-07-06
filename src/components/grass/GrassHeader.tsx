import React from 'react';
import { Link } from 'react-router-dom';

import salviaLogo from '../../assets/salvia.png';

// Floating full-width rounded nav bar — the grass design language header.
export const GrassHeader: React.FC = () => (
  <div className="g-nav">
    <div className="g-navbar">
      <Link to="/" className="g-logo">
        <img src={salviaLogo} alt="Salvia logo" />
        Salvia
      </Link>
      <nav className="g-nav-links" aria-label="Primary">
        <Link to="/#how-it-works">How it works</Link>
        <Link to="/#six-year-test">Why</Link>
        <Link to="/hospitals">Hospitals</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/blog">Blog</Link>
      </nav>
      <Link className="g-btn g-btn--green g-nav-cta" to="/start">
        Get started
      </Link>
    </div>
  </div>
);
