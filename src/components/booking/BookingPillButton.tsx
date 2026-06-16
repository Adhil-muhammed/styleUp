import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

type BookingPillButtonVariant = "primary" | "secondary";

interface BookingPillButtonProps {
  label: string;
  onPress: () => void;
  variant: BookingPillButtonVariant;
}

const BookingPillButton = ({
  label,
  onPress,
  variant,
}: BookingPillButtonProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback((): void => {
    onPress();
  }, [onPress]);

  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        isPrimary
          ? {
              backgroundColor: pressed
                ? theme.colors.primary.active
                : theme.colors.primary.default,
              shadowColor: theme.colors.primary.default,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 12,
            }
          : {
              backgroundColor: theme.colors.depth.level2,
              borderColor: theme.colors.depth.level2,
              borderWidth: 1,
            },
        {
          borderRadius: theme.borderRadius.full,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <Text
        style={[
          toTextStyle(theme.typography.labelMd),
          {
            color: isPrimary ? theme.colors.text.onPrimary : theme.colors.primary.default,
            fontWeight: "700",
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
});

export default BookingPillButton;
