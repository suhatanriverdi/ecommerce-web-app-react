import { useSupabase } from "../supabase/SupabaseContext";
import Product from "../supabase/model/Product.ts";
import ProductCard from "../components/ProductCard";
import useSWR from "swr";
import NotFound from "../pages/NotFound";
import { fetcher } from "../supabase/utils/fetcher";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { useAtom } from "jotai";
import { productsAtom } from "../atoms/productsAtom";
import { sortQueryAtom } from "../atoms/sortQueryAtom";
import { categoryQueryAtom } from "../atoms/categoryQueryAtom";
import { scrollOffsetAtom } from "../atoms/scrollOffsetAtom";
import { genderQueryAtom } from "../atoms/genderQueryAtom.tsx";
import { hasMoreProductsAtom } from "../atoms/hasMoreProductsAtom.tsx";

export default function Products() {
  // Jotai State Management
  const [products, setProducts] = useAtom(productsAtom);

  // Use the SWR hook for data fetching
  const supabase = useSupabase();

  // Gender Query Atom
  const [genderQuery] = useAtom(genderQueryAtom);

  // Sort Query Atom
  const [sortQuery] = useAtom(sortQueryAtom);

  // Category Query Atom
  const [categoryQuery] = useAtom(categoryQueryAtom);

  // Scrolling
  const PAGE_COUNT = 15;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useAtom(scrollOffsetAtom);
  const [isInView, setIsInView] = useState(false);
  const [hasMoreProducts, setHasMoreProducts] = useAtom(hasMoreProductsAtom);

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

    return await fetcher(
      supabase,
      PAGE_COUNT,
      from,
      to,
      sortQuery,
      categoryQuery,
      genderQuery,
    );
  };

  const loadMoreProducts = async () => {
    setOffset((prev) => prev + 1);
    const newProducts = await fetchProducts();

    // Check if we hit the last page
    if (newProducts.length < PAGE_COUNT) {
      setHasMoreProducts(false);
    }

    // Merge new Products with all previously loaded
    setProducts((prevProducts) => [
      ...(prevProducts || []),
      ...(newProducts || []),
    ]);
  };

  // Infinite Scroll, to load more
  useEffect(() => {
    if (isInView && hasMoreProducts) {
      loadMoreProducts();
    }
  }, [isInView]);

  // Infinite Scroll Debounce
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
    [sortQuery, categoryQuery, genderQuery],

    // Fetcher Function
    () =>
      fetcher(
        supabase,
        PAGE_COUNT,
        null,
        null,
        sortQuery,
        categoryQuery,
        genderQuery,
      ),
    // Update the products atom right after SWR fetches
    {
      onSuccess: (data) => {
        setProducts(data);
      },
      revalidateOnFocus: false, // Disable window focus fetch
    },
  );

  // Loading state, this is needed otherwise will produce an error
  if (isLoading) {
    return (
      <div className="w-full max-w-[62rem] mt-[130px] flex flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <NotFound reason={"supabase"} />;
  }

  // Build the cards
  const productCards = products.map((product: Product) => {
    return <ProductCard key={product.id} product={product} />;
  });

  return (
    <div
      ref={containerRef}
      className="max-w-[62rem] grid grid-cols-[repeat(auto-fit,minmax(clamp(15rem,20%,20rem),1fr))] w-full gap-[1rem] mt-[1rem]"
    >
      {productCards}
    </div>
  );
}
