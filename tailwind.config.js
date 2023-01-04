/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}",],
  theme: {
    extend: {
      colors: {
        'primary': 'pink-400',
        'secondary': 'pink-200',
      }
    },
  },
  plugins: [],
  // safelisted colors in order to prevent purgecss from removing them
  safelist: [
    {
      pattern: /^(bg-|border-|text-)/,
    },
  ],
}
