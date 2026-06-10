import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import type { AppTabParamList } from "@/navigation/types";

const MapBackButton = (): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<BottomTabNavigationProp<AppTabParamList>>();

  const handlePress = useCallback((): void => {
    navigation.navigate("Home");
  }, [navigation]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        {
          top: insets.top + theme.spacing.stackMd,
          left: theme.spacing.containerMargin,
          backgroundColor: theme.colors.depth.level1,
          borderColor: theme.colors.border.level1,
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel="Go back"
    >
      <MaterialIcons
        name="arrow-back"
        size={22}
        color={theme.colors.text.primary}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    zIndex: 50,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapBackButton;
