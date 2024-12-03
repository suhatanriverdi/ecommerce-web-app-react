import { useState } from "react";
import ClodinaryImg from "./ClodinaryImg";
import Product from "../supabase/model/Product.ts";
import { useAtom } from "jotai";
import { productDetailsWindowAtom } from "../atoms/productDetailsWindowAtom.tsx";
import { selectedProductAtom } from "../atoms/selectedProductAtom.tsx";

type ProductCardProps = { product: Product };

export default function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [, setIsProductDetailsWindowOpened] = useAtom(productDetailsWindowAtom);
  const [, setSelectedProduct] = useAtom(selectedProductAtom);

  const handleOpenProductDetailsWindow = () => {
    setIsProductDetailsWindowOpened(true);
    handleSelectedProduct();
  };

  const handleSelectedProduct = () => {
    setSelectedProduct(product);
  };

  return (
    <div
      onClick={handleOpenProductDetailsWindow}
      className="flex flex-col p-6 min-h-[30rem] justify-between items-center hover:shadow-[0px_0px_4px_1px_rgba(0,_120,_90,_0.4)] cursor-pointer shadow-light"
    >
      {!isLoading && <h2 className="text-lg">{product.title}</h2>}
      <ClodinaryImg
        img_url={product.img_url}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      {!isLoading && (
        <div className="flex flex-col justify-center items-center">
          <p className="text-button-bg-dark text-4xl">
            {product.price} <span className="font-extralight">₺</span>
          </p>
        </div>
      )}
    </div>
  );
}
