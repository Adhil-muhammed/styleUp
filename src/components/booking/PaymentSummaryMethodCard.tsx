import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import PaymentMethodIcon from "./paymentMethodIcons";
import type { PaymentMethodOption } from "@/data/paymentMethodMock";

interface PaymentSummaryMethodCardProps {
  paymentOption: PaymentMethodOption;
  onChangePress: () => void;
}

const PaymentSummaryMethodCard = ({
  paymentOption,
  onChangePress,
}: PaymentSummaryMethodCardProps): React.JSX.Element => {
  const { theme } = useTheme();
  const isCard = paymentOption.kind === "saved_card";

  const handleChangePress = useCallback((): void => {
    onChangePress();
  }, [onChangePress]);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.depth.level1,
          borderColor: theme.colors.border.level1,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.stackLg,
        },
      ]}
    >
      <View style={[styles.left, { gap: theme.spacing.stackMd }]}>
        <PaymentMethodIcon kind={paymentOption.kind} />
        {isCard && paymentOption.lastFour !== undefined ? (
          <View style={[styles.cardLabelRow, { gap: theme.spacing.stackSm }]}>
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                styles.maskedDigits,
                { color: theme.colors.text.secondary, textTransform: "none" },
              ]}
              numberOfLines={1}
            >
              •••• •••• ••••
            </Text>
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                {
                  color: theme.colors.text.primary,
                  textTransform: "none",
                  fontWeight: "500",
                },
              ]}
            >
              {paymentOption.lastFour}
            </Text>
          </View>
        ) : (
          <Text
            style={[
              styles.brandLabel,
              toTextStyle(theme.typography.labelMd),
              {
                color: theme.colors.text.primary,
                textTransform: "none",
                fontWeight: "500",
              },
            ]}
            numberOfLines={1}
          >
            {paymentOption.label}
          </Text>
        )}
      </View>

      <Pressable
        onPress={handleChangePress}
        hitSlop={8}
        style={({ pressed }) => [
          styles.changeButton,
          { marginLeft: theme.spacing.stackMd, opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            { color: theme.colors.primary.default, textTransform: "none" },
          ]}
        >
          Change
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
  },
  cardLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
  },
  brandLabel: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  maskedDigits: {
    letterSpacing: 3.2,
    fontWeight: "500",
    flexShrink: 1,
  },
  changeButton: {
    flexShrink: 0,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});

export default PaymentSummaryMethodCard;
