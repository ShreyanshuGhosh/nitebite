
import { create } from 'zustand';
import { persist } from './persist';
import { toast } from 'sonner';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  quantity: number;
  image_url: string;
  image?: string; // Adding image field to match usage in components
  category?: string;
  category_id?: string;
  description?: string;
  stock_quantity?: number;
};

type CartStore = {
  items: CartItem[];
  couponDiscount: number;
  couponCode: string | null;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItemQuantity: (id: string, quantity: number) => void; // Alias for updateQuantity
  getItemCount: () => number;
  getTotal: () => number;
  calculateSubtotal: () => number; // Alias for getTotal
  updateCouponDiscount: (amount: number, code: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist((set, get) => ({
    items: [],
    couponDiscount: 0,
    couponCode: null,
    
    addItem: (item) => {
      const currentItems = get().items;
      const existingItem = currentItems.find(i => i.id === item.id);
      
      if (existingItem) {
        set({
          items: currentItems.map(i => 
            i.id === item.id 
              ? { ...i, quantity: i.quantity + 1 } 
              : i
          )
        });
        toast.success(`Added another ${item.name} to your box!`);
      } else {
        set({ 
          items: [...currentItems, { 
            ...item, 
            quantity: item.quantity || 1,
            image: item.image || (Array.isArray(item.image_url) ? item.image_url[0] : item.image_url)
          }] 
        });
        toast.success(`${item.name} added to your box!`);
      }
    },
    
    removeItem: (id: string) => {
      const currentItems = get().items;
      const itemToRemove = currentItems.find(i => i.id === id);
      
      if (itemToRemove) {
        set({ items: currentItems.filter(i => i.id !== id) });
        toast.info(`${itemToRemove.name} removed from your box`);
      }
    },
    
    updateQuantity: (id: string, quantity: number) => {
      const currentItems = get().items;
      
      if (quantity <= 0) {
        const itemToRemove = currentItems.find(i => i.id === id);
        if (itemToRemove) {
          set({ items: currentItems.filter(i => i.id !== id) });
          toast.info(`${itemToRemove.name} removed from your box`);
        }
      } else {
        set({
          items: currentItems.map(i => 
            i.id === id ? { ...i, quantity } : i
          )
        });
      }
    },
    
    // Alias for updateQuantity to match component usage
    updateItemQuantity: (id: string, quantity: number) => {
      get().updateQuantity(id, quantity);
    },
    
    clearCart: () => {
      set({ items: [] });
      toast.info("Your box is now empty");
    },
    
    getItemCount: () => {
      return get().items.reduce((total, item) => total + item.quantity, 0);
    },
    
    getTotal: () => {
      return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    // Alias for getTotal to match component usage
    calculateSubtotal: () => {
      return get().getTotal();
    },
    
    // Add coupon discount functionality
    updateCouponDiscount: (amount: number, code: string) => {
      set({ 
        couponDiscount: amount,
        couponCode: code
      });
    }
  }), {
    name: 'nitebite-cart',
  })
);
