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
        verde: {
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#D4D4D4",
          300: "#A3A3A3",
          400: "#525252",
          500: "#111111",
          600: "#0D0D0D",
          700: "#222222",
          800: "#333333",
          900: "#000000",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
