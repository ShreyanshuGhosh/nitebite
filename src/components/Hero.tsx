
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToCategories = () => {
    const categorySection = document.getElementById('category-section');
    if (categorySection) {
      categorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <div className="relative min-h-[90vh] md:min-h-screen bg-nitebite-dark overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern"></div>
      
      {/* Overlay circles for visual effect */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-nitebite-accent/5 blur-3xl"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-nitebite-accent/10 blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col justify-center items-center h-[90vh] md:h-screen page-container text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in" style={{
          animationDelay: '400ms'
        }}>
          <span className="text-nitebite-text">Bringing Late-Night Cravings to Your Doorstep – Faster &amp; Cheaper!</span>
        </h1>
        
        <p className="text-nitebite-text-muted max-w-2xl mb-10 text-base sm:text-lg animate-fade-in" style={{
          animationDelay: '500ms'
        }}>
          Get your favorite snacks delivered to your doorstep in just 10 minutes. 
          Choose from a wide range of drinks, chips, chocolates, and coffee.
        </p>
        
        <div className="animate-fade-in" style={{
          animationDelay: '600ms'
        }}>
          <Button 
            onClick={scrollToCategories}
            className="bg-nitebite-accent hover:bg-nitebite-accent-light text-white px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg rounded-full transition-all duration-300 flex items-center gap-2 group"
          >
            Order Now
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>;
};
export default Hero;
