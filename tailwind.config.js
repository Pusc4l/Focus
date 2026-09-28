/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FDF6EC",
        navy: "#2B3050",
        ink: "#2A2A35",
        mist: "#F3EFE6",
        danger: "#D64545",
        // Theme-aware colors (channels defined per theme in index.css)
        peach: "rgb(var(--c-peach) / <alpha-value>)",
        clay: "rgb(var(--c-clay) / <alpha-value>)",
        ember: "rgb(var(--c-ember) / <alpha-value>)",
        sage: "rgb(var(--c-sage) / <alpha-value>)",
        moss: "rgb(var(--c-moss) / <alpha-value>)",
        oncard: "rgb(var(--c-oncard) / <alpha-value>)",
      },
      fontFamily: {
        display: ["'Poppins'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.75rem",
      },
      boxShadow: {
        soft: "0 8px 24px -8px rgba(43, 48, 80, 0.18)",
      },
      backgroundImage: {
        "warm-grad": "var(--grad-main)",
        "break-grad": "var(--grad-break)",
        "card-grad": "var(--grad-card)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};
