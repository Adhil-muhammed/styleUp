import React, { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";

interface HomeIconButtonProps {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  onPress: () => void;
  showBadge?: boolean;
}

const BUTTON_SIZE = 40;
const BADGE_SIZE = 8;

const HomeIconButton = ({
  icon,
  onPress,
  showBadge = false,
}: HomeIconButtonProps): React.JSX.Element => {
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
          backgroundColor: theme.colors.depth.level1,
          borderColor: theme.colors.border.level1,
          borderRadius: theme.borderRadius.lg,
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
    >
      <MaterialIcons name={icon} size={20} color={theme.colors.text.primary} />
      {showBadge ? (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: theme.colors.semantic.error,
              borderRadius: theme.borderRadius.full,
            },
          ]}
        />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 10,
    width: BADGE_SIZE,
    height: BADGE_SIZE,
  },
});

export default HomeIconButton;
