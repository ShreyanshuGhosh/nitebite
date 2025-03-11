
import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';

const CheckoutItems = () => {
  const { items, updateItemQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="glassmorphic-card p-6 rounded-2xl text-center">
        <h3 className="text-xl font-medium text-nitebite-highlight mb-4">Your box is empty</h3>
        <p className="text-nitebite-text-muted mb-6">Add some items to get started!</p>
        <Button 
          className="glassmorphic-button text-white"
          onClick={() => window.location.href = '/'}
        >
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="glassmorphic-card p-4 md:p-6 rounded-2xl">
      <h2 className="text-xl font-medium text-nitebite-highlight mb-4">Your Order</h2>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 bg-nitebite-dark-accent/60 backdrop-blur-md rounded-xl">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-20 h-20 object-cover rounded-lg"
            />
            
            <div className="flex-1">
              <h3 className="font-medium text-nitebite-highlight">{item.name}</h3>
              <p className="text-nitebite-text-muted text-sm">${item.price.toFixed(2)} each</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8 bg-nitebite-dark text-nitebite-text hover:text-nitebite-highlight shadow-glow-sm"
                onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="text-nitebite-highlight font-medium w-6 text-center">
                {item.quantity}
              </span>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8 bg-nitebite-dark text-nitebite-text hover:text-nitebite-highlight shadow-glow-sm"
                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8 ml-2 text-nitebite-text-muted hover:text-nitebite-warning"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutItems;
