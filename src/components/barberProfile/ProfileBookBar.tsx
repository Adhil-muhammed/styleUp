import React from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ConfirmBookingBar } from "@/components/booking";
import { useTheme } from "@/hooks/useTheme";

interface ProfileBookBarProps {
  onBookNow: () => void;
}

const ProfileBookBar = ({ onBookNow }: ProfileBookBarProps): React.JSX.Element => {
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
      <ConfirmBookingBar onConfirm={onBookNow} label="Book Now" showArrow={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    overflow: "hidden",
  },
});

export default ProfileBookBar;
