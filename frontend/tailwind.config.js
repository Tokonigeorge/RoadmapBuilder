/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './**/*.html'],
  theme: {
    extend: {
      colors: {
        primary: '#ffb959',
        secondary: 'var(--color-secondary)',
        outline: 'var(--color-outline)',
      },
    },
  },
  plugins: [],
};
