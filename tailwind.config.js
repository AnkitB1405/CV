/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#04070f',
        panel: '#091124',
        cyan: '#4ef4ff',
        electric: '#3f8cff',
        mint: '#7dffc8'
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Manrope', 'sans-serif']
      },
      boxShadow: {
        neon: '0 0 20px rgba(78, 244, 255, 0.28)',
        card: '0 20px 40px rgba(0, 0, 0, 0.4)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(78, 244, 255, 0.0)' },
          '50%': { boxShadow: '0 0 24px rgba(78, 244, 255, 0.35)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
