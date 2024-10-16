/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/assets/**/*.{css,vue,js}"
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0A0A0A",
      },
    },
  }
}