// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        'in-out-smooth': 'cubic-bezier(0.45, 0, 0.55, 1)',
      },
      animation: {
        swapPulse: 'swapPulse 0.5s ease-in-out',
        rise: 'rise 0.8s ease-in-out',
      },
      keyframes: {
        swapPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.25)' },
        },
        rise: {
          '0%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
