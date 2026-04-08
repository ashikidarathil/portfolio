/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#060a14",
        secondary: "#94a3b8",
        tertiary: "#0d1526",
        "black-100": "#0a0f1c",
        "black-200": "#080c18",
        "white-100": "#e2e8f0",
        accent: "#f59e0b",
        "accent-light": "#fbbf24",
        "accent-dark": "#d97706",
        coral: "#f97316",
        teal: "#14b8a6",
        "teal-light": "#2dd4bf",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Plus Jakarta Sans", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      boxShadow: {
        card: "0px 35px 120px -15px #0d1526",
        "card-hover": "0px 25px 80px -10px rgba(245,158,11,0.2)",
        "amber-glow": "0 0 40px rgba(245,158,11,0.25)",
        "teal-glow": "0 0 30px rgba(20,184,166,0.2)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
        "amber-gradient": "linear-gradient(135deg, #f59e0b, #f97316)",
        "teal-gradient": "linear-gradient(135deg, #14b8a6, #06b6d4)",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        "float": "float 7s ease-in-out infinite",
        "pulse-amber": "pulseAmber 2.5s ease-in-out infinite",
        "slide-up": "slideUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "aurora-shift": "aurora-shift 12s ease infinite",
        "shimmer": "shimmer 4s linear infinite",
        "ring-spin": "ring-spin 20s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "bounce-slow": "bounceSlow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-22px)" },
        },
        pulseAmber: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245,158,11,0.3)" },
          "50%": { boxShadow: "0 0 50px rgba(245,158,11,0.6)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "aurora-shift": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
        shimmer: {
          "0%": { "background-position": "-200% center" },
          "100%": { "background-position": "200% center" },
        },
        "ring-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
