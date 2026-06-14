import React from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ConfirmBookingBar, { CONFIRM_CTA_APPROX_HEIGHT } from "./ConfirmBookingBar";
import { useTheme } from "@/hooks/useTheme";

interface BookingContinueBarProps {
  onContinue: () => void;
}

export const BOOKING_CONTINUE_BAR_APPROX_HEIGHT = CONFIRM_CTA_APPROX_HEIGHT;

const BookingContinueBar = ({ onContinue }: BookingContinueBarProps): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
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
          { backgroundColor: `${theme.colors.depth.level0}CC` },
        ]}
        pointerEvents="none"
      />
      <ConfirmBookingBar onConfirm={onContinue} label="Continue" showArrow={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    overflow: "hidden",
  },
});

export default BookingContinueBar;
