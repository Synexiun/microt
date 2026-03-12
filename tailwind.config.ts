import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A96E",
          light: "#D4AF37",
          dark: "#B8943F",
        },
        champagne: "#C9A96E",
        beige: "#F5F0E8",
        dark: {
          DEFAULT: "#0A0A0A",
          light: "#1A1A1A",
          lighter: "#2A2A2A",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Playfair Display", "serif"],
        body: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #C9A96E 0%, #D4AF37 50%, #C9A96E 100%)",
        "gold-gradient-horizontal":
          "linear-gradient(90deg, #C9A96E 0%, #D4AF37 50%, #C9A96E 100%)",
        "gold-shimmer":
          "linear-gradient(110deg, transparent 25%, rgba(212,175,55,0.15) 50%, transparent 75%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(201, 169, 110, 0.3)",
        "glow-lg": "0 0 40px rgba(201, 169, 110, 0.4)",
        "glow-sm": "0 0 10px rgba(201, 169, 110, 0.2)",
        gold: "0 4px 20px rgba(201, 169, 110, 0.25)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s ease-out forwards",
        slideIn: "slideIn 0.6s ease-out forwards",
        pulse: "pulse 2s ease-in-out infinite",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};

export default config;
