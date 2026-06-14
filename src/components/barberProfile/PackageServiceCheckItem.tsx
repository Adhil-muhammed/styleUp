import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface PackageServiceCheckItemProps {
  label: string;
  isChecked: boolean;
  onPress: (label: string) => void;
}

const CHECKBOX_SIZE = 24;

const PackageServiceCheckItem = ({
  label,
  isChecked,
  onPress,
}: PackageServiceCheckItemProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback((): void => {
    onPress(label);
  }, [onPress, label]);

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
    >
      <View style={styles.row}>
        <View
          style={[
            styles.checkbox,
            isChecked
              ? {
                  backgroundColor: theme.colors.accent.amber,
                  borderRadius: theme.borderRadius.sm,
                }
              : {
                  backgroundColor: theme.colors.depth.level2,
                  borderRadius: theme.borderRadius.sm,
                  borderWidth: 1,
                  borderColor: theme.colors.border.level1,
                },
          ]}
        >
          {isChecked ? (
            <MaterialIcons name="check" size={16} color={theme.colors.text.onPrimary} />
          ) : null}
        </View>
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            {
              color: isChecked
                ? theme.colors.text.primary
                : theme.colors.text.secondary,
              textTransform: "none",
            },
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(PackageServiceCheckItem);
