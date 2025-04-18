
import React, { useEffect, useRef } from 'react';
import { Organization, WithContext } from 'schema-dts';
import NewNavbar from '@/components/NewNavbar';
import Hero from '@/components/Hero';
import CuratedBoxes from '@/components/CuratedBoxes';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import SEO from '@/components/SEO';
import PromoBanner from '@/components/PromoBanner';
import { motion, AnimatePresence } from 'framer-motion';
import FeaturedProducts from '@/components/FeaturedProducts';
import FloatingBox from '@/components/FloatingBox';
import HelpSection from '@/components/HelpSection';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const curatedBoxesRef = useRef<HTMLDivElement>(null);
  const helpSectionRef = useRef<HTMLDivElement>(null);

  const scrollToCuratedBoxes = () => {
    if (curatedBoxesRef.current) {
      curatedBoxesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        className="flex flex-col min-h-screen"
      >
        <SEO schema={schema} />
        <PromoBanner />
        <NewNavbar transparent={true} />
        <main className="flex-grow">
          <Hero scrollToCuratedBoxes={scrollToCuratedBoxes} />
          <div ref={curatedBoxesRef}>
            <CuratedBoxes />
          </div>
          <div ref={helpSectionRef}>
            <HelpSection />
          </div>
          <FeaturedProducts />
        </main>
        <FloatingBox />
        <BackToTop />
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
