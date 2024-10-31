import { Link, useParams } from "react-router-dom";

export default function CategoriesSortNavBar() {
  const { gender } = useParams();
  console.log("path:", gender);
  const currentCategory: string = gender === "men" ? "Erkek" : "Kadın";

  return (
    <div className="text-lg flex w-full max-w-[62rem] justify-between items-center text-center pt-[1rem]">
      <p>{currentCategory} → Tüm Ürünler</p>
      <Link to={`?sort_by=`}>Sırala</Link>
    </div>
  );
}
