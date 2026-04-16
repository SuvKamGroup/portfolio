/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f5f0e8',
        ink: '#1a1a1a',
        ink2: '#444444',
        accent: '#e63946',
        yellow: '#f5c842',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        brut2: '2px 2px 0 0 #1a1a1a',
        brut3: '3px 3px 0 0 #1a1a1a',
        brut4: '4px 4px 0 0 #1a1a1a',
        brut6: '6px 6px 0 0 #1a1a1a',
        brut8: '8px 8px 0 0 #1a1a1a',
      },
      borderWidth: {
        3: '3px',
      },
      fontSize: {
        huge: 'clamp(3rem, 8vw, 7rem)',
      },
    },
  },
  plugins: [],
}
