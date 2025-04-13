
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, Wrench } from 'lucide-react';
import VibeSelector from './VibeSelector';

const Hero = () => {
  // Animation variants
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

  const boxVariants = {
    hidden: { y: 50, opacity: 0, rotate: -5 },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10,
        delay: 0.5 
      } 
    }
  };

  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-nitebite-midnight">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-nitebite-midnight/80 to-nitebite-midnight"></div>
      
      {/* Animated stars/particles */}
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

      {/* Main content */}
      <div className="container relative z-10 pt-24 pb-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-4">
        {/* Left column - Text content */}
        <motion.div
          className="flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-2 text-nitebite-purple whitespace-nowrap"
            variants={itemVariants}
          >
            Fuel Your All-Nighters
          </motion.h1>

          <motion.p 
            className="text-xl sm:text-2xl mb-6 text-white/90"
            variants={itemVariants}
          >
            Get snack boxes to (H1–H13) when you need them most.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8"
            variants={itemVariants}
          >
            <Button 
              className="glassmorphic-button rounded-full py-6 px-8 text-lg sm:text-xl animate-glow-pulse-yellow"
              asChild
            >
              <Link to="/products">
                Quick Delivery
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2 text-white/70 text-sm mb-6"
            variants={itemVariants}
          >
            <Clock className="w-4 h-4 text-nitebite-yellow" />
            <span>Delivery time: 20-30 min</span>
          </motion.div>
          
          {/* New Create Your Own Box button */}
          <motion.div
            variants={itemVariants}
          >
            <Button 
              className="glassmorphic-ghost-button border border-nitebite-purple rounded-full py-5 px-6 text-base text-nitebite-purple hover:text-white hover:bg-nitebite-purple/20"
              asChild
            >
              <Link to="/box-builder">
                Create Your Own Box
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right column - Box image */}
        <motion.div 
          className="flex justify-center items-center"
          variants={boxVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-full max-w-sm">
            <img 
              src="https://images.pexels.com/photos/31616946/pexels-photo-31616946.png?auto=compress&cs=tinysrgb&w=600&lazy=load" 
              alt="NiteBite delivery box with snacks" 
              className="w-full animate-float-box"
            />
            
            {/* Star decoration */}
            <motion.div
              className="absolute top-0 right-0 text-4xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Vibe Selector Section */}
      <VibeSelector />

      {/* Build Your Own Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="glassmorphic-card p-8 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient-accent">Craft Your Perfect Stash</h2>
              <p className="text-lg text-white/80 mb-6">Customize your snack box to your exact cravings, delivered to your doorstep!</p>
              <Button 
                className="glassmorphic-button rounded-full py-5 px-6 text-base"
                asChild
              >
                <Link to="/box-builder">
                  Customize Your Own Box
                </Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="bg-nitebite-purple/20 w-48 h-48 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{ 
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="relative w-40 h-40"
                >
                  {/* Circular snack items */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <motion.div 
                      key={i}
                      className="absolute w-12 h-12 bg-nitebite-dark rounded-full flex items-center justify-center"
                      style={{
                        left: `calc(50% - 24px)`,
                        top: `calc(50% - 24px)`,
                        transform: `rotate(${angle}deg) translate(70px) rotate(-${angle}deg)`
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-xl">{['🍪','🍫','🥨','🍕','🥤','🍦'][i]}</span>
                    </motion.div>
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Wrench className="w-10 h-10 text-nitebite-yellow" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
