/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',           // ✅ Includes pages, layout, and any files in app
    './app/components/**/*.{js,ts,jsx,tsx}', // ✅ Includes your app/components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

