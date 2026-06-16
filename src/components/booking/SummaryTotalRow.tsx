import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import { formatPrice } from "@/data/bookMock";

interface SummaryTotalRowProps {
  totalCents: number;
}

const SummaryTotalRow = ({ totalCents }: SummaryTotalRowProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.row, { paddingVertical: theme.spacing.stackMd }]}>
      <Text
        style={[
          toTextStyle(theme.typography.headlineMd),
          { color: theme.colors.text.secondary },
        ]}
      >
        Total
      </Text>
      <Text
        style={[
          toTextStyle(theme.typography.headlineMd),
          {
            color: theme.colors.primary.default,
            shadowColor: theme.colors.primary.default,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
          },
        ]}
      >
        {formatPrice(totalCents)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default SummaryTotalRow;
