import React from "react";
import { type StyleProp, type TextStyle } from "react-native";
import Typography, { type TypographyVariant } from "./Typography";
import { useCurrency } from "@/hooks/useCurrency";
import { useTheme } from "@/hooks/useTheme";

export interface PriceProps {
  amountMinor: number;
  currency?: string;
  prefix?: string;
  variant?: TypographyVariant;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const Price = ({
  amountMinor,
  currency,
  prefix,
  variant = "labelSm",
  color,
  style,
}: PriceProps): React.JSX.Element => {
  const { theme } = useTheme();
  const { format } = useCurrency(currency);

  const resolvedColor = color ?? theme.colors.accent.amber;

  return (
    <Typography variant={variant} color={resolvedColor} style={style}>
      {format(amountMinor, prefix !== undefined ? { prefix } : undefined)}
    </Typography>
  );
};

export default Price;
