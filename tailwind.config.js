/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./index.ts"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        depth: {
          0: "#0D0D0D",
          1: "#141414",
          2: "#1C1C1C",
          bg: "#111111",
        },
        border: {
          DEFAULT: "#2E2E2E",
          strong: "#3D3D3D",
        },
        primary: {
          DEFAULT: "#F5F5F5",
          dim: "#B0B0B0",
          active: "#E0E0E0",
        },
        text: {
          primary: "#F5F5F5",
          secondary: "#B0B0B0",
          muted: "#666666",
          disabled: "#3D3D3D",
        },
        surface: {
          1: "#141414",
          2: "#1C1C1C",
          3: "#252525",
        },
        accent: {
          amber: "#D4AF37",
        },
        gamification: {
          emerald: "#4EDEA3",
        },
        nav: {
          surface: "#141414",
          border: "#2E2E2E",
          inactive: "#555555",
          active: "#F5F5F5",
        },
      },
      fontFamily: {
        sans:         ["PlusJakartaSans_400Regular", "System"],
        "sans-md":    ["PlusJakartaSans_500Medium", "System"],
        "sans-semi":  ["PlusJakartaSans_600SemiBold", "System"],
        "sans-bold":  ["PlusJakartaSans_700Bold", "System"],
        "sans-black": ["PlusJakartaSans_800ExtraBold", "System"],
      },
      fontSize: {
        "display-lg": [
          "48px",
          { lineHeight: "52px", letterSpacing: "-0.04em", fontWeight: "800" },
        ],
        "headline-lg": [
          "32px",
          { lineHeight: "38px", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "headline-lg-mobile": [
          "28px",
          { lineHeight: "34px", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "headline-md": [
          "24px",
          { lineHeight: "30px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "body-lg": [
          "18px",
          { lineHeight: "28px", letterSpacing: "0em", fontWeight: "400" },
        ],
        "body-md": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0em", fontWeight: "400" },
        ],
        "label-md": [
          "14px",
          { lineHeight: "20px", letterSpacing: "0.02em", fontWeight: "600" },
        ],
        "label-sm": [
          "12px",
          { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "700" },
        ],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
      spacing: {
        "container-margin": "20px",
        gutter: "16px",
        "stack-sm": "8px",
        "stack-md": "16px",
        "stack-lg": "24px",
        "section-gap": "40px",
      },
    },
  },
  plugins: [],
};
