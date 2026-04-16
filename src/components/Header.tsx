import React from 'react';

export const Header: React.FC = () => {
  return (
    <header style={{
      padding: '1.5rem 0',
      position: 'relative',
      zIndex: 100
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Logo element representing Melamphic (Lime cross icon like FoodHue) */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="var(--salvia-accent)" />
          </svg>
          <span style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--salvia-text)' }}>Melamphic</span>
        </div>

        <nav className="hide-mobile" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#product" style={{ color: 'var(--salvia-text)', fontSize: '0.95rem', fontWeight: 500 }}>Product</a>
          <a href="#solutions" style={{ color: 'var(--salvia-text)', fontSize: '0.95rem', fontWeight: 500 }}>Solutions</a>
          <a href="#pricing" style={{ color: 'var(--salvia-text)', fontSize: '0.95rem', fontWeight: 500 }}>Pricing</a>
        </nav>

        <button className="pill-button hide-mobile" style={{ fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}>
          Get Salvia
        </button>
      </div>
    </header>
  );
};
