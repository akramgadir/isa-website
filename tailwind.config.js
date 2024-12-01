/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customPink: "rgb(220, 30, 131)",
        customGrey: "#2F2F2F",
        customCream: "#FFFEF9",
      },
      height: {
        54: "54px",
      },
    },
  },
  plugins: [],
};
