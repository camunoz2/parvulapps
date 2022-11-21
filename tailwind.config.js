/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{tsx,jsx}', './pages/**/*.{tsx,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Merriweather Sans', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(119deg, #6FBFC166 0%, #EFA2E05E 48%, #4A38CC6E 100%)',
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
