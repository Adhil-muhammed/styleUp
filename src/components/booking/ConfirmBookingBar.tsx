import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface ConfirmBookingBarProps {
  onConfirm: () => void;
  label?: string;
  showArrow?: boolean;
}

/** paddingVertical 16 + labelMd lineHeight 20 + paddingVertical 16 */
export const CONFIRM_CTA_APPROX_HEIGHT = 52;

const ConfirmBookingBar = ({
  onConfirm,
  label = "Confirm Booking",
  showArrow = true,
}: ConfirmBookingBarProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handleConfirm = useCallback((): void => {
    onConfirm();
  }, [onConfirm]);

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={handleConfirm}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed
              ? theme.colors.primary.active
              : theme.colors.primary.default,
            borderRadius: theme.borderRadius.full,
            shadowColor: theme.colors.primary.default,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 20,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
      >
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            { color: theme.colors.text.onPrimary },
          ]}
        >
          {label}
        </Text>
        {showArrow ? (
          <MaterialIcons
            name="arrow-forward"
            size={22}
            color={theme.colors.text.onPrimary}
          />
        ) : null}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
});

export default ConfirmBookingBar;
