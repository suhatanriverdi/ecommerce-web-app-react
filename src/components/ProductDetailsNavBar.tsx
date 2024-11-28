import { useAtom } from "jotai/index";
import { productDetailsWindowAtom } from "../atoms/productDetailsWindowAtom.tsx";

export default function ProductDetailsNavBar() {
  const [, setIsProductDetailsWindowOpened] = useAtom(productDetailsWindowAtom);

  const handleCloseProductDetailsWindow = () => {
    setIsProductDetailsWindowOpened(false);
  };

  return (
    <div className="text-lg flex w-full max-w-[62rem] justify-between items-center text-center pt-[1rem] relative">
      <p>{"PROD NAME HERE"}</p>
      <p onClick={handleCloseProductDetailsWindow} className="cursor-pointer">
        {"X"}
      </p>
    </div>
  );
}
