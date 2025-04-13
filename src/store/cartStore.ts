
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
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  getItemCount: () => number;
  getTotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item: CartItem) => {
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
          set({ items: [...currentItems, { ...item, quantity: 1 }] });
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
      
      clearCart: () => {
        set({ items: [] });
        toast.info("Your box is now empty");
      },
      
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'nitebite-cart',
    }
  )
);
