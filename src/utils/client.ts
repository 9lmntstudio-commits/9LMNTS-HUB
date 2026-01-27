import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vfrxxfviaykafzbxpehw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY'; // Replace YOUR_ANON_KEY with your actual Supabase Anon Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
