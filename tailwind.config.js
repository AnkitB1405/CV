/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0908',
        surface: '#17110E',
        surface2: '#100B09',
        ink: '#F2ECE8',
        muted: '#A6968E',
        ember: '#B4503A',
        emberBright: '#D46A4F',
        oxblood: '#7A2E22',
        line: 'rgba(180,80,58,0.16)'
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'sans-serif'],
        mono: ['"Spline Sans Mono"', 'monospace']
      },
      boxShadow: {
        ember: '0 0 30px rgba(180,80,58,0.28)',
        gloss: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 10px 26px rgba(180,80,58,0.30)',
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
