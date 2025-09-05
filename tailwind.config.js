/**  @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        'primary': '#8F2500',
        'primary-dark': '#7a1f00',
        'secondary': '#DFBF45',
      }
    },
  },
  plugins: [
    // require('tailwind-scrollbar'),
  ],
}

