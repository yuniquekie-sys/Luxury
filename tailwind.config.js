/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'velocity': {
          black: '#080808',
          dark: '#0d0d0d',
          surface: '#111111',
          'surface-2': '#1a1a1a',
          border: '#222222',
          'border-2': '#2a2a2a',
          muted: '#666666',
          subtle: '#999999',
          silver: '#c8c8c8',
          white: '#f0f0f0',
          gold: '#c9a84c',
          'gold-light': '#e0c060',
          'gold-dark': '#a07830',
          red: '#cc2200',
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(4rem, 10vw, 9rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'section': ['clamp(2.5rem, 5vw, 5rem)', { lineHeight: '0.95', letterSpacing: '-0.01em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-up': 'slideUp 0.8s ease forwards',
        'scale-in': 'scaleIn 0.6s ease forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
