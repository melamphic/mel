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

/* Where a post should send a reader next, when its market has a framework page. */
const MARKET_FRAMEWORK: Record<string, { slug: string; body: string }> = {
  IN: { slug: 'nabh', body: 'NABH' },
  GB: { slug: 'cqc', body: 'CQC' },
  US: { slug: 'cms', body: 'CMS' },
};

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
  const fw = MARKET_FRAMEWORK[market];

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
            <div className="fwx-crumbs">
              <Link to="/blog">Writing</Link><span>/</span><span>{MARKET_LABEL[market]}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', marginTop: 'var(--space-4)' }}>
              {article.q}
            </h1>
            <p className="s-lede" style={{ marginTop: 'var(--space-5)' }}>{article.excerpt}</p>

            <div className="ar-meta">
              <span>{article.author}</span>
              <span>{article.date}</span>
              <span>{article.readTime}</span>
              <span className="ar-tag">{article.tag}</span>
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: 'var(--space-8)' }}>
          <div className="s-wrap s-wrap--narrow lg-body ar-body">{article.content}</div>
        </section>

        {article.sources && article.sources.length > 0 && (
          <section style={{ paddingBottom: 'var(--space-8)' }}>
            <div className="s-wrap s-wrap--narrow">
              <div className="ar-sources">
                <h2 className="lg-kicker">Sources</h2>
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

      {fw && (
        <section className="s-band s-section">
          <div className="s-wrap s-wrap--narrow">
            <h2 style={{ fontSize: 'var(--text-2xl)', maxWidth: '24ch' }}>
              What {fw.body} actually asks for, and what satisfies it
            </h2>
            <p style={{ marginTop: 'var(--space-4)', color: 'var(--body)', maxWidth: 'var(--measure)' }}>
              The regulation quoted from the source, the findings that keep recurring, and
              the field in Salvia that answers each one.
            </p>
            <Link className="s-btn s-btn--primary" to={`/frameworks/${fw.slug}`} style={{ marginTop: 'var(--space-5)' }}>
              Read the {fw.body} page
            </Link>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="s-section">
          <div className="s-wrap s-wrap--narrow">
            <h2 className="lg-kicker">More on {MARKET_LABEL[market].toLowerCase()}</h2>
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
