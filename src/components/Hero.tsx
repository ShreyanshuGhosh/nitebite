
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import VibeSelector from './VibeSelector';

interface HeroProps {
  scrollToCuratedBoxes?: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToCuratedBoxes }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-nitebite-midnight via-[#1A1F2C] to-nitebite-midnight">
      <div className="absolute inset-0 bg-gradient-to-b from-nitebite-midnight/80 to-nitebite-midnight"></div>
      
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            opacity: 0.1 + Math.random() * 0.7,
            scale: 0.5 + Math.random()
          }}
          animate={{ 
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{ 
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      ))}

      <div className="container relative z-10 pt-20 pb-8 mx-auto px-4 sm:pt-24 sm:pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5 max-w-2xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gradient bg-gradient-to-r from-[#9b87f5] to-nitebite-purple">
              Fuel Your All-Nighters
            </h1>
            <p className="text-base sm:text-lg text-white/90 text-neutral-300">
              Get snack boxes to (H1–H13) when you need them most.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              className="glassmorphic-button rounded-full py-4 px-6 text-base animate-glow-pulse-yellow w-full sm:w-auto"
              asChild
            >
              <Link to="/snack-boxes">Quick Delivery</Link>
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-white/70">
              <Clock className="w-4 h-4 text-nitebite-yellow" />
              <span className="text-sm sm:text-base">Delivery time: 20-30 min</span>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                className="glassmorphic-button rounded-full py-4 px-6 text-base animate-glow-pulse-yellow flex-1 sm:flex-grow-0"
                onClick={scrollToCuratedBoxes}
              >
                See All Boxes
              </Button>
              <Button 
                className="glassmorphic-button rounded-full py-4 px-6 text-base animate-glow-pulse-yellow flex-1 sm:flex-grow-0"
                asChild
              >
                <Link to="/box-builder">Craft Your Own Box</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-8 sm:mt-12">
          <VibeSelector />
        </div>

        <div className="mt-8 sm:mt-12">
          <div className="glassmorphic-card p-4 sm:p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center">
              <div className="md:col-span-2">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gradient-accent">
                  Craft Your Perfect Stash
                </h2>
                <p className="text-sm sm:text-base text-white/80 mb-3">
                  Customize your snack box to your exact cravings, delivered to your doorstep!
                </p>
                <Button 
                  className="glassmorphic-button rounded-full py-3 px-5 text-sm sm:py-4 sm:px-6 sm:text-base w-full sm:w-auto"
                  asChild
                >
                  <Link to="/box-builder">Customize Your Own Box</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
