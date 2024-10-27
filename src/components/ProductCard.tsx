import Product from "../supabase/model/Product";

export default function ProductCard({ title, desc, price, img_url }: Product) {
  return (
    <div className="w-min-[20rem] h-min-[20rem] bg-slate-300">
      {/* <img src={img_url} alt={title} className="w-full h-48 object-cover" /> */}
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600">{desc}</p>
      <p className="text-green-500 font-semibold">${price}</p>
    </div>
  );
}
