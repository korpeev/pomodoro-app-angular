/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        tomato: '#ff6347'
      },
    },
    fontFamily: {
      'montserrat': ['Montserrat', 'sans-serif']
    }
  },
  plugins: [],
}

