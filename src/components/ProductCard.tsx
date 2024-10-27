import Product from "../supabase/model/Product";
import Gallery from "../components/Gallery";

export default function ProductCard({ title, desc, price, img_url }: Product) {
  return (
    <div className="w-[20rem] h-[20rem] bg-slate-300">
      <Gallery />
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600">{desc}</p>
      <p className="text-green-500 font-semibold">${price}</p>
    </div>
  );
}
