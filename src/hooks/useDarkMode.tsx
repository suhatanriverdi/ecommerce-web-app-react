import { useAtom } from "jotai";
import { darkModeAtom } from "../atoms/darkModeAtom.tsx";

const useDarkMode = () => {
  const [dark, setDark] = useAtom(darkModeAtom);

  const darkModeHandler = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
    document.body.classList.toggle("dark");
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.classList.toggle("dark");
    }
  };

  return { dark, darkModeHandler };
};

export default useDarkMode;
