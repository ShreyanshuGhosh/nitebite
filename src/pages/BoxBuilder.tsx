
import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';
import { Search, Plus, Minus, X } from 'lucide-react';
import NewNavbar from '@/components/NewNavbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { productData } from '@/components/ProductsData';

const BoxBuilder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItems, setSelectedItems] = useState<{
    id: string;
    name: string;
    price: number;
    image_url: string[];
    quantity: number;
  }[]>([]);
  const { addItem } = useCartStore();
  const isMobile = useIsMobile();

  // Categories for filter tabs
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'chips', name: 'Chips' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'chocolate', name: 'Chocolate' },
    { id: 'biscuits', name: 'Biscuits' },
    { id: 'coffee', name: 'Coffee' },
  ];

  // Placeholder products data
  const products = productData;

  // Filter products based on search query and active category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Add item to the box
  const handleAddItem = (product: any) => {
    const existingItem = selectedItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setSelectedItems(
        selectedItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      );
    } else {
      setSelectedItems([
        ...selectedItems, 
        { 
          id: product.id, 
          name: product.name, 
          price: product.price,
          image_url: product.image_url,
          quantity: 1 
        }
      ]);
    }
    
    toast.success(`Added ${product.name} to your box!`);
  };

  // Update item quantity
  const updateItemQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setSelectedItems(selectedItems.filter(item => item.id !== id));
      return;
    }
    
    setSelectedItems(
      selectedItems.map(item => 
        item.id === id 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  // Remove item from the box
  const removeItem = (id: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Add custom box to cart
  const addCustomBoxToCart = () => {
    const customBoxId = `custom-box-${Date.now()}`;
    
    addItem({
      id: customBoxId,
      name: "Custom Box",
      price: calculateSubtotal(),
      image_url: "https://images.pexels.com/photos/31616946/pexels-photo-31616946.png?auto=compress&cs=tinysrgb&w=600&lazy=load",
      description: `Custom box with ${selectedItems.reduce((total, item) => total + item.quantity, 0)} items`,
    });
    
    toast.success("Custom box added to your cart!");
    setSelectedItems([]);
  };

  return (
    <>
      <NewNavbar />
      <main className="bg-nitebite-midnight min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-nitebite-purple"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Build Your Late-Night Legend Box
          </motion.h1>
          
          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Item Browser */}
            <motion.div 
              className="w-full lg:w-2/3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Search Bar */}
              <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nitebite-text-muted" />
                <Input 
                  type="text" 
                  placeholder="Search snacks for your box..." 
                  className="pl-10 bg-nitebite-dark/50 border-nitebite-purple/30 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Category Filters */}
              <Tabs defaultValue="all" className="mb-6">
                <TabsList className="w-full overflow-x-auto flex flex-nowrap space-x-1 bg-nitebite-dark/50 p-1">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className="px-4 py-2 whitespace-nowrap text-white data-[state=active]:bg-nitebite-purple data-[state=active]:text-white"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    className="glassmorphic-card rounded-xl overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="h-40 bg-nitebite-dark/30 flex items-center justify-center overflow-hidden">
                      <img 
                        src={Array.isArray(product.image_url) ? product.image_url[0] : product.image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-white mb-1">{product.name}</h3>
                      <p className="text-nitebite-yellow font-semibold mb-3">₹{product.price.toFixed(2)}</p>
                      <Button 
                        onClick={() => handleAddItem(product)} 
                        className="w-full rounded-full glassmorphic-button"
                      >
                        <Plus size={18} />
                        Add
                      </Button>
                    </div>
                  </motion.div>
                ))}
                
                {/* Example Out of Stock Item */}
                <motion.div
                  className="glassmorphic-card rounded-xl overflow-hidden opacity-50"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-40 bg-nitebite-dark/30 flex items-center justify-center overflow-hidden grayscale">
                    <img 
                      src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
                      alt="Out of stock item"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-white/70 mb-1">Maggi Noodles</h3>
                    <p className="text-nitebite-red font-semibold mb-3">Out of Stock</p>
                    <Button 
                      disabled
                      className="w-full rounded-full bg-gray-500 opacity-50 cursor-not-allowed"
                    >
                      <Plus size={18} />
                      Add
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right Column - Your Box Summary */}
            <motion.div 
              className="w-full lg:w-1/3 lg:sticky lg:top-24 self-start"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="glassmorphic-card rounded-xl p-6">
                <h2 className="text-2xl font-bold text-nitebite-purple mb-4">Your Custom Box</h2>
                
                {/* Items List */}
                <div className="min-h-40 mb-6">
                  {selectedItems.length === 0 ? (
                    <div className="text-center text-nitebite-text-muted py-10">
                      Your box is empty! Add snacks from the left.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedItems.map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-2 bg-nitebite-dark/30 rounded-lg">
                          <div className="w-12 h-12 bg-nitebite-dark/50 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={Array.isArray(item.image_url) ? item.image_url[0] : item.image_url} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-white text-sm">{item.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <button 
                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center bg-nitebite-dark/50 rounded-full"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-white">{item.quantity}</span>
                              <button 
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center bg-nitebite-dark/50 rounded-full"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-nitebite-yellow font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-nitebite-text-muted hover:text-nitebite-red"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Progress Indicator */}
                <div className="text-sm text-nitebite-text-muted mb-2">
                  Items: {selectedItems.reduce((total, item) => total + item.quantity, 0)}
                </div>
                
                {/* Subtotal */}
                <div className="text-xl font-bold text-white mb-6">
                  Subtotal: ₹{calculateSubtotal().toFixed(2)}
                </div>
                
                {/* CTA Button */}
                <Button 
                  onClick={addCustomBoxToCart}
                  disabled={selectedItems.length === 0}
                  className="w-full py-6 glassmorphic-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Custom Box to Cart
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <BackToTop />
      <Footer />
    </>
  );
};

export default BoxBuilder;
