import { AnimatePresence, motion } from "framer-motion";
import { PrimitiveAtom, useAtom } from "jotai";
import { useEffect, useState } from "react";

type DropDownMenuProps = {
  queryAtom: PrimitiveAtom<string | null>;
  menuTitle: string;
  items: { query: string; name: string }[];
};

function DropDownMenu({ queryAtom, menuTitle, items }: DropDownMenuProps) {
  const [menuOpened, setMenuOpened] = useState(false);
  const handleMenuOpened = () => {
    setMenuOpened((prev) => !prev);
  };

  // Detecks Clicks to close Dropdown Sorting Menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpened && !(event.target as HTMLElement).closest(".sort-menu")) {
        setMenuOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpened]);

  // Update atom for fething sorted products
  const [, setQuery] = useAtom(queryAtom);
  const handleSetQuery = (mode: string) => {
    setQuery(mode);
    handleMenuOpened();
  };

  return (
    <div className="relative">
      <div
        className="sort-menu hover:text-cyan-700 cursor-pointer"
        onClick={handleMenuOpened}
      >
        {menuTitle} ↓
      </div>
      <AnimatePresence>
        {menuOpened ? (
          <motion.div
            key="sort"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "anticipate",
            }}
            className="text-lg shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.1)] sort-menu flex flex-col justify-start text-left items-start absolute top-[40px] right-0 z-20 p-3 backdrop-blur bg-white bg-opacity-95"
          >
            {items.map((item) => {
              return (
                <div
                  onClick={() => handleSetQuery(item.query)}
                  className="hover:text-cyan-700 cursor-pointer w-max"
                  key={item.query}
                >
                  {item.name}
                </div>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default DropDownMenu;
