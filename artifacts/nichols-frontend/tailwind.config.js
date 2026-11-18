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
        lime: {
          400: '#a3e635',
          500: '#84cc16', // Primary brand electric lime
          600: '#65a30d',
          700: '#4d7c0f',
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
        glow: '0 0 40px -10px rgba(132, 204, 22, 0.15)',
        'glow-strong': '0 0 60px -15px rgba(132, 204, 22, 0.3)',
      },
    },
  },
  plugins: [],
}
