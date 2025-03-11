
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const addItem = useCartStore(state => state.addItem);
  
  const handleAddToCart = () => {
    addItem(product);
    toast.success(`Added ${product.name} to box`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glassmorphic-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-glow group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nitebite-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-nitebite-highlight mb-1 truncate">{product.name}</h3>
        <p className="text-nitebite-text-muted text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-nitebite-highlight font-semibold">${product.price.toFixed(2)}</span>
          <Button 
            size="sm" 
            className="glassmorphic-button rounded-full h-8 w-8 p-0 flex items-center justify-center shadow-glow-sm"
            onClick={handleAddToCart}
            aria-label="Add to Box"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
