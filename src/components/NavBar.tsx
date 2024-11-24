import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { genderQueryAtom } from "../atoms/genderQueryAtom.tsx";

export default function NavBar() {
  const [, setGenderQuery] = useAtom(genderQueryAtom);

  const handleGenderQuery = (gender: string) => {
    setGenderQuery(gender);
  };

  return (
    <div className="flex w-full max-w-[62rem] justify-between items-center text-center pt-[20px]">
      <p className="hover:text-cyan-700 cursor-pointer">Sepet</p>
      <p className="absolute transform -translate-x-1/2 left-1/2">GÜLLÜ</p>
      <div className="flex">
        <Link
          onClick={() => handleGenderQuery("men")}
          className="pr-[1rem] hover:text-cyan-700"
          to="/home/men"
        >
          Erkek
        </Link>
        <Link
          onClick={() => handleGenderQuery("women")}
          className="hover:text-cyan-700"
          to="/home/women"
        >
          Kadın
        </Link>
      </div>
    </div>
  );
}
