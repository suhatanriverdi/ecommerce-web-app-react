import { type SupabaseClient } from "@supabase/supabase-js";

// Define a fetcher function
export const fetcher = async (
  supabase: SupabaseClient,
  PAGE_COUNT: number,
  from: number | null = null,
  to: number | null = null,
  sortMode: string | null = null,
  categoryQuery: string | null = null,
  genderQuery: string | null, // Default value as null
) => {
  let query = supabase.from("products").select("*").limit(PAGE_COUNT);

  // If this is an infinite scroll type of fetch
  if (from !== null && to !== null) {
    query = query.range(from, to);
  }

  // If gender query is given
  if (genderQuery) {
    query = query.eq("gender", genderQuery);
  }

  // If category query is given, filter by that single category
  if (categoryQuery) {
    query = query.eq("category", categoryQuery);
  }

  // If sort query is given
  if (sortMode) {
    query = query.order("price", { ascending: sortMode === "asc" });
  }

  // console.log("genderQuery: ", genderQuery);
  // console.log("query: ", query);

  const { data: products, error } = await query;

  // console.log(products);

  if (error) {
    throw new Error(error.message);
  }

  return products;
};
