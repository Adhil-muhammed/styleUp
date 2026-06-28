import React, { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";

export interface AuthCheckboxProps {
  checked: boolean;
  label: string;
  onToggle: () => void;
}

const AuthCheckbox = ({
  checked,
  label,
  onToggle,
}: AuthCheckboxProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback((): void => {
    onToggle();
  }, [onToggle]);

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      hitSlop={8}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.root,
        {
          opacity: pressed ? 0.78 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View
        style={[
          styles.box,
          {
            backgroundColor: checked
              ? theme.colors.primary.default
              : theme.colors.depth.level1,
            borderColor: checked
              ? theme.colors.primary.default
              : theme.colors.border.level1,
            borderRadius: theme.borderRadius.sm,
          },
        ]}
      >
        {checked ? (
          <MaterialIcons
            name="check"
            size={18}
            color={theme.colors.text.onPrimary}
          />
        ) : null}
      </View>
      <Typography variant="labelMd" color={theme.colors.text.primary}>
        {label}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthCheckbox;
