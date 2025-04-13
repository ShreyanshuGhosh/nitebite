
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://puckwihzpprgpgepusmz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1Y2t3aWh6cHByZ3BnZXB1c216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MjM0ODMsImV4cCI6MjAyODQ5OTQ4M30.aPemcVPXKk-FvEe8Q5eJeA5CU4g_uZkHrwZOODLXl3g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
