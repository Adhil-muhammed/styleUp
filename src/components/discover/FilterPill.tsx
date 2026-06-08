import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface FilterPillProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

const FilterPill = ({ label, active, onPress }: FilterPillProps): React.JSX.Element => {
  const { theme } = useTheme();

  if (active) {
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.pill,
          {
            backgroundColor: theme.colors.primary.default,
            borderRadius: theme.borderRadius.full,
            shadowColor: "rgba(124, 58, 237, 0.3)",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 10,
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
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <BlurView
        intensity={theme.glassmorphism.blur}
        tint="dark"
        style={[
          styles.pill,
          {
            backgroundColor: `${theme.colors.depth.level1}CC`,
            borderColor: theme.colors.border.level1,
            borderRadius: theme.borderRadius.full,
            borderWidth: 1,
          },
        ]}
      >
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            { color: theme.colors.text.secondary },
          ]}
        >
          {label}
        </Text>
      </BlurView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    overflow: "hidden",
  },
});

export default React.memo(FilterPill);
