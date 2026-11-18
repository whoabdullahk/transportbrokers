/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './artifacts/nichols-frontend/index.html',
    './artifacts/nichols-frontend/src/**/*.{js,ts,jsx,tsx}',
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        // Sophisticated Color System
        'brand-black': '#080808',
        'brand-charcoal': '#111111',
        'brand-surface': '#171717',
        'brand-border': '#262626',
        'brand-card': '#141414',
        'brand-offwhite': '#F5F5F0',
        gold: {
          300: '#FFF0A8',
          400: '#F5D061',
          500: '#D4AF37', // Signature Metallic Gold
          600: '#B8860B',
          700: '#946C0B',
        },
        lime: {
          400: '#D4AF37',
          500: '#D4AF37',
          600: '#B8860B',
          700: '#946C0B',
        },
        beige: '#f5f5dc',
      },
      fontFamily: {
        sans: [
          '"Inter"',
          '"Plus Jakarta Sans"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.05em',
        wider: '0.1em',
        widest: '0.2em',
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.7)',
        glow: '0 0 40px -10px rgba(212, 175, 55, 0.25)',
        'glow-strong': '0 0 60px -15px rgba(212, 175, 55, 0.4)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
