import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BookingAppointmentHeader,
  BookingDetailsCard,
  ConfirmPaymentBar,
  CONFIRM_PAYMENT_BAR_APPROX_HEIGHT,
  PaymentSummaryMethodCard,
  PriceBreakdownCard,
  SummarySectionHeader,
} from "@/components/booking";
import { usePaymentSummaryScreen } from "@/hooks/usePaymentSummaryScreen";
import { useTheme } from "@/hooks/useTheme";

import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"PaymentSummary">;

const FOOTER_EXTRA_PADDING = 16;

const PaymentSummaryScreen = ({ route }: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { shopId } = route.params;
  const summary = usePaymentSummaryScreen(shopId);

  const scrollBottomPadding =
    CONFIRM_PAYMENT_BAR_APPROX_HEIGHT +
    FOOTER_EXTRA_PADDING +
    insets.bottom +
    theme.spacing.stackMd * 2;

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}>
      <BookingAppointmentHeader
        title="Review Summary"
        titleAlign="center"
        onGoBack={summary.onGoBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: theme.spacing.containerMargin,
            paddingTop: theme.spacing.stackLg,
            paddingBottom: scrollBottomPadding,
            gap: theme.spacing.sectionGap,
          },
        ]}
      >
        <BookingDetailsCard items={summary.bookingDetails} />
        <PriceBreakdownCard lineItems={summary.priceLineItems} />

        <View style={{ gap: theme.spacing.stackSm }}>
          <SummarySectionHeader title="Payment Method" />
          <PaymentSummaryMethodCard
            paymentOption={summary.selectedPayment}
            onChangePress={summary.onChangePayment}
          />
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            paddingBottom: insets.bottom + theme.spacing.stackMd,
            paddingTop: theme.spacing.stackMd,
            paddingHorizontal: theme.spacing.containerMargin,
            borderTopColor: theme.colors.border.level1,
          },
        ]}
      >
        <BlurView
          intensity={theme.glassmorphism.blur}
          tint="dark"
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: `${theme.colors.depth.level0}E6` },
          ]}
          pointerEvents="none"
        />
        <ConfirmPaymentBar onConfirm={summary.onConfirmPayment} />
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
    borderTopWidth: 1,
    overflow: "hidden",
  },
});

export default PaymentSummaryScreen;
