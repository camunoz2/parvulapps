/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{tsx,jsx}', './pages/**/*.{tsx,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Merriweather Sans', 'sans-serif'],
      },
      colors: {
        accent: '#64CF94',
        dark: '#090721',
        lightblue: '#D6F0FC',
      },
    },
  },
  plugins: [],
}
