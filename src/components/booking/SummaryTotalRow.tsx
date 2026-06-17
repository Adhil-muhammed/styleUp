import React from "react";
import { StyleSheet, View } from "react-native";
import { Price } from "@/components/common";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";

interface SummaryTotalRowProps {
  totalCents: number;
}

const SummaryTotalRow = ({ totalCents }: SummaryTotalRowProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.row, { paddingVertical: theme.spacing.stackMd }]}>
      <Typography variant="headlineMd" color={theme.colors.text.secondary}>
        Total
      </Typography>
      <Price
        amountMinor={totalCents}
        variant="headlineMd"
        color={theme.colors.primary.default}
        style={{
          shadowColor: theme.colors.primary.default,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
        }}
      />
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
