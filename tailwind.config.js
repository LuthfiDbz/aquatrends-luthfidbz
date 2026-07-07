/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        ocean: {
          DEFAULT: "#0A2540",
          dark: "#06172d",
        },
      },
    },
  },
  plugins: [],
};
