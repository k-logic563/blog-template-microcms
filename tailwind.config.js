const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    fontFamily: {
      'sans': ['Helvetica Neue', 'Ariel', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Meiryo', 'sans-serif'],
    },
    screens: {
      'xs': '425px',
      ...defaultTheme.screens,
    }
  },
  corePlugins: {
    container: false,
  },
}
