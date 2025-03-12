
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ProductItem from './ProductItem';
import { Product } from '@/components/ProductCard';

interface ProductsListProps {
  products: Product[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <div className="flex-1 overflow-y-auto px-3 py-4">
      <h2 className="text-xl font-semibold mb-4 text-nitebite-highlight">
        {products.length > 0 
          ? products[0].category.charAt(0).toUpperCase() + products[0].category.slice(1)
          : 'Products'}
      </h2>
      
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="wait">
          {products.map((product, index) => (
            <ProductItem 
              key={product.id} 
              product={product} 
              index={index} 
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductsList;
