
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategorySelector from '@/components/CategorySelector';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar transparent={true} />
        <main>
          <Hero />
          <CategorySelector />
          <FeaturedProducts />
        </main>
        <BackToTop />
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
