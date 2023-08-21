/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF5500",
      },
      fontSize: {

      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        mymd: "900px",
        lg: "1024px",
        xl: "1440px",
      },
      fontFamily: {
        sans: ["Montserrat", "Open-Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
