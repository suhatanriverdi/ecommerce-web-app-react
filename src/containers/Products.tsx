import { motion, AnimatePresence } from "framer-motion";
import { useSupabase } from "../supabase/SupabaseContext";
import Product from "../supabase/model/Product";
import ProductCard from "../components/ProductCard";
import useSWR from "swr";
import NotFound from "../pages/NotFound";
import { fetcher } from "../supabase/utils/fetcher";
import { useRef, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useAtom } from "jotai";
import { productsAtom } from "./productsAtom";

export default function Products() {
  // Jotai State Management
  const [products, setProducts] = useAtom(productsAtom);

  // Use the SWR hook for data fetching
  const supabase = useSupabase();

  // Scrolling
  const PAGE_COUNT = 15;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(1);
  const [isInView, setIsInView] = useState(false);

  const handleScroll = () => {
    if (containerRef.current && typeof window !== "undefined") {
      const container = containerRef.current;
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      setIsInView((prevIsInView) => bottom <= innerHeight);
    }
  };

  const fetchProducts = async (offset: number) => {
    const from = offset * PAGE_COUNT;
    const to = from + PAGE_COUNT - 1;

    const { data } = await supabase
      .from("products")
      .select("*")
      .range(from, to);

    return data;
  };

  const loadMoreProducts = async (offset: number) => {
    // Every time we fetch, we want to increase
    // the offset to load fresh Products
    setOffset((prev) => prev + 1);
    const newProducts = await fetchProducts(offset);
    // Merge new Products with all previously loaded
    setProducts((prevProducts) => [
      ...(prevProducts || []),
      ...(newProducts || []),
    ]);
  };

  // Infinite Scroll, to load more
  useEffect(() => {
    if (isInView) {
      loadMoreProducts(offset);
    }
  }, [isInView]);

  // Infinite Scroll
  useEffect(() => {
    const handleDebouncedScroll = debounce(() => handleScroll(), 200);
    window.addEventListener("scroll", handleDebouncedScroll);
    return () => {
      window.removeEventListener("scroll", handleDebouncedScroll);
    };
  }, []);

  const { data, error, isLoading } = useSWR("products", () =>
    fetcher(supabase, PAGE_COUNT)
  );

  // Update the products atom right after SWR fetches
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  // TODO
  // Loading state, this is needed otherwise will produce an error
  if (isLoading) {
    return (
      <div className="w-full max-w-[62rem] mt-[130px] flex flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  // TODO
  if (error) {
    return <NotFound reason={"supabase"} />;
  }

  // Build the cards
  const productCards = products!.map((product: Product) => {
    return <ProductCard key={product.Id} {...product} />;
  });

  return (
    <AnimatePresence>
      <motion.div
        className="w-full max-w-[62rem] flex flex-col items-center justify-center"
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 1000, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "anticipate",
        }}
      >
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] w-full gap-[1rem] mt-[1rem]"
        >
          {productCards}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
