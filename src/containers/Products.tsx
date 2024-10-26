import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSupabase } from "../supabase/SupabaseContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const supabase = useSupabase();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: products, error } = await supabase.from("test").select("*");

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        console.log("Fetched products:", products);
        // setProducts(products);
      }
    };

    // Fetch products from Supabase
    fetchProducts();
  }, []);

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
        <div className="flex w-full justify-between mt-[1rem]">
          {/* <div>
            {products.map((item) => (
              <div key={item.id}>{item.title}</div>
            ))}
          </div> */}
          <div className="w-80 h-96 bg-slate-300"></div>
          <div className="w-80 h-96 bg-blue-300"></div>
          <div className="w-80 h-96 bg-green-300"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
