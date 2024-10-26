import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-6xl">URL Not Found :(</p>
      <Link
        className="p-5 mt-10 bg-blue-200 border cursor-pointer border-x-sky-200 rounded-2xl"
        to="/"
      >
        Go Back to Home Page
      </Link>
    </div>
  );
}
