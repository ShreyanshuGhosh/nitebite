import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/components/ProductCard';

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
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponDiscount: 0,
      appliedCouponCode: null,
      
      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (existingItem) {
          return {
            items: state.items.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            )
          };
        }
        
        return {
          items: [...state.items, { ...product, quantity: 1 }]
        };
      }),
      
      updateItemQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(item => 
          item.id === productId 
            ? { ...item, quantity } 
            : item
        )
      })),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),
      
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
      })
    }),
    {
      name: 'nitebite-cart',
    }
  )
);