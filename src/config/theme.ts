// ─── Token Interfaces ─────────────────────────────────────────────────────────

export type AppTheme = "light" | "dark";

export interface ColorPalette {
  // Brand
  primary: string;
  primaryLight: string;
  primaryDark: string;
  // XP / Gamification
  xpGold: string;
  xpGoldLight: string;
  xpSilver: string;
  xpBronze: string;
  // Semantic
  success: string;
  warning: string;
  error: string;
  info: string;
  // Surfaces
  background: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  borderSubtle: string;
  // Text
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  textInverse: string;
  textOnPrimary: string;
}

export interface SpacingScale {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface TypographyToken {
  fontFamily: string;
  fontSize: number;
  fontWeight:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  lineHeight: number;
  letterSpacing: number;
}

export interface TypographyScale {
  // Display
  displayLarge: TypographyToken;
  displayMedium: TypographyToken;
  displaySmall: TypographyToken;
  // Heading
  headingLarge: TypographyToken;
  headingMedium: TypographyToken;
  headingSmall: TypographyToken;
  // Body
  bodyLarge: TypographyToken;
  bodyMedium: TypographyToken;
  bodySmall: TypographyToken;
  // Label
  labelLarge: TypographyToken;
  labelMedium: TypographyToken;
  labelSmall: TypographyToken;
  // Mono
  mono: TypographyToken;
}

export interface BorderRadiusScale {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface Theme {
  colors: ColorPalette;
  spacing: SpacingScale;
  typography: TypographyScale;
  borderRadius: BorderRadiusScale;
}

// ─── Shared Tokens ─────────────────────────────────────────────────────────────

const spacing: SpacingScale = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

const borderRadius: BorderRadiusScale = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  full: 9999,
};

const typography: TypographyScale = {
  displayLarge: {
    fontFamily: "System",
    fontSize: 57,
    fontWeight: "700",
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily: "System",
    fontSize: 45,
    fontWeight: "700",
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: "System",
    fontSize: 36,
    fontWeight: "700",
    lineHeight: 44,
    letterSpacing: 0,
  },
  headingLarge: {
    fontFamily: "System",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    letterSpacing: 0,
  },
  headingMedium: {
    fontFamily: "System",
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 36,
    letterSpacing: 0,
  },
  headingSmall: {
    fontFamily: "System",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  bodyMedium: {
    fontFamily: "System",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: "System",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  labelLarge: {
    fontFamily: "System",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: "System",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: "System",
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  mono: {
    fontFamily: "monospace",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 0,
  },
};

// ─── Light Theme ──────────────────────────────────────────────────────────────

export const lightTheme: Theme = {
  colors: {
    primary: "#7C3AED",
    primaryLight: "#A78BFA",
    primaryDark: "#5B21B6",
    xpGold: "#F59E0B",
    xpGoldLight: "#FDE68A",
    xpSilver: "#9CA3AF",
    xpBronze: "#B45309",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
    background: "#FAFAFA",
    surface: "#FFFFFF",
    surfaceElevated: "#F3F4F6",
    border: "#E5E7EB",
    borderSubtle: "#F3F4F6",
    textPrimary: "#111827",
    textSecondary: "#6B7280",
    textDisabled: "#D1D5DB",
    textInverse: "#FFFFFF",
    textOnPrimary: "#FFFFFF",
  },
  spacing,
  typography,
  borderRadius,
};

// ─── Dark Theme ───────────────────────────────────────────────────────────────

export const darkTheme: Theme = {
  colors: {
    primary: "#A78BFA",
    primaryLight: "#C4B5FD",
    primaryDark: "#7C3AED",
    xpGold: "#FCD34D",
    xpGoldLight: "#FEF08A",
    xpSilver: "#9CA3AF",
    xpBronze: "#D97706",
    success: "#34D399",
    warning: "#FCD34D",
    error: "#F87171",
    info: "#60A5FA",
    background: "#0F0F0F",
    surface: "#1A1A1A",
    surfaceElevated: "#262626",
    border: "#2E2E2E",
    borderSubtle: "#1F1F1F",
    textPrimary: "#F9FAFB",
    textSecondary: "#9CA3AF",
    textDisabled: "#4B5563",
    textInverse: "#111827",
    textOnPrimary: "#FFFFFF",
  },
  spacing,
  typography,
  borderRadius,
};

// ─── Theme Registry ───────────────────────────────────────────────────────────

export const themes: Record<AppTheme, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};
