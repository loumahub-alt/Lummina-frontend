/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#5F021F',
        'navy-2': '#430016',
        wine: '#25000C',
        gold: '#FFA500',
        'gold-dark': '#8A5400',
        'gold-bright': '#FFBD3D',
        cream: '#F7E7CE',
        paper: '#FFF8EA',
        muted: '#F1D9BC',
        ink: '#111111',
        bordeaux: '#5F021F',
        champagne: '#F7E7CE',
        orange: '#FFA500',
        'dark-line': 'rgba(247,231,206,0.16)',
        'light-line': 'rgba(95,2,31,0.14)',
      },
      fontFamily: {
        serif: ['Gyahegi', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 18px 40px rgba(255, 165, 0, 0.22)',
        soft: '0 22px 70px rgba(95, 2, 31, 0.16)',
        luxe: '0 28px 80px rgba(31, 0, 10, 0.26)',
      },
      keyframes: {
        'menu-enter': {
          '0%': { opacity: '0', transform: 'translateX(18px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'menu-enter': 'menu-enter 220ms ease-out both',
      },
    },
  },
  plugins: [],
};
