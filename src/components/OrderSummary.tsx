
import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useCoupon } from '@/hooks/use-coupon';

const OrderSummary = () => {
  // We need to access the store without creating a selector function inside the component
  // This is critical to avoid infinite re-renders
  const items = useCartStore(state => state.items);
  const calculateSubtotal = useCartStore(state => state.calculateSubtotal);
  const updateCouponDiscount = useCartStore(state => state.updateCouponDiscount);
  const couponDiscount = useCartStore(state => state.couponDiscount);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();
  const { validateCoupon, isValidating } = useCoupon();

  // Memoize calculated values to prevent recalculation on each render
  const {
    subtotal,
    freeDeliveryThreshold,
    remainingForFreeDelivery,
    deliveryFee,
    convenienceFee,
    totalBeforeDiscount,
    total
  } = useMemo(() => {
    const calculatedSubtotal = calculateSubtotal();
    const threshold = 149;
    const remaining = calculatedSubtotal < threshold ? threshold - calculatedSubtotal : 0;
    const delivery = calculatedSubtotal >= threshold ? 0 : 10;
    const convenience = calculatedSubtotal > 0 ? 6 : 0;
    const beforeDiscount = calculatedSubtotal + delivery + convenience;
    const afterDiscount = beforeDiscount - couponDiscount;
    
    return {
      subtotal: calculatedSubtotal,
      freeDeliveryThreshold: threshold,
      remainingForFreeDelivery: remaining,
      deliveryFee: delivery,
      convenienceFee: convenience,
      totalBeforeDiscount: beforeDiscount,
      total: afterDiscount
    };
  }, [calculateSubtotal, couponDiscount]);

  const handleApplyCoupon = useCallback(async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    const discountAmount = await validateCoupon(couponCode.trim(), subtotal);
    if (discountAmount !== null && typeof discountAmount === 'number') {
      updateCouponDiscount(discountAmount, couponCode);
      setCouponCode(''); // Clear the input after successful application
    }
  }, [couponCode, validateCoupon, subtotal, updateCouponDiscount]);

  const handleProceed = useCallback(() => {
    if (items.length === 0) {
      toast.error("Your box is empty");
      return;
    }
    navigate('/order-details');
  }, [items.length, navigate]);

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
          <span>{deliveryFee === 0 ? (
            <span className="text-green-400">Free!</span>
          ) : (
            `₹${deliveryFee.toFixed(2)}`
          )}</span>
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
          Your order will be delivered in minutes.
        </p>
      )}
    </div>
  );
};

export default OrderSummary;
