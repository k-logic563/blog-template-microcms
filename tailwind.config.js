const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    fontFamily: {
      'sans': ['Helvetica Neue', 'Arial', 'Hiragino Kaku Gothic ProN','Hiragino Sans', 'Meiryo', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif']
    },
    screens: {
      'xs': '425px',
      ...defaultTheme.screens,
    }
  },
  corePlugins: {
    container: false,
  },
  plugins: [],
}
