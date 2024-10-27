/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {}
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(.*)/,
      pattern: /hover:bg-(.*)/,
      pattern: /text-(.*)/,
      pattern: /border-(.*)/
    }
  ]
}
