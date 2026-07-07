import { Helmet } from 'react-helmet-async';

const SITE = 'https://hellosalvia.com';
const SITE_NAME = 'Salvia';
const DEFAULT_DESC = 'Salvia is a compliance and governance suite for clinical practices — voice notes in, audit-ready records out. Clinical documentation, controlled drug logs, and incident trails, automated.';
const DEFAULT_OG_IMAGE = 'https://hellosalvia.com/og-image.png?v=2';

interface SEOProps {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
  /** Set true on conversion/utility pages that shouldn't rank (e.g. 404). */
  noindex?: boolean;
  article?: {
    author: string;
    date: string;
  };
}

/** Normalise a human date ("June 14, 2026") to ISO 8601 (2026-06-14) for
 *  schema.org datePublished. Falls back to the raw string if unparseable. */
function toISODate(d: string): string {
  const parsed = new Date(d);
  return Number.isNaN(parsed.getTime()) ? d : parsed.toISOString().slice(0, 10);
}

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Salvia',
  url: SITE,
  description: DEFAULT_DESC,
  sameAs: [],
};

export const SEO = ({ title, description = DEFAULT_DESC, path, keywords, type = 'website', noindex, article }: SEOProps) => {
  // trailing slash to match Cloudflare's served URLs (avoids canonical→redirect)
  const url = `${SITE}${path}${path === '/' ? '' : '/'}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  const breadcrumbSchema = type === 'article' ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  }) : null;

  const isoDate = article ? toISODate(article.date) : '';
  const articleSchema = article ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: DEFAULT_OG_IMAGE,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: SITE,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}/favicon.png` },
    },
    datePublished: isoDate,
    dateModified: isoDate,
    inLanguage: 'en-IN',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }) : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

      {/* JSON-LD schema */}
      {type === 'website' && (
        <script type="application/ld+json">{JSON.stringify(ORG_SCHEMA)}</script>
      )}
      {articleSchema && (
        <script type="application/ld+json">{articleSchema}</script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">{breadcrumbSchema}</script>
      )}
    </Helmet>
  );
};
