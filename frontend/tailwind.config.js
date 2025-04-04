// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}"
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: '#002147',      // Dark Blue for buttons and headings
//         secondary: '#4A90E2',    // Light Blue for hover/active states
//         bgSoft: '#F5F5F5',       // Soft Grey background
//         textDark: '#333333',     // Dark Grey text
//       },
//       fontSize: {
//         base: ['16px', { lineHeight: '1.5' }], // Paragraphs: 16px, line-height 1.5
//         xl: ['20px', { fontWeight: 'bold' }],  // Headings: 20px, bold
//       },
//     },
//   },
//   plugins: [],
// };
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