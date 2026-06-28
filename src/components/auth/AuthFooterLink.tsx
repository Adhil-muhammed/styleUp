import React, { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";

export interface AuthFooterLinkProps {
  prompt: string;
  actionLabel: string;
  onPress: () => void;
}

const AuthFooterLink = ({
  prompt,
  actionLabel,
  onPress,
}: AuthFooterLinkProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback((): void => {
    onPress();
  }, [onPress]);

  return (
    <View style={styles.root}>
      <Typography variant="labelMd" color={theme.colors.text.secondary}>
        {prompt}
      </Typography>
      <Pressable
        accessibilityRole="button"
        hitSlop={8}
        onPress={handlePress}
        style={({ pressed }) => ({ opacity: pressed ? 0.72 : 1 })}
      >
        <Typography variant="labelMd" color={theme.colors.primary.dim}>
          {actionLabel}
        </Typography>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
});

export default AuthFooterLink;
