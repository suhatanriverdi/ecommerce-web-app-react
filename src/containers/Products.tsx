import { motion, AnimatePresence } from "framer-motion";
import { useSupabase } from "../supabase/SupabaseContext";
import Product from "../supabase/model/Product";
import ProductCard from "../components/ProductCard";
import useSWR from "swr";
import NotFound from "../pages/NotFound";
import { fetcher } from "../supabase/utils/fetcher";

export default function Products() {
  // Use the SWR hook for data fetching
  const supabase = useSupabase();
  const {
    data: products,
    error,
    isLoading,
  } = useSWR("products", () => fetcher(supabase));

  // TODO
  if (error) {
    return <NotFound />;
  }

  // TODO
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Build the cards
  const productCards = products!.map((product: Product) => {
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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] w-full gap-[1rem] mt-[1rem]">
          {productCards}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
