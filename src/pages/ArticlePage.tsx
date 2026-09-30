/**
 * /blog/:id — one post.
 *
 * Typographic, single column, no cover image. The sources block is the point of
 * these posts: every checkable claim carries a primary citation, so it sits in
 * the flow rather than being tucked away at the bottom in grey.
 */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { VISIBLE_BLOG_CONTENT } from '../data/blogContent';
import { BLOG_MARKETS } from '../data/blogMarkets.mjs';
import '../styles/site.css';

const MARKET_LABEL: Record<string, string> = {
  IN: 'India', GB: 'England', US: 'United States', GLOBAL: 'Anywhere',
};

/* The framework pages this used to send readers to are retired. A post now
   ends on the product itself rather than on an accreditation page. */

export const ArticlePage: React.FC = () => {
  const { id } = useParams();
  const article = VISIBLE_BLOG_CONTENT[id as string];

  if (!article) {
    return (
      <div className="s-page">
        <SiteHeader />
        <section className="s-section">
          <div className="s-wrap s-wrap--narrow">
            <h1 style={{ fontSize: 'var(--text-3xl)' }}>That post isn’t here.</h1>
            <p style={{ marginTop: 'var(--space-4)', color: 'var(--muted)' }}>
              It may have been retired — we deleted the writing that no longer matched
              what Salvia does.
            </p>
            <Link className="s-btn s-btn--primary" to="/blog" style={{ marginTop: 'var(--space-6)' }}>
              All writing
            </Link>
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  const market = (BLOG_MARKETS as Record<string, string>)[id as string] ?? 'GLOBAL';
  const related = Object.entries(VISIBLE_BLOG_CONTENT)
    .filter(([slug]) => slug !== id)
    .filter(([slug]) => (BLOG_MARKETS as Record<string, string>)[slug] === market)
    .slice(0, 3)
    .map(([slug, data]) => ({ slug, ...data }));

  return (
    <div className="s-page">
      <SEO
        title={article.q}
        description={article.excerpt}
        path={`/blog/${id}`}
        keywords={article.keywords}
        type="article"
        article={{ author: article.author, date: article.date }}
      />
      <SiteHeader />

      <article>
        <section className="s-section" style={{ paddingBottom: 'var(--space-6)' }}>
          <div className="s-wrap s-wrap--narrow">
            <div className="ar-kicker">
              <Link to="/blog">Writing</Link>
              <span>{article.tag}</span>
              <span>{MARKET_LABEL[market]}</span>
            </div>

            <h1 className="ar-title">{article.q}</h1>
            <p className="ar-standfirst">{article.excerpt}</p>

            <div className="ar-meta">
              <span><b>{article.author}</b></span>
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: 'var(--space-8)' }}>
          <div className="s-wrap s-wrap--narrow ar-body">{article.content}</div>
        </section>

        {article.sources && article.sources.length > 0 && (
          <section style={{ paddingBottom: 'var(--space-8)' }}>
            <div className="s-wrap s-wrap--narrow">
              <div className="ar-sources">
                <h2>Sources</h2>
                <ol>
                  {article.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}
      </article>

      <section className="s-band s-section">
        <div className="s-wrap s-wrap--narrow">
          <h2 style={{ fontSize: 'var(--text-2xl)', maxWidth: '24ch' }}>
            The same record decides whether the claim gets paid
          </h2>
          <p style={{ marginTop: 'var(--space-4)', color: 'var(--body)', maxWidth: '62ch' }}>
            Salvia is the claim integrity layer for Indian hospitals. Every admission and
            every document reaches the insurance desk live, so the file is complete while
            the evidence can still be created.
          </p>
          <Link className="s-btn s-btn--primary" to="/" style={{ marginTop: 'var(--space-5)' }}>
            See how it works
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="s-section">
          <div className="s-wrap s-wrap--narrow">
            <h2 className="ar-more-h">More on {MARKET_LABEL[market].toLowerCase()}</h2>
            <div className="bl-list" style={{ marginTop: 'var(--space-5)' }}>
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="bl-row">
                  <span className="bl-meta"><em>{r.tag}</em></span>
                  <span className="bl-q">{r.q}</span>
                  <span className="bl-time">{r.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
};
