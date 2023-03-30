/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        twoThirds: "2fr 1fr",
        oneThird: "1fr 2fr",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
