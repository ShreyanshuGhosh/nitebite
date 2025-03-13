
import React, { useState, useEffect, useMemo } from 'react';
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
  const [searchQuery, setSearchQuery] = useState<string>('');
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

  // Watch for URL changes to update selected category
  useEffect(() => {
    if (categoryFromUrl && categories.some(cat => cat.id === categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl, location.search, categories]);

  // Filter products based on selected category and search query
  useEffect(() => {
    let filtered = products;
    
    // Filter by category if not searching
    if (selectedCategory && !searchQuery) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = products.filter((product) => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query))
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery(''); // Clear search when changing category
    
    // Update URL to reflect category change
    const newUrl = `/products?category=${categoryId}`;
    navigate(newUrl, { replace: true });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Get the title for the product list
  const listTitle = useMemo(() => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    if (filteredProducts.length > 0) {
      return filteredProducts[0].category.charAt(0).toUpperCase() + filteredProducts[0].category.slice(1);
    }
    return 'Products';
  }, [searchQuery, filteredProducts]);

  return (
    <div className="flex flex-col min-h-screen bg-nitebite-dark">
      <ProductsHeader onSearch={handleSearch} />

      <div className="flex-1 flex overflow-hidden">
        <CategoriesSidebar 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        <ProductsList 
          products={filteredProducts} 
          title={listTitle}
          isSearching={!!searchQuery}
        />
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
