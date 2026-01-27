import { createClient } from '@jsr/supabase__supabase-js';

const supabaseUrl = 'https://cnlwahugppuvakjqkvjy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNubHdhaHVncHB1dmFranFrdmp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NzUyNjksImV4cCI6MjA4NDI1MTI2OX0.dalAGA1QkeovGTq_umcf45YypTuJL5sWlwb6IlXb9zc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
