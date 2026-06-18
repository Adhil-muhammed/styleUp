import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "@/components/common/Typography";
import {
  BookingConfirmedIcon,
  BookingPillButton,
} from "@/components/booking";
import { usePaymentSuccessScreen } from "@/hooks/usePaymentSuccessScreen";
import { useTheme } from "@/hooks/useTheme";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"PaymentSuccess">;

const AMBIENT_GLOW_SIZE = 384;
const SUBTITLE_MAX_WIDTH = 280;

const PaymentSuccessScreen = ({ route }: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const { onContinueBooking, onGoToAppointment } = usePaymentSuccessScreen(
    route.params.shopId,
  );

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={[styles.root, { backgroundColor: theme.colors.depth.background }]}
    >
      <View
        pointerEvents="none"
        style={[
          styles.ambientGlow,
          {
            width: AMBIENT_GLOW_SIZE,
            height: AMBIENT_GLOW_SIZE,
            borderRadius: AMBIENT_GLOW_SIZE / 2,
            backgroundColor: theme.colors.primary.default,
            opacity: 0.2,
          },
        ]}
      />

      <View
        style={[
          styles.content,
          {
            paddingHorizontal: theme.spacing.containerMargin,
            paddingVertical: theme.spacing.stackLg,
          },
        ]}
      >
        <View style={styles.heroSection}>
          <BookingConfirmedIcon />

          <Typography
            variant="headlineLgMobile"
            color={theme.colors.text.primary}
            style={[styles.title, { marginTop: theme.spacing.stackLg }]}
          >
            Your appointment{"\n"}booking is successfully.
          </Typography>

          <Typography
            variant="bodyMd"
            color={theme.colors.text.secondary}
            style={[styles.subtitle, { marginTop: theme.spacing.stackMd }]}
          >
            You can view the appointment booking info in the &quot;Appointment&quot;
            section.
          </Typography>
        </View>

        <View style={[styles.actions, { gap: theme.spacing.stackMd }]}>
          <BookingPillButton
            variant="primary"
            label="Continue Booking"
            onPress={onContinueBooking}
          />
          <BookingPillButton
            variant="outline"
            label="Go to appointment"
            onPress={onGoToAppointment}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: "hidden",
  },
  ambientGlow: {
    position: "absolute",
    top: "25%",
    left: "50%",
    marginLeft: -AMBIENT_GLOW_SIZE / 2,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  heroSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    textTransform: "none",
  },
  subtitle: {
    textAlign: "center",
    textTransform: "none",
    maxWidth: SUBTITLE_MAX_WIDTH,
  },
  actions: {
    width: "100%",
  },
});

export default PaymentSuccessScreen;
