/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        twoThirds: "2fr 1fr",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
