import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface PaymentRadioIndicatorProps {
  isSelected: boolean;
}

const INDICATOR_SIZE = 24;
const SELECTED_BORDER_WIDTH = 6;

const PaymentRadioIndicator = ({
  isSelected,
}: PaymentRadioIndicatorProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.outer,
        isSelected
          ? {
              borderColor: theme.colors.accent.amber,
              borderWidth: SELECTED_BORDER_WIDTH,
            }
          : {
              borderColor: theme.colors.border.level1,
              borderWidth: 2,
            },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  outer: {
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE / 2,
  },
});

export default PaymentRadioIndicator;
