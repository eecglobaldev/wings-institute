import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Ensure we don't override default Tailwind colors
      // Only extend with custom colors
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Only extend with custom colors, don't override defaults
        wings: {
          red: '#4F46E5',
          dark: '#050507',
          gray: '#F5F5F7',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'glass-hover': '0 20px 40px 0 rgba(0, 0, 0, 0.1)',
        'glow': '0 0 30px rgba(79, 70, 229, 0.3)',
        'glow-red': '0 0 30px rgba(239, 68, 68, 0.4)',
        'inner-light': 'inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
      },
      animation: {
        'blob': 'blob 15s infinite alternate cubic-bezier(0.4, 0, 0.2, 1)',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse-slow': 'spin-reverse 20s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'radar-spin': 'spin 4s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'slide-down': 'slideDown 0.5s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'spin-reverse': {
          'to': { transform: 'rotate(-360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      letterSpacing: {
        'tightest': '-0.05em',
      },
    },
  },
  plugins: [],
};

export default config;
