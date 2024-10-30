import { type SupabaseClient } from "@supabase/supabase-js";

// Define a fetcher function
export const fetcher = async (supabase: SupabaseClient) => {
  const { data: products, error } = await supabase
    .from("products")
    .select()
    .limit(10);
  if (error) {
    throw new Error(error.message);
  }
  return products;
};
