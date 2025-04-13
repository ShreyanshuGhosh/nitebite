
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutItems from '@/components/CheckoutItems';
import OrderSummary from '@/components/OrderSummary';
import BackToTop from '@/components/BackToTop';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const Checkout = () => {
  const navigate = useNavigate();
  const itemCount = useCartStore(state => state.getItemCount());
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    // If cart is empty, go to home page, otherwise go to products
    if (itemCount === 0) {
      navigate('/#featured-items');
    } else {
      navigate('/products');
    }
  };

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
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              className="glassmorphic-ghost-button rounded-full mr-4"
              onClick={handleBackClick}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-nitebite-highlight">
              Your Box
            </h1>
          </div>
          
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
