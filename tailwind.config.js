/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./index.ts"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Extend with design tokens from src/config/theme.ts for full Tailwind parity
        brand: {
          primary: "#7C3AED",
          light: "#A78BFA",
          dark: "#5B21B6",
        },
        xp: {
          gold: "#F59E0B",
          silver: "#9CA3AF",
          bronze: "#B45309",
        },
      },
    },
  },
  plugins: [],
};
