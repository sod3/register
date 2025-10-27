/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'inter-tight': ['"Inter Tight"', 'sans-serif'],
      },
      colors: {
        'electric-blue': '#00f5ff',
        'neon-cyan': '#00ffff',
        'deep-violet': '#8b00ff',
      },
      animation: {
        'glow': 'glow 1s ease-in-out infinite alternate',
        'particle-burst': 'particleBurst 0.5s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00f5ff, 0 0 10px #00f5ff' },
          '100%': { boxShadow: '0 0 20px #00f5ff, 0 0 30px #00f5ff' },
        },
        particleBurst: {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 0 },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};