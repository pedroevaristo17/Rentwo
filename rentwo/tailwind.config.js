/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",          // azul
        secondary: "#7C3AED",        // roxo
        accent: "#7C3AED",           // alias para compatibilidade
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
