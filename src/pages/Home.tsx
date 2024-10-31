import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Products from "../containers/Products";

// Navigation Bar
import NavBar from "../components/NavBar";
import CategoriesSortNavBar from "../components/CategoriesSortNavBar";

export default function Home() {
  return (
    <AnimatePresence>
      {/* Fixed Navigation Component */}
      <motion.div
        key="mot-1"
        className="text-lg fixed -top-[1px] bg-white px-[2rem] pb-[1rem] z-10 w-full flex flex-col items-center justify-center text-justify"
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
      <div className="w-full flex flex-col px-[2rem] items-center justify-center text-justify backdrop-blur-md bg-white bg-opacity-100">
        {/* Products Container - No Animation */}
        <Products />

        {/* Back Link */}
        <div className="mt-60 max-w-[62rem]">
          <Link to="/advertisement">GO BACK</Link>
        </div>
      </div>
    </AnimatePresence>
  );
}
