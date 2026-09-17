import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  noindex?: boolean;
  schema?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  noindex,
  schema,
}) => {
  const location = useLocation();
  const canonicalUrl = canonical || `https://www.rexinecentre.com${location.pathname}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="keywords"
        content={keywords.join(', ')}
      />

      <link rel="canonical" href={canonicalUrl} />

      {noindex && (
        <meta name="robots" content="noindex, nofollow" />
      )}

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};