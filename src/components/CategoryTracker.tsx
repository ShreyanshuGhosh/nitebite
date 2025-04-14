
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryTrackerProps {
  selectedCategories: string[];
  className?: string;
  itemCount?: number;
  total?: number;
  onCheckout?: () => void;
  isCheckoutDisabled?: boolean;
}

const CategoryTracker: React.FC<CategoryTrackerProps> = ({ 
  selectedCategories, 
  className = "",
  itemCount = 0,
  total = 0,
  onCheckout,
  isCheckoutDisabled = true
}) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-16 left-0 right-0 z-30 bg-nitebite-midnight/95 backdrop-blur-md border-b border-white/10 px-4 py-3 ${className}`}
    >
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-nitebite-highlight font-medium">Your Custom Box</span>
              <span className="text-nitebite-accent">₹{total}</span>
            </div>
            <div className="text-sm text-nitebite-text-muted">
              {selectedCategories.length} of 2 required categories selected
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto glassmorphic-button text-sm py-2"
              onClick={onCheckout}
              disabled={isCheckoutDisabled}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add Box to Cart
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryTracker;
