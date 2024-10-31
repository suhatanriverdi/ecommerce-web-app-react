import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sortQueryAtom } from "../atoms/sortQueryAtom";
import { useAtom } from "jotai";

export default function CategoriesSortNavBar() {
  const [sortMenuOpened, setSortMenuOpened] = useState(false);
  const handleSortMenu = () => {
    setSortMenuOpened((prev) => !prev);
  };

  const { gender } = useParams();
  const currentCategory: string = gender === "men" ? "Erkek" : "Kadın";

  // const sortMenu = <div className="absolute">SoretMenunununu</div>;
  const sortOptions = [
    { name: "Fiyata Göre Artan", query: "asc" },
    { name: "Fiyata Göre Azalan", query: "desc" },
  ];

  // Detecks Clicks to close Dropdown Sorting Menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortMenuOpened && !event.target.closest(".sort-menu")) {
        setSortMenuOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortMenuOpened]);

  // Update atom for fething sorted products
  const [, setSortQuery] = useAtom(sortQueryAtom);
  const handleSortQuery = (mode: string) => {
    setSortQuery(mode);
    handleSortMenu();
  };

  return (
    <div className="text-lg flex w-full max-w-[62rem] justify-between items-center text-center pt-[1rem] relative">
      <p>{currentCategory} → Tüm Ürünler</p>
      <div
        className="sort-menu hover:text-cyan-700 cursor-pointer"
        onClick={handleSortMenu}
      >
        Sırala ↓
      </div>
      <AnimatePresence>
        {sortMenuOpened ? (
          <motion.div
            key="sort"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "anticipate",
            }}
            className="text-lg shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.1)] sort-menu flex flex-col justify-start text-left items-start absolute right-0 top-[60px] z-20 w-auto h-auto p-3 backdrop-blur bg-white bg-opacity-95"
          >
            {sortOptions.map((opt) => {
              return (
                <div
                  onClick={() => handleSortQuery(opt.query)}
                  className="hover:text-cyan-700 cursor-pointer"
                  key={opt.query}
                >
                  {opt.name}
                </div>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
