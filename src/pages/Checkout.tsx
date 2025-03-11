
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutItems from '@/components/CheckoutItems';
import OrderSummary from '@/components/OrderSummary';
import BackToTop from '@/components/BackToTop';

const Checkout = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-nitebite-dark"
    >
      <Navbar transparent={false} />
      <main className="pt-24 pb-16">
        <div className="page-container">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-nitebite-highlight">
            Checkout
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutItems />
            </div>
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
      <BackToTop />
      <Footer />
    </motion.div>
  );
};

export default Checkout;
