
import { create } from 'zustand';
import { persist } from './persist';
import { toast } from 'sonner';
import { Product } from '@/components/ProductCard';
import { supabase } from '@/supabaseClient';

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  couponDiscount: number;
  appliedCouponCode: string | null;
  addItem: (product: Product) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  calculateSubtotal: () => number;
  getItemCount: () => number;
  updateCouponDiscount: (amount: number, code: string) => void;
  validateAndUpdateCoupon: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  (set, get) => {
    const initialState = {
      items: [],
      couponDiscount: 0,
      appliedCouponCode: null,
    };

    return persist<CartStore>({
      name: 'nitebite-cart',
      partialize: (state) => ({
        items: state.items,
        couponDiscount: state.couponDiscount,
        appliedCouponCode: state.appliedCouponCode,
      }),
    })(set, get, {
      ...initialState,
      
      addItem: async (product) => {
        // Check stock availability first
        const { data: currentProduct } = await supabase
          .from('products')
          .select('stock_quantity')
          .eq('id', product.id)
          .single();

        if (!currentProduct || currentProduct.stock_quantity <= 0) {
          toast.error('Sorry, this item is out of stock');
          return;
        }

        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            // Check if adding one more would exceed stock
            if (existingItem.quantity >= currentProduct.stock_quantity) {
              toast.error('Cannot add more - not enough stock available');
              return state;
            }

            const newState = {
              items: state.items.map(item => 
                item.id === product.id 
                  ? { ...item, quantity: item.quantity + 1 } 
                  : item
              )
            };
            // Validate coupon after adding item
            get().validateAndUpdateCoupon();
            return newState;
          }
          
          const newState = {
            items: [...state.items, { ...product, quantity: 1 }]
          };
          // Validate coupon after adding item
          get().validateAndUpdateCoupon();
          return newState;
        });
      },
      
      updateItemQuantity: async (productId, quantity) => {
        // Check stock availability first
        const { data: currentProduct } = await supabase
          .from('products')
          .select('stock_quantity')
          .eq('id', productId)
          .single();

        if (!currentProduct || quantity > currentProduct.stock_quantity) {
          toast.error('Cannot update quantity - not enough stock available');
          return;
        }

        set((state) => {
          const newState = {
            items: state.items.map(item => 
              item.id === productId 
                ? { ...item, quantity } 
                : item
            )
          };
          // Validate coupon after updating quantity
          get().validateAndUpdateCoupon();
          return newState;
        });
      },
      
      removeItem: (productId) => {
        set((state) => {
          const newState = {
            items: state.items.filter(item => item.id !== productId)
          };
          // Validate coupon after removing item
          get().validateAndUpdateCoupon();
          return newState;
        });
      },
      
      clearCart: () => set({ 
        items: [], 
        couponDiscount: 0,
        appliedCouponCode: null 
      }),
      
      calculateSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      updateCouponDiscount: (amount, code) => set({ 
        couponDiscount: amount,
        appliedCouponCode: code
      }),

      validateAndUpdateCoupon: async () => {
        const { calculateSubtotal, appliedCouponCode } = get();
        
        // If no coupon is applied, nothing to validate
        if (!appliedCouponCode) return;

        const subtotal = calculateSubtotal();

        try {
          // Get the coupon details from Supabase
          const { data: couponData, error } = await supabase
            .from('coupons')
            .select('min_order_amount')
            .eq('code', appliedCouponCode)
            .single();

          if (error) throw error;

          // If subtotal is less than minimum order amount, remove the coupon
          if (subtotal < couponData.min_order_amount) {
            set({ 
              couponDiscount: 0,
              appliedCouponCode: null 
            });
          }
        } catch (error) {
          console.error('Error validating coupon:', error);
          // In case of error, remove the coupon to be safe
          set({ 
            couponDiscount: 0,
            appliedCouponCode: null 
          });
        }
      }
    });
  }
);
