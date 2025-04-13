
import { supabase } from '@/supabaseClient';

export { supabase };

export type Order = {
  id: string;
  user_id: string;
  amount: number;
  items: CartItem[];
  phone_number: string;
  hostel_number: string;
  room_number: string;
  payment_method: 'cod' | 'qr';
  payment_status: 'pending' | 'paid';
  created_at: string;
  updated_at: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type UserProfile = {
  id: string;
  user_id: string;
  full_name: string;
  phone_number: string;
  email: string;
  created_at: string;
  updated_at: string;
};
