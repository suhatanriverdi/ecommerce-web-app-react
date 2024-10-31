import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="flex w-full max-w-[62rem] justify-between items-center text-center pt-[20px]">
      <p>Sepet</p>
      <p className="absolute transform -translate-x-1/2 left-1/2">GÜLLÜ</p>
      <div className="flex">
        <Link className="pr-[1rem]" to="/home/men">
          Erkek
        </Link>
        <Link to="/home/women">Kadın</Link>
      </div>
    </div>
  );
}
