/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/assets/stylesheets/*.scss',
    './src/components/**/*.{vue,js}',
    './src/views/*.{vue,js}',
    './src/**/*.{vue,js}',
    'node_modules/preline/dist/*.js'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms'), require('preline/plugin')]
}
