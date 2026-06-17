import React from "react";
import { StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";

interface PaymentRadioIndicatorProps {
  isSelected: boolean;
}

const INDICATOR_SIZE = 24;
const CHECK_ICON_SIZE = 14;

const PaymentRadioIndicator = ({
  isSelected,
}: PaymentRadioIndicatorProps): React.JSX.Element => {
  const { theme } = useTheme();

  if (isSelected) {
    return (
      <View
        style={[
          styles.outer,
          {
            backgroundColor: theme.colors.primary.default,
            borderColor: theme.colors.primary.default,
          },
        ]}
      >
        <MaterialIcons
          name="check"
          size={CHECK_ICON_SIZE}
          color={theme.colors.text.onPrimary}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.outer,
        {
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
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PaymentRadioIndicator;
