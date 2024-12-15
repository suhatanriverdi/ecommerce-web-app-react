import { AnimatePresence, motion } from "framer-motion";
import { PrimitiveAtom, useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { scrollOffsetAtom } from "../atoms/scrollOffsetAtom";
import { DEFAULT_OFFSET } from "../config/consts.ts";
import { hasMoreProductsAtom } from "../atoms/hasMoreProductsAtom.tsx";

type DropDownMenuProps = {
  queryAtom: PrimitiveAtom<string | null>;
  menuTitle: string;
  items: { query: string; name: string }[];
  menuOpened: boolean;
  setOtherMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isLeft?: boolean | null;
};

function DropDownMenu({
  queryAtom,
  menuTitle,
  items,
  menuOpened,
  setOtherMenuOpened,
  setMenuOpened,
  isLeft,
}: DropDownMenuProps) {
  const [menuTitleState, setMenuTitle] = useState(menuTitle);
  const [, setOffset] = useAtom(scrollOffsetAtom);
  const [, setHasMoreProducts] = useAtom(hasMoreProductsAtom);

  const handleMenuOpened = () => {
    setMenuOpened((prev) => !prev);
    // Close the other menu
    setOtherMenuOpened(false);
  };

  // Detects Clicks to close Dropdown Sorting Menu
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

  // Update atom for fetching sorted products
  const [, setQuery] = useAtom(queryAtom);
  const handleSetQuery = (categoryTitle: string, mode: string) => {
    // Reset offset here
    setOffset(DEFAULT_OFFSET);
    // Reset has more products
    setHasMoreProducts(true);
    // Set query
    setQuery(mode);
    // Update the menu title for categories
    setMenuTitle(categoryTitle);
    handleMenuOpened();
  };

  return (
    <div className="relative">
      <div
        className="sort-menu hover:text-button-bg-dark cursor-pointer dark:bg-dark dark:bg-opacity-0 dark:text-white"
        onClick={handleMenuOpened}
      >
        {menuTitleState}
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
            className={`text-lg ${!isLeft && "right-0"} dark:bg-dark dark:bg-opacity-75 dark:text-white dark:shadow-button-bg-dark shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.1)] sort-menu flex flex-col justify-start text-left items-start absolute top-[40px] z-20 p-3 backdrop-blur bg-white bg-opacity-95`}
          >
            {items.map((item) => {
              return (
                item.name !== menuTitleState && (
                  <div
                    onClick={() => handleSetQuery(item.name, item.query)}
                    className="hover:text-button-bg-dark cursor-pointer w-max"
                    key={item.name}
                  >
                    {item.name}
                  </div>
                )
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default DropDownMenu;
