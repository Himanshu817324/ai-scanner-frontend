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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        risk: {
          low: "#10b981",
          medium: "#f59e0b",
          high: "#ef4444",
          critical: "#b91c1c"
        }
      },
    },
  },
  plugins: [],
};
export default config;
