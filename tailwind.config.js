/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-red':   '#ff2442',
        'neon-pink':  '#ff6b8a',
        'cream':      '#f0e6d3',
        'motel-black': '#0a0a0a',
        'motel-dark':  '#111111',
      },
      fontFamily: {
        script:    ['"Dancing Script"', 'cursive'],
        condensed: ['"Bebas Neue"', 'sans-serif'],
        body:      ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
