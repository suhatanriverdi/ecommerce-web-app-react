import { useAtom } from "jotai";
import { darkModeAtom } from "../atoms/darkModeAtom.tsx";

const useDarkMode = () => {
  const [isDark, setDark] = useAtom(darkModeAtom);

  const syncDarkModeFromLocalStorage = () => {
    console.info("localStorage.theme", localStorage.theme);
    if (localStorage.theme && localStorage.theme === "dark") {
      toggleDarkMode();
    }
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    document.body.classList.toggle("dark");
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.classList.toggle("dark");
    }
  };

  const darkModeHandler = () => {
    setDark(!isDark);

    toggleDarkMode();

    // Store the theme preference in localstorage
    localStorage.setItem("theme", !isDark ? "dark" : "light");
  };

  return { isDark, darkModeHandler, syncDarkModeFromLocalStorage };
};

export default useDarkMode;
