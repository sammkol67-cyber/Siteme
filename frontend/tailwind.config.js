module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6b6f3f', // sludge/olive green
        bg: {
          DEFAULT: '#0f1113',
          card: 'rgba(255,255,255,0.03)',
        },
        muted: '#9aa0a6',
        alert: '#ff4d4f',
      },
    },
  },
  plugins: [],
};
