import { useState } from "react";
import ClodinaryImg from "./ClodinaryImg";
import Product from "../supabase/model/Product.ts";

export default function ProductCard({ title, price, img_url }: Product) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col h-[30rem] p-6 justify-between items-center hover:shadow-[0px_0px_4px_1px_rgba(0,_120,_90,_0.4)] cursor-pointer shadow-[0px_0px_3px_1px_rgba(0,_0,_0,_0.1)]">
      {!isLoading && <h2 className="text-lg">{title}</h2>}
      <ClodinaryImg
        img_url={img_url}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      {!isLoading && (
        <div className="flex flex-col justify-center items-center">
          <p className="text-button-bg-dark text-4xl">
            {price} <span className="font-extralight">₺</span>
          </p>
        </div>
      )}
    </div>
  );
}
