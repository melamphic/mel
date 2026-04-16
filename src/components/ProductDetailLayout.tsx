import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

interface ProductDetailLayoutProps {
  children: React.ReactNode;
  title: string;
  kicker: string;
  accentColor?: string;
}

export const ProductDetailLayout: React.FC<ProductDetailLayoutProps> = ({ children, title, kicker, accentColor = 'var(--salvia-accent)' }) => {
  return (
    <>
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

      {/* Final "Book Demo" CTA section shared across all products */}
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--salvia-primary)', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', letterSpacing: '-0.03em' }}>
            Ready for a secure audit?
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Join elite clinical organizations already automating their governance.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="pill-button" style={{ backgroundColor: accentColor }}>Get Started</button>
            <Link to="/" className="pill-button-light" style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>Back to Overview</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
