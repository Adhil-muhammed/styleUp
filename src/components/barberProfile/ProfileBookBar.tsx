import React from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ConfirmBookingBar } from "@/components/booking";
import { Price } from "@/components/common";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";

interface ProfileBookBarProps {
  onBookNow: () => void;
  totalCents?: number;
}

const ProfileBookBar = ({
  onBookNow,
  totalCents = 0,
}: ProfileBookBarProps): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const hasSelection = totalCents > 0;

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: insets.bottom + theme.spacing.stackMd,
          paddingTop: theme.spacing.stackMd,
          paddingHorizontal: theme.spacing.containerMargin,
          borderTopColor: theme.colors.border.level1,
          gap: theme.spacing.stackSm,
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

      {hasSelection ? (
        <View style={styles.totalRow}>
          <Typography variant="labelMd" color={theme.colors.text.secondary}>
            Total
          </Typography>
          <Price amountMinor={totalCents} />
        </View>
      ) : null}

      <ConfirmBookingBar onConfirm={onBookNow} label="Book Now" showArrow={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    overflow: "hidden",
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ProfileBookBar;
