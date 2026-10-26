import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Archivo Black", "Arial Black", "sans-serif"],
      },
      colors: {
        bg: "#070810",
        "bg-2": "#0b0d18",
        surface: "#0f1220",
        "surface-2": "#161928",
        accent: "#00d4ff",
        violet: "#7c3aed",
        muted: "#6b7a99",
        faint: "#2e3650",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        float: "float 7s ease-in-out infinite",
        blink: "blink 1.1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
}

export default config
