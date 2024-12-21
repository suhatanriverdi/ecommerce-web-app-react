import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { genderQueryAtom } from "../atoms/genderQueryAtom.tsx";
import { productDetailsWindowAtom } from "../atoms/productDetailsWindowAtom.tsx";
import useDarkMode from "../hooks/useDarkMode.tsx";
import LightIcon from "./ui/LightIcon.tsx";
import DarkIcon from "./ui/DarkIcon.tsx";
import { cartSizeAtom } from "../atoms/cartSizeAtom.tsx";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [, setGenderQuery] = useAtom(genderQueryAtom);
  const [isProductDetailsWindowOpened] = useAtom(productDetailsWindowAtom);
  const { isDark, darkModeHandler } = useDarkMode();
  const [cartSize] = useAtom(cartSizeAtom);
  const navigate = useNavigate();

  const handleGenderQuery = (gender: string) => {
    setGenderQuery(gender);
  };

  const handleShoppingCartClick = () => {
    navigate("/shopping-cart");
  };

  return (
    <div className="flex dark:bg-dark dark:text-white w-full max-w-[62rem] justify-between items-center text-center pt-[20px]">
      <div className="flex">
        <p
          onClick={handleShoppingCartClick}
          className="hover:text-button-bg-dark cursor-pointer"
        >
          Sepet
        </p>
        {cartSize > 0 && (
          <div className="relative left-[0.3rem] -top-[0.7rem] px-2 bg-rose-500 flex justify-center items-center text-white font-bold rounded-full">
            <p className="min-w-3 text-center">{cartSize}</p>
          </div>
        )}
      </div>
      <p className="absolute transform -translate-x-1/2 left-1/2">GÜLLÜ</p>
      {!isProductDetailsWindowOpened && (
        <div className="flex gap-1.5 tablet:gap-0">
          <Link
            onClick={() => handleGenderQuery("men")}
            className="tablet:pr-[1rem] hover:text-button-bg-dark"
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
          <button className="tablet:pl-3" onClick={darkModeHandler}>
            {!isDark ? <DarkIcon /> : <LightIcon />}
          </button>
        </div>
      )}
    </div>
  );
}
