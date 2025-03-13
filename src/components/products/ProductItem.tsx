
import React from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/components/ProductCard';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';

interface ProductItemProps {
  product: Product;
  index: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, index }) => {
  const addItem = useCartStore(state => state.addItem);
  
  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <div className="bg-nitebite-dark-accent/30 rounded-lg overflow-hidden border border-white/5 h-full flex flex-col">
        <div className="relative pt-[90%] md:pt-[80%]"> {/* Reduced image height */}
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
    </motion.div>
  );
};

export default ProductItem;
