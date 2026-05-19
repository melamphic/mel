import { Helmet } from 'react-helmet-async';

const SITE = 'https://hellosalvia.com';
const SITE_NAME = 'Salvia';
const DEFAULT_DESC = 'Salvia is a compliance and governance suite for clinical practices — voice notes in, audit-ready records out. Clinical documentation, controlled drug logs, and incident trails, automated.';

interface SEOProps {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
}

export const SEO = ({ title, description = DEFAULT_DESC, path, keywords, type = 'website' }: SEOProps) => {
  const url = `${SITE}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

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

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};
