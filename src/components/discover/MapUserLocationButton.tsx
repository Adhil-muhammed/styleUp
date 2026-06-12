import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";

interface MapUserLocationButtonProps {
  bottomOffset: number;
  onPress: () => void;
}

const MapUserLocationButton = ({
  bottomOffset,
  onPress,
}: MapUserLocationButtonProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback((): void => {
    onPress();
  }, [onPress]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        {
          bottom: bottomOffset,
          right: theme.spacing.containerMargin,
          backgroundColor: theme.colors.depth.level1,
          borderColor: theme.colors.border.level1,
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel="Center map on your location"
    >
      <MaterialIcons
        name="my-location"
        size={22}
        color={theme.colors.primary.default}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    // zIndex: 50,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapUserLocationButton;
