import React, { useCallback, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";

type CommunityIconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

export interface MidnightEdgeTabItemProps {
  icon: CommunityIconName;
  iconActive: CommunityIconName;
  isFocused: boolean;
  onPress: () => void;
  accessibilityLabel: string;
}

const ICON_SIZE = 24;
const CHIP_WIDTH = 48;
const CHIP_HEIGHT = 32;
const CHIP_RADIUS = 12;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MidnightEdgeTabItem = ({
  icon,
  iconActive,
  isFocused,
  onPress,
  accessibilityLabel,
}: MidnightEdgeTabItemProps): React.JSX.Element => {
  const { theme } = useTheme();
  const pressScale = useSharedValue(1);
  const focusScale = useSharedValue(isFocused ? 1 : 0.92);

  useEffect(() => {
    focusScale.value = withSpring(isFocused ? 1 : 0.92, {
      stiffness: theme.motion.spring.stiffness,
      damping: theme.motion.spring.damping,
    });
  }, [
    focusScale,
    isFocused,
    theme.motion.spring.damping,
    theme.motion.spring.stiffness,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value * focusScale.value }],
  }));

  const handlePressIn = useCallback((): void => {
    pressScale.value = withSpring(0.88, {
      stiffness: theme.motion.spring.stiffness,
      damping: theme.motion.spring.damping,
    });
  }, [pressScale, theme.motion.spring.damping, theme.motion.spring.stiffness]);

  const handlePressOut = useCallback((): void => {
    pressScale.value = withSpring(1, {
      stiffness: theme.motion.spring.stiffness,
      damping: theme.motion.spring.damping,
    });
  }, [pressScale, theme.motion.spring.damping, theme.motion.spring.stiffness]);

  const handlePress = useCallback((): void => {
    onPress();
  }, [onPress]);

  const iconColor = isFocused
    ? theme.colors.nav.active
    : theme.colors.nav.inactive;

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={isFocused ? { selected: true } : {}}
      style={[styles.tab, animatedStyle]}
    >
      <View style={styles.iconSlot}>
        {isFocused && (
          <View
            style={[
              styles.chip,
              { backgroundColor: theme.colors.depth.level2 },
            ]}
          />
        )}
        <MaterialCommunityIcons
          name={isFocused ? iconActive : icon}
          size={ICON_SIZE}
          color={iconColor}
        />
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  iconSlot: {
    alignItems: "center",
    justifyContent: "center",
    width: CHIP_WIDTH,
    height: CHIP_HEIGHT,
  },
  chip: {
    position: "absolute",
    width: CHIP_WIDTH,
    height: CHIP_HEIGHT,
    borderRadius: CHIP_RADIUS,
  },
});

export default MidnightEdgeTabItem;
