/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./index.ts"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        depth: {
          0: "#0A0A0F",
          1: "#111118",
          2: "#1A1A24",
          bg: "#131318",
        },
        border: {
          DEFAULT: "#2A2A3A",
        },
        primary: {
          DEFAULT: "#7C3AED",
          dim: "#D2BBFF",
          active: "#6D28D9",
        },
        accent: {
          amber: "#FFB95F",
        },
        gamification: {
          emerald: "#4EDEA3",
        },
        nav: {
          surface: "#1F1F25",
          border: "#4A4455",
          inactive: "#CCC3D8",
          active: "#D2BBFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "System"],
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "52px", letterSpacing: "-0.04em", fontWeight: "800" }],
        "headline-lg": ["32px", { lineHeight: "38px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg-mobile": ["28px", { lineHeight: "34px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "30px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "28px", letterSpacing: "0em", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", letterSpacing: "0em", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.02em", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "700" }],
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
