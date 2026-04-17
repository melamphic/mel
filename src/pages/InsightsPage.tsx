import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BLOG_CONTENT } from '../data/blogContent';

// Robust local type to avoid 'verbatimModuleSyntax' and 'import type' conflicts
type BlogDomain = 'GENERAL' | 'VETERINARY' | 'DENTAL';

export const InsightsPage: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<BlogDomain | 'ALL'>('ALL');

  // Logic to process raw domain-filtered articles
  const allArticles = Object.entries(BLOG_CONTENT).map(([id, data]) => ({
    id,
    ...data
  }));

  const filteredArticles = allArticles.filter(art =>
    activeDomain === 'ALL' || art.domain === activeDomain
  );

  const domainTabs: { label: string, value: BlogDomain | 'ALL' }[] = [
    { label: 'All Insights', value: 'ALL' },
    { label: 'General Clinic', value: 'GENERAL' },
    { label: 'Veterinary', value: 'VETERINARY' },
    { label: 'Dental', value: 'DENTAL' }
  ];

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Header />

      <main style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>
        <div className="container" style={{ maxWidth: '1240px' }}>

          {/* Header Section */}
          <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '4rem', marginBottom: '4rem' }}>
            <span style={{
              fontSize: '0.8rem', fontWeight: 800, color: 'var(--salvia-accent)',
              letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block'
            }}>
              Compliance Intelligence
            </span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 800,
              color: 'var(--salvia-primary)', marginTop: '1rem', letterSpacing: '-0.04em', lineHeight: 1.1
            }}>
              Elite Clinical <br />
              <span style={{ color: 'var(--salvia-text-muted)', fontWeight: 400 }}>Insights & Support.</span>
            </h1>
          </div>

          {/* Luxury Navigation Bar */}
          <div style={{
            display: 'flex', gap: '0.75rem', marginBottom: '5rem',
            overflowX: 'auto', paddingBottom: '0.5rem'
          }} className="hide-scrollbar">
            {domainTabs.map(d => (
              <button
                key={d.value}
                onClick={() => setActiveDomain(d.value)}
                style={{
                  padding: '0.8rem 2rem',
                  borderRadius: '100px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  border: '1px solid',
                  borderColor: activeDomain === d.value ? 'var(--salvia-primary)' : '#E2E8F0',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  backgroundColor: activeDomain === d.value ? 'var(--salvia-primary)' : 'transparent',
                  color: activeDomain === d.value ? '#fff' : 'var(--salvia-text-muted)',
                  boxShadow: activeDomain === d.value ? '0 10px 25px rgba(15,23,42,0.12)' : 'none'
                }}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Institutional Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '3rem'
          }} className="mobile-stack">
            {filteredArticles.map((art) => (
              <Link to={`/blog/${art.id}`} key={art.id} style={{ textDecoration: 'none', display: 'block' }} className="blog-card-link">
                {(() => {
                  const domainColor = art.domain === 'VETERINARY' ? '#F97316' : art.domain === 'DENTAL' ? '#06B6D4' : '#FF4E00';
                  const domainBg = art.domain === 'VETERINARY' ? 'rgba(249,115,22,0.06)' : art.domain === 'DENTAL' ? 'rgba(6,182,212,0.06)' : 'rgba(255,78,0,0.06)';
                  return (
                    <article style={{
                      backgroundColor: '#fff',
                      borderRadius: '20px',
                      border: '1px solid rgba(15,23,42,0.07)',
                      height: '100%',
                      transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      boxShadow: '0 2px 12px rgba(15,23,42,0.04)'
                    }} className="blog-card">
                      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        {/* Domain + tag badge */}
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                          backgroundColor: domainBg,
                          padding: '0.35rem 0.8rem',
                          borderRadius: '100px',
                          alignSelf: 'flex-start',
                          marginBottom: '1.5rem'
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: domainColor, flexShrink: 0 }} />
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: domainColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            {art.domain === 'GENERAL' ? 'General Clinic' : art.domain === 'VETERINARY' ? 'Veterinary' : 'Dental'} · {art.tag}
                          </span>
                        </div>

                        {/* Question title */}
                        <h3 style={{
                          fontSize: '1.25rem', fontWeight: 800, color: 'var(--salvia-primary)',
                          lineHeight: 1.3, margin: 0, letterSpacing: '-0.02em', flex: 1
                        }}>
                          {art.q}
                        </h3>

                        {/* Keywords */}
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {art.keywords.slice(0, 3).map(kw => (
                            <span key={kw} style={{
                              fontSize: '0.65rem', backgroundColor: '#F1F5F9', padding: '0.25rem 0.55rem',
                              borderRadius: '4px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em'
                            }}>
                              {kw}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div style={{
                          marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid #F1F5F9',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                        }}>
                          <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>{art.date}</span>
                          <span style={{
                            fontSize: '0.8rem', color: domainColor, fontWeight: 800,
                            display: 'flex', alignItems: 'center', gap: '0.35rem', letterSpacing: '0.04em'
                          }}>
                            Read
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })()}
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div style={{ padding: '8rem 0', textAlign: 'center' }}>
              <p style={{ color: 'var(--salvia-text-muted)', fontSize: '1.3rem', fontWeight: 500 }}>
                No institutional records found for this criteria.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        .blog-card-link:hover .blog-card {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(15,23,42,0.1);
          border-color: rgba(15,23,42,0.14);
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

