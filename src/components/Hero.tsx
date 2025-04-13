
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, ShoppingBag, Clock } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const categoryCardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i: number) => ({ 
      y: 0, 
      opacity: 1, 
      transition: { 
        delay: 0.8 + (i * 0.1),
        duration: 0.5
      } 
    })
  };

  const categories = [
    { 
      id: 'healthy',
      name: 'Healthy Choices', 
      icon: '🥗',
      color: 'from-teal-900 to-teal-700',
      iconClass: 'bg-teal-500/20'
    },
    { 
      id: 'study',
      name: 'Study Night Packs', 
      icon: '🧠',
      color: 'from-indigo-900 to-indigo-700',
      iconClass: 'bg-indigo-500/20'
    },
    { 
      id: 'midnight',
      name: 'Midnight Munchies', 
      icon: '🍕',
      color: 'from-purple-900 to-purple-700',
      iconClass: 'bg-purple-500/20'
    },
    { 
      id: 'energy',
      name: 'Quick Energy', 
      icon: '⚡',
      color: 'from-amber-900 to-amber-700',
      iconClass: 'bg-amber-500/20'
    }
  ];

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
            repeatType: 'reverse'
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
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-2 text-nitebite-purple"
            variants={itemVariants}
          >
            Fuel Your <br /> All-Nighters
          </motion.h1>

          <motion.p 
            className="text-xl sm:text-2xl mb-6 text-white/90"
            variants={itemVariants}
          >
            Craving snacks at midnight? <br />
            We've got you covered!
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
                We're Delivering Now!
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2 text-white/70 text-sm"
            variants={itemVariants}
          >
            <Clock className="w-4 h-4 text-nitebite-yellow" />
            <span>Delivery time: 20-30 min</span>
          </motion.div>
        </motion.div>

        {/* Right column - Box image */}
        <motion.div 
          className="flex justify-center items-center"
          variants={boxVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative">
            <img 
              src="/lovable-uploads/b3904e2b-18ae-4d50-9e94-bc313227158a.png" 
              alt="NiteBite delivery box with burger and fries" 
              className="w-full max-w-md animate-float-box"
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

      {/* Category cards */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className={`category-card bg-gradient-to-b ${category.color}`}
              variants={categoryCardVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className={`w-16 h-16 rounded-full ${category.iconClass} flex items-center justify-center mb-2`}>
                <span className="category-icon">{category.icon}</span>
              </div>
              <h3 className="category-title">{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social proof section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-wrap justify-between items-center mt-12 pt-8 border-t border-white/10">
          <motion.div 
            className="mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-white/70">
              Follow us for more <br />
              campus snack hacks
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-white hover:text-nitebite-purple transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-nitebite-purple transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-nitebite-purple transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="mb-4 md:mb-0" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-nitebite-purple/20 flex items-center justify-center">
                <span className="text-2xl">⏰</span>
              </div>
              <div>
                <p className="text-white font-medium">Delivery time:</p>
                <p className="text-nitebite-yellow font-bold">20-30 min</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <p className="text-white/70">
              Share your <br />
              snack thoughts
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-nitebite-midnight" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-nitebite-midnight" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-nitebite-midnight" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" alt="User" />
              </div>
              <span className="text-white text-sm">+25 reviews</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Student testimonial card */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div 
          className="bg-nitebite-midnight/60 backdrop-blur-lg border border-nitebite-purple/20 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80" 
            alt="Student" 
            className="w-20 h-20 rounded-full border-2 border-nitebite-purple/50"
          />
          <div className="flex-1">
            <div className="mb-2 md:mb-0 md:flex md:justify-between md:items-center">
              <div>
                <h3 className="text-nitebite-purple font-bold text-xl">NiteBite:</h3>
                <p className="text-white text-lg">the late-night snack hero we all need!</p>
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="ml-2 text-white/70">Thu, Apr 25</span>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <svg className="w-5 h-5 text-nitebite-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="ml-2 text-white/70">Träck: <span className="text-white">an cdc</span></span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
