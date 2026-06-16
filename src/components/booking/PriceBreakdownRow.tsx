import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import { formatPrice } from "@/data/bookMock";

interface PriceBreakdownRowProps {
  label: string;
  amountCents: number;
}

const PriceBreakdownRow = ({
  label,
  amountCents,
}: PriceBreakdownRowProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.row, { paddingVertical: theme.spacing.stackSm }]}>
      <Text
        style={[
          styles.label,
          toTextStyle(theme.typography.bodyMd),
          { color: theme.colors.text.primary },
        ]}
        numberOfLines={2}
      >
        {label}
      </Text>
      <Text
        style={[
          toTextStyle(theme.typography.bodyMd),
          { color: theme.colors.text.primary, fontWeight: "600" },
        ]}
      >
        {formatPrice(amountCents)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  label: {
    flex: 1,
  },
});

export default PriceBreakdownRow;
