/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07100F',
        surface: '#0E1A18',
        surface2: '#0A1413',
        ink: '#E8F1EF',
        muted: '#9CB3AE',
        ember: '#14B8A6',
        emberBright: '#2DD4BF',
        oxblood: '#0F766E',
        line: 'rgba(20,184,166,0.16)'
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'sans-serif'],
        mono: ['"Spline Sans Mono"', 'monospace']
      },
      boxShadow: {
        ember: '0 0 30px rgba(20,184,166,0.28)',
        gloss: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 10px 26px rgba(20,184,166,0.30)',
        card: '0 24px 50px rgba(0,0,0,0.55)'
      },
      borderRadius: {
        xl2: '1.25rem',
        pill: '999px'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      },
      animation: {
        float: 'float 7s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
