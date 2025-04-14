import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  schema?: any;
}

const SEO = ({ title, description, schema }: SEOProps) => {
  const location = useLocation();
  const currentUrl = `https://nitebite.com${location.pathname}`;

  return (
    <Helmet>
      {/* Standard meta tags */}
      <title>{title ? `${title} | Nitebite` : 'Nitebite - Late Night Delivery'}</title>
      <meta name="description" content={description || 'Nitebite: Your go-to for late-night snacks, beverages, and essentials delivered in minutes across India.'} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="Nitebite" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || 'Nitebite - Late Night Delivery'} />
      <meta property="og:description" content={description || 'Nitebite: Your go-to for late-night snacks, beverages, and essentials delivered in minutes across India.'} />
      <meta property="og:image" content="https://nitebite.com/og-image.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="nitebite.com" />
      <meta property="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title || 'Nitebite - Late Night Delivery'} />
      <meta name="twitter:description" content={description || 'Nitebite: Your go-to for late-night snacks, beverages, and essentials delivered in minutes across India.'} />
      <meta name="twitter:image" content="https://nitebite.com/twitter-image.png" />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
