import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}" // REQUIRED for shadcn utils
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        mindgym: {
          bg: "#050814",
          bgSoft: "#080c1b",
          card: "rgba(15, 23, 42, 0.75)",
          accent: "#38bdf8",
          accentSoft: "#0ea5e9",
          accentMuted: "#7dd3fc"
        }
      },
      backgroundImage: {
        "mindgym-gradient":
          "radial-gradient(circle at 0% 0%, #0f172a, transparent 55%), radial-gradient(circle at 100% 100%, #0b1120, transparent 55%), linear-gradient(135deg, #020617, #020617)"
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem"
      },
      boxShadow: {
        glass: "0 18px 45px rgba(15, 23, 42, 0.65)",
        "inner-soft": "inset 0 0 0 1px rgba(148, 163, 184, 0.18)"
      },
      backdropBlur: {
        xs: "2px"
      },
      keyframes: {
        "pulse-soft": {
          "0%,100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.03)" }
        },
        "typing-dot": {
          "0%, 60%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "30%": { transform: "translateY(-2px)", opacity: "1" }
        }
      },
      animation: {
        "pulse-soft": "pulse-soft 2.2s ease-in-out infinite",
        "typing-dot-1": "typing-dot 1.2s ease-in-out infinite",
        "typing-dot-2": "typing-dot 1.2s ease-in-out 0.2s infinite",
        "typing-dot-3": "typing-dot 1.2s ease-in-out 0.4s infinite",
        "spin-slow": "spin 16s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;