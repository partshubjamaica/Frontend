import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#081122",
        purple: "#7C4DFF",
        pink: "#FF4FA2",
        cloud: "#F5F7FA"
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(8, 17, 34, 0.10)",
        glow: "0 18px 45px rgba(255, 79, 162, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
