import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NewNavbar from '@/components/NewNavbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Plus, Minus, ShoppingCart, Search } from 'lucide-react';
import FloatingBox from '@/components/FloatingBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import BackToTop from '@/components/BackToTop';
import { useProducts, useCategories } from '@/hooks/use-products';
import { toast } from 'sonner';
import CategoryTracker from '@/components/CategoryTracker';
import type { Product } from '@/components/ProductCard';

const BoxBuilder = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const { addItem } = useCartStore();

  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const availableCategories = useMemo(() => {
    if (categories.length > 0) {
      return categories;
    }
    
    const uniqueCategories = Array.from(
      new Set(products.map(product => product.category || product.category_id || "Uncategorized"))
    );
    
    return uniqueCategories.map(cat => ({
      id: cat,
      name: cat
    }));
  }, [products, categories]);

  const filteredProducts = selectedCategory
    ? products.filter(item => {
        const itemCategory = item.category || item.category_id;
        return itemCategory === selectedCategory;
      })
    : products;

  const selectedCategories = useMemo(() => {
    const categories = new Set<string>();
    
    Object.keys(selectedItems).forEach(id => {
      const product = products.find(p => p.id === id);
      if (product && (product.category || product.category_id)) {
        categories.add(product.category || product.category_id || "");
      }
    });
    
    return Array.from(categories).filter(Boolean);
  }, [selectedItems, products]);

  const totalPrice = useMemo(() => {
    return Object.entries(selectedItems).reduce((sum, [id, quantity]) => {
      const item = products.find(item => item.id === id);
      return sum + (item ? item.price * quantity : 0);
    }, 0);
  }, [selectedItems, products]);

  const hasMinimumCategories = selectedCategories.length >= 2;

  const handleSelectItem = (id: string, increment: boolean) => {
    setSelectedItems(prev => {
      const currentQuantity = prev[id] || 0;
      const newQuantity = increment 
        ? currentQuantity + 1 
        : Math.max(0, currentQuantity - 1);
      
      if (newQuantity === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [id]: newQuantity };
    });
  };

  const handleAddBoxToCart = () => {
    if (Object.keys(selectedItems).length === 0) {
      toast.error('Please add some items to your box');
      return;
    }

    if (!hasMinimumCategories) {
      toast.error('Please select items from at least 2 different categories');
      return;
    }

    const firstSelectedProduct = products.find(item => selectedItems[item.id]);
    const imageUrl = firstSelectedProduct 
      ? (Array.isArray(firstSelectedProduct.image_url) 
          ? firstSelectedProduct.image_url[0] 
          : firstSelectedProduct.image_url) 
      : '';

    const customBox = {
      id: `custom-box-${Date.now()}`,
      name: 'Custom Snack Box',
      price: totalPrice,
      image_url: imageUrl,
      image: imageUrl,
      description: `Custom box with ${Object.values(selectedItems).reduce((a, b) => a + b, 0)} items from ${selectedCategories.length} categories`,
      category: "custom_box",
      category_id: "custom_box",
      stock_quantity: 1
    };

    addItem(customBox);
    toast.success('Custom box added to cart!', {
      duration: 3000
    });
    navigate('/checkout');
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-nitebite-midnight flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-nitebite-accent rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <NewNavbar transparent={false} />
      <div className="min-h-screen bg-nitebite-midnight pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-nitebite-text-muted hover:text-nitebite-purple transition-colors mb-6 glassmorphic-ghost-button py-2 px-4 rounded-full">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <CategoryTracker 
            selectedCategories={selectedCategories}
            total={totalPrice}
            onCheckout={handleAddBoxToCart}
            isCheckoutDisabled={!hasMinimumCategories || Object.keys(selectedItems).length === 0}
          />

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nitebite-accent-light bg-clip-text text-transparent bg-gradient-to-r from-nitebite-purple to-nitebite-accent text-center mb-4">
            Build Your Late-Night Legend Box
          </h1>

          <div className="text-center mb-8">
            <p className="text-nitebite-text-muted mb-2">Want to have ideas?</p>
            <Button
              className="glassmorphic-button inline-flex items-center gap-2"
              asChild
            >
              <Link to="/snack-boxes">
                <Search className="w-4 h-4" /> Search Pre-Curated Boxes
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              className="rounded-full glassmorphic-ghost-button"
              onClick={() => setSelectedCategory(null)}
            >
              All Items
            </Button>
            {availableCategories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="rounded-full glassmorphic-ghost-button"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-24">
            <div className="lg:col-span-2">
              <div className="glassmorphic-card p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-nitebite-highlight mb-4">Choose Your Items</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {filteredProducts.map((item) => {
                    const imageUrl = Array.isArray(item.image_url) ? item.image_url[0] : item.image_url;
                    
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="bg-nitebite-dark-accent/30 border border-white/10 overflow-hidden h-full flex flex-col">
                          <div className="aspect-square overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-3 flex-grow flex flex-col justify-between">
                            <div>
                              <h3 className="font-medium text-nitebite-highlight text-sm">{item.name}</h3>
                              <p className="text-nitebite-text-muted text-xs mt-1">{item.category}</p>
                              <p className="text-nitebite-yellow font-bold text-sm mt-1">₹{item.price}</p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-3">
                              {selectedItems[item.id] ? (
                                <>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full border-white/20 h-7 w-7"
                                    onClick={() => handleSelectItem(item.id, false)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="text-white font-medium text-sm">{selectedItems[item.id]}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full border-white/20 h-7 w-7"
                                    onClick={() => handleSelectItem(item.id, true)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  className="w-full glassmorphic-button text-xs py-1.5"
                                  onClick={() => handleSelectItem(item.id, true)}
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="glassmorphic-card p-6 rounded-xl sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <h2 className="text-2xl font-bold text-nitebite-highlight mb-4">Your Custom Box</h2>
                
                {Object.keys(selectedItems).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(selectedItems).map(([id, quantity]) => {
                      const item = products.find(item => item.id === id);
                      if (!item) return null;
                      
                      return (
                        <div key={id} className="flex items-center justify-between border-b border-white/10 pb-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={Array.isArray(item.image_url) ? item.image_url[0] : item.image_url}
                              alt={item.name}
                              className="w-10 h-10 rounded-md object-cover"
                            />
                            <div>
                              <h3 className="font-medium text-nitebite-highlight">{item.name}</h3>
                              <p className="text-nitebite-text-muted text-xs">₹{item.price} × {quantity}</p>
                            </div>
                          </div>
                          <p className="font-bold text-nitebite-yellow">₹{item.price * quantity}</p>
                        </div>
                      );
                    })}
                    
                    <div className="border-t border-white/10 pt-4 mt-4">
                      <div className="flex justify-between text-lg font-bold mb-2">
                        <span className="text-nitebite-highlight">Total:</span>
                        <span className="text-nitebite-accent">₹{totalPrice}</span>
                      </div>

                      <div className="mb-4 text-sm">
                        <p className={`${hasMinimumCategories ? 'text-green-400' : 'text-red-400'}`}>
                          {selectedCategories.length} of 2 required categories selected
                        </p>
                      </div>
                      
                      <Button
                        className={`w-full glassmorphic-button py-5 px-6 text-base rounded-full flex items-center justify-center gap-2 group
                          ${!hasMinimumCategories ? 'opacity-70' : ''}`}
                        onClick={handleAddBoxToCart}
                        disabled={Object.keys(selectedItems).length === 0 || !hasMinimumCategories}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add Box to Cart</span>
                      </Button>

                      {!hasMinimumCategories && Object.keys(selectedItems).length > 0 && (
                        <p className="text-xs text-red-400 mt-2 text-center">
                          Please select items from at least 2 different categories
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-nitebite-text-muted">Your box is empty</p>
                    <p className="text-sm text-nitebite-text-muted mt-2">Add items from the left to create your custom box</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FloatingBox />
      <BackToTop />
      <Footer />
    </>
  );
};

export default BoxBuilder;
