import { type SupabaseClient } from "@supabase/supabase-js";

// Define a fetcher function
export const fetcher = async (supabase: SupabaseClient, PAGE_COUNT: number) => {
  const { data: products, error } = await supabase
    .from("products")
    .select()
    .limit(PAGE_COUNT);
  if (error) {
    throw new Error(error.message);
  }
  return products;
};
