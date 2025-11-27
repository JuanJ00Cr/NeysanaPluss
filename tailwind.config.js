// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Asegúrate de que esta línea esté correcta para tu estructura
  ],
  theme: {
    extend: {
      fontFamily: {
        // Define la nueva clase 'font-poppins'
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}