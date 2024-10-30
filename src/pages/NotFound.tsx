import { Link } from "react-router-dom";

type Reason = {
  reason?: string | null;
};

export default function NotFound({ reason }: Reason) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-6xl">
        {reason === "supabase" ? "Supabase Error" : "URL Not Found :("}
      </p>
      <Link
        className="mb-10 mt-10 bg-blue-200 border cursor-pointer border-x-sky-200 rounded-2xl"
        to="/"
      >
        Go Back to Home Page
      </Link>
    </div>
  );
}
