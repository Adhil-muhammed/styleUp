import type { TextStyle, ViewStyle } from "react-native";

// ─── Midnight Edge — Token Types ──────────────────────────────────────────────

export type AppTheme = "midnight";

export type FontWeight =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export interface TypographyToken {
  fontFamily: string;
  fontSize: number;
  fontWeight: FontWeight;
  lineHeight: number;
  /** Letter-spacing in em units — converted to RN points via toTextStyle */
  letterSpacingEm: number;
  textTransform?: "uppercase" | "none";
}

export interface TypographyScale {
  displayLg: TypographyToken;
  headlineLg: TypographyToken;
  headlineLgMobile: TypographyToken;
  headlineMd: TypographyToken;
  bodyLg: TypographyToken;
  bodyMd: TypographyToken;
  labelMd: TypographyToken;
  labelSm: TypographyToken;
}

export interface ColorPalette {
  depth: {
    level0: string;
    level1: string;
    level2: string;
    background: string;
  };
  border: {
    level1: string;
  };
  primary: {
    default: string;
    dim: string;
    active: string;
  };
  accent: {
    amber: string;
  };
  gamification: {
    emerald: string;
  };
  gradient: {
    premium: readonly [string, string];
  };
  focus: {
    glow: string;
  };
  glass: {
    border: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    onPrimary: string;
  };
  semantic: {
    success: string;
    warning: string;
    error: string;
  };
  /** @deprecated Use colors.depth.level0 */
  background: string;
  /** @deprecated Use colors.depth.level1 */
  surface: string;
  /** @deprecated Use colors.depth.level2 */
  surfaceElevated: string;
  /** @deprecated Use colors.primary.default */
  primaryLegacy: string;
  /** @deprecated Use colors.text.primary */
  textPrimary: string;
  /** @deprecated Use colors.text.secondary */
  textSecondary: string;
}

export interface SpacingScale {
  containerMargin: number;
  gutter: number;
  stackSm: number;
  stackMd: number;
  stackLg: number;
  sectionGap: number;
}

export interface BorderRadiusScale {
  sm: number;
  default: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface LayoutTokens {
  columns: number;
  containerMargin: number;
}

export interface MotionTokens {
  spring: {
    stiffness: number;
    damping: number;
  };
  skeletonBase: string;
}

export interface IconTokens {
  strokeWidth: number;
}

export interface GlassmorphismTokens {
  blur: number;
}

export interface Theme {
  colors: ColorPalette;
  spacing: SpacingScale;
  typography: TypographyScale;
  borderRadius: BorderRadiusScale;
  layout: LayoutTokens;
  motion: MotionTokens;
  icon: IconTokens;
  glassmorphism: GlassmorphismTokens;
}

// ─── Immutable Midnight Edge Tokens ───────────────────────────────────────────

export const midnightEdgeTokens = {
  colors: {
    depth: {
      level0: "#0A0A0F",
      level1: "#111118",
      level2: "#1A1A24",
      background: "#131318",
    },
    border: {
      level1: "#2A2A3A",
    },
    primary: {
      default: "#7C3AED",
      dim: "#D2BBFF",
      active: "#6D28D9",
    },
    accent: {
      amber: "#FFB95F",
    },
    gamification: {
      emerald: "#4EDEA3",
    },
    gradient: {
      premium: ["#7C3AED", "#EC4899"] as const,
    },
    focus: {
      glow: "rgba(124, 58, 237, 0.4)",
    },
    glass: {
      border: "rgba(124, 58, 237, 0.15)",
    },
    text: {
      primary: "#F4F4F5",
      secondary: "#A1A1AA",
      disabled: "#52525B",
      onPrimary: "#FFFFFF",
    },
    semantic: {
      success: "#4EDEA3",
      warning: "#FFB95F",
      error: "#F87171",
    },
  },
  typography: {
    displayLg: {
      fontFamily: "Inter",
      fontSize: 48,
      fontWeight: "800" as const,
      lineHeight: 52,
      letterSpacingEm: -0.04,
    },
    headlineLg: {
      fontFamily: "Inter",
      fontSize: 32,
      fontWeight: "700" as const,
      lineHeight: 38,
      letterSpacingEm: -0.02,
    },
    headlineLgMobile: {
      fontFamily: "Inter",
      fontSize: 28,
      fontWeight: "700" as const,
      lineHeight: 34,
      letterSpacingEm: -0.02,
    },
    headlineMd: {
      fontFamily: "Inter",
      fontSize: 24,
      fontWeight: "700" as const,
      lineHeight: 30,
      letterSpacingEm: -0.01,
    },
    bodyLg: {
      fontFamily: "Inter",
      fontSize: 18,
      fontWeight: "400" as const,
      lineHeight: 28,
      letterSpacingEm: 0,
    },
    bodyMd: {
      fontFamily: "Inter",
      fontSize: 16,
      fontWeight: "400" as const,
      lineHeight: 24,
      letterSpacingEm: 0,
    },
    labelMd: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "600" as const,
      lineHeight: 20,
      letterSpacingEm: 0.02,
    },
    labelSm: {
      fontFamily: "Inter",
      fontSize: 12,
      fontWeight: "700" as const,
      lineHeight: 16,
      letterSpacingEm: 0.05,
      textTransform: "uppercase" as const,
    },
  },
  borderRadius: {
    sm: 4,
    default: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  spacing: {
    containerMargin: 20,
    gutter: 16,
    stackSm: 8,
    stackMd: 16,
    stackLg: 24,
    sectionGap: 40,
  },
  layout: {
    columns: 4,
    containerMargin: 20,
  },
  motion: {
    spring: {
      stiffness: 300,
      damping: 20,
    },
    skeletonBase: "#1A1A24",
  },
  icon: {
    strokeWidth: 1.5,
  },
  glassmorphism: {
    blur: 20,
  },
} as const;

export type MidnightEdgeTokens = typeof midnightEdgeTokens;

// ─── Theme Assembly ───────────────────────────────────────────────────────────

const { colors: c, typography, borderRadius, spacing, layout, motion, icon, glassmorphism } =
  midnightEdgeTokens;

export const midnightEdgeTheme: Theme = {
  colors: {
    depth: { ...c.depth },
    border: { ...c.border },
    primary: { ...c.primary },
    accent: { ...c.accent },
    gamification: { ...c.gamification },
    gradient: { premium: [...c.gradient.premium] as [string, string] },
    focus: { ...c.focus },
    glass: { ...c.glass },
    text: { ...c.text },
    semantic: { ...c.semantic },
    background: c.depth.level0,
    surface: c.depth.level1,
    surfaceElevated: c.depth.level2,
    primaryLegacy: c.primary.default,
    textPrimary: c.text.primary,
    textSecondary: c.text.secondary,
  },
  typography: { ...typography },
  borderRadius: { ...borderRadius },
  spacing: { ...spacing },
  layout: { ...layout },
  motion: { ...motion },
  icon: { ...icon },
  glassmorphism: { ...glassmorphism },
};

export const themes: Record<AppTheme, Theme> = {
  midnight: midnightEdgeTheme,
};

// ─── Typography Helper ────────────────────────────────────────────────────────

/** Maps font weight to the loaded @expo-google-fonts/inter family name. */
export function interFontFamily(weight: FontWeight): string {
  switch (weight) {
    case "800":
      return "Inter_800ExtraBold";
    case "700":
      return "Inter_700Bold";
    case "600":
      return "Inter_600SemiBold";
    default:
      return "Inter_400Regular";
  }
}

/** Converts a Midnight Edge typography token into a React Native TextStyle. */
export function toTextStyle(token: TypographyToken): TextStyle {
  const style: TextStyle = {
    fontFamily: interFontFamily(token.fontWeight),
    fontSize: token.fontSize,
    fontWeight: token.fontWeight,
    lineHeight: token.lineHeight,
    letterSpacing: token.fontSize * token.letterSpacingEm,
  };

  if (token.textTransform !== undefined) {
    style.textTransform = token.textTransform;
  }

  return style;
}

/** Focus ring shadow props for interactive inputs and containers. */
export function focusGlowStyle(theme: Theme): Pick<
  ViewStyle,
  "shadowColor" | "shadowOffset" | "shadowOpacity" | "shadowRadius"
> {
  return {
    shadowColor: theme.colors.focus.glow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  };
}
