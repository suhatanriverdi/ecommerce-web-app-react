import React from "react";

const useDarkMode = () => {
  const [dark, setDark] = React.useState(false);

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
