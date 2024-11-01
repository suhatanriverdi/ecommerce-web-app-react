import { useParams } from "react-router-dom";
import { sortQueryAtom } from "../atoms/sortQueryAtom";
import DropDownMenu from "./DropDownMenu";

export default function CategoriesSortNavBar() {
  const { gender } = useParams();
  const currentCategory: string = gender === "men" ? "Erkek" : "Kadın";

  const sortOptions = [
    { name: "Fiyata Göre Artan", query: "asc" },
    { name: "Fiyata Göre Azalan", query: "desc" },
  ];

  return (
    <div className="text-lg flex w-full max-w-[62rem] justify-between items-center text-center pt-[1rem] relative">
      <p>{currentCategory} → Tüm Ürünler</p>
      <DropDownMenu
        queryAtom={sortQueryAtom}
        menuTitle={"Sırala"}
        items={sortOptions}
      />
    </div>
  );
}
