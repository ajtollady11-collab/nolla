import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EC',
        oat: '#E6D9C9',
        mocha: '#765F50',
        charcoal: '#252321',
        // Derived tints (kept deliberately close to the core palette)
        'oat-soft': '#EFE6DA',
        'mocha-soft': '#F1E9E0',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Display scale for the serif headings
        'display-sm': ['2.5rem', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-md': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-lg': ['4.75rem', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'display-xl': ['6rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
        '6xl': '3.5rem',
      },
      boxShadow: {
        // Warm-tinted, very diffused shadows: never grey, never hard.
        pillow: '0 1px 2px rgba(118,95,80,0.06), 0 12px 32px -12px rgba(118,95,80,0.22)',
        cloud: '0 2px 4px rgba(118,95,80,0.04), 0 30px 80px -30px rgba(90,70,55,0.35)',
        lift: '0 2px 6px rgba(118,95,80,0.08), 0 22px 44px -18px rgba(90,70,55,0.35)',
        inner: 'inset 0 1px 0 rgba(255,255,255,0.7)',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        settle: {
          '0%': { opacity: '0', transform: 'scale(1.04)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        rise: 'rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        settle: 'settle 1.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        drift: 'drift 7s ease-in-out infinite',
        fade: 'fade 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
