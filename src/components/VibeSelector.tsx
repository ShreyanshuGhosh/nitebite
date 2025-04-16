
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const vibeOptions = [
  {
    id: 'midnight-munchies',
    name: 'Midnight Munchies',
    tagline: 'Conquer those 2 AM cravings',
    price: '₹499',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80',
    emoji: '🍕'
  },
  {
    id: 'study-night-pack',
    name: 'Study Night Pack',
    tagline: 'Power through papers & exams',
    price: '₹599',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80',
    emoji: '🧠'
  },
  {
    id: 'hostel-hangout-pack',
    name: 'Hostel Hangout Pack',
    tagline: 'Your instant party starter kit',
    price: '₹799',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80',
    emoji: '🎉'
  },
  {
    id: 'smart-snacker',
    name: 'Smart Snacker',
    tagline: 'Snack smart, not hard',
    price: '₹649',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80',
    emoji: '🥗'
  }
];

const VibeSelector: React.FC = () => {
  const isMobile = useIsMobile();
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll for mobile view
  useEffect(() => {
    let scrollInterval: NodeJS.Timeout | null = null;
    
    if (isMobile && carouselRef.current) {
      scrollInterval = setInterval(() => {
        if (carouselRef.current) {
          const scrollAmount = carouselRef.current.scrollLeft + 200;
          const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
          
          if (scrollAmount >= maxScroll) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            carouselRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
          }
        }
      }, 5000);
    }
    
    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isMobile]);
  
  return (
    <div className="py-6 sm:py-8 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 sm:mb-6"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-nitebite-purple">Choose Your Vibe:</h2>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative"
        >
          <CarouselContent className="-ml-2 md:-ml-4" ref={carouselRef}>
            {vibeOptions.map((vibe) => (
              <CarouselItem key={vibe.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Card className="overflow-hidden bg-nitebite-midnight border border-nitebite-purple/20 shadow-lg h-full flex flex-col">
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    <img 
                      src={vibe.image} 
                      alt={vibe.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-nitebite-yellow flex items-center justify-center text-lg">
                      {vibe.emoji}
                    </div>
                  </div>
                  <CardHeader className="px-3 sm:px-4 py-2 sm:py-3 space-y-1">
                    <CardTitle className="text-lg sm:text-xl text-nitebite-purple">{vibe.name}</CardTitle>
                    <p className="text-xs sm:text-sm text-white/70">{vibe.tagline}</p>
                  </CardHeader>
                  <CardContent className="px-3 sm:px-4 py-1 sm:py-2 grow">
                    <p className="text-xl sm:text-2xl font-bold text-nitebite-yellow">{vibe.price}</p>
                  </CardContent>
                  <CardFooter className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
                    <Button className="w-full glassmorphic-button text-sm py-1" asChild>
                      <Link to="/snack-boxes">Get This Box</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {!isMobile && (
            <>
              <CarouselPrevious className="left-0 bg-nitebite-purple/20 text-white hover:bg-nitebite-purple/40" />
              <CarouselNext className="right-0 bg-nitebite-purple/20 text-white hover:bg-nitebite-purple/40" />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default VibeSelector;
