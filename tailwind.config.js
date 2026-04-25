/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        cursive: ['Cedarville Cursive', 'cursive'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: { DEFAULT: '#7c3aed', light: '#a78bfa', dark: '#6d28d9' },
        accent:  { DEFAULT: '#06b6d4', light: '#67e8f9', dark: '#0891b2' },
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 30px rgba(124,58,237,0.45)',
        'glow-cyan': '0 0 30px rgba(6,182,212,0.45)',
      },
    },
  },
  plugins: [],
}
