
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Product } from '@/components/ProductCard';
import { useCartStore } from '@/store/cartStore';

// Import products from FeaturedProducts to reuse data
import { products } from '@/components/ProductsData';
import { getCategoryIcon } from '@/components/products/utils';
import ProductsHeader from '@/components/products/ProductsHeader';
import CategoriesSidebar from '@/components/products/CategoriesSidebar';
import ProductsList from '@/components/products/ProductsList';

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryFromUrl || 'chips'
  );
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
    
    // Update URL without reloading the page
    const newUrl = `/products?category=${selectedCategory}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }, [selectedCategory]);

  // Update category when URL changes
  useEffect(() => {
    if (categoryFromUrl && categories.some(cat => cat.id === categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl, categories]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-nitebite-dark">
      <ProductsHeader />

      <div className="flex-1 flex overflow-hidden">
        <CategoriesSidebar 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        <ProductsList products={filteredProducts} />
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

export default Products;
