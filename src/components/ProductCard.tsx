import Product from "../supabase/model/Product";
import ClodinaryImg from "./ClodinaryImg";

export default function ProductCard({ title, desc, price, img_url }: Product) {
  return (
    <div className="justify-center items-center drop-shadow-lg shadow-lg p-5">
      <ClodinaryImg img_url={img_url} />
      {/* <h2 className="font-bold">{title}</h2> */}
      {/* <p className="text-gray-600">{desc}</p> */}
      {/* <p className="text-green-500 font-semibold">{price} ₺</p> */}
    </div>
  );
}
