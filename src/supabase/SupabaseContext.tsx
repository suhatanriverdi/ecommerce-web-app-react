import React, { createContext, useContext, ReactNode } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Create a context for Supabase client
const SupabaseContext = createContext<SupabaseClient | null>(null);

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Create a provider component
export const SupabaseProvider = (props: { children: ReactNode }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {props.children}
    </SupabaseContext.Provider>
  );
};

// Custom hook to use Supabase context
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
