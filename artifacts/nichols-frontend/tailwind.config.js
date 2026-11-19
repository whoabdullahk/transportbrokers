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
        // Sophisticated Color System aligned with AI Design Skill rules
        'brand-black': '#000000',
        'brand-charcoal': '#181818',
        'brand-surface': '#1F1F1F',
        'brand-elevated': '#272727',
        'brand-border': '#262626',
        'brand-card': '#181818',
        'brand-dark-gold': '#131209',
        'brand-offwhite': '#F5F5F0',
        gold: {
          300: '#FFF0A8',
          400: '#F5D061',
          500: '#D4AF37', // Signature Metallic Gold Accent
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
          '"Geist"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        mono: [
          '"Geist Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      transitionTimingFunction: {
        decel: 'cubic-bezier(0.22, 1, 0.36, 1)',
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
