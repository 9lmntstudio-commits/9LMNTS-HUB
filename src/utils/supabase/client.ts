import { createClient } from '@jsr/supabase__supabase-js';

const supabaseUrl = 'https://cnlwahugppuvakjqkvjy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNubHdhaHVncHB1dmFram12a3kiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc2NzAxNzU1NCwiZXhwIjoyMDgyNTkzNTU0fQ.ACTUAL_ANON_KEY_HERE';

// TODO: Replace with your actual anon key from Supabase dashboard
// Go to https://cnlwahugppuvakjqkvjy.supabase.co → Project Settings → API → copy anon key
// Replace "ACTUAL_ANON_KEY_HERE" with your real key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
