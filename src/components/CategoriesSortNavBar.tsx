import { useParams } from "react-router-dom";
import { sortQueryAtom } from "../atoms/sortQueryAtom";
import { categoryQueryAtom } from "../atoms/categoryQueryAtom";
import DropDownMenu from "./DropDownMenu";
import { useState } from "react";

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
          isLeft={true}
          queryAtom={categoryQueryAtom}
          menuTitle={"Tüm Ürünler"}
          items={categoryOptions}
          menuOpened={categoryMenuOpen}
          setOtherMenuOpened={setSortMenuOpen}
          setMenuOpened={setCategoryMenuOpen}
        />
      </div>
      <DropDownMenu
        queryAtom={sortQueryAtom}
        menuTitle={"Sırala"}
        items={sortOptions}
        menuOpened={sortMenuOpen}
        setOtherMenuOpened={setCategoryMenuOpen}
        setMenuOpened={setSortMenuOpen}
      />
    </div>
  );
}
