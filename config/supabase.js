import "react-native-url-polyfill";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Substitua estas URLs pelas suas do projeto Supabase
const supabaseUrl = "https://rwzfyrxyvjcekufvhbkv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3emZ5cnh5dmpjZWt1ZnZoYmt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NTg3MTAsImV4cCI6MjA2MzUzNDcxMH0.k7qEV6M_NYdz57WCziGSCJAYO3hCNZaGySAAWbJ9Zqw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
