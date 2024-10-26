import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// Install & Initialize Supabase
import { supabase } from "../supabase/setup";

export default function Products() {
  // const fetchProducts = async () => {
  //   const { data, error } = await supabase.from("*").select();
  //   console.log("Data:", data, " Error: ", error);
  //   return error && data;
  // };

  // useEffect(() => {
  //   // Fetch products from Supabase
  //   fetchProducts();
  // });

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
        <div></div>
      </motion.div>
    </AnimatePresence>
  );
}
