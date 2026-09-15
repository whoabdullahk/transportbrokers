/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
        'industrial': '0.08em',
        'tightest': '-0.035em',
      },
      boxShadow: {
        'lime-glow': '0 0 25px rgba(132, 204, 22, 0.25)',
        'lime-glow-lg': '0 0 45px rgba(132, 204, 22, 0.35)',
        'dark-elevation': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
}

