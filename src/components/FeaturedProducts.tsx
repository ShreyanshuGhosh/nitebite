
import React from 'react';
import ProductCard, { Product } from './ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Sample product data
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
];

const FeaturedProducts: React.FC = () => {
  return (
    <div className="py-16 bg-nitebite-dark">
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
            className="text-nitebite-accent hover:text-nitebite-accent-light mt-4 md:mt-0 self-start animate-fade-in flex items-center gap-2 group"
            style={{ animationDelay: '200ms' }}
          >
            View All Products 
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
