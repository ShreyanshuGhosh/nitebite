
import React from 'react';
import { Button } from '@/components/ui/button';
import DeliveryTimer from './DeliveryTimer';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-nitebite-dark overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern"></div>
      
      {/* Overlay circles for visual effect */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-nitebite-accent/5 blur-3xl"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-nitebite-accent/10 blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col justify-center items-center h-screen page-container text-center px-4">
        <span className="inline-block px-4 py-2 bg-nitebite-accent/10 backdrop-blur-md border border-nitebite-accent/20 rounded-full text-sm text-nitebite-highlight mb-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
          Late night cravings? We've got you covered.
        </span>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in" style={{ animationDelay: '400ms' }}>
          <span className="text-gradient">10-Minute Delivery</span><br />
          <span className="text-nitebite-text">for Your Midnight Munchies</span>
        </h1>
        
        <p className="text-nitebite-text-muted max-w-2xl mb-10 text-lg animate-fade-in" style={{ animationDelay: '500ms' }}>
          Get your favorite snacks delivered to your doorstep in just 10 minutes. 
          Choose from a wide range of drinks, chips, chocolates, and coffee.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <Button className="bg-nitebite-accent hover:bg-nitebite-accent-light text-white px-8 py-6 text-lg rounded-full transition-all duration-300 flex items-center gap-2 group">
            Order Now
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="border-nitebite-accent/50 text-nitebite-text hover:bg-nitebite-accent/10 px-8 py-6 text-lg rounded-full backdrop-blur-sm">
            View Menu
          </Button>
        </div>
        
        <div className="w-full max-w-lg glass-card p-6 rounded-2xl animate-fade-in-up" style={{ animationDelay: '700ms' }}>
          <DeliveryTimer />
        </div>
      </div>
    </div>
  );
};

export default Hero;
