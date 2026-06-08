import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import type { AppTabScreenProps } from "../navigation/types";

type Props = AppTabScreenProps<"Feed">;

const HelloWorldScreen: React.FC<Props> = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Hello, World!
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
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
  title: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
  },
});

export default HelloWorldScreen;
