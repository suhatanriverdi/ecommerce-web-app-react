export default function NavBar() {
  return (
    <div className="w-full max-w-[62rem] justify-between items-center text-center flex pt-[20px] text-base">
      <p className="">Sepet</p>
      <p className="absolute transform -translate-x-1/2 left-1/2">
        GÜLLÜ
      </p>
      <div className="flex">
        <p className="pr-[1rem]">Erkek</p>
        <p>Kadın</p>
      </div>
    </div>
  );
}
