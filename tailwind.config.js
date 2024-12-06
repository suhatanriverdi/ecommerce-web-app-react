/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#151515",
        "button-bg": "#CEFFB9",
        "button-bg-light": "#daffcc",
        "button-bg-dark": "#497638",
      },
      boxShadow: {
        light: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
        dark: "0px 0px 3px 1px rgba(255, 255, 255, 0.7)",
      },
    },
    screens: {
      tablet: "480px",
      desktop: "1024px",
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
