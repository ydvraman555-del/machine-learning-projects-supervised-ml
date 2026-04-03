/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#12121a',
        'surface-light': '#1a1a25',
        cyan: {
          DEFAULT: '#00d4ff',
          dark: '#0099cc',
          light: '#66e5ff',
        },
        purple: {
          DEFAULT: '#8b5cf6',
          dark: '#6d28d9',
          light: '#a78bfa',
        },
        emerald: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
