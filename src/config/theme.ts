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
  nav: {
    surface: string;
    surfaceScrim: string;
    border: string;
    inactive: string;
    active: string;
    iconGlow: string;
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
      level0: "#0D0D0D",
      level1: "#141414",
      level2: "#1C1C1C",
      background: "#111111",
    },
    border: {
      level1: "#2E2E2E",
    },
    primary: {
      default: "#F5F5F5",
      dim: "#B0B0B0",
      active: "#E0E0E0",
    },
    accent: {
      amber: "#D4AF37",
    },
    gamification: {
      emerald: "#4EDEA3",
    },
    gradient: {
      premium: ["#F5F5F5", "#B0B0B0"] as const,
    },
    focus: {
      glow: "rgba(245, 245, 245, 0.15)",
    },
    glass: {
      border: "rgba(245, 245, 245, 0.08)",
    },
    text: {
      primary: "#F5F5F5",
      secondary: "#B0B0B0",
      disabled: "#3D3D3D",
      // Primary is now white — text on a primary surface must be dark
      onPrimary: "#0D0D0D",
    },
    semantic: {
      success: "#4EDEA3",
      warning: "#D4AF37",
      error: "#F87171",
    },
    nav: {
      surface: "#141414",
      surfaceScrim: "rgba(20, 20, 20, 0.92)",
      border: "#2E2E2E",
      inactive: "#555555",
      active: "#F5F5F5",
      iconGlow: "rgba(245, 245, 245, 0.2)",
    },
  },
  typography: {
    displayLg: {
      fontFamily: "PlusJakartaSans_800ExtraBold",
      fontSize: 48,
      fontWeight: "800" as const,
      lineHeight: 52,
      letterSpacingEm: -0.04,
    },
    headlineLg: {
      fontFamily: "PlusJakartaSans_700Bold",
      fontSize: 32,
      fontWeight: "700" as const,
      lineHeight: 38,
      letterSpacingEm: -0.02,
    },
    headlineLgMobile: {
      fontFamily: "PlusJakartaSans_700Bold",
      fontSize: 28,
      fontWeight: "700" as const,
      lineHeight: 34,
      letterSpacingEm: -0.02,
    },
    headlineMd: {
      fontFamily: "PlusJakartaSans_700Bold",
      fontSize: 24,
      fontWeight: "700" as const,
      lineHeight: 30,
      letterSpacingEm: -0.01,
    },
    bodyLg: {
      fontFamily: "PlusJakartaSans_400Regular",
      fontSize: 18,
      fontWeight: "400" as const,
      lineHeight: 28,
      letterSpacingEm: 0,
    },
    bodyMd: {
      fontFamily: "PlusJakartaSans_400Regular",
      fontSize: 16,
      fontWeight: "400" as const,
      lineHeight: 24,
      letterSpacingEm: 0,
    },
    labelMd: {
      fontFamily: "PlusJakartaSans_600SemiBold",
      fontSize: 14,
      fontWeight: "600" as const,
      lineHeight: 20,
      letterSpacingEm: 0.02,
    },
    labelSm: {
      fontFamily: "PlusJakartaSans_700Bold",
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
    skeletonBase: "#1C1C1C",
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
    nav: { ...c.nav },
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

/** Maps font weight to the loaded @expo-google-fonts/plus-jakarta-sans family name. */
export function jakartaSansFontFamily(weight: FontWeight): string {
  switch (weight) {
    case "800":
      return "PlusJakartaSans_800ExtraBold";
    case "700":
      return "PlusJakartaSans_700Bold";
    case "600":
      return "PlusJakartaSans_600SemiBold";
    case "500":
      return "PlusJakartaSans_500Medium";
    default:
      return "PlusJakartaSans_400Regular";
  }
}

/** Converts a typography token into a React Native TextStyle. */
export function toTextStyle(token: TypographyToken): TextStyle {
  const style: TextStyle = {
    fontFamily: jakartaSansFontFamily(token.fontWeight),
    fontSize: token.fontSize,
    // fontWeight omitted — weight is encoded in the Plus Jakarta Sans family name
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

/** HTML nav surface scrim — surface-container @ 90%. */
export function navSurfaceStyle(theme: Theme): Pick<ViewStyle, "backgroundColor"> {
  return { backgroundColor: theme.colors.nav.surfaceScrim };
}
