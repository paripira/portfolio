/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // <-- Ini yang berubah
    autoprefixer: {},
  },
};

export default config;