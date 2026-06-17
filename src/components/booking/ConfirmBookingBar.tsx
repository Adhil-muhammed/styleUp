import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface ConfirmBookingBarProps {
  onConfirm: () => void;
  label?: string;
  showArrow?: boolean;
  disabled?: boolean;
}

/** paddingVertical 16 + labelMd lineHeight 20 + paddingVertical 16 */
export const CONFIRM_CTA_APPROX_HEIGHT = 52;

const ConfirmBookingBar = ({
  onConfirm,
  label = "Confirm Booking",
  showArrow = true,
  disabled = false,
}: ConfirmBookingBarProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handleConfirm = useCallback((): void => {
    if (disabled) {
      return;
    }

    onConfirm();
  }, [disabled, onConfirm]);

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={handleConfirm}
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: disabled
              ? theme.colors.depth.level2
              : pressed
                ? theme.colors.primary.active
                : theme.colors.primary.default,
            borderRadius: theme.borderRadius.full,
            shadowColor: theme.colors.primary.default,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: disabled ? 0 : 0.4,
            shadowRadius: disabled ? 0 : 20,
            opacity: disabled ? 0.5 : 1,
            transform: [{ scale: disabled || !pressed ? 1 : 0.95 }],
          },
        ]}
      >
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            {
              color: disabled
                ? theme.colors.text.disabled
                : theme.colors.text.onPrimary,
            },
          ]}
        >
          {label}
        </Text>
        {showArrow ? (
          <MaterialIcons
            name="arrow-forward"
            size={22}
            color={
              disabled
                ? theme.colors.text.disabled
                : theme.colors.text.onPrimary
            }
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
