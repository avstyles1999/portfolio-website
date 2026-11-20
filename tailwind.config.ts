import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#FAFAFA",
          surface: "#FFFFFF",
          text: "#1A1A1A",
          muted: "#6B7280",
          border: "#E5E7EB",
          accent: "#047857",
          accentDark: "#065F46",
          accentSoft: "#ECFDF5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
