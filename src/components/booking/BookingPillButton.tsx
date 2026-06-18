import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

type BookingPillButtonVariant = "primary" | "secondary" | "outline";

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

  const getVariantStyles = (
    pressed: boolean,
  ): {
    backgroundColor: string;
    borderColor?: string;
    borderWidth?: number;
    shadowColor?: string;
    shadowOffset?: { width: number; height: number };
    shadowOpacity?: number;
    shadowRadius?: number;
    textColor: string;
  } => {
    if (variant === "primary") {
      return {
        backgroundColor: pressed
          ? theme.colors.primary.active
          : theme.colors.primary.default,
        shadowColor: theme.colors.primary.default,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        textColor: theme.colors.text.onPrimary,
      };
    }

    if (variant === "outline") {
      return {
        backgroundColor: pressed
          ? theme.colors.depth.level2
          : "transparent",
        borderColor: theme.colors.border.level1,
        borderWidth: 1,
        textColor: theme.colors.primary.dim,
      };
    }

    return {
      backgroundColor: theme.colors.depth.level2,
      borderColor: theme.colors.depth.level2,
      borderWidth: 1,
      textColor: theme.colors.primary.default,
    };
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={({ pressed }) => {
        const variantStyles = getVariantStyles(pressed);
        return [
          styles.button,
          {
            backgroundColor: variantStyles.backgroundColor,
            borderColor: variantStyles.borderColor,
            borderWidth: variantStyles.borderWidth,
            shadowColor: variantStyles.shadowColor,
            shadowOffset: variantStyles.shadowOffset,
            shadowOpacity: variantStyles.shadowOpacity,
            shadowRadius: variantStyles.shadowRadius,
            borderRadius: theme.borderRadius.full,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ];
      }}
    >
      {({ pressed }) => {
        const { textColor } = getVariantStyles(pressed);
        return (
          <Text
            style={[
              toTextStyle(theme.typography.labelMd),
              {
                color: textColor,
                fontWeight: "700",
              },
            ]}
          >
            {label}
          </Text>
        );
      }}
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
