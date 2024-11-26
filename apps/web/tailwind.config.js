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
          dark: '#262626',      // neutral-800
          'elevated-light': '#F8FAFC', // slate-50
          'elevated-dark': '#404040',  // neutral-700
        },
        text: {
          primary: '#171717',   // neutral-900 (light mode)
          secondary: '#404040', // neutral-700 (light mode)
          muted: '#737373',     // neutral-500
          'dark-primary': '#F3F4F6',   // gray-100 (dark mode)
          'dark-secondary': '#D1D5DB', // gray-300 (dark mode)
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
      },
    },
  },
  plugins: [],
};
