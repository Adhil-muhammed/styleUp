import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ConfirmBookingBar,
  PaymentMethodOptionRow,
} from "@/components/booking";
import { usePaymentMethodScreen } from "@/hooks/usePaymentMethodScreen";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"PaymentMethod">;

const SHEET_HANDLE_WIDTH = 40;
const SHEET_HANDLE_HEIGHT = 4;

const PaymentMethodScreen = ({ route }: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { shopId } = route.params;
  const payment = usePaymentMethodScreen(shopId);

  return (
    <View style={styles.root} pointerEvents="box-none">
      <Pressable
        style={styles.scrimPressable}
        onPress={payment.onGoBack}
        accessibilityRole="button"
        accessibilityLabel="Dismiss payment method"
      >
        <BlurView
          intensity={theme.glassmorphism.blur}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: theme.colors.nav.surfaceScrim },
          ]}
        />
      </Pressable>

      <View
        style={[
          styles.sheet,
          {
            backgroundColor: theme.colors.nav.surface,
            borderTopLeftRadius: theme.borderRadius.xl,
            borderTopRightRadius: theme.borderRadius.xl,
            paddingBottom: insets.bottom + theme.spacing.stackMd,
            paddingHorizontal: theme.spacing.containerMargin,
          },
        ]}
      >
        <View style={styles.handleRow}>
          <View
            style={[
              styles.handle,
              {
                backgroundColor: theme.colors.border.level1,
                borderRadius: theme.borderRadius.full,
              },
            ]}
          />
        </View>

        <Text
          style={[
            toTextStyle(theme.typography.headlineMd),
            styles.title,
            { color: theme.colors.text.primary },
          ]}
        >
          Payment Method
        </Text>

        <View style={[styles.options, { gap: theme.spacing.stackMd }]}>
          {payment.paymentOptions.map((option) => (
            <PaymentMethodOptionRow
              key={option.id}
              option={option}
              isSelected={option.id === payment.selectedPaymentId}
              onPress={payment.onSelectPayment}
            />
          ))}
        </View>

        <View style={{ marginTop: theme.spacing.sectionGap }}>
          <ConfirmBookingBar
            onConfirm={payment.onContinue}
            label="Continue"
            showArrow={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
  },
  scrimPressable: {
    ...StyleSheet.absoluteFill,
  },
  sheet: {
    paddingTop: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  handleRow: {
    alignItems: "center",
    marginBottom: 20,
  },
  handle: {
    width: SHEET_HANDLE_WIDTH,
    height: SHEET_HANDLE_HEIGHT,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  options: {},
});

export default PaymentMethodScreen;
