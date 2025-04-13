
import React, { useEffect } from 'react';
import { Organization, WithContext } from 'schema-dts';
import NewNavbar from '@/components/NewNavbar';
import Hero from '@/components/Hero';
import CuratedBoxes from '@/components/CuratedBoxes';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import SEO from '@/components/SEO';
import PromoBanner from '@/components/PromoBanner';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema: WithContext<Organization> = {
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
  };

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
        <NewNavbar transparent={true} />
        <main>
          <Hero />
          <CuratedBoxes />
        </main>
        <BackToTop />
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
