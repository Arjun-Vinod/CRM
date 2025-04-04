/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#002147',
        secondary: '#4A90E2',
        bgSoft: '#F5F5F5',
        textDark: '#333333',
      },
      fontSize: {
        base: ['16px', { lineHeight: '1.5' }],
        xl: ['20px', { fontWeight: 'bold' }],
      },
    },
  },
  plugins: [],
};