import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#003366", // Dark blue
          light: "#4D88CC", // Light blue (soft variation)
          dark: "#001A33", // Darker blue (deep shade)
        },
        secondary: {
          DEFAULT: "#A7F432", // Bright lemon green
          light: "#C4FF66", // Lighter lemon green
          dark: "#85C327", // Darker lemon green
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
