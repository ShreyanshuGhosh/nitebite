import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface ValidateCouponResponse {
  is_valid: boolean;
  message: string;
  discount_amount: number;
}

export function useCoupon() {
  const [isValidating, setIsValidating] = useState(false);

  const validateCoupon = async (code: string, orderAmount: number) => {
    setIsValidating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to use coupons');
        return null;
      }

      const { data, error } = await supabase.rpc('validate_and_apply_coupon', {
        p_coupon_code: code,
        p_user_id: user.id,
        p_order_amount: orderAmount
      });

      if (error) {
        toast.error('Error validating coupon');
        return null;
      }

      const response = data[0] as ValidateCouponResponse;
      
      if (!response.is_valid) {
        toast.error(response.message);
        return null;
      }

      toast.success(response.message);
      return response.discount_amount;

    } catch (error) {
      console.error('Error validating coupon:', error);
      toast.error('Failed to validate coupon');
      return null;
    } finally {
      setIsValidating(false);
    }
  };

  return {
    validateCoupon,
    isValidating
  };
}