import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BLOG_CONTENT } from '../data/blogContent';

type BlogDomain = 'GENERAL' | 'VETERINARY' | 'DENTAL';

const DOMAIN_META: Record<BlogDomain, { label: string; color: string; bg: string }> = {
  GENERAL: { label: 'Clinic', color: '#FF4E00', bg: 'rgba(255,78,0,0.08)' },
  VETERINARY: { label: 'Vet', color: '#0EA5E9', bg: 'rgba(14,165,233,0.08)' },
  DENTAL: { label: 'Dental', color: '#059669', bg: 'rgba(5,150,105,0.08)' },
};

export const InsightsPage: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<BlogDomain | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const allArticles = useMemo(
    () => Object.entries(BLOG_CONTENT).map(([id, data]) => ({ id, ...data })),
    []
  );

  const filteredArticles = allArticles.filter(art => {
    if (activeDomain !== 'ALL' && art.domain !== activeDomain) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        art.q.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.keywords.some(k => k.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const featured = filteredArticles[0];
  const rest = filteredArticles.slice(1);

  const domainTabs: { label: string; value: BlogDomain | 'ALL'; count: number }[] = [
    { label: 'Everything', value: 'ALL', count: allArticles.length },
    { label: 'Clinics', value: 'GENERAL', count: allArticles.filter(a => a.domain === 'GENERAL').length },
    { label: 'Vets', value: 'VETERINARY', count: allArticles.filter(a => a.domain === 'VETERINARY').length },
    { label: 'Dental', value: 'DENTAL', count: allArticles.filter(a => a.domain === 'DENTAL').length },
  ];

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Header />

      <main style={{ paddingTop: '9rem', paddingBottom: '6rem' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>

          {/* Header */}
          <div style={{ marginBottom: '3rem' }}>
            <span style={{
              fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--salvia-accent)',
              display: 'block', marginBottom: '1rem',
            }}>
              Field notes
            </span>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800,
              color: 'var(--salvia-primary)',
              letterSpacing: '-0.035em', lineHeight: 1.08,
              margin: 0,
              maxWidth: '880px',
            }}>
              The real questions clinicians, vets, and dentists ask about
              documentation — with straight answers.
            </h1>
            <p style={{
              fontSize: '1.1rem', color: 'var(--salvia-text-muted)',
              lineHeight: 1.65, marginTop: '1.25rem', maxWidth: '680px',
            }}>
              No corporate fluff. No SEO filler. We trawl forums, boards, and subreddits for the
              questions people actually have — then write the answers we wish had existed when we
              were trying to figure it out ourselves.
            </p>
          </div>

          {/* Search + Tabs */}
          <div className="blog-controls" style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            marginBottom: '3.5rem',
            flexWrap: 'wrap',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid #F1F5F9',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              backgroundColor: '#F8FAFC',
              border: '1px solid #EEF2F6',
              borderRadius: '10px',
              padding: '0.65rem 0.9rem',
              flex: '1 1 280px',
              minWidth: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions, keywords, situations..."
                style={{
                  flex: 1, minWidth: 0,
                  border: 'none', outline: 'none',
                  background: 'transparent',
                  fontSize: '0.92rem',
                  color: 'var(--salvia-primary)',
                  fontWeight: 500,
                }}
              />
            </div>
            <div className="blog-domain-tabs" style={{
              display: 'flex', gap: '0.4rem',
              overflowX: 'auto',
              maxWidth: '100%',
              flexShrink: 0,
            }}>
              {domainTabs.map(d => (
                <button
                  key={d.value}
                  onClick={() => setActiveDomain(d.value)}
                  style={{
                    padding: '0.6rem 1.1rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: activeDomain === d.value ? 'var(--salvia-primary)' : '#E2E8F0',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    backgroundColor: activeDomain === d.value ? 'var(--salvia-primary)' : '#fff',
                    color: activeDomain === d.value ? '#fff' : 'var(--salvia-text-muted)',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}
                >
                  {d.label}
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 700,
                    opacity: 0.7,
                    padding: '0.1rem 0.35rem',
                    borderRadius: '4px',
                    backgroundColor: activeDomain === d.value ? 'rgba(255,255,255,0.15)' : '#F1F5F9',
                  }}>
                    {d.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Featured */}
          {featured && (
            <Link to={`/blog/${featured.id}`} className="blog-featured-link" style={{ textDecoration: 'none', display: 'block', marginBottom: '4rem' }}>
              <article className="blog-featured" style={{
                display: 'grid', gridTemplateColumns: '1.3fr 1fr',
                gap: '0',
                border: '1px solid #EEF2F6',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                transition: 'all 0.3s ease',
              }}>
                <div style={{ padding: '3rem 3rem 2.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      fontSize: '0.65rem', fontWeight: 800,
                      color: DOMAIN_META[featured.domain].color,
                      backgroundColor: DOMAIN_META[featured.domain].bg,
                      padding: '0.32rem 0.65rem',
                      borderRadius: '6px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>
                      {DOMAIN_META[featured.domain].label}
                    </span>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700,
                      color: 'var(--salvia-primary)',
                      backgroundColor: '#FFF7F2',
                      border: '1px solid rgba(255,78,0,0.2)',
                      padding: '0.32rem 0.65rem',
                      borderRadius: '6px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>
                      Featured · {featured.tag}
                    </span>
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800,
                    color: 'var(--salvia-primary)',
                    letterSpacing: '-0.025em', lineHeight: 1.2,
                    margin: '0 0 1.25rem',
                  }}>
                    {featured.q}
                  </h2>
                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--salvia-text-muted)',
                    lineHeight: 1.6,
                    margin: '0 0 2rem',
                  }}>
                    {featured.excerpt}
                  </p>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    fontSize: '0.8rem', color: 'var(--salvia-text-muted)',
                  }}>
                    <span style={{ fontWeight: 600, color: 'var(--salvia-primary)' }}>{featured.author}</span>
                    <span style={{ opacity: 0.3 }}>·</span>
                    <span>{featured.date}</span>
                    <span style={{ opacity: 0.3 }}>·</span>
                    <span>{featured.readTime}</span>
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#F8FAFC',
                  padding: '3rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  {/* abstract question-mark-quote visual */}
                  <div style={{
                    fontSize: 'clamp(5rem, 12vw, 10rem)',
                    fontWeight: 900,
                    color: 'var(--salvia-accent)',
                    opacity: 0.12,
                    lineHeight: 0.8,
                    letterSpacing: '-0.06em',
                    userSelect: 'none',
                  }}>
                    ?
                  </div>
                  <div style={{
                    position: 'absolute', bottom: '1.5rem', right: '1.5rem',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    fontSize: '0.75rem', fontWeight: 700,
                    color: 'var(--salvia-accent)',
                    backgroundColor: '#fff',
                    padding: '0.5rem 0.85rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(15,23,42,0.05)',
                    border: '1px solid rgba(0,0,0,0.04)',
                  }}>
                    Read the answer
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Rest of the grid */}
          {rest.length > 0 && (
            <div className="blog-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.5rem',
            }}>
              {rest.map((art) => {
                const meta = DOMAIN_META[art.domain];
                return (
                  <Link to={`/blog/${art.id}`} key={art.id} style={{ textDecoration: 'none' }} className="blog-card-link">
                    <article className="blog-card" style={{
                      backgroundColor: '#fff',
                      borderRadius: '14px',
                      border: '1px solid #EEF2F6',
                      height: '100%',
                      display: 'flex', flexDirection: 'column',
                      padding: '1.75rem 1.75rem 1.5rem',
                      transition: 'all 0.25s ease',
                    }}>
                      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '0.62rem', fontWeight: 800,
                          color: meta.color,
                          backgroundColor: meta.bg,
                          padding: '0.25rem 0.55rem',
                          borderRadius: '5px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}>
                          {meta.label}
                        </span>
                        <span style={{
                          fontSize: '0.62rem', fontWeight: 700,
                          color: 'var(--salvia-text-muted)',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          padding: '0.25rem 0',
                        }}>
                          · {art.tag}
                        </span>
                      </div>

                      <h3 style={{
                        fontSize: '1.08rem', fontWeight: 700,
                        color: 'var(--salvia-primary)',
                        lineHeight: 1.35, letterSpacing: '-0.015em',
                        margin: '0 0 0.85rem',
                      }}>
                        {art.q}
                      </h3>

                      <p style={{
                        fontSize: '0.88rem',
                        color: 'var(--salvia-text-muted)',
                        lineHeight: 1.55,
                        margin: '0 0 1.25rem',
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {art.excerpt}
                      </p>

                      <div style={{
                        marginTop: 'auto',
                        paddingTop: '1rem',
                        borderTop: '1px solid #F1F5F9',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        fontSize: '0.72rem',
                        color: 'var(--salvia-text-muted)',
                      }}>
                        <span>{art.readTime}</span>
                        <span style={{ fontWeight: 600 }}>{art.date}</span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}

          {filteredArticles.length === 0 && (
            <div style={{ padding: '6rem 0', textAlign: 'center' }}>
              <p style={{ color: 'var(--salvia-text-muted)', fontSize: '1.1rem' }}>
                No posts match that — try a different search or domain.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        .blog-card-link:hover .blog-card {
          border-color: rgba(15, 23, 42, 0.14);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(15,23,42,0.06);
        }
        .blog-featured-link:hover .blog-featured {
          border-color: rgba(15, 23, 42, 0.14);
          box-shadow: 0 16px 48px rgba(15,23,42,0.06);
        }
        @media (max-width: 768px) {
          .blog-featured {
            grid-template-columns: 1fr !important;
          }
          .blog-featured > div:first-child {
            padding: 2rem 1.75rem 1.5rem !important;
          }
          .blog-featured > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
