import { Helmet } from 'react-helmet-async';

const SITE = 'https://hellosalvia.com';
const SITE_NAME = 'Salvia';
const DEFAULT_DESC = 'Salvia is a compliance and governance suite for clinical practices — voice notes in, audit-ready records out. Clinical documentation, controlled drug logs, and incident trails, automated.';
const DEFAULT_OG_IMAGE = 'https://hellosalvia.com/og-image.png';

interface SEOProps {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
  article?: {
    author: string;
    date: string;
  };
}

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Salvia',
  url: SITE,
  description: DEFAULT_DESC,
  sameAs: [],
};

export const SEO = ({ title, description = DEFAULT_DESC, path, keywords, type = 'website', article }: SEOProps) => {
  const url = `${SITE}${path}`;
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

  const articleSchema = article ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE,
    },
    datePublished: article.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }) : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
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
