import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai/index";
import { productDetailsWindowAtom } from "../atoms/productDetailsWindowAtom.tsx";

export default function Products() {
  const [, setIsProductDetailsWindowOpened] = useAtom(productDetailsWindowAtom);

  const handleCloseProductDetailsWindow = () => {
    setIsProductDetailsWindowOpened(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="prod-details"
        onClick={handleCloseProductDetailsWindow}
        className="w-full max-w-[62rem] flex flex-col items-center justify-center"
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 1000, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "anticipate",
        }}
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] w-full gap-[1rem] mt-[1rem]">
          ProductDetailsDetails
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
