import { useParams } from "react-router-dom";
import { sortQueryAtom } from "../atoms/sortQueryAtom";
import { categoryQueryAtom } from "../atoms/categoryQueryAtom";
import DropDownMenu from "./DropDownMenu";

export default function CategoriesSortNavBar() {
  const { gender } = useParams();
  const currentCategory: string = gender === "men" ? "Erkek" : "Kadın";

  const sortOptions = [
    { name: "Fiyata Göre Artan", query: "asc" },
    { name: "Fiyata Göre Azalan", query: "desc" },
  ];

  const categoryOptions = [
    { name: "Kapüşonlu", query: "hoodies" },
    { name: "Tişört", query: "tshirts" },
    { name: "Eşofman", query: "sweatpanths" },
  ];

  return (
    <div className="text-lg flex w-full max-w-[62rem] justify-between items-center text-center pt-[1rem] relative">
      <div className="flex">
        <p>{currentCategory}&nbsp;→&nbsp;</p>
        <DropDownMenu
          queryAtom={categoryQueryAtom}
          menuTitle={"Kategoriler"}
          items={categoryOptions}
        />
      </div>
      <DropDownMenu
        queryAtom={sortQueryAtom}
        menuTitle={"Sırala"}
        items={sortOptions}
      />
    </div>
  );
}
