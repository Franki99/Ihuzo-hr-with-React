/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#090979",
          DEFAULT: "#0009ff",
          light: "#00d4ff",
        },
        dark: {
          lightest: "#2a2a2a",
          lighter: "#1e1e1e",
          DEFAULT: "#121212",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
