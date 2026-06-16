import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface PaymentAddCardButtonProps {
  onPress: () => void;
}

const PaymentAddCardButton = ({ onPress }: PaymentAddCardButtonProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback((): void => {
    onPress();
  }, [onPress]);

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: `${theme.colors.accent.amber}1A`,
          borderColor: `${theme.colors.accent.amber}33`,
          borderRadius: theme.borderRadius.xl,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.content}>
        <MaterialIcons name="add" size={16} color={theme.colors.accent.amber} />
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            { color: theme.colors.accent.amber, textTransform: "none", fontWeight: "500" },
          ]}
        >
          Add New Card
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderWidth: 1,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default PaymentAddCardButton;
