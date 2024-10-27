import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
import { useSupabase } from "../supabase/SupabaseContext";
import Product from "../supabase/model/Product";
import ProductCard from "../components/ProductCard";
import useSWR from "swr";
import NotFound from "../pages/NotFound";
// import { sweatpants, tshirts, hoodies } from "../supabase/seed/sampleProducts";

// Define a fetcher function
const fetcher = async (supabase) => {
  const { data: products, error } = await supabase.from("products").select();
  if (error) {
    throw new Error(error.message);
  }

  return products;
};

export default function Products() {
  const supabase = useSupabase();

  // Use the SWR hook for data fetching
  const {
    data: products,
    error,
    isLoading,
  } = useSWR("products", () => fetcher(supabase));

  if (error) {
    return <NotFound />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // SAMPLE
  // const productCards = sweatpants.map((product, index) => {
  //   return <ProductCard key={`${product.category}-${index}`} {...product} />;
  // });

  console.log("products: ", products);

  // Build the cards
  const productCards = products.map((product: Product) => {
    return <ProductCard key={product.Id} {...product} />;
  });

  return (
    <AnimatePresence>
      <motion.div
        className="w-full max-w-[62rem] mt-[130px] flex flex-col items-center justify-center"
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 1000, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "anticipate",
        }}
      >
        <div className="flex justify-between w-full">
          <p>Erkek → Tüm Ürünler</p>
          <p>Sırala</p>
        </div>
        <div className="flex flex-wrap w-full gap-[1rem] mt-[1rem]">
          {productCards}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
