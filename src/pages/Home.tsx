import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import Products from "../containers/Products";

// Navigation Bar
import NavBar from "../components/NavBar";
import CategoriesSortNavBar from "../components/CategoriesSortNavBar";
import { useAtom } from "jotai/index";
import { genderQueryAtom } from "../atoms/genderQueryAtom.tsx";
import { useEffect } from "react";
import ProductDetails from "../containers/ProductDetails";
import { productDetailsWindowAtom } from "../atoms/productDetailsWindowAtom.tsx";

export default function Home() {
  const { gender } = useParams();
  const [, setGenderQuery] = useAtom(genderQueryAtom);
  const [isProductDetailsWindowOpened] = useAtom(productDetailsWindowAtom);

  // Update the genderQuery
  useEffect(() => {
    setGenderQuery(gender ?? null);
  }, [gender, setGenderQuery]);

  return (
    <AnimatePresence>
      {/* Fixed Navigation Component */}
      <motion.div
        key="mot-1"
        className="z-50 text-lg fixed -top-[1px] bg-white px-[2rem] pb-[1rem] w-full flex flex-col items-center justify-center text-justify"
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 1000, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "anticipate",
        }}
      >
        <NavBar />
      </motion.div>

      {/* Sticky Header for Products */}
      <motion.div
        key="mot-2"
        className="sticky top-[59px] backdrop-blur-md bg-white bg-opacity-75 px-[2rem] mt-[120px] pb-[1rem] z-10 w-full flex flex-col items-center justify-center text-justify"
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 1000, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "anticipate",
        }}
      >
        {/* Navigation Bar for Categories & Sorting */}
        <CategoriesSortNavBar />
      </motion.div>

      {/* Main Content Container */}
      <div className="w-full flex flex-col px-[2rem] items-center justify-center bg-white bg-opacity-100 mb-[8rem]">
        {!isProductDetailsWindowOpened && <Products />}
      </div>

      <div className="w-full flex px-[2rem] items-center justify-center bg-white bg-opacity-100 mb-[8rem]">
        {isProductDetailsWindowOpened && <ProductDetails />}
      </div>
    </AnimatePresence>
  );
}
