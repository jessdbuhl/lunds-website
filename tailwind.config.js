/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdedd6',
          200: '#f9d7ad',
          300: '#f4b978',
          400: '#ee9242',
          500: '#ea751a',
          600: '#db5b10',
          700: '#b5440f',
          800: '#903614',
          900: '#742f14',
        },
      },
    },
  },
  plugins: [],
}
