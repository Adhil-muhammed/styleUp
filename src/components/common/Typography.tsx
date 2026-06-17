import React from "react";
import { Text, type StyleProp, type TextStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle, type TypographyScale } from "@/config/theme";

export type TypographyVariant = keyof TypographyScale;

export interface TypographyProps {
  variant: TypographyVariant;
  color?: string;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

const Typography = ({
  variant,
  color,
  children,
  style,
  numberOfLines,
}: TypographyProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        toTextStyle(theme.typography[variant]),
        color !== undefined ? { color } : undefined,
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default Typography;
