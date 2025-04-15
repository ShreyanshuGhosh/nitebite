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

      <div className="container relative z-10 pt-24 pb-12 mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 max-w-2xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient bg-gradient-to-r from-[#9b87f5] to-nitebite-purple">
              Fuel Your All-Nighters
            </h1>
            <p className="text-lg sm:text-xl text-white/90 text-neutral-300">
              Get snack boxes to (H1–H13) when you need them most.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="glassmorphic-button rounded-full py-6 px-8 text-lg animate-glow-pulse-yellow w-full sm:w-auto"
              asChild
            >
              <Link to="/snack-boxes">Quick Delivery</Link>
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-white/70">
              <Clock className="w-4 h-4 text-nitebite-yellow" />
              <span>Delivery time: 20-30 min</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                className="glassmorphic-button rounded-full py-6 px-8 text-lg animate-glow-pulse-yellow w-full sm:w-auto"
                onClick={scrollToCuratedBoxes}
              >
                See All Boxes
              </Button>
              <Button 
                className="glassmorphic-button rounded-full py-6 px-8 text-lg animate-glow-pulse-yellow w-full sm:w-auto"
                asChild
              >
                <Link to="/box-builder">Craft Your Own Box</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-12">
          <VibeSelector />
        </div>

        <div className="mt-12">
          <div className="glassmorphic-card p-6 sm:p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gradient-accent">
                  Craft Your Perfect Stash
                </h2>
                <p className="text-base sm:text-lg text-white/80 mb-4">
                  Customize your snack box to your exact cravings, delivered to your doorstep!
                </p>
                <Button 
                  className="glassmorphic-button rounded-full py-4 px-6 text-base w-full sm:w-auto"
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
