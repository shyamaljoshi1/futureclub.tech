/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          light: '#fbfbfa',
          dark: '#0c0d0f',
        },
        surface: {
          light: '#ffffff',
          dark: '#141619',
        },
        'surface-subtle': {
          light: '#f4f4f0',
          dark: '#1c1f24',
        },
        ink: {
          light: '#111215',
          dark: '#f4f4f5',
        },
        'ink-muted': {
          light: '#5e626d',
          dark: '#8e93a0',
        },
        'ink-soft': {
          light: '#888d99',
          dark: '#636773',
        },
        border: {
          light: '#e5e5e0',
          dark: '#22252c',
        },
        accent: {
          DEFAULT: '#1e3a8a',
          dark: '#3b82f6',
          hover: '#172554',
          'hover-dark': '#60a5fa',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      spacing: {
        'section-gap': '120px',
      },
    },
  },
  plugins: [],
}
