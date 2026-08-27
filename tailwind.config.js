/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0A',
          secondary: '#111111',
          card: '#161616',
          glass: 'rgba(20,20,20,0.7)',
        },
        accent: {
          primary: '#C9A84C',    // rich gold
          secondary: '#E8C97A',  // light gold
          glow: '#C9A84C22',
          warm: '#F5E6C4',       // near-white warm
          red: '#C0392B',        // accent red for occasional use
          green: '#27AE60',      // success green
        },
        text: {
          primary: '#F5F0E8',    // warm white
          secondary: '#B0A898',  // warm grey
          muted: '#6B6560',      // muted warm
        },
        border: {
          subtle: 'rgba(201,168,76,0.12)',
          glow: 'rgba(201,168,76,0.45)',
        },
        gold: {
          50:  '#FDF9EE',
          100: '#FAF0D0',
          200: '#F3DC9F',
          300: '#E8C97A',
          400: '#D9AF52',
          500: '#C9A84C',
          600: '#A8882D',
          700: '#876821',
          800: '#65501A',
          900: '#3E3212',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Cal Sans', 'Inter', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'dot-pattern': "radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",
        'gold-gradient': "linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)",
        'dark-gradient': "linear-gradient(180deg, #0A0A0A 0%, #111111 100%)",
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(201,168,76,0.12)',
        'glow-md': '0 0 40px rgba(201,168,76,0.18)',
        'glow-lg': '0 0 60px rgba(201,168,76,0.22)',
        'inner-glow': 'inset 0 0 30px rgba(201,168,76,0.08)',
        'card': '0 4px 6px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.5)',
        'gold': '0 0 30px rgba(201,168,76,0.25), 0 4px 15px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
