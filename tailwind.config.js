/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF5500",
      },
      fontSize: {
        sm: "12px",
        base: "16px",
        md: "20px",
        xl: "30px",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
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
