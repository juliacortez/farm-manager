/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/project/**/*.{html,ts}'],
  theme: {
    extend: {
      fontSize: {
        s: '13px',
        normal: '15px',
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography'), require('tailwindcss/colors')],
};
