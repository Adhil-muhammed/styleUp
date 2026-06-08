import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { toTextStyle } from "../config/theme";
import type { AppTabScreenProps } from "../navigation/types";

type Props = AppTabScreenProps<"Home">;

const HomeScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.depth.level0 }]}>
      <Text
        style={[
          toTextStyle(theme.typography.headlineLgMobile),
          { color: theme.colors.text.primary },
        ]}
      >
        Home
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
