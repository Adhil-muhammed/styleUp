import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PaymentMethodIcon from "./paymentMethodIcons";
import PaymentRadioIndicator from "./PaymentRadioIndicator";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { PaymentMethodOption } from "@/data/paymentMethodMock";

interface PaymentMethodOptionRowProps {
  option: PaymentMethodOption;
  isSelected: boolean;
  onPress: (id: string) => void;
}

const PaymentMethodOptionRow = ({
  option,
  isSelected,
  onPress,
}: PaymentMethodOptionRowProps): React.JSX.Element => {
  const { theme } = useTheme();
  const isCard = option.kind === "saved_card";

  const handlePress = useCallback((): void => {
    onPress(option.id);
  }, [onPress, option.id]);

  const selectedLabelColor = theme.colors.primary.default;
  const unselectedLabelColor = theme.colors.text.secondary;
  const labelColor = isSelected ? selectedLabelColor : unselectedLabelColor;

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
    >
      <View
        style={[
          styles.row,
          {
            backgroundColor: theme.colors.depth.level2,
            borderColor: isSelected
              ? theme.colors.primary.default
              : theme.colors.border.level1,
            borderRadius: theme.borderRadius.xl,
            borderWidth: isSelected ? 2 : 1,
            padding: theme.spacing.stackLg,
          },
        ]}
      >
        <View style={styles.left}>
          <PaymentMethodIcon kind={option.kind} />
          {isCard && option.lastFour !== undefined ? (
            <View style={styles.cardLabelRow}>
              <Text
                style={[
                  toTextStyle(theme.typography.labelMd),
                  styles.maskedDigits,
                  { color: labelColor, textTransform: "none" },
                ]}
              >
                •••• •••• ••••
              </Text>
              <Text
                style={[
                  toTextStyle(theme.typography.labelMd),
                  { color: labelColor, textTransform: "none", fontWeight: "500" },
                ]}
              >
                {option.lastFour}
              </Text>
            </View>
          ) : (
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                { color: labelColor, textTransform: "none", fontWeight: "500" },
              ]}
            >
              {option.label}
            </Text>
          )}
        </View>
        <PaymentRadioIndicator isSelected={isSelected} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  cardLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  maskedDigits: {
    letterSpacing: 3.2,
    fontWeight: "500",
  },
});

export default React.memo(PaymentMethodOptionRow);
