/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        twoThirds: "2fr 1fr",
        oneThird: "1fr 2fr",
        threeFifths: "3fr 2fr",
      },
      colors: {
        lightBorder: "hsl(var(--bc) / 0.3)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
