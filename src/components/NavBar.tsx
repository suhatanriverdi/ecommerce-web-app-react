import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { genderQueryAtom } from "../atoms/genderQueryAtom.tsx";
import { productDetailsWindowAtom } from "../atoms/productDetailsWindowAtom.tsx";

export default function NavBar() {
  const [, setGenderQuery] = useAtom(genderQueryAtom);
  const [isProductDetailsWindowOpened] = useAtom(productDetailsWindowAtom);

  const handleGenderQuery = (gender: string) => {
    setGenderQuery(gender);
  };

  return (
    <div className="flex w-full max-w-[62rem] justify-between items-center text-center pt-[20px]">
      <p className="hover:text-button-bg-dark cursor-pointer">Sepet</p>
      <p className="absolute transform -translate-x-1/2 left-1/2">GÜLLÜ</p>
      {!isProductDetailsWindowOpened && (
        <div className="flex">
          <Link
            onClick={() => handleGenderQuery("men")}
            className="pr-[1rem] hover:text-button-bg-dark"
            to="/home/men"
          >
            Erkek
          </Link>
          <Link
            onClick={() => handleGenderQuery("women")}
            className="hover:text-button-bg-dark"
            to="/home/women"
          >
            Kadın
          </Link>
        </div>
      )}
    </div>
  );
}
