
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Use the direct Supabase URL and anon key
const supabaseUrl: string = "https://puckwihzpprgpgepusmz.supabase.co";
const supabaseAnonKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1Y2t3aWh6cHByZ3BnZXB1c216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjA2NTcsImV4cCI6MjA1NzQzNjY1N30.q4sr8i5kKQ-UhbtVb3g-jWsbna5De1leikqdP9frx_0";

// Explicitly define Supabase client type
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
