// components/Layout.tsx
import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import { useEffect } from "react";
import useShoppingCart from "../hooks/useShoppingCart";
import useDarkMode from "../hooks/useDarkMode.tsx";

const Layout = () => {
  // Restore Card Information from Local Storage
  const { restoreCartFromStorage } = useShoppingCart();
  const { syncDarkModeFromLocalStorage } = useDarkMode();
  useEffect(() => {
    restoreCartFromStorage();
    syncDarkModeFromLocalStorage();
  }, []);

  return (
    <div className="flex flex-col bg-white text-black dark:bg-dark dark:text-white">
      <ScrollToTop />
      {/* For React Router to render children components */}
      <Outlet />
    </div>
  );
};

export default Layout;
