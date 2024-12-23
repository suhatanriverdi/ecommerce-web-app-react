import { useParams } from "react-router-dom";
import { sortQueryAtom } from "../atoms/sortQueryAtom";
import { categoryQueryAtom } from "../atoms/categoryQueryAtom";
import DropDownMenu from "./DropDownMenu";
import { useState } from "react";
import { categoryMenuTitleAtom } from "../atoms/categoryMenuTitleAtom";
import { sortingMenuTitleAtom } from "../atoms/sortingMenuTitleAtom";

export default function CategoriesSortNavBar() {
  const { gender } = useParams();
  const currentCategory: string = gender === "men" ? "Erkek" : "Kadın";

  // Sort Drop Down Button
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  // Category Drop Down Button
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const sortOptions = [
    { name: "Fiyata Göre Artan", query: "asc" },
    { name: "Fiyata Göre Azalan", query: "desc" },
  ];

  const categoryOptions = [
    { name: "Tüm Ürünler", query: "" },
    { name: "Kapüşonlu", query: "hoodie" },
    { name: "Tişört", query: "tshirt" },
    { name: "Eşofman", query: "sweatpants" },
  ];

  return (
    <div className="dark:bg-dark dark:bg-opacity-0 dark:text-white text-lg flex w-full max-w-[62rem] justify-between items-center text-center pt-[1rem] relative">
      <div className="flex">
        <p>
          {currentCategory}&nbsp;{">"}&nbsp;
        </p>
        <DropDownMenu
          key={"category-drop-down"}
          isLeft={true}
          queryAtom={categoryQueryAtom}
          titleAtom={categoryMenuTitleAtom}
          items={categoryOptions}
          menuOpened={categoryMenuOpen}
          setOtherMenuOpened={setSortMenuOpen}
          setMenuOpened={setCategoryMenuOpen}
        />
      </div>
      <DropDownMenu
        key={"sorting-drop-down"}
        queryAtom={sortQueryAtom}
        titleAtom={sortingMenuTitleAtom}
        items={sortOptions}
        menuOpened={sortMenuOpen}
        setOtherMenuOpened={setCategoryMenuOpen}
        setMenuOpened={setSortMenuOpen}
      />
    </div>
  );
}
