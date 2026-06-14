import React, { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";

interface PackageDetailsHeaderProps {
  onGoBack: () => void;
  onOptionsPress?: () => void;
}

const PackageDetailsHeader = ({
  onGoBack,
  onOptionsPress,
}: PackageDetailsHeaderProps): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const handleOptionsPress = useCallback((): void => {
    onOptionsPress?.();
  }, [onOptionsPress]);

  return (
    <View
      style={[
        styles.row,
        {
          paddingTop: insets.top + theme.spacing.stackMd,
          paddingBottom: theme.spacing.stackMd,
          paddingHorizontal: theme.spacing.containerMargin,
        },
      ]}
    >
      <Pressable
        onPress={onGoBack}
        hitSlop={8}
        style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
      >
        <MaterialIcons name="arrow-back" size={24} color={theme.colors.text.primary} />
      </Pressable>

      <Pressable
        onPress={handleOptionsPress}
        hitSlop={8}
        style={({ pressed }) => [
          styles.optionsButton,
          {
            borderColor: theme.colors.border.level1,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
      >
        <MaterialIcons name="more-horiz" size={20} color={theme.colors.text.primary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PackageDetailsHeader;
