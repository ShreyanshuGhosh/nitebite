import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { Organization, WithContext } from 'schema-dts';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  schema?: WithContext<Organization>;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Nitebite - Late Night Delivery in 10 Minutes | Order Snacks & Beverages',
  description = 'Order snacks, beverages, and essentials for late-night delivery in just 10 minutes. Get chips, drinks, chocolates, and more delivered to your doorstep in India. Available 24/7.',
  image = '/og-image.png',
  type = 'website',
  schema,
}) => {
  const { pathname } = useLocation();
  const url = `https://nitebite.com${pathname}`;

  const defaultSchema: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nitebite',
    url: 'https://nitebite.com',
    logo: 'https://nitebite.com/logo.png',
    description: 'Late night delivery service offering snacks, beverages, and essentials in 10 minutes across India.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.instagram.com/nitebit.e/',
      'https://linkedin.com/company/nitebite',
    ],
    potentialAction: {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://nitebite.com/products',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/IOSPlatform',
          'http://schema.org/AndroidPlatform',
        ],
      },
      deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModeOwnFleet',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content="late night delivery, quick commerce, midnight snacks, 10 minute delivery, night food delivery, instant delivery, snacks delivery, beverages delivery, India delivery" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="Nitebite" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Mobile Meta Tags */}
      <meta name="theme-color" content="#38BDF8" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* PWA Tags */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="application-name" content="Nitebite" />
      <meta name="apple-mobile-web-app-title" content="Nitebite" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
      
      {/* Preconnect to Important Origins */}
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
    </Helmet>
  );
};

export default SEO;
