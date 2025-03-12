
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard, { Product } from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

// Import products from FeaturedProducts to reuse data
import { products } from '@/components/ProductsData';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('chips');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const itemCount = useCartStore(state => state.getItemCount());

  // Unique categories from products
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  ).map(category => ({
    id: category,
    name: category.charAt(0).toUpperCase() + category.slice(1),
    icon: getCategoryIcon(category)
  }));

  // Filter products based on selected category
  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category === selectedCategory
    );
    setFilteredProducts(filtered);
  }, [selectedCategory]);

  // Get icon for category
  function getCategoryIcon(category: string): string {
    switch (category) {
      case 'chips': return '🍟';
      case 'drinks': return '🥤';
      case 'coffee': return '☕';
      case 'chocolate': return '🍫';
      case 'biscuits': return '🍪';
      default: return '📦';
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-nitebite-dark">
      {/* Header - Red section */}
      <header className="sticky top-0 z-50 glassmorphic-panel px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="glassmorphic-ghost-button rounded-full"
              onClick={() => navigate('/')}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">Delivery in 11 minutes</h1>
              <p className="text-xs text-nitebite-text-muted flex items-center">
                Your location <span className="ml-1">▼</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="glassmorphic-ghost-button rounded-full"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="glassmorphic-ghost-button rounded-full relative"
              onClick={() => navigate('/checkout')}
              aria-label="Go to cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-nitebite-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Categories - Blue section */}
        <div className="w-20 flex-shrink-0 overflow-y-auto bg-nitebite-dark-accent border-r border-white/5">
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            />
          ))}
        </div>

        {/* Product listing - Yellow section */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <h2 className="text-xl font-semibold mb-4 text-nitebite-highlight">
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            <AnimatePresence mode="wait">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <ProductItem product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Sticky "Add to Box" button for mobile */}
      <div className="fixed bottom-5 right-5 z-40 md:hidden">
        <Button
          onClick={() => navigate('/checkout')}
          className="glassmorphic-button rounded-full w-14 h-14 flex items-center justify-center shadow-glow"
          aria-label="Go to cart"
        >
          <ShoppingBag className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-nitebite-accent text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

interface CategoryProps {
  id: string;
  name: string;
  icon: string;
}

interface CategoryButtonProps {
  category: CategoryProps;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-3 flex flex-col items-center gap-1 transition-all text-center touch-manipulation",
        isSelected 
          ? "bg-nitebite-dark border-l-2 border-nitebite-accent text-nitebite-highlight" 
          : "text-nitebite-text-muted hover:bg-nitebite-dark/50"
      )}
    >
      <span className="text-2xl mb-1">{category.icon}</span>
      <span className="text-xs line-clamp-1">{category.name}</span>
    </button>
  );
};

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);
  
  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="bg-nitebite-dark-accent/30 rounded-lg overflow-hidden border border-white/5 h-full flex flex-col">
      <div className="relative pt-[100%]">
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Delivery time indicator */}
        <div className="absolute bottom-2 left-2 bg-nitebite-dark/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <span className="text-amber-500 text-xs">🕒</span>
          <span className="text-xs text-white">30 MINS</span>
        </div>
        
        {/* Discount badge, shown conditionally */}
        {Math.random() > 0.6 && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-sm">
            {`${Math.round(Math.random() * 20 + 5)}% OFF`}
          </div>
        )}
      </div>
      
      <div className="p-2 flex-1 flex flex-col">
        <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h3>
        <div className="text-xs text-nitebite-text-muted mb-1">
          {Math.round(Math.random() * 500 + 50)} g
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-nitebite-highlight font-semibold">₹{Math.round(product.price * 20)}</span>
            {Math.random() > 0.7 && (
              <span className="text-nitebite-text-muted text-xs line-through">
                ₹{Math.round(product.price * 20 * 1.2)}
              </span>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-green-500 text-green-500 hover:bg-green-500/10"
            onClick={handleAddToCart}
          >
            ADD
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
