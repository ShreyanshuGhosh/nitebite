import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

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