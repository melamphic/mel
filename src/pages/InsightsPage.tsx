import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { Rv } from '../components/grass/Rv';
import { VISIBLE_BLOG_CONTENT } from '../data/blogContent';
import { blogArt } from '../lib/blogArt';

type BlogDomain = 'GENERAL' | 'VETERINARY' | 'DENTAL';

const DOMAIN_META: Record<BlogDomain, { label: string; cls: string }> = {
  GENERAL: { label: 'Clinic', cls: 'g-tpl-vert' },
  VETERINARY: { label: 'Vet', cls: 'g-tpl-vert g-tpl-vert--vet' },
  DENTAL: { label: 'Dental', cls: 'g-tpl-vert g-tpl-vert--dental' },
};


export const InsightsPage: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<BlogDomain | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const allArticles = useMemo(
    () => Object.entries(VISIBLE_BLOG_CONTENT).map(([id, data]) => ({ id, ...data })),
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
    <>
      <SEO
        title="From the compliance desk"
        description="Clinical documentation, compliance law, and audit readiness — written for vets, dentists, and clinicians who've been burned by bad records."
        path="/blog"
        keywords={['clinical documentation', 'veterinary compliance', 'dental records', 'NABH audit', 'medical record keeping India']}
      />
      <GrassHeader />
      <main style={{ flex: 1, zIndex: 10, background: '#fff' }}>
        <section className="g-section" style={{ padding: '148px 0 104px' }}>
          <div className="g-container">

            {/* Header */}
            <Rv as="h1" className="g-h1" style={{ fontSize: 'clamp(36px, 4.4vw, 62px)', maxWidth: '20ch' }}>
              The questions clinicians actually ask. <span className="g-hl">Straight answers.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1} style={{ marginTop: 18 }}>
              No corporate fluff, no SEO filler. We trawl forums, boards and subreddits for the
              documentation questions people actually have — then write the answers we wish had
              existed when we were figuring it out ourselves.
            </Rv>

            {/* Search + tabs */}
            <Rv delay={2} style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', margin: '40px 0 8px' }}>
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  border: '1px solid var(--g-line)', borderRadius: 12,
                  padding: '11px 14px', flex: '1 1 280px', minWidth: 0, background: '#fff',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--g-ink-faint)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions, keywords, situations…"
                  style={{
                    flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
                    fontFamily: 'var(--g-font)', fontSize: 14.5, fontWeight: 500, color: 'var(--g-ink)',
                  }}
                />
              </div>
              <div className="g-tabs" style={{ margin: 0, borderBottom: 'none', flexShrink: 0 }}>
                {domainTabs.map(d => (
                  <button
                    key={d.value}
                    onClick={() => setActiveDomain(d.value)}
                    className={`g-tab${activeDomain === d.value ? ' g-tab--on' : ''}`}
                    style={{ padding: '10px 12px' }}
                  >
                    {d.label} <span style={{ color: 'var(--g-ink-faint)', fontWeight: 600 }}>{d.count}</span>
                  </button>
                ))}
              </div>
            </Rv>

            {/* Featured */}
            {featured && (
              <Rv delay={3}>
                <Link
                  to={`/blog/${featured.id}`}
                  className="g-tpl"
                  style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 36, alignItems: 'center',
                    textDecoration: 'none', padding: '38px 40px', marginBottom: 28,
                  }}
                >
                  <div>
                    <div className="g-tpl-meta" style={{ margin: '0 0 16px' }}>
                      <span className={DOMAIN_META[featured.domain].cls}>{DOMAIN_META[featured.domain].label}</span>
                      <span>Featured · {featured.tag}</span>
                    </div>
                    <h2 className="g-h2" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', maxWidth: '28ch' }}>
                      {featured.q}
                    </h2>
                    <p className="g-sub">
                      {featured.excerpt}
                    </p>
                    <p className="g-small" style={{ marginTop: 18 }}>
                      {featured.author} · {featured.date} · {featured.readTime} ·{' '}
                      <span style={{ color: 'var(--g-green)', fontWeight: 700 }}>Read the answer →</span>
                    </p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={blogArt(featured.id, featured.domain)}
                      alt=""
                      loading="lazy"
                      style={{ maxWidth: '90%', maxHeight: 280, objectFit: 'contain' }}
                    />
                  </div>
                </Link>
              </Rv>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <div className="g-grid" style={{ marginTop: 0 }}>
                {rest.map((art, i) => (
                  <Rv key={art.id} delay={(Math.min((i % 3) + 1, 4)) as 1 | 2 | 3 | 4}>
                    <Link to={`/blog/${art.id}`} className="g-tpl" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', height: '100%', padding: '22px 22px 18px' }}>
                      <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, borderBottom: '1px solid var(--g-line-soft)', paddingBottom: 14 }}>
                        <img
                          src={blogArt(art.id, art.domain)}
                          alt=""
                          loading="lazy"
                          style={{ maxHeight: 118, maxWidth: '80%', objectFit: 'contain' }}
                        />
                      </div>
                      <div className="g-tpl-meta" style={{ margin: '0 0 12px' }}>
                        <span className={DOMAIN_META[art.domain].cls}>{DOMAIN_META[art.domain].label}</span>
                        <span>{art.tag}</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--g-font)', fontSize: 16.5, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.35, color: 'var(--g-ink)', margin: '0 0 10px' }}>
                        {art.q}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--g-font)', fontSize: 13.5, color: 'var(--g-ink-soft)', lineHeight: 1.55,
                          margin: '0 0 16px', flex: 1,
                          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}
                      >
                        {art.excerpt}
                      </p>
                      <p className="g-small" style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--g-line-soft)', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{art.readTime}</span>
                        <span style={{ fontWeight: 600 }}>{art.date}</span>
                      </p>
                    </Link>
                  </Rv>
                ))}
              </div>
            )}

            {filteredArticles.length === 0 && (
              <p className="g-sub" style={{ padding: '72px 0', textAlign: 'center', margin: '0 auto' }}>
                No posts match that — try a different search or domain.
              </p>
            )}

          </div>
        </section>
      </main>
      <GrassFooter />
    </>
  );
};
