import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSupabase } from "../supabase/SupabaseContext";
import Product from "../supabase/model/Product";
import ProductCard from "../components/ProductCard";

import { sweatpants, tshirts, hoodies } from "../supabase/seed/sampleProducts";

export default function Products() {
  const supabase = useSupabase();
  const [products, setProducts] = useState<Product[]>([]);

  const productCards = sweatpants.map((product) => {
    return <ProductCard key={product.color} {...product} />;
  });

  // const productCards = products.map((product) => {
  //   return <ProductCard key={product.Id} {...product} />;
  // });

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data: products, error } = await supabase
  //       .from("products")
  //       .select();

  //     if (error) {
  //       console.error("Error fetching products:", error);
  //     } else {
  //       // TODO
  //       console.log("Fetched products:", products);
  //       setProducts(products);
  //     }
  //   };

  // Fetch products from Supabase
  // fetchProducts();
  // }, []);

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
