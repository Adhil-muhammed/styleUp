import React from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@/hooks/useTheme";
import { focusGlowStyle } from "@/config/theme";

interface GlassPanelProps {
  children: React.ReactNode;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
}

const GlassPanel = ({
  children,
  selected = false,
  style,
}: GlassPanelProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.wrapper,
        {
          borderRadius: theme.borderRadius.xl,
          borderColor: selected
            ? theme.colors.primary.default
            : theme.colors.glass.border,
          backgroundColor: `${theme.colors.depth.level1}99`,
        },
        selected && focusGlowStyle(theme),
        style,
      ]}
    >
      <BlurView
        intensity={theme.glassmorphism.blur}
        tint="dark"
        style={[StyleSheet.absoluteFill, { borderRadius: theme.borderRadius.xl }]}
        pointerEvents="none"
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    borderWidth: 1,
  },
});

export default GlassPanel;
