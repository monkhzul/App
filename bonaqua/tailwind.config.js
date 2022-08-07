/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1285px',
      '2xl': '1536px',
      '3xl': '1792px',
      '4xl': '2048px',
      '5xl': '2304px',
      '6xl': '2560px',
      '7xl': '2816px',
      '8xl': '3072px',
      '9xl': '3328px',
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('tailwind-scrollbar-hide')
  ],
}
