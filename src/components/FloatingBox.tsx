
import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FloatingBox = () => {
  const { items, calculateSubtotal } = useCartStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = calculateSubtotal();

  useEffect(() => {
    // Only show floating box when there are items
    if (items.length > 0) {
      setIsVisible(true);
      
      // Track last added item for animation
      const newItem = items[items.length - 1]?.name;
      if (newItem) {
        setLastAddedItem(newItem);
        setTimeout(() => setLastAddedItem(null), 2000);
      }
    } else {
      setIsVisible(false);
      setIsExpanded(false);
    }
  }, [items]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 w-11/12 max-w-md"
      >
        <div className="glassmorphic-panel rounded-2xl shadow-glow overflow-hidden">
          <div 
            className="p-4 flex items-center justify-between cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag className="h-6 w-6 text-nitebite-highlight" />
                <span className="absolute -top-2 -right-2 bg-nitebite-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              </div>
              <div>
                <h3 className="text-nitebite-highlight font-medium">Your Box</h3>
                {lastAddedItem && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-nitebite-accent"
                  >
                    Added: {lastAddedItem}
                  </motion.p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <p className="text-nitebite-highlight font-medium">${subtotal.toFixed(2)}</p>
              <Button 
                className="glassmorphic-button py-2 px-4 rounded-lg text-sm"
                asChild
              >
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 pb-4 border-t border-white/10"
              >
                <div className="max-h-48 overflow-y-auto scrollbar-none space-y-2 pt-3">
                  {items.map((item) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between text-sm py-2"
                    >
                      <div className="flex items-center gap-2">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-8 h-8 object-cover rounded-md"
                        />
                        <span className="text-nitebite-text">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-nitebite-text-muted">x{item.quantity}</span>
                        <span className="text-nitebite-highlight">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Progress bar */}
                <div className="mt-4 bg-nitebite-dark-accent h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(subtotal / 20 * 100, 100)}%` }}
                    className="h-full bg-nitebite-accent rounded-full"
                  />
                </div>
                <p className="text-xs text-nitebite-text-muted mt-1 text-center">
                  {subtotal < 20 
                    ? `Add $${(20 - subtotal).toFixed(2)} more for free delivery!`
                    : 'You qualify for free delivery!'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingBox;
