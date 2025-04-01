import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useProducts, useCategories } from '@/hooks/use-products';
import ProductsHeader from '@/components/products/ProductsHeader';
import CategoriesSidebar from '@/components/products/CategoriesSidebar';
import ProductsList from '@/components/products/ProductsList';

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryFromUrl || ''
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();
  const itemCount = useCartStore(state => state.getItemCount());

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: products = [], isLoading: productsLoading } = useProducts(selectedCategory);

  // Watch for URL changes to update selected category
  useEffect(() => {
    if (categoryFromUrl && categories.some(cat => cat.id === categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl, location.search, categories]);

  // Filter products based on search query
  const filteredProducts = searchQuery
    ? products.filter((product) => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

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
  const listTitle = searchQuery
    ? `Search results for "${searchQuery}"`
    : selectedCategory
    ? categories.find(c => c.id === selectedCategory)?.name || 'Products'
    : 'All Products';

  if (categoriesLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-nitebite-dark flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-nitebite-accent rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  // Process products to ensure image URLs are in the correct format
  const processedProducts = filteredProducts.map(product => {
    // Convert image_url to array if it's a string
    const imageUrls = typeof product.image_url === 'string'
      ? [product.image_url]
      : Array.isArray(product.image_url)
        ? product.image_url
        : ['/fallback-image.jpg'];

    // Get the first image URL or fallback
    const imageUrl = imageUrls[0] || '/fallback-image.jpg';

    return {
      ...product,
      imageUrl // Add a single imageUrl property for the ProductCard
    };
  });

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
          products={processedProducts}
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