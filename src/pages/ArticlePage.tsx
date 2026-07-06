import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { VISIBLE_BLOG_CONTENT } from '../data/blogContent';
import { blogArt } from '../lib/blogArt';
import { SEO } from '../components/SEO';
import { INDIA_ONLY } from '../config';

const DOMAIN_META = {
  GENERAL: { label: 'Clinic', color: 'var(--salvia-accent)', bg: 'rgba(255,78,0,0.08)' },
  VETERINARY: { label: 'Vet', color: 'var(--accent-vet)', bg: 'rgba(14,165,233,0.08)' },
  DENTAL: { label: 'Dental', color: 'var(--accent-dental)', bg: 'rgba(5,150,105,0.08)' },
};

export const ArticlePage: React.FC = () => {
  const { id } = useParams();
  const article = VISIBLE_BLOG_CONTENT[id as string];

  if (!article) {
    return (
      <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
        <GrassHeader />
        <div style={{ padding: '12rem 2rem 8rem', textAlign: 'center' }}>
          <h1 style={{ color: 'var(--salvia-primary)', fontSize: '2rem' }}>Post not found</h1>
          <p style={{ color: 'var(--salvia-text-muted)', marginBottom: '2rem' }}>
            We couldn't find the post you're looking for.
          </p>
          <Link to="/blog" className="g-btn g-btn--green" style={{ textDecoration: 'none' }}>
            Back to all posts
          </Link>
        </div>
        <GrassFooter />
      </div>
    );
  }

  const meta = DOMAIN_META[article.domain];

  // Related posts: same domain, exclude current
  const related = Object.entries(VISIBLE_BLOG_CONTENT)
    .filter(([rid, r]) => rid !== id && r.domain === article.domain)
    .slice(0, 3)
    .map(([rid, r]) => ({ id: rid, ...r }));

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <SEO
        title={article.q}
        description={article.excerpt}
        path={`/blog/${id}`}
        keywords={article.keywords}
        type="article"
        article={{ author: article.author, date: article.date }}
      />
      <GrassHeader />

      <main style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
        <article className="container" style={{ maxWidth: '760px' }}>

          <Link to="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            textDecoration: 'none', color: 'var(--salvia-text-muted)',
            fontSize: 'var(--text-sm)', marginBottom: '2.5rem', fontWeight: 600,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            All posts
          </Link>

          {/* Tag row */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 'var(--text-2xs)', fontWeight: 800,
              color: meta.color, backgroundColor: meta.bg,
              padding: '0.32rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              {meta.label}
            </span>
            <span style={{
              fontSize: 'var(--text-2xs)', fontWeight: 700,
              color: 'var(--salvia-text-muted)',
              padding: '0.32rem 0',
              letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              · {article.tag}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', fontWeight: 800,
            color: 'var(--salvia-primary)',
            letterSpacing: '-0.03em', lineHeight: 1.15,
            margin: '0 0 1.5rem',
          }}>
            {article.q}
          </h1>

          {/* Excerpt as lede */}
          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--salvia-text-muted)',
            lineHeight: 1.6,
            margin: '0 0 2rem',
            fontWeight: 400,
          }}>
            {article.excerpt}
          </p>

          {/* Meta bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            color: 'var(--salvia-text-muted)', fontSize: 'var(--text-sm)',
            marginBottom: '3rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid #F1F5F9',
            flexWrap: 'wrap',
          }}>
            <span style={{ fontWeight: 600, color: 'var(--salvia-primary)' }}>{article.author}</span>
            <span style={{ opacity: 0.3 }}>·</span>
            <span>{article.date}</span>
            <span style={{ opacity: 0.3 }}>·</span>
            <span>{article.readTime}</span>
          </div>

          {/* Header illustration */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '10px 0 34px', marginTop: '-1rem',
          }}>
            <img
              src={blogArt(id as string, article.domain)}
              alt=""
              loading="lazy"
              style={{ maxWidth: 'min(480px, 88%)', maxHeight: 320, objectFit: 'contain' }}
            />
          </div>

          {/* Article body */}
          <div className="article-body" style={{
            fontSize: 'var(--text-md)', color: '#334155',
            lineHeight: 1.75,
          }}>
            {article.content}
          </div>

          {/* Sources — primary citations for every checkable claim */}
          {article.sources && article.sources.length > 0 && (
            <div style={{
              marginTop: '3rem',
              padding: '1.5rem 1.75rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#F8FAFC',
              border: '1px solid var(--border-subtle)',
            }}>
              <h3 className="eyebrow" style={{ color: 'var(--salvia-text-muted)', margin: '0 0 0.85rem' }}>
                Sources
              </h3>
              <ol style={{
                margin: 0, paddingLeft: '1.2rem',
                listStyle: 'decimal',
                display: 'flex', flexDirection: 'column', gap: '0.5rem',
              }}>
                {article.sources.map((s) => (
                  <li key={s.url} style={{ fontSize: 'var(--text-sm)', lineHeight: 1.5, color: 'var(--salvia-text-muted)' }}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--salvia-primary)', fontWeight: 600, textDecoration: 'underline', textDecorationColor: 'rgba(15,23,42,0.25)', textUnderlineOffset: '3px' }}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Internal product link */}
          <div style={{
            margin: '3rem 0',
            padding: '1.5rem 2rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(255,78,0,0.04)',
            border: '1px solid rgba(255,78,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontSize: 'var(--text-2xs)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--salvia-accent)', marginBottom: '0.3rem' }}>
                {article.domain === 'VETERINARY'
                  ? (INDIA_ONLY ? 'Veterinary record compliance' : 'VMR & CMA compliance')
                  : article.domain === 'DENTAL'
                  ? (INDIA_ONLY ? 'Dental record compliance' : 'GDC & CQC compliance')
                  : 'Clinical governance'}
              </div>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--salvia-primary)' }}>
                {article.domain === 'VETERINARY'
                  ? 'See how Salvia keeps vet records audit-ready'
                  : article.domain === 'DENTAL'
                  ? 'See how Salvia handles dental charting compliance'
                  : 'See how Salvia automates clinical governance'}
              </div>
            </div>
            <Link
              to={
                article.domain === 'VETERINARY'
                  ? '/products/point-of-care-evidence'
                  : article.domain === 'DENTAL'
                  ? '/products/statutory-form-infrastructure'
                  : '/products/institutional-compliance-hub'
              }
              aria-label={
                article.domain === 'VETERINARY'
                  ? 'Learn how Salvia keeps vet records audit-ready'
                  : article.domain === 'DENTAL'
                  ? 'Learn how Salvia handles dental charting compliance'
                  : 'Learn how Salvia automates clinical governance'
              }
              style={{
                textDecoration: 'none',
                fontSize: 'var(--text-sm)', fontWeight: 700,
                color: 'var(--salvia-accent)',
                whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: '0.35rem',
              }}
            >
              Learn more
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Keyword chips */}
          {article.keywords.length > 0 && (
            <div style={{
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid #F1F5F9',
              display: 'flex', gap: '0.4rem', flexWrap: 'wrap',
            }}>
              {article.keywords.map(kw => (
                <span key={kw} style={{
                  fontSize: 'var(--text-2xs)', fontWeight: 600,
                  color: 'var(--salvia-text-muted)',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #EEF2F6',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                }}>
                  {kw}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="container" style={{ maxWidth: '1100px', marginTop: '6rem' }}>
            <h3 style={{
              fontSize: 'var(--text-2xs)', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--salvia-accent)',
              marginBottom: '1rem',
            }}>
              Keep reading
            </h3>
            <div className="article-related-grid" style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.25rem',
            }}>
              {related.map(r => (
                <Link key={r.id} to={`/blog/${r.id}`} style={{ textDecoration: 'none' }} className="related-card-link">
                  <div className="related-card" style={{
                    padding: '1.5rem',
                    border: '1px solid #EEF2F6',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#fff',
                    height: '100%',
                    transition: 'all 0.25s ease',
                  }}>
                    <div style={{
                      fontSize: 'var(--text-2xs)', fontWeight: 800,
                      color: DOMAIN_META[r.domain].color,
                      backgroundColor: DOMAIN_META[r.domain].bg,
                      padding: '0.22rem 0.55rem',
                      borderRadius: 'var(--radius-sm)',
                      display: 'inline-block',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                    }}>
                      {r.tag}
                    </div>
                    <h4 style={{
                      fontSize: 'var(--text-base)', fontWeight: 700,
                      color: 'var(--salvia-primary)',
                      lineHeight: 1.35,
                      margin: 0,
                      letterSpacing: '-0.01em',
                    }}>
                      {r.q}
                    </h4>
                    <div style={{
                      marginTop: '1rem',
                      fontSize: 'var(--text-2xs)',
                      color: 'var(--salvia-text-muted)',
                    }}>
                      {r.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <GrassFooter />

      <style>{`
        .article-body h3 {
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--salvia-primary);
          margin-top: 2.75rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .article-body h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--salvia-primary);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .article-body p {
          margin-bottom: 1.4rem;
        }
        .article-body ul, .article-body ol {
          margin-bottom: 1.75rem;
          padding-left: 1.4rem;
        }
        .article-body li {
          margin-bottom: 0.65rem;
        }
        .article-body li strong, .article-body p strong {
          color: var(--salvia-primary);
        }
        .article-body a {
          color: var(--salvia-primary);
          font-weight: 600;
          text-decoration: underline;
          text-decoration-color: rgba(15, 23, 42, 0.25);
          text-underline-offset: 3px;
        }
        .article-body a:hover {
          color: var(--salvia-accent);
          text-decoration-color: var(--salvia-accent);
        }
        .article-body blockquote {
          border-left: 3px solid var(--salvia-accent);
          padding-left: 1.25rem;
          margin: 1.75rem 0;
          color: var(--salvia-text-muted);
          font-style: italic;
        }
        .related-card-link:hover .related-card {
          border-color: rgba(15, 23, 42, 0.14);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(15,23,42,0.05);
        }
        @media (max-width: 768px) {
          .article-related-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
