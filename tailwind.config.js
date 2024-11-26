/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "button-bg": "#CEFFB9",
        "button-bg-light": "#daffcc",
        "button-bg-dark": "#80aa6d",
      },
    },
    screens: {
      tablet: "480px",
      desktop: "1024px",
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
