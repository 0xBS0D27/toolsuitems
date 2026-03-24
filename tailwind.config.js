/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        notion: {
          sidebar: '#fafaf9',
          sidebarHover: '#f3f3f0',
          sidebarActive: '#e8e7e4',
          sidebarActiveBlue: '#eef2ff',
          accent: '#4f46e5',
          accentLight: '#eef2ff',
          bg: '#f5f5f4',
          page: '#fafaf8',
          border: 'rgba(55, 53, 47, 0.09)',
          borderThin: 'rgba(55, 53, 47, 0.06)',
          text: 'rgba(55, 53, 47, 0.95)',
          textMuted: 'rgba(55, 53, 47, 0.65)',
        },
        chip: {
          ideas: { bg: '#dcfce7', text: '#166534' },
          prioridad: { bg: '#f3e8ff', text: '#6b21a8' },
          default: { bg: '#f4f4f5', text: '#52525b' },
        },
      },
      transitionDuration: {
        notion: '150ms',
      },
      boxShadow: {
        notion: '0 1px 2px rgba(0,0,0,0.04)',
        card: '0 1px 3px rgba(0,0,0,0.06)',
      },
      backgroundImage: {
        'header-gradient': 'linear-gradient(to right, #eff6ff 0%, #f5f3ff 50%, #fdf2f8 100%)',
      },
    },
  },
  plugins: [],
}
