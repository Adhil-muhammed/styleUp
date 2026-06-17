import React from "react";
import { StyleSheet, View } from "react-native";
import { Price } from "@/components/common";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";

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
      <Typography
        variant="bodyMd"
        color={theme.colors.text.primary}
        style={styles.label}
        numberOfLines={2}
      >
        {label}
      </Typography>
      <Price
        amountMinor={amountCents}
        variant="bodyMd"
        color={theme.colors.text.primary}
        style={{ fontWeight: "600" }}
      />
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
