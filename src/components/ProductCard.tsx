import { useState } from "react";
import ClodinaryImg from "./ClodinaryImg";
import Product from "../supabase/model/Product";

export default function ProductCard({ title, desc, price, img_url }: Product) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="grid justify-items-start content-between drop-shadow-lg shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.1)] p-5">
      <ClodinaryImg
        img_url={img_url}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      {!isLoading && (
        <>
          <h2 className="font-bold">{title}</h2>
          <p className="text-gray-600">{desc}</p>
          <p className="text-green-500 text-6xl justify-self-center">
            {price} ₺
          </p>
        </>
      )}
    </div>
  );
}
