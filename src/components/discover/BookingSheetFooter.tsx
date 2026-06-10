import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { BookingQuickFilterOption } from "@/data/discoverMock";

interface BookingSheetFooterProps {
  paymentMethod: BookingQuickFilterOption;
  selectedServiceTitle: string;
  onPaymentPress?: () => void;
  onConfirmBooking: () => void;
}

const BookingSheetFooter = ({
  paymentMethod,
  selectedServiceTitle,
  onPaymentPress,
  onConfirmBooking,
}: BookingSheetFooterProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePaymentPress = useCallback((): void => {
    onPaymentPress?.();
  }, [onPaymentPress]);

  const handleConfirm = useCallback((): void => {
    onConfirmBooking();
  }, [onConfirmBooking]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.depth.level1,
          borderTopColor: theme.colors.border.level1,
          paddingHorizontal: theme.spacing.containerMargin,
          paddingTop: theme.spacing.stackMd,
          paddingBottom: theme.spacing.stackMd,
          gap: theme.spacing.stackMd,
        },
      ]}
    >
      <Pressable
        onPress={handlePaymentPress}
        style={({ pressed }) => [
          styles.paymentRow,
          { opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <View style={styles.paymentLeft}>
          <MaterialIcons
            name={paymentMethod.icon}
            size={20}
            color={theme.colors.gamification.emerald}
          />
          <Text
            style={[
              toTextStyle(theme.typography.labelMd),
              { color: theme.colors.text.primary },
            ]}
          >
            {paymentMethod.label}
          </Text>
        </View>
        <MaterialIcons
          name="chevron-right"
          size={22}
          color={theme.colors.text.secondary}
        />
      </Pressable>

      <Pressable
        onPress={handleConfirm}
        style={({ pressed }) => [
          styles.cta,
          {
            backgroundColor: pressed
              ? theme.colors.primary.active
              : theme.colors.primary.default,
            borderRadius: theme.borderRadius.full,
          },
        ]}
      >
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            { color: theme.colors.text.onPrimary },
          ]}
        >
          Confirm Booking — {selectedServiceTitle}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cta: {
    paddingVertical: 16,
    alignItems: "center",
  },
});

export default BookingSheetFooter;
