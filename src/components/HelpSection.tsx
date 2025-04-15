
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Sparkles, Clock, Box } from 'lucide-react';

const HelpSection = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-nitebite-midnight to-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-nitebite-purple">How It Works</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Choose your preferred way to get your late-night snacks delivered
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glassmorphic-card p-6 rounded-xl text-center"
          >
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-nitebite-purple/20 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-nitebite-purple" />
              </div>
              <h3 className="text-xl font-bold text-nitebite-yellow mb-2">Quick Box Selection</h3>
              <p className="text-white/80 mb-4">Browse our curated collection of pre-made snack boxes</p>
              <div className="space-y-3 text-sm text-white/60 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-nitebite-yellow" />
                  <span>Expertly curated combinations</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-nitebite-yellow" />
                  <span>Quick delivery in 20-30 minutes</span>
                </div>
              </div>
            </div>
            <Button className="glassmorphic-button w-full" asChild>
              <Link to="/snack-boxes">Browse Boxes</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glassmorphic-card p-6 rounded-xl text-center"
          >
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-nitebite-purple/20 rounded-full flex items-center justify-center mb-4">
                <Box className="w-8 h-8 text-nitebite-purple" />
              </div>
              <h3 className="text-xl font-bold text-nitebite-yellow mb-2">Custom Box Builder</h3>
              <p className="text-white/80 mb-4">Create your perfect snack box from scratch</p>
              <div className="space-y-3 text-sm text-white/60 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-nitebite-yellow" />
                  <span>Choose from multiple categories</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-nitebite-yellow" />
                  <span>Customize quantities & mix</span>
                </div>
              </div>
            </div>
            <Button className="glassmorphic-button w-full" asChild>
              <Link to="/box-builder">Build Your Box</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
