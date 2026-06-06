/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src2/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand:   { 50:'#fff7ed', 100:'#ffedd5', 200:'#fed7aa', 300:'#fdba74', 400:'#fb923c', 500:'#f97316', 600:'#ea580c', 700:'#c2410c', 800:'#9a3412', 900:'#7c2d12' },
        ink:     { 50:'#f8f7f4', 100:'#f0ede6', 200:'#e2dcd0', 300:'#c8bfaf', 400:'#a89880', 500:'#8b7355', 600:'#6b5940', 700:'#4a3d2c', 800:'#2d2416', 900:'#1a1509' },
        surface: '#faf9f6',
      },
      fontFamily: {
        sans:    ['Outfit', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card':   '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 4px 16px -2px rgb(0 0 0 / 0.06)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.06), 0 12px 32px -4px rgb(0 0 0 / 0.12)',
        'btn':    '0 1px 2px 0 rgb(0 0 0 / 0.08), 0 2px 8px -1px rgb(234 88 12 / 0.3)',
      },
      animation: {
        'fade-up':   'fadeUp 0.4s ease forwards',
        'fade-in':   'fadeIn 0.3s ease forwards',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        fadeUp:  { '0%':{ opacity:'0', transform:'translateY(16px)' }, '100%':{ opacity:'1', transform:'translateY(0)' } },
        fadeIn:  { '0%':{ opacity:'0' }, '100%':{ opacity:'1' } },
      },
    },
  },
  plugins: [],
};
