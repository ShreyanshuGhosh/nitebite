import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Search, Clock, MoonStar, ShoppingBag, MapPin } from 'lucide-react';

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);

      let difference = endOfDay.getTime() - now.getTime();

      if (difference <= 0) {
        difference = 0;
      }

      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-nitebite-dark pt-16">
      {/* Background video or image */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/placeholder.svg"
      >
        <source src="/src/components/heroVideo1.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-nitebite-dark/50 to-nitebite-dark z-0"></div>

      {/* Content */}
      <div className="page-container relative z-10 text-center px-4 md:px-8">
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Late Night <span className="text-gradient-accent">Cravings?</span>
        </motion.h1>
        
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-nitebite-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Delivered Fast!
        </motion.h2>

        <motion.div
          className="glassmorphic-card p-6 rounded-2xl max-w-lg mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-xl mb-4 text-white">Launching In:</p>
          <div className="flex justify-center gap-4 md:gap-8 text-center">
            <div className="w-20">
              <div className="text-5xl font-bold text-nitebite-accent">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-sm text-nitebite-text-muted">HOURS</div>
            </div>
            <div className="text-2xl font-bold text-nitebite-accent self-center">:</div>
            <div className="w-20">
              <div className="text-5xl font-bold text-nitebite-accent">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-sm text-nitebite-text-muted">MINUTES</div>
            </div>
            <div className="text-2xl font-bold text-nitebite-accent self-center">:</div>
            <div className="w-20">
              <div className="text-5xl font-bold text-nitebite-accent">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-sm text-nitebite-text-muted">SECONDS</div>
            </div>
          </div>
        </motion.div>

        <motion.p 
          className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Get snacks, drinks, and essentials delivered right to your hostel (H1-H14) when you need them most.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="glassmorphic-input flex items-center gap-2 w-full md:w-auto px-4 py-3 rounded-full focus-within:ring-2 ring-nitebite-accent/50">
            <MapPin className="h-5 w-5 text-nitebite-text-muted" />
            <input
              type="text"
              placeholder="Hostel (H1-H14)"
              className="bg-transparent border-none focus:outline-none text-white w-full"
            />
          </div>
          <Button
            className="glassmorphic-button text-white w-full md:w-auto py-6 px-6 rounded-full shadow-glow"
            onClick={() => {}}
          >
            <Search className="h-5 w-5 mr-2" />
            Check
          </Button>
        </motion.div>
        
        <motion.div
          className="flex justify-center items-center gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="flex items-center gap-2 text-white">
            <Clock className="h-5 w-5 text-nitebite-accent" />
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <MoonStar className="h-5 w-5 text-nitebite-accent" />
            <span>Late Night</span>
          </div>
        </motion.div>
        
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <Button 
            onClick={() => navigate('/products')}
            className="glassmorphic-button text-white py-6 px-8 rounded-full flex items-center gap-2 shadow-glow animate-pulse-glow"
          >
            <ShoppingBag className="h-5 w-5" />
            See Items
          </Button>
          <Button
            variant="outline"
            className="glassmorphic-ghost-button text-white border-white/20 py-6 px-8 rounded-full"
            onClick={() => document.getElementById('category-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Browse Categories
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
