import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, MapPin, ShoppingBag, Search, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import heroVideo from './heroVideo1.mp4';

const Hero: React.FC = () => {
  // State for Countdown Timer (Days, Hours, Mins, Secs)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  // State to track if launch is within 48 hours (NEW)
  const [isWithin48Hours, setIsWithin48Hours] = useState(false);
  // State for Video Loading
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  // State for Location Input & Validation
  const [location, setLocation] = useState('');
  const [isLocationValid, setIsLocationValid] = useState<boolean | null>(null);
  const [locationError, setLocationError] = useState<string>('');

  // Effect for Countdown Timer Logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      // *** CORRECTED LAUNCH DATE: April 2nd, 2025 at 00:00:00 ***
      const eventDate = new Date('2025-04-02T00:00:00').getTime(); // Corrected Launch Date
      // ----------------------------------------------------------

      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        // Calculate standard d/h/m/s
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });

        // Calculate total hours remaining
        const totalHoursRemaining = difference / (1000 * 60 * 60);
        // Set state for prominent countdown display
        setIsWithin48Hours(totalHoursRemaining <= 48);

      } else {
        // Timer expired or launch date passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsWithin48Hours(false); // Ensure prominent countdown is hidden after launch
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial call
    return () => clearInterval(timer); // Cleanup
  }, []); // Empty dependency array means this runs once on mount
  // Helper function to scroll smoothly
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn(`Scroll target section not found: #${sectionId}. Make sure an element with this ID exists.`);
    }
  };

  // Handler for location check
  const handleLocationCheck = () => {
    const cleanedLocation = location.trim().toLowerCase();
    setLocationError('');
    setIsLocationValid(null);
    const hostelRegex = /^h([1-9]|1[0-4])$/;
    if (hostelRegex.test(cleanedLocation)) {
      setIsLocationValid(true);
      setLocationError('');
    } else {
      setIsLocationValid(false);
      setLocationError(!cleanedLocation ? 'Please enter hostel (H1-H14).' : 'Sorry, only H1-H14 delivery.');
    }
  };

  const popularCategories = [
    { name: 'Midnight Snacks', icon: '🍕', color: 'bg-yellow-400/10' }, 
    { name: 'Quick Meals', icon: '🍔', color: 'bg-green-400/10' },
    { name: 'Beverages', icon: '🥤', color: 'bg-blue-400/10' }, 
    { name: 'Desserts', icon: '🍦', color: 'bg-purple-400/10' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-nitebite-dark">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay muted loop playsInline preload="auto"
          poster="/images/nitebite-poster.jpg"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support video.
        </video>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-nitebite-dark/95 z-1"></div>
      
      {/* Animated Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div 
          key={i} 
          className="absolute w-2 h-2 rounded-full bg-yellow-400/20 z-1" 
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }} 
          animate={{ 
            opacity: [0, 0.8, 0], 
            scale: [0, 1, 0],
            x: [
              Math.random() * window.innerWidth, 
              Math.random() * window.innerWidth, 
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight, 
              Math.random() * window.innerHeight, 
              Math.random() * window.innerHeight
            ]
          }} 
          transition={{ 
            duration: 5, 
            delay: i * 0.2, 
            repeat: Infinity, 
            repeatDelay: 4 
          }}
        />
      ))}

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen pt-16 md:pt-20 text-center px-4">
        {/* Main Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Late Night Cravings?
        </motion.h1>
        <motion.div
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Delivered Fast!
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-xl md:max-w-2xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Get snacks, drinks, and essentials delivered right to your hostel (H1-H14) when you need them most.
        </motion.p>

        {/* Location Input Section */}
        <motion.div
          className="w-full max-w-md md:max-w-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Input Group with improved focus and validation styling */}
          <div className={`flex flex-row items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1.5 shadow-md border transition-colors duration-300 ${isLocationValid === true ? 'border-green-500' : isLocationValid === false ? 'border-red-500' : 'border-white/20 focus-within:border-yellow-400'}`}>
            <MapPin className={`w-5 h-5 ml-2 hidden sm:block flex-shrink-0 transition-colors ${ isLocationValid === false ? 'text-red-500' : 'text-yellow-400' }`} />
            <input
              type="text" 
              value={location}
              onChange={(e) => { 
                setLocation(e.target.value); 
                if (isLocationValid !== null) setIsLocationValid(null); 
                if (locationError) setLocationError(''); 
              }}
              placeholder="Hostel (H1-H14)"
              className={`flex-grow bg-transparent text-white placeholder-white/60 px-3 py-2 text-sm sm:text-base focus:outline-none min-w-0 ${isLocationValid === false ? 'text-red-300 placeholder-red-400/60' : ''}`}
              onKeyDown={(e) => { if (e.key === 'Enter') handleLocationCheck(); }}
            />
            <Button 
              onClick={handleLocationCheck} 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm rounded-full transition-all duration-300 flex items-center gap-1 sm:gap-2 group whitespace-nowrap flex-shrink-0"
            >
              <Search className="w-3 h-3 sm:w-4 sm:h-4" /> Check
            </Button>
          </div>
        </motion.div>

        {/* Popular Categories Teaser */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6 }}
        >
          {popularCategories.map((category) => (
            <motion.div 
              key={category.name} 
              className={`${category.color} backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-300 text-xs sm:text-sm cursor-pointer hover:scale-105`}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('category-section')}
            >
              <span className="text-sm sm:text-base">{category.icon}</span> 
              <span className="text-white/90">{category.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.7 }}
          >
            <Button 
              onClick={() => scrollToSection('featured-items')} 
              className="bg-yellow-400 text-gray-900 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-full transition-all duration-300 flex items-center gap-2 group w-full sm:w-auto shadow-lg shadow-yellow-500/30 hover:bg-yellow-500 hover:shadow-yellow-400/50"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" /> 
              See Items 
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.8 }}
          >
            <Button 
              onClick={() => scrollToSection('category-section')} 
              variant="outline" 
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-full border-2 border-white/30 text-white backdrop-blur-sm transition-all duration-300 w-full sm:w-auto hover:border-white/60 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              Browse Categories
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
