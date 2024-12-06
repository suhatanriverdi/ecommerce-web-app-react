// components/Layout.tsx
import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";

const Layout = () => {
  return (
    <div className="flex flex-col bg-white text-black dark:bg-dark dark:text-white">
      <ScrollToTop />
      {/* For React Router to render children components */}
      <Outlet />
    </div>
  );
};

export default Layout;
