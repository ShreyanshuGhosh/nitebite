
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

const OrderSummary = () => {
  const { items, calculateSubtotal, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const subtotal = calculateSubtotal();
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const serviceFee = subtotal > 0 ? subtotal * 0.05 : 0;
  const total = subtotal + deliveryFee + serviceFee;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your box is empty");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Order placed successfully!");
      clearCart();
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="glassmorphic-card p-4 md:p-6 rounded-2xl sticky top-24 shadow-glow">
      <h2 className="text-xl font-medium text-nitebite-highlight mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-nitebite-text">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-nitebite-text">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-nitebite-text">
          <span>Service Fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-white/10 my-2 pt-2"></div>
        
        <div className="flex justify-between font-medium text-nitebite-highlight">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <Button 
        className="w-full glassmorphic-button text-white py-6 text-base rounded-full transition-all duration-300 flex items-center justify-center gap-2 group shadow-glow"
        onClick={handleCheckout}
        disabled={isProcessing || items.length === 0}
      >
        {isProcessing ? 'Processing...' : 'Proceed to Payment'}
        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
      
      {items.length > 0 && (
        <p className="text-xs text-nitebite-text-muted text-center mt-4">
          Your order will be delivered in approximately 10 minutes
        </p>
      )}
    </div>
  );
};

export default OrderSummary;
