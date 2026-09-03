/**
 * /blog — the index.
 *
 * Filtered by market rather than by clinical vertical, because the writing now
 * follows the same five frameworks the rest of the site sells against. The
 * vertical filter (vet / dental) went with the posts it filtered.
 *
 * No cover images. Every one was a generated illustration that said nothing
 * about its post; a question set in the display face is a better card than a
 * picture of a stethoscope.
 */
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { VISIBLE_BLOG_CONTENT } from '../data/blogContent';
import { BLOG_MARKETS } from '../data/blogMarkets.mjs';
import '../styles/site.css';

/* Width rhythm over a six-column grid, and the two grounds that break it up.
   Six entries, so the pattern restarts every two rows. */
const SPAN = [4, 2, 3, 3, 2, 4];
const TONE = ['deep', '', '', 'accent', '', ''];

const MARKET_LABEL: Record<string, string> = {
  IN: 'India',
  GB: 'England',
  US: 'United States',
  GLOBAL: 'Anywhere',
};

export const InsightsPage: React.FC = () => {
  const [market, setMarket] = useState<string>('ALL');
  const [query, setQuery] = useState('');

  const all = useMemo(
    () => Object.entries(VISIBLE_BLOG_CONTENT).map(([id, data]) => ({
      id,
      market: (BLOG_MARKETS as Record<string, string>)[id] ?? 'GLOBAL',
      ...data,
    })),
    []
  );

  const shown = all.filter((a) => {
    if (market !== 'ALL' && a.market !== market) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      a.q.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  const tabs = [
    { label: 'Everything', value: 'ALL', n: all.length },
    ...['IN', 'GB', 'US', 'GLOBAL']
      .map((m) => ({ label: MARKET_LABEL[m], value: m, n: all.filter((a) => a.market === m).length }))
      .filter((t) => t.n > 0),
  ];

  return (
    <div className="s-page">
      <SEO
        title="Writing — record keeping, and the rules that judge it"
        description="What inspectors and courts actually look for in a clinical record, written for the people who have to produce one. CQC, HIQA, CMS, NABH."
        path="/blog"
        keywords={['clinical documentation', 'record keeping', 'CQC Regulation 17', 'NABH records', 'medical record keeping India']}
      />
      <SiteHeader />

      <section className="s-section" style={{ paddingBottom: 'var(--space-6)' }}>
        <div className="s-wrap">
          <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3.25rem)', maxWidth: '18ch' }}>
            Questions we kept being asked, answered against the source.
          </h1>
          <p className="s-lede" style={{ marginTop: 'var(--space-5)' }}>
            Each of these starts from something a clinician actually said, and answers it
            with the regulation, the case, or the standard — cited, so you can check it.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: 'var(--space-9)' }}>
        <div className="s-wrap">
          <div className="bl-controls">
            <div className="bl-tabs" role="tablist" aria-label="Filter by market">
              {tabs.map((t) => (
                <button
                  key={t.value}
                  role="tab"
                  aria-selected={market === t.value}
                  className={'bl-tab' + (market === t.value ? ' is-on' : '')}
                  onClick={() => setMarket(t.value)}
                >
                  {t.label}<span className="num">{t.n}</span>
                </button>
              ))}
            </div>
            <label className="bl-search">
              <span className="sr-only">Search the writing</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
              />
            </label>
          </div>

          {shown.length === 0 ? (
            <p style={{ marginTop: 'var(--space-7)', color: 'var(--muted)' }}>
              Nothing matches “{query}”.
            </p>
          ) : (
            <div className="blq">
              {shown.map((a, i) => {
                /* A repeating rhythm of widths and grounds, keyed to position
                   rather than to content — so the page has shape without
                   pretending one post matters more than another. */
                const span = SPAN[i % SPAN.length];
                const tone = TONE[i % TONE.length];
                return (
                  <Link
                    key={a.id}
                    to={`/blog/${a.id}`}
                    className={`blq-card blq-${span}${tone ? ' blq-' + tone : ''}`}
                  >
                    <span className="blq-top">
                      <em>{a.tag}</em>
                      <i>{MARKET_LABEL[a.market]}</i>
                    </span>
                    <span className="blq-q">{a.q}</span>
                    {span >= 3 && <span className="blq-ex">{a.excerpt}</span>}
                    <span className="blq-foot">
                      <span>{a.readTime}</span>
                      <svg viewBox="0 0 20 12" aria-hidden="true">
                        <path d="M1 6h17M13 1l5 5-5 5" />
                      </svg>
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};
