import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { genderQueryAtom } from "../atoms/genderQueryAtom.tsx";
import { productDetailsWindowAtom } from "../atoms/productDetailsWindowAtom.tsx";
import useDarkMode from "../hooks/useDarkMode.tsx";
import LightIcon from "./ui/LightIcon.tsx";
import DarkIcon from "./ui/DarkIcon.tsx";
import { cartSizeAtom } from "../atoms/cartSizeAtom.tsx";

export default function NavBar() {
  const [, setGenderQuery] = useAtom(genderQueryAtom);
  const [isProductDetailsWindowOpened] = useAtom(productDetailsWindowAtom);
  const { dark, darkModeHandler } = useDarkMode();
  const [cartSize] = useAtom(cartSizeAtom);

  const handleGenderQuery = (gender: string) => {
    setGenderQuery(gender);
  };

  return (
    <div className="flex dark:bg-dark dark:text-white w-full max-w-[62rem] justify-between items-center text-center pt-[20px]">
      <div className="flex">
        <p className="hover:text-button-bg-dark cursor-pointer">Sepet</p>
        {cartSize > 0 && (
          <div className="relative left-[0.3rem] -top-[0.7rem] px-3 bg-rose-500 flex justify-center items-center text-white font-bold rounded-full">
            <p className="text-sm">{cartSize}</p>
          </div>
        )}
      </div>
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
          <button className="pl-3" onClick={darkModeHandler}>
            {dark && <LightIcon />}
            {!dark && <DarkIcon />}
          </button>
        </div>
      )}
    </div>
  );
}
