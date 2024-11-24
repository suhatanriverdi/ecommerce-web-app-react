import { motion, AnimatePresence } from "framer-motion";
import { useSupabase } from "../supabase/SupabaseContext";
import Product from "../supabase/model/Product.ts";
import ProductCard from "../components/ProductCard";
import useSWR from "swr";
import NotFound from "../pages/NotFound";
import { fetcher } from "../supabase/utils/fetcher";
import { useRef, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useAtom } from "jotai";
import { productsAtom } from "../atoms/productsAtom";
import { sortQueryAtom } from "../atoms/sortQueryAtom";
import { categoryQueryAtom } from "../atoms/categoryQueryAtom";
import { scrollOffsetAtom } from "../atoms/scrollOffsetAtom";

export default function Products() {
  // Jotai State Management
  const [products, setProducts] = useAtom(productsAtom);

  // Use the SWR hook for data fetching
  const supabase = useSupabase();

  // Sort Query Atom
  const [sortQuery] = useAtom(sortQueryAtom);

  // Category Query Atom
  const [categoryQuery] = useAtom(categoryQueryAtom);

  // Scrolling
  const PAGE_COUNT = 15;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useAtom(scrollOffsetAtom);
  const [isInView, setIsInView] = useState(false);

  const handleScroll = () => {
    if (containerRef.current && typeof window !== "undefined") {
      const container = containerRef.current;
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      setIsInView(() => bottom <= innerHeight);
    }
  };

  const fetchProducts = async () => {
    const from = offset * PAGE_COUNT;
    const to = from + PAGE_COUNT - 1;

    // console.log("offset: ", offset, "f from: ", from, "to: ", to);

    const data = await fetcher(
      supabase,
      PAGE_COUNT,
      from,
      to,
      sortQuery,
      categoryQuery,
    );

    return data;
  };

  const loadMoreProducts = async () => {
    // Every time we fetch, we want to increase
    // the offset to load fresh Products
    // TODO, RESET THIS AFTER SORT or QUERY CATEGORY
    setOffset((prev) => prev + 1);
    const newProducts = await fetchProducts();
    // Merge new Products with all previously loaded
    setProducts((prevProducts) => [
      ...(prevProducts || []),
      ...(newProducts || []),
    ]);
  };

  // Infinite Scroll, to load more
  useEffect(() => {
    if (isInView) {
      loadMoreProducts();
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

  // Fetches data based on given queries
  const { error, isLoading } = useSWR(
    // Whenever sortQuery changes, re-fetch
    [sortQuery, categoryQuery],

    // Fetcher Function
    () => fetcher(supabase, PAGE_COUNT, null, null, sortQuery, categoryQuery),
    // Update the products atom right after SWR fetches
    {
      onSuccess: (data) => {
        setProducts(data);
      },
    },
  );

  // TODO
  // console.log(products);

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
