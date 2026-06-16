import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface ConfirmPaymentBarProps {
  onConfirm: () => void;
}

export const CONFIRM_PAYMENT_BAR_APPROX_HEIGHT = 52;

const ConfirmPaymentBar = ({ onConfirm }: ConfirmPaymentBarProps): React.JSX.Element => {
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
            borderRadius: theme.borderRadius.xl,
            shadowColor: theme.colors.primary.default,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 12,
            transform: [{ scale: pressed ? 0.97 : 1 }],
          },
        ]}
      >
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            { color: theme.colors.text.onPrimary, fontWeight: "600" },
          ]}
        >
          Confirm Payment
        </Text>
        <MaterialIcons name="lock" size={18} color={theme.colors.text.onPrimary} />
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

export default ConfirmPaymentBar;
