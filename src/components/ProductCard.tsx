import { useState } from "react";
import ClodinaryImg from "./ClodinaryImg";
import Product from "../supabase/model/Product.ts";

export default function ProductCard({ title, desc, price, img_url }: Product) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="grid justify-items-start hover:shadow-[0px_0px_4px_1px_rgba(0,_120,_90,_0.4)] cursor-pointer content-between shadow-[0px_0px_3px_1px_rgba(0,_0,_0,_0.1)] p-4">
      <ClodinaryImg
        img_url={img_url}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      {!isLoading && (
        <>
          <h2 className="font-bold text-xl">{title}</h2>
          <p className="text-green-500 text-3xl justify-self-center">
            {price} <span className="font-extralight">₺</span>
          </p>
        </>
      )}
    </div>
  );
}
