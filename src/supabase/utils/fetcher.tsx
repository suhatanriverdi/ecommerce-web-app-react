import { type SupabaseClient } from "@supabase/supabase-js";

// Define a fetcher function
export const fetcher = async (
  supabase: SupabaseClient,
  PAGE_COUNT: number,
  sortMode: string | null = null, // Default value as null
  category: string | null = null // Default value as null
) => {
  let query = supabase.from("products").select("*").limit(PAGE_COUNT);

  // If category query is given, filter by that single category
  if (category) {
    query = query.eq("category", category); // Use .eq() for a single category
  }

  // If sort query is given
  if (sortMode) {
    query = query.order("price", { ascending: sortMode === "asc" });
  }

  const { data: products, error } = await query;

  if (error) {
    throw new Error(error.message);
  }
  return products;
};
