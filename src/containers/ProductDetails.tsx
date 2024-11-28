import { AnimatePresence, motion } from "framer-motion";

export default function Products() {
  return (
    <AnimatePresence>
      <motion.div
        key="prod-details"
        className="w-full max-w-[62rem] flex flex-col items-center justify-center"
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 1000, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "anticipate",
        }}
      >
        <div className="flex flex-col justify-center items-center text-lg w-full max-w-[62rem]">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum
            delectus dolore nulla pariatur perferendis reiciendis. Alias, fugit,
            recusandae. Est et exercitationem facilis libero minima nihil
            nostrum repellendus sit voluptate!
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
