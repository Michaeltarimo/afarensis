/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '320px',     // Small phones
      'sm': '375px',     // Large phones
      'md': '768px',     // Tablets
      'lg': '1024px',    // Laptops/Desktops
      'xl': '1280px',    // Large Laptops
      '2xl': '1536px',   // Large Desktops
      '3xl': '1920px',   // Ultra Wide
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#65a30d', // lime-600
          light: '#a3e635',   // lime-400
          dark: '#4d7c0f',    // lime-700
        },
        secondary: {
          DEFAULT: '#84cc16', // lime-500
          light: '#a3e635',   // lime-400
          dark: '#65a30d',    // lime-600
        },
        accent: {
          DEFAULT: '#F97316', // orange-500
          light: '#FB923C',   // orange-400
          dark: '#EA580C',    // orange-600
        },
        background: {
          light: '#FFFFFF',     // white
          dark: '#000000',      // pure black
          'elevated-light': '#F8FAFC', // slate-50
          'elevated-dark': '#0A0A0A',  // almost black
        },
        text: {
          primary: '#171717',   // neutral-900 (light mode)
          secondary: '#404040', // neutral-700 (light mode)
          muted: '#737373',     // neutral-500
          'dark-primary': '#FFFFFF',   // pure white (dark mode)
          'dark-secondary': '#E5E5E5', // slightly off-white (dark mode)
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
      },
      backgroundImage: {
        'dot-lime-400': 'radial-gradient(circle at center, #84cc16 2px, transparent 2px)',
        'dot-lime-600': 'radial-gradient(circle at center, #65a30d 2px, transparent 2px)',
      },
      backgroundSize: {
        'dot': '24px 24px',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.2 }
        }
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    },
  },
  plugins: [],
};
