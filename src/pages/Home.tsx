import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Products from "../containers/Products";

// Navigation Bar
import NavBar from "../components/NavBar";

export default function Home() {
  const { gender: category } = useParams();

  return (
    <AnimatePresence>
      {/* Fixed Navigation Component */}
      <motion.div
        key="mot-1"
        className="fixed -top-[1px] bg-white px-[2rem] pb-[1rem] z-10 w-full flex flex-col items-center justify-center text-justify"
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
        className="sticky top-[60px] backdrop-blur-md bg-white bg-opacity-75 px-[2rem] mt-[120px] pb-[1rem] z-10 w-full flex flex-col items-center justify-center text-justify"
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 1000, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "anticipate",
        }}
      >
        <div className="flex w-full max-w-[62rem] justify-between items-center text-center text-base pt-[1rem]">
          <p>Erkek → Tüm Ürünler</p>
          <p>Sırala</p>
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="w-full flex flex-col items-center justify-center text-justify backdrop-blur-md bg-white bg-opacity-100">
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
