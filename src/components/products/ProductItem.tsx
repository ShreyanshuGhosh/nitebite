
import React from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/components/ProductCard';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ProductItemProps {
  product: Product;
  index: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, index }) => {
  const addItem = useCartStore(state => state.addItem);
  
  const handleAddToCart = () => {
    // Ensure we're passing the first image URL as a string
    const imageUrl = Array.isArray(product.image_url) 
      ? product.image_url[0] 
      : product.image_url;

    const productForCart = {
      ...product,
      image: imageUrl // Set the image property for cart display
    };

    addItem(productForCart);
    toast.success(`Added ${product.name} to box`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <div className="bg-nitebite-dark-accent/30 rounded-lg overflow-hidden border border-white/5 h-full flex flex-col">
        <div className="relative pt-[90%] md:pt-[80%]">
          <img 
            src={Array.isArray(product.image_url) ? product.image_url[0] : product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Discount badge, shown conditionally */}
          {Math.random() > 0.6 && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-sm">
              {`${Math.round(Math.random() * 20 + 5)}% OFF`}
            </div>
          )}
        </div>
        
        <div className="p-2 flex-1 flex flex-col">
          <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.name}</h3>
          
          <div className="mt-auto flex flex-col space-y-2">
            <div className="flex items-center gap-1">
              <span className="text-nitebite-highlight font-semibold">₹{product.price.toFixed(2)}</span>
              {Math.random() > 0.7 && (
                <span className="text-nitebite-text-muted text-xs line-through">
                  ₹{(product.price * 1.2).toFixed(2)}
                </span>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-green-500 text-green-500 hover:bg-green-500/10 min-w-[60px] px-2 truncate"
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
