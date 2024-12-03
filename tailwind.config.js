/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "button-bg": "#CEFFB9",
        "button-bg-light": "#daffcc",
        "button-bg-dark": "#80aa6d",
      },
      boxShadow: {
        light: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
      },
    },
    screens: {
      tablet: "480px",
      desktop: "1024px",
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
