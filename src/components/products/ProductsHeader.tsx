
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';

const ProductsHeader: React.FC = () => {
  const navigate = useNavigate();
  const itemCount = useCartStore(state => state.getItemCount());

  return (
    <header className="sticky top-0 z-50 glassmorphic-panel px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="glassmorphic-ghost-button rounded-full"
            onClick={() => navigate('/')}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">Delivery in 11 minutes</h1>
            <p className="text-xs text-nitebite-text-muted flex items-center">
              Your location <span className="ml-1">▼</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="glassmorphic-ghost-button rounded-full"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="glassmorphic-ghost-button rounded-full relative"
            onClick={() => navigate('/checkout')}
            aria-label="Go to cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-nitebite-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ProductsHeader;
