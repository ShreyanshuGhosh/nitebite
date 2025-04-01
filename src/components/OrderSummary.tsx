import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useCoupon } from '@/hooks/use-coupon';

const OrderSummary = () => {
  const { items, calculateSubtotal, updateCouponDiscount, couponDiscount } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();
  const { validateCoupon, isValidating } = useCoupon();

  const subtotal = calculateSubtotal();
  const freeDeliveryThreshold = 1000;
  const remainingForFreeDelivery = subtotal < freeDeliveryThreshold ? freeDeliveryThreshold - subtotal : 0;
  const deliveryFee = subtotal >= freeDeliveryThreshold ? 0 : 239.20;
  const convenienceFee = subtotal > 0 ? subtotal * 0.05 : 0;
  
  // Total before discount
  const totalBeforeDiscount = subtotal + deliveryFee + convenienceFee;
  // Total after applying the global coupon discount from the store
  const total = totalBeforeDiscount - couponDiscount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    const discountAmount = await validateCoupon(couponCode.trim(), subtotal);
    if (discountAmount !== null) {
      updateCouponDiscount(discountAmount);
      setCouponCode(''); // Clear the input after successful application
    }
  };

  const handleProceed = () => {
    if (items.length === 0) {
      toast.error("Your box is empty");
      return;
    }
    navigate('/order-details');
  };

  return (
    <div className="glassmorphic-card p-4 md:p-6 rounded-2xl sticky top-24 shadow-glow">
      <h2 className="text-xl font-medium text-nitebite-highlight mb-4">
        Order Summary
      </h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-nitebite-text">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-nitebite-text">
          <span>Delivery Fee</span>
          <span>{deliveryFee === 0 ? <span className="text-green-400">Free!</span> : `₹${deliveryFee.toFixed(2)}`}</span>
        </div>
        
        <div className="flex justify-between text-nitebite-text">
          <span>Convenience Fee</span>
          <span>₹{convenienceFee.toFixed(2)}</span>
        </div>

        {couponDiscount > 0 && (
          <div className="flex justify-between text-green-400">
            <span>Discount</span>
            <span>-₹{couponDiscount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="border-t border-white/10 my-2 pt-2"></div>
        
        <div className="flex justify-between font-medium text-nitebite-highlight">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      {subtotal < freeDeliveryThreshold && subtotal > 0 && (
        <p className="text-sm text-amber-300 text-center mb-4">
          Add just ₹{remainingForFreeDelivery.toFixed(2)} more for free delivery!
        </p>
      )}

      {/* Coupon Code Section */}
      <div className="mb-4">
        <div className="flex gap-2">
          <Input 
            type="text" 
            placeholder="Enter Coupon Code" 
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="bg-nitebite-dark-accent/50 border-white/10"
          />
          <Button 
            onClick={handleApplyCoupon}
            disabled={isValidating}
            className="glassmorphic-button text-white transition-all duration-300 shadow-glow whitespace-nowrap"
          >
            {isValidating ? 'Applying...' : 'Apply'}
          </Button>
        </div>
      </div>
      
      <Button 
        className="w-full glassmorphic-button text-white py-6 text-base rounded-full transition-all duration-300 flex items-center justify-center gap-2 group shadow-glow"
        onClick={handleProceed}
        disabled={isProcessing || items.length === 0}
      >
        {isProcessing ? 'Processing...' : 'Proceed to Order Details'}
        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
      
      {items.length > 0 && (
        <p className="text-xs text-nitebite-text-muted text-center mt-4">
          Your order will be delivered in approximately 10 minutes.
        </p>
      )}
    </div>
  );
};

export default OrderSummary;