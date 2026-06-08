import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { toTextStyle } from "../config/theme";
import type { AppTabScreenProps } from "../navigation/types";

type Props = AppTabScreenProps<"Feed">;

const HelloWorldScreen: React.FC<Props> = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.depth.level0,
          paddingHorizontal: theme.spacing.containerMargin,
        },
      ]}
    >
      <Text
        style={[
          toTextStyle(theme.typography.headlineLgMobile),
          { color: theme.colors.primary.default },
        ]}
      >
        Hello, World!
      </Text>
      <Text
        style={[
          toTextStyle(theme.typography.bodyMd),
          { color: theme.colors.text.secondary },
        ]}
      >
        Welcome to StyleQuest
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});

export default HelloWorldScreen;
