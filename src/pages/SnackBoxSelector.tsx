import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import NewNavbar from '@/components/NewNavbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { ArrowLeft, Eye, ShoppingCart, ChefHat } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import FloatingBox from '@/components/FloatingBox';
import SnackBoxPreviewModal from '@/components/SnackBoxPreviewModal';

// Sample data for snack boxes
const snackBoxes = [
  {
    id: 'midnight-munchies',
    name: 'Midnight Munchies',
    tagline: 'Sweet, salty & satisfying essentials.',
    price: 169,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    highlights: ['🍕', '🥤', '🍫'],
    items: [
      { name: 'Monster Ultra Energy Drink', image: '🥤', price: 121, originalPrice: 121, desc: 'Refreshing energy boost' },
      { name: 'Haldiram Bhujiya', image: '🥨', price: 52, originalPrice: 52, desc: 'Crunchy savory snack' },
      { name: 'Kurkure Chilli Chatka', image: '🌶️', price: 20, originalPrice: 20, desc: 'Spicy corn puffs' }
    ]
  },
  {
    id: 'study-fuel',
    name: 'Study Fuel Pack',
    tagline: 'Brain food for late nights.',
    price: 169,
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    highlights: ['☕', '🍪', '🥜'],
    items: [
      { name: 'Monster Energy Drink', image: '🥤', price: 115, originalPrice: 115, desc: 'Caffeine boost to keep you alert' },
      { name: 'Dark Fantasy Yumfills Pie (3 pieces)', image: '🍪', price: 33, originalPrice: 33, desc: 'Sweet chocolate-filled cookies' },
      { name: 'Kurkure Chilli Chatka', image: '🌶️', price: 20, originalPrice: 20, desc: 'Spicy corn puffs' },
      { name: 'Too Yumm Chilli Achari', image: '🥨', price: 18, originalPrice: 18, desc: 'Tangy baked snack' }
    ]
  },
  {
    id: 'healthy-choices',
    name: 'Healthy Choices',
    tagline: 'Guilt-free(ish) snack options.',
    price: 169,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    highlights: ['🥗', '🥤', '🍎'],
    items: [
      { name: 'Yogabar Multigrain Energy Bar (Pack of 2)', image: '🥜', price: 69, originalPrice: 69, desc: 'Nutritious energy bar' },
      { name: 'Dark Fantasy (Pack of 5)', image: '🍪', price: 35, originalPrice: 35, desc: 'Chocolate-filled cookies' },
      { name: 'Kitkat', image: '🍫', price: 35, originalPrice: 35, desc: 'Crispy wafer chocolate' },
      { name: 'Bikaji Soya Sticks Masala Munch', image: '🥢', price: 50, originalPrice: 50, desc: 'Protein-rich savory snack' }
    ]
  },
  {
    id: 'chakna-box',
    name: 'Hostel Hangout Pack',
    tagline: 'Perfect for sharing with friends.',
    price: 139,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    highlights: ['🌶️', '🥨', '🧀'],
    items: [
      { name: 'Haldiram Aloo Bhujia', image: '🥨', price: 52, originalPrice: 52, desc: 'Potato-based savory snack' },
      { name: 'Bikaji Chowpati Bhelpuri', image: '🍲', price: 35, originalPrice: 35, desc: 'Tangy puffed rice mix' },
      { name: 'Kurkure Chilli Chatka', image: '🌶️', price: 20, originalPrice: 20, desc: 'Spicy corn puffs' },
      { name: 'Lays Chips', image: '🥔', price: 19, originalPrice: 19, desc: 'Classic potato chips' },
      { name: 'Dark Fantasy Yumfills Pie', image: '🍪', price: 33, originalPrice: 33, desc: 'Chocolate-filled cookies' }
    ]
  }
];

const SnackBoxSelector = () => {
  const { addItem } = useCartStore();
  const [selectedBox, setSelectedBox] = useState<(typeof snackBoxes)[0] | null>(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const handleAddToCart = (box: typeof snackBoxes[0]) => {
    addItem({
      id: box.id,
      name: box.name,
      price: box.price,
      image_url: box.image,
      image: box.image,
      description: box.tagline
    });
    toast.success(`${box.name} added to your box!`, { duration: 3000 });
  };

  const openPreviewModal = (box: typeof snackBoxes[0]) => {
    setSelectedBox(box);
  };

  return (
    <>
      <NewNavbar transparent={false} />
      <div className="min-h-screen bg-nitebite-midnight pt-20 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Back Button - Updated for consistency */}
          <Link to="/" className="inline-flex items-center gap-2 text-nitebite-text-muted hover:text-nitebite-purple transition-colors mb-6 glassmorphic-ghost-button py-2 px-4 rounded-full">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nitebite-accent-light bg-clip-text text-transparent bg-gradient-to-r from-nitebite-purple to-nitebite-accent">
              Find Your Perfect Snack Box
            </h1>
            <p className="mt-3 text-nitebite-text-muted text-lg">
              Curated boxes for every late-night scenario
            </p>
          </motion.div>
          
          {/* NEW: Custom Box Builder CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 p-4 md:p-6 rounded-xl border border-nitebite-purple/30 bg-nitebite-dark-accent/40 shadow-glow-sm"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-nitebite-highlight mb-2">Didn't like the Snack Boxes?</h3>
                <p className="text-nitebite-text-muted">Create your own perfect combination with our custom box builder</p>
              </div>
              <Button 
                className="glassmorphic-button px-6 py-6 text-base whitespace-nowrap flex items-center gap-2"
                asChild
              >
                <Link to="/box-builder">
                  <ChefHat className="w-5 h-5" /> Prepare Your Own Box
                </Link>
              </Button>
            </div>
          </motion.div>
          
          {/* Snack Box Cards Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {snackBoxes.map((box) => (
              <motion.div 
                key={box.id}
                variants={itemVariants}
                className="flex"
              >
                <Card className="overflow-hidden bg-nitebite-dark-accent/50 border border-white/10 hover:border-white/20 rounded-xl shadow-lg flex flex-col w-full">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={box.image} 
                      alt={box.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-nitebite-dark/50"></div>
                  </div>
                  
                  {/* Content */}
                  <CardContent className="pt-4 pb-2 flex-grow">
                    <h2 className="text-xl md:text-2xl font-bold text-nitebite-purple mb-1">{box.name}</h2>
                    <p className="text-nitebite-text-muted mb-4">{box.tagline}</p>
                    
                    {/* Highlights */}
                    <div className="flex items-center gap-3 mb-4">
                      {box.highlights.map((icon, index) => (
                        <span key={index} className="text-2xl">{icon}</span>
                      ))}
                    </div>
                    
                    {/* Calculate total value */}
                    <div className="mb-3">
                      <div className="text-xs text-nitebite-text-muted flex justify-between">
                        <span>Total Value:</span>
                        <span className="line-through">
                          ₹{box.items.reduce((total, item) => total + item.originalPrice, 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-nitebite-accent flex justify-between items-center">
                        <span>Box Price:</span>
                        <span>₹{box.price.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-green-500 text-right">
                        Save {Math.round(((box.items.reduce((total, item) => total + item.originalPrice, 0) - box.price) / box.items.reduce((total, item) => total + item.originalPrice, 0)) * 100)}%
                      </div>
                    </div>
                  </CardContent>
                  
                  {/* Buttons */}
                  <CardFooter className="pt-2 pb-4 flex flex-col gap-2">
                    <Button 
                      className="w-full py-5 bg-gradient-to-r from-nitebite-green to-teal-500 hover:opacity-90 text-white"
                      onClick={() => handleAddToCart(box)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-white/20 text-white hover:bg-white/10"
                      onClick={() => openPreviewModal(box)}
                    >
                      <Eye className="w-4 h-4 mr-2" /> What's Inside?
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Preview Modal */}
      {selectedBox && (
        <SnackBoxPreviewModal 
          box={selectedBox} 
          onClose={() => setSelectedBox(null)} 
          onAddToCart={() => {
            handleAddToCart(selectedBox);
            setSelectedBox(null);
          }}
        />
      )}
      
      <FloatingBox />
      <BackToTop />
      <Footer />
    </>
  );
};

export default SnackBoxSelector;
