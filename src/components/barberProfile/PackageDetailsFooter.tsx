import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface PackageDetailsFooterProps {
  price: string;
  onBookPress: () => void;
}

/** paddingVertical 16 + labelMd lineHeight 20 + paddingVertical 16 */
export const PACKAGE_DETAILS_FOOTER_APPROX_HEIGHT = 52;

const PackageDetailsFooter = ({
  price,
  onBookPress,
}: PackageDetailsFooterProps): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const handleBookPress = useCallback((): void => {
    onBookPress();
  }, [onBookPress]);

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
      <Pressable
        onPress={handleBookPress}
        hitSlop={8}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed
              ? theme.colors.primary.active
              : theme.colors.primary.default,
            borderRadius: theme.borderRadius.xl,
            shadowColor: theme.colors.primary.default,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
      >
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            { color: theme.colors.text.onPrimary, fontWeight: "700" },
          ]}
        >
          Book Now -{" "}
          <Text style={{ color: theme.colors.accent.amber }}>{price}</Text>
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    overflow: "hidden",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});

export default PackageDetailsFooter;
