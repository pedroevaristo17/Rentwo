/** @type {import('tailwindcss').Config} */
export default = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2463eb",          // azul
        accent: "#7c3aed",           // roxo
        "background-light": "#f6f6f8",
        "background-dark": "#111621",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.10)",
      },
    },
  },
  plugins: [],
};