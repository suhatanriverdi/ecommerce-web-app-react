import { Link } from "react-router-dom";

type Reason = {
  reason?: string | null;
};

export default function NotFound({ reason }: Reason) {
  return (
    <div className="dark:bg-dark dark:text-white flex flex-col items-center justify-center pt-[10rem] tablet:pt-[25rem]">
      <p className="text-3xl tablet:text-5xl desktop:text-7xl text-rose-700 animate-pulse">
        {reason === "supabase" ? "Supabase Error :(" : "URL Not Found :("}
      </p>
      <Link
        className="w-[15rem] h-[3rem] text-xlg flex justify-center items-center mb-10 mt-10 bg-blue-100 hover:bg-blue-200 border cursor-pointer border-x-sky-200 rounded-2xl"
        to="/advertisement"
      >
        Go Back to Home Page
      </Link>
    </div>
  );
}
