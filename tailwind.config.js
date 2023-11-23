/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary1': '#F7BE20',
        'primary2': '#FFFFFF',
        'grey': '#CECECE',
        'dark': '#1A1A1A',
        'colorDark1': '#17171F',
        'colorDark2': '#25252D'
      }
    },
    fontFamily: {
      'roboto-black': ['Roboto-Black', 'sans-serif'],
      'roboto-bold': ['Roboto-Bold', 'sans-serif'],
      'roboto-black': ['Roboto-Black', 'sans-serif'],
      'roboto-italic': ['Roboto-Italic', 'sans-serif'],
      'roboto-light': ['Roboto-Light', 'sans-serif'],
      'roboto-medium': ['Roboto-Medium', 'sans-serif'],
      'roboto-regular': ['Roboto-Regular', 'sans-serif'],
      'roboto-thin': ['Roboto-Thin', 'sans-serif'],
    }
  },
  plugins: [],
}

