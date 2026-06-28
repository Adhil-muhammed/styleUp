import { TextStyle } from "react-native";

export const fonts = {
  regular:   "PlusJakartaSans_400Regular",
  medium:    "PlusJakartaSans_500Medium",
  semibold:  "PlusJakartaSans_600SemiBold",
  bold:      "PlusJakartaSans_700Bold",
  extraBold: "PlusJakartaSans_800ExtraBold",
} as const;

export const textStyles = {
  displayLg: {
    fontFamily: fonts.extraBold,
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -0.04,
  } satisfies TextStyle,

  headlineLg: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.02,
  } satisfies TextStyle,

  headlineLgMobile: {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.02,
  } satisfies TextStyle,

  headlineMd: {
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.01,
  } satisfies TextStyle,

  bodyLg: {
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0,
  } satisfies TextStyle,

  bodyMd: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  } satisfies TextStyle,

  labelMd: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.02,
  } satisfies TextStyle,

  labelSm: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.05,
  } satisfies TextStyle,
} as const;
