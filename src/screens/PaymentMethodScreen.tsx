import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BookingAppointmentHeader,
  BookingContinueBar,
  PaymentAddCardButton,
  PaymentMethodOptionRow,
  BOOKING_CONTINUE_BAR_APPROX_HEIGHT,
} from "@/components/booking";
import { usePaymentMethodScreen } from "@/hooks/usePaymentMethodScreen";
import { useTheme } from "@/hooks/useTheme";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"PaymentMethod">;

const FOOTER_EXTRA_PADDING = 16;
const ADD_CARD_TOP_MARGIN = 32;

const PaymentMethodScreen = ({ route }: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { shopId } = route.params;
  const payment = usePaymentMethodScreen(shopId);

  const scrollBottomPadding =
    BOOKING_CONTINUE_BAR_APPROX_HEIGHT +
    FOOTER_EXTRA_PADDING +
    insets.bottom +
    theme.spacing.stackMd * 2;

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}>
      <BookingAppointmentHeader title="Payment Methods" onGoBack={payment.onGoBack} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: theme.spacing.containerMargin,
            paddingTop: theme.spacing.stackLg,
            paddingBottom: scrollBottomPadding,
            gap: theme.spacing.stackMd,
          },
        ]}
      >
        {payment.paymentOptions.map((option) => (
          <PaymentMethodOptionRow
            key={option.id}
            option={option}
            isSelected={option.id === payment.selectedPaymentId}
            onPress={payment.onSelectPayment}
          />
        ))}

        <View style={{ marginTop: ADD_CARD_TOP_MARGIN - theme.spacing.stackMd }}>
          <PaymentAddCardButton onPress={payment.onAddNewCard} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <BookingContinueBar onContinue={payment.onContinue} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {},
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 30,
  },
});

export default PaymentMethodScreen;
