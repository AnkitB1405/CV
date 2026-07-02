/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0F1A',
        surface: '#111827',
        surface2: '#0D1220',
        ink: '#E8EEF7',
        muted: '#93A1B8',
        ember: '#3B82F6',
        emberBright: '#60A5FA',
        oxblood: '#1D4ED8',
        line: 'rgba(59,130,246,0.16)'
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'sans-serif'],
        mono: ['"Spline Sans Mono"', 'monospace']
      },
      boxShadow: {
        ember: '0 0 30px rgba(59,130,246,0.28)',
        gloss: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 10px 26px rgba(59,130,246,0.30)',
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
