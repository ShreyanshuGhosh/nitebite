
import React, { useEffect } from 'react';
import { WithContext } from 'schema-dts';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategorySelector from '@/components/CategorySelector';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import HowItWorks from '@/components/HowItWorks';
import SEO from '@/components/SEO';
import PromoBanner from '@/components/PromoBanner';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Define schema object with the correct type casting to avoid TypeScript errors
  const schema = {
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
      deliveryMethod: [
        {
          '@id': 'https://schema.org/DeliveryModeOwnFleet'
        }
      ],
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    // Use a type assertion to include custom properties
    openingHours: '24/7', // Simpler property that works with the schema
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '1.99',
      highPrice: '29.99',
      priceCurrency: 'INR',
      offerCount: '1000+',
    },
  } as WithContext<any>; // Use type assertion to avoid TS errors

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SEO schema={schema} />
        <PromoBanner />
        <Navbar transparent={true} />
        <main>
          <Hero />
          <div id="category-section">
            <CategorySelector />
          </div>
          <FeaturedProducts />
          <HowItWorks />
        </main>
        <BackToTop />
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
