import { type SupabaseClient } from "@supabase/supabase-js";

// Define a fetcher function
export const fetcher = async (
  supabase: SupabaseClient,
  PAGE_COUNT: number,
  from: number | null = null,
  to: number | null = null,
  sortMode: string | null = null, // Default value as null
  categoryQuery: string | null = null, // Default value as null
) => {
  let query = supabase.from("products").select("*").limit(PAGE_COUNT);

  // If this is an infinite scroll type of fetch
  if (from !== null && to !== null) {
    query = query.range(from, to);
  }

  // console.log("query: ", query);

  // If category query is given, filter by that single category
  if (categoryQuery) {
    query = query.eq("category", categoryQuery);
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
