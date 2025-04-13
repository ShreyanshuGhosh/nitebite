// src/components/Hero.tsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
// Import Link from react-router-dom
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Clock,
  MapPin,
  ShoppingBag,
  Search,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import heroVideo from './heroVideo1.mp4'; // Ensure this path is correct

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// --- UPDATED LAUNCH DATE ---
// Set to Monday, April 7th, 2025, 00:00:00 local time
const HERO_LAUNCH_DATE = new Date('2025-04-07T00:00:00').getTime();
// --- END OF UPDATE ---

const Hero: React.FC = () => {
   // Countdown Timer State
   const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isWithin48Hours, setIsWithin48Hours] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Location Input State
  const [location, setLocation] = useState('');
  const [isLocationValid, setIsLocationValid] = useState<boolean | null>(null);
  const [locationError, setLocationError] = useState('');

  // Particle positions (memoized)
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      })),
    []
  );

  // Countdown Timer Effect
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = HERO_LAUNCH_DATE - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });

        const fortyEightHoursInMillis = 48 * 60 * 60 * 1000;
        setIsWithin48Hours(difference <= fortyEightHoursInMillis);

      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsWithin48Hours(false);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Location Check Handler
  const handleLocationCheck = useCallback(() => {
    const cleanedLocation = location.trim().toLowerCase();
    setLocationError('');
    setIsLocationValid(null);

    const hostelRegex = /^h([1-9]|1[0-4])$/;
    if (hostelRegex.test(cleanedLocation)) {
      setIsLocationValid(true);
    } else {
      setIsLocationValid(false);
      setLocationError(
        !cleanedLocation
          ? 'Please enter your hostel (e.g., H1, H14).'
          : 'Sorry, we only deliver to H1 - H14 hostels.'
      );
    }
  }, [location]);

  // Smooth Scroll Function (still used for Categories)
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn(`Scroll target not found: #${sectionId}`);
    }
  };

  // Format time values for display
  const totalHours = String(timeLeft.days * 24 + timeLeft.hours).padStart(2, '0');
  const formattedMinutes = String(timeLeft.minutes).padStart(2, '0');
  const formattedSeconds = String(timeLeft.seconds).padStart(2, '0');

  // Determine if launch hasn't happened yet
  const showAnyCountdown =
    timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0;


  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
       {/* Background Video */}
       <div className="absolute inset-0 w-full h-full z-0">
        <video
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/nitebite-poster.jpg"
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={(e) => console.error('Video Load Error:', e)}
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-gray-900/95 z-1"></div>

      {/* Animated Particles */}
      {particles.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400/20 z-1"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
          transition={{ duration: 3, delay: i * 0.15, repeat: Infinity, repeatDelay: 4 }}
          style={{ left: pos.left, top: pos.top }}
        />
      ))}


      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-16 md:pt-20 text-center px-4">

        {/* Standard Countdown Badge (> 48 hours) */}
        {showAnyCountdown && !isWithin48Hours && (
          <motion.div
            className="mb-5 p-3 px-5 rounded-full bg-white/10 backdrop-blur-sm shadow-lg inline-block"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 text-white">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">
                Launch In: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>
          </motion.div>
        )}

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: showAnyCountdown && !isWithin48Hours ? 0.3 : 0.2 }}
        >
          Late Night Cravings?
        </motion.h1>

        {/* Subheadline */}
        <motion.div
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: showAnyCountdown && !isWithin48Hours ? 0.4 : 0.3, duration: 0.5 }}
        >
          Delivered Fast!
        </motion.div>

        {/* Prominent 48-Hour Countdown (<= 48 hours) */}
        {isWithin48Hours && showAnyCountdown && (
          <motion.div
            className="mb-6 md:mb-8 p-4 px-6 rounded-lg bg-black/30 backdrop-blur-md shadow-xl border border-yellow-500/30"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
          >
            <p className="text-sm sm:text-base text-white/80 font-medium mb-2 tracking-wide">Launching In:</p>
            <div className="flex justify-center items-baseline gap-3 sm:gap-5">
              {/* Hours */}
              <div className="flex flex-col items-center w-16 sm:w-20">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 tabular-nums">
                  {totalHours}
                </span>
                <span className="text-xs sm:text-sm text-white/70 uppercase tracking-wider mt-1">Hours</span>
              </div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400/80 pb-3 sm:pb-4">:</span>
              {/* Minutes */}
              <div className="flex flex-col items-center w-16 sm:w-20">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 tabular-nums">
                  {formattedMinutes}
                </span>
                <span className="text-xs sm:text-sm text-white/70 uppercase tracking-wider mt-1">Minutes</span>
              </div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400/80 pb-3 sm:pb-4">:</span>
              {/* Seconds */}
              <div className="flex flex-col items-center w-16 sm:w-20">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 tabular-nums">
                  {formattedSeconds}
                </span>
                <span className="text-xs sm:text-sm text-white/70 uppercase tracking-wider mt-1">Seconds</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-xl md:max-w-2xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isWithin48Hours ? 0.5 : (showAnyCountdown ? 0.5 : 0.4) }}
        >
          Get snacks, drinks, and essentials delivered right to your hostel (H1-H14) when you need them most.
        </motion.p>

        {/* Location Input Section */}
        <motion.div
          className="w-full max-w-md md:max-w-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isWithin48Hours ? 0.6 : (showAnyCountdown ? 0.6 : 0.5) }}
        >
          <div
            className={`flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-2 shadow-md border transition-colors duration-300 ${
              isLocationValid === true
                ? 'border-green-500'
                : isLocationValid === false
                ? 'border-red-500'
                : 'border-white/20 focus-within:border-yellow-400'
            }`}
          >
            <MapPin
              className={`w-5 h-5 ml-2 hidden sm:block flex-shrink-0 transition-colors ${
                isLocationValid === false ? 'text-red-500' : 'text-yellow-400'
              }`}
            />
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                if (isLocationValid !== null) setIsLocationValid(null);
                if (locationError) setLocationError('');
              }}
              placeholder="Your Hostel (e.g., H1, H14)"
              className={`flex-grow bg-transparent text-white placeholder-white/60 px-3 py-2 text-sm sm:text-base focus:outline-none ${
                isLocationValid === false ? 'text-red-300 placeholder-red-400/60' : ''
              }`}
              aria-label="Enter Hostel Number (H1-H14)"
              aria-invalid={isLocationValid === false}
              aria-describedby="location-error-message"
              onKeyDown={(e) => e.key === 'Enter' && handleLocationCheck()}
            />
            <Button
              onClick={handleLocationCheck}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-4 py-2 text-xs sm:text-sm rounded-full transition-all duration-300 flex items-center gap-1 group shrink-0"
              aria-label="Check hostel number validity"
            >
              <Search className="w-3 h-3 sm:w-4 sm:h-4" /> Check
            </Button>
          </div>
          {locationError && (
            <motion.p
              id="location-error-message"
              className="text-red-400 text-xs sm:text-sm mt-2 flex items-center justify-center gap-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
            >
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> {locationError}
            </motion.p>
          )}
        </motion.div>

        {/* Value Propositions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2 text-xs sm:text-sm cursor-default"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isWithin48Hours ? 0.7 : (showAnyCountdown ? 0.7 : 0.6) }}
          >
            <Clock className="w-4 h-4 text-yellow-400" />{' '}
            <span className="text-white font-medium">Fast Delivery</span>
          </motion.div>
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2 text-xs sm:text-sm cursor-default"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isWithin48Hours ? 0.75 : (showAnyCountdown ? 0.75 : 0.65) }}
          >
            <ShoppingBag className="w-4 h-4 text-yellow-400" />{' '}
            <span className="text-white font-medium">Late Night</span>
          </motion.div>
        </div>


        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          {/* Use react-router-dom Link for "See Items" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isWithin48Hours ? 0.8 : (showAnyCountdown ? 0.8 : 0.7) }}
          >
            <Link
              to="/products" // Navigate to products page
              className="w-full sm:w-auto bg-yellow-400 text-gray-900 px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:bg-yellow-500 group"
              aria-label="Go to products page"
            >
              <ShoppingBag className="w-5 h-5" /> See Items{' '}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Secondary CTA (Browse Categories - still scrolls) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isWithin48Hours ? 0.85 : (showAnyCountdown ? 0.85 : 0.75) }}
          >
            <Button
              onClick={() => scrollToSection('category-section')} // Still uses scroll
              variant="outline"
              className="w-full sm:w-auto px-6 py-3 rounded-full border-2 border-white/30 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:shadow-md"
              aria-label="Scroll to browse categories"
            >
              Browse Categories
            </Button>
          </motion.div>
        </div>

        {/* Popular Categories Teaser (still scrolls) */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isWithin48Hours ? 0.9 : (showAnyCountdown ? 0.9 : 0.8) }}
        >
          {[
            { name: 'Midnight Snacks', icon: '🍕' },
            { name: 'Quick Meals', icon: '🍔' },
            { name: 'Beverages', icon: '🥤' },
            { name: 'Desserts', icon: '🍦' },
          ].map((category) => (
            <motion.div
              key={category.name}
              className="bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 cursor-pointer hover:bg-black/40 text-xs sm:text-sm"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('category-section')} // Still uses scroll
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scrollToSection('category-section')}
            >
              <span aria-hidden="true">{category.icon}</span>{' '}
              <span className="text-white/90">{category.name}</span>
            </motion.div>
          ))}
        </motion.div>

      </div> {/* End Main Content Area */}
    </div> // End Relative Container
  );
};

export default Hero;