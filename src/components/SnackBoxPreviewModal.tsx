
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart } from 'lucide-react';

interface SnackBoxItem {
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  desc?: string;
}

interface SnackBoxData {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  items: SnackBoxItem[];
}

interface SnackBoxPreviewModalProps {
  box: SnackBoxData;
  onClose: () => void;
  onAddToCart: () => void;
}

const SnackBoxPreviewModal: React.FC<SnackBoxPreviewModalProps> = ({ box, onClose, onAddToCart }) => {
  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-nitebite-dark-accent w-full max-w-lg rounded-xl overflow-hidden shadow-2xl border border-white/10 max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header with Image */}
          <div className="relative">
            <img 
              src={box.image} 
              alt={box.name}
              className="w-full h-36 sm:h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nitebite-dark to-transparent"></div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-white bg-nitebite-dark/50 hover:bg-nitebite-dark/70 rounded-full"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Modal Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-grow">
            <h2 className="text-xl sm:text-2xl font-bold text-nitebite-purple mb-1">{box.name}</h2>
            <p className="text-nitebite-text-muted mb-4">{box.tagline}</p>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-nitebite-accent-light mb-3">What's Inside:</h3>
              <ul className="space-y-3">
                {box.items.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-nitebite-midnight/60 p-3 rounded-lg"
                  >
                    <div className="text-2xl bg-nitebite-dark-accent w-10 h-10 flex items-center justify-center rounded-md">
                      {item.image}
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{item.name}</p>
                      {item.desc && <p className="text-xs text-nitebite-text-muted">{item.desc}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-nitebite-highlight font-medium">₹{item.price}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col gap-1 mb-4 bg-nitebite-purple/10 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-nitebite-accent">Box Price:</span>
                <span className="text-nitebite-accent font-bold text-xl">₹{box.price.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <Button 
              className="w-full py-5 sm:py-6 bg-gradient-to-r from-nitebite-green to-teal-500 hover:opacity-90 text-white font-medium text-base sm:text-lg"
              onClick={onAddToCart}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Add to Cart
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SnackBoxPreviewModal;
