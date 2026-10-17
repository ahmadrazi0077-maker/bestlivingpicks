import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Editorial design system (strategy v1):
        // warm paper background, ink text, sage accent.
        cream: '#FAF8F5',
        sand: '#F1ECE3',
        ink: '#252525',
        muted: '#686868',
        line: '#E8E3DC',
        sage: {
          light: '#E9F0EB',
          DEFAULT: '#637D70',
          dark: '#4C6156',
        },
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
