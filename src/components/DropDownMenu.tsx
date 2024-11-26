import { AnimatePresence, motion } from "framer-motion";
import { PrimitiveAtom, useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { scrollOffsetAtom } from "../atoms/scrollOffsetAtom";
import { DEFAULT_OFFSET } from "../config/consts.ts";

type DropDownMenuProps = {
  queryAtom: PrimitiveAtom<string | null>;
  menuTitle: string;
  items: { query: string; name: string }[];
  menuOpened: boolean;
  setOtherMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function DropDownMenu({
  queryAtom,
  menuTitle,
  items,
  menuOpened,
  setOtherMenuOpened,
  setMenuOpened,
}: DropDownMenuProps) {
  const [menuTitleState, setMenuTitle] = useState(menuTitle);
  const [, setOffset] = useAtom(scrollOffsetAtom);

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
    setQuery(mode);
    // Update the menu title for categories
    setMenuTitle(categoryTitle);
    handleMenuOpened();
    // Reset offset here
    setOffset(DEFAULT_OFFSET);
  };

  return (
    <div className="relative">
      <div
        className="sort-menu hover:text-button-bg-dark cursor-pointer"
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
            className="text-lg shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.1)] sort-menu flex flex-col justify-start text-left items-start absolute top-[40px] right-0 z-20 p-3 backdrop-blur bg-white bg-opacity-95"
          >
            {items.map((item) => {
              return (
                <div
                  onClick={() => handleSetQuery(item.name, item.query)}
                  className="hover:text-button-bg-dark cursor-pointer w-max"
                  key={item.name}
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
