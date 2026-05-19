import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { SEO } from './SEO';

interface ProductDetailLayoutProps {
  children: React.ReactNode;
  title: string;
  kicker: string;
  accentColor?: string;
  seo?: { description: string; path: string; keywords?: string[] };
}

export const ProductDetailLayout: React.FC<ProductDetailLayoutProps> = ({ children, title, kicker, accentColor = 'var(--salvia-accent)', seo }) => {
  return (
    <>
      {seo && <SEO title={title} description={seo.description} path={seo.path} keywords={seo.keywords} />}
      <Header />
      
      {/* Detail Hero Section */}
      <section style={{ 
        padding: '12rem 0 6rem', 
        backgroundColor: 'var(--salvia-bg)',
        borderBottom: '1px solid rgba(0,0,0,0.04)'
      }}>
        <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
          <div style={{ 
            color: accentColor, 
            fontSize: '0.85rem', 
            fontWeight: 800, 
            letterSpacing: '0.15em', 
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            animation: 'fadeInUp 0.6s ease-out'
          }}>
            {kicker}
          </div>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 7vw, 5.5rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.05em', 
            lineHeight: 0.95,
            color: 'var(--salvia-primary)',
            marginBottom: '3rem',
            animation: 'fadeInUp 0.8s ease-out'
          }}>
            {title}
          </h1>
          
          <div style={{ 
            width: '60px', height: '2px', backgroundColor: accentColor, margin: '0 auto',
            animation: 'scaleIn 1s ease-out'
          }} />
        </div>
      </section>

      {/* Main Content Area */}
      <main style={{ backgroundColor: '#fff', position: 'relative', zIndex: 10 }}>
        {children}
      </main>

      {/* CTA */}
      <section style={{ padding: '7rem 0', backgroundColor: 'var(--salvia-bg)', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '580px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: accentColor, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Get started
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            See it in your workflow.
          </h2>
          <p style={{ color: 'var(--salvia-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
            Book a 20-minute demo — no slides, no pitch. We'll walk through how it works in a real clinical setting.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/start" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: accentColor, color: '#fff',
              padding: '0.85rem 1.75rem', borderRadius: '12px',
              fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
            }}>
              Book a demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link to="/pricing" style={{
              display: 'inline-flex', alignItems: 'center',
              backgroundColor: 'transparent', color: 'var(--salvia-primary)',
              padding: '0.85rem 1.75rem', borderRadius: '12px',
              fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
              border: '1.5px solid rgba(15,23,42,0.15)',
            }}>
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
