import { useAtom } from "jotai/index";
import { productDetailsWindowAtom } from "../atoms/productDetailsWindowAtom.tsx";
import CloseIcon from "./ui/CloseIcon.tsx";
import { selectedProductAtom } from "../atoms/selectedProductAtom.tsx";

export default function ProductDetailsNavBar() {
  const [selectedProduct] = useAtom(selectedProductAtom);
  const [, setIsProductDetailsWindowOpened] = useAtom(productDetailsWindowAtom);

  const handleCloseProductDetailsWindow = () => {
    setIsProductDetailsWindowOpened(false);
  };

  return (
    <div className="flex w-full justify-between items-center my-[1rem]">
      <p className="text-lg ">{selectedProduct?.title}</p>
      <div className="cursor-pointer" onClick={handleCloseProductDetailsWindow}>
        <CloseIcon />
      </div>
    </div>
  );
}
