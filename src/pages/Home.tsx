import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Products from "../containers/Products";

// Navigation Bar
import NavBar from "../components/NavBar";

export default function Home() {
  // const { gender: category } = useParams();
  // TODO Remove This Line
  // console.log("params: ", category);

  return (
    <AnimatePresence>
      {/* Navigation Component */}
      <motion.div
        className="fixed backdrop-blur-md px-[2rem] pb-[1rem] z-10 w-full flex flex-col items-center justify-center text-justify"
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

      <motion.div
        key={"prod-link"}
        className="w-full flex flex-col items-center justify-center text-justify px-[2rem]"
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 1000, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "anticipate",
        }}
      >
        {/* Products Container */}
        <Products />

        <div className="mt-60 max-w-[62rem] ">
          <Link to="/advertisement">GO BACK</Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
