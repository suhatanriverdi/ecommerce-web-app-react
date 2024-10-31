import { type SupabaseClient } from "@supabase/supabase-js";

// Define a fetcher function
export const fetcher = async (
  supabase: SupabaseClient,
  PAGE_COUNT: number,
  sortOrder: string | null = null // Default value as null
) => {
  let query = supabase.from("products").select("*").limit(PAGE_COUNT);

  // If sort query is given
  if (sortOrder) {
    query = query.order("price", { ascending: sortOrder === "asc" });
  }

  const { data: products, error } = await query;

  if (error) {
    throw new Error(error.message);
  }
  return products;
};
