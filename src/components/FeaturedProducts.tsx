import React, { useRef, useState, useEffect } from 'react';
import ProductCard, { Product } from './ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const products: Product[] = [
  {
    id: '1',
    name: 'Doritos Nacho Cheese',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?q=80&w=1000',
    category: 'chips',
    description: 'Bold nacho cheese flavored tortilla chips for your late night snacking',
  },
  {
    id: '2',
    name: 'Monster Energy Drink',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=1000',
    category: 'drinks',
    description: 'Energy drink to keep you going through those late nights',
  },
  {
    id: '3',
    name: 'Starbucks Cold Brew',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=1000',
    category: 'coffee',
    description: 'Smooth, delicious cold brew coffee to satisfy your caffeine cravings',
  },
  {
    id: '4',
    name: 'Lindt Dark Chocolate',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000',
    category: 'chocolate',
    description: 'Premium dark chocolate with rich flavor and smooth texture',
  },
  {
    id: '5',
    name: 'Lay\'s Classic Chips',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=1000',
    category: 'chips',
    description: 'Classic potato chips with the perfect amount of salt',
  },
  {
    id: '6',
    name: 'Coca-Cola Zero',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1000',
    category: 'drinks',
    description: 'Zero sugar cola with the classic Coca-Cola taste',
  },
  {
    id: '7',
    name: 'Espresso Shot',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1520031607889-97ba0c7190ff?q=80&w=1000',
    category: 'coffee',
    description: 'Quick shot of espresso for an immediate caffeine boost',
  },
  {
    id: '8',
    name: 'Ferrero Rocher',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1000',
    category: 'chocolate',
    description: 'Deluxe chocolate with hazelnut center and crisp wafer shell',
  },
  {
    id: '9',
    name: 'Oreo Cookies',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1590080875580-b6ba70050d59?q=80&w=1000',
    category: 'biscuits',
    description: 'Classic chocolate sandwich cookies with vanilla cream filling',
  },
  {
    id: '10',
    name: 'Digestive Biscuits',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1597733153203-a54d0fbc47de?q=80&w=1000',
    category: 'biscuits',
    description: 'Crunchy whole wheat biscuits perfect with your late night tea',
  },
  {
    id: '11',
    name: 'Chips Ahoy! Cookies',
    price: 3.79,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1000',
    category: 'biscuits',
    description: 'Chocolate chip cookies filled with real chocolate chips',
  },
  {
    id: '12',
    name: 'Red Bull Energy Drink',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1613577041053-f9f83b2d4165?q=80&w=1000',
    category: 'drinks',
    description: 'Energy drink that gives you wings for those late study sessions',
  },
];

const FeaturedProducts: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  useEffect(() => {
    const checkScrollability = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    checkScrollability();
    window.addEventListener('resize', checkScrollability);

    return () => {
      window.removeEventListener('resize', checkScrollability);
    };
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    
    const handleScroll = () => {
      if (scrollContainer) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    let autoScrollInterval: NodeJS.Timeout | null = null;
    
    const startAutoScroll = () => {
      if (scrollContainerRef.current && !isAutoScrolling) {
        setIsAutoScrolling(true);
        autoScrollInterval = setInterval(() => {
          if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            
            if (scrollLeft >= scrollWidth - clientWidth - 10) {
              scrollContainerRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
              });
            } else {
              scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
              });
            }
          }
        }, 5000);
      }
    };

    const stopAutoScroll = () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        setIsAutoScrolling(false);
      }
    };

    const timer = setTimeout(startAutoScroll, 5000);
    
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('mouseenter', stopAutoScroll);
      scrollContainer.addEventListener('touchstart', stopAutoScroll);
    }

    return () => {
      clearTimeout(timer);
      if (autoScrollInterval) clearInterval(autoScrollInterval);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', stopAutoScroll);
        scrollContainer.removeEventListener('touchstart', stopAutoScroll);
      }
    };
  }, [isAutoScrolling]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
      setIsAutoScrolling(false);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
      setIsAutoScrolling(false);
    }
  };

  return (
    <div id="featured-items" className="py-16 bg-nitebite-dark">
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2 animate-fade-in">Featured Items</h2>
            <p className="text-nitebite-text-muted max-w-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              Our most popular late-night snacks and beverages
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="text-nitebite-accent hover:text-nitebite-accent-light mt-4 md:mt-0 self-start animate-fade-in flex items-center gap-2 group glassmorphic-ghost-button"
            style={{ animationDelay: '200ms' }}
          >
            View All Products 
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-nitebite-dark-accent/80 backdrop-blur-lg border border-white/10 text-nitebite-text shadow-glow transition-all", 
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </Button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto py-4 px-2 scrollbar-none scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="min-w-[280px] sm:min-w-[300px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-nitebite-dark-accent/80 backdrop-blur-lg border border-white/10 text-nitebite-text shadow-glow transition-all", 
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
