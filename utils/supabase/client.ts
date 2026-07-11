import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase env vars (VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY).');
}

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!client) {
    client = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');
  }
  return client;
}

export const supabase = getSupabaseClient();
