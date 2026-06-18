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
  isElevated?: boolean;
  onPress: () => void;
  accessibilityLabel: string;
}

const ICON_SIZE = 24;
const INDICATOR_SIZE = 40;
const ELEVATED_SIZE = 48;
const ELEVATED_LIFT = -8;
const INACTIVE_ICON_OPACITY = 0.6;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MidnightEdgeTabItem = ({
  icon,
  iconActive,
  isFocused,
  isElevated = false,
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

  if (isElevated) {
    return (
      <AnimatedPressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={isFocused ? { selected: true } : {}}
        style={[
          styles.elevatedTab,
          { marginTop: ELEVATED_LIFT },
          animatedStyle,
        ]}
      >
        <View
          style={[
            styles.elevatedCircle,
            {
              width: ELEVATED_SIZE,
              height: ELEVATED_SIZE,
              borderRadius: ELEVATED_SIZE / 2,
              backgroundColor: isFocused
                ? theme.colors.primary.default
                : theme.colors.depth.level2,
              borderColor: theme.colors.primary.default,
              borderWidth: isFocused ? 0 : 1,
              shadowColor: theme.colors.primary.default,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: isFocused ? 0.35 : 0.15,
              shadowRadius: 12,
              elevation: 8,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={isFocused ? iconActive : icon}
            size={ICON_SIZE}
            color={
              isFocused
                ? theme.colors.text.onPrimary
                : theme.colors.primary.default
            }
          />
        </View>
      </AnimatedPressable>
    );
  }

  const iconColor = isFocused
    ? theme.colors.primary.default
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
        {isFocused ? (
          <View
            style={[
              styles.indicator,
              {
                width: INDICATOR_SIZE,
                height: INDICATOR_SIZE,
                borderRadius: INDICATOR_SIZE / 2,
                backgroundColor: theme.colors.focus.glow,
                opacity: 0.25,
              },
            ]}
          />
        ) : null}
        <MaterialCommunityIcons
          name={isFocused ? iconActive : icon}
          size={ICON_SIZE}
          color={iconColor}
          style={isFocused ? undefined : { opacity: INACTIVE_ICON_OPACITY }}
        />
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  tab: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 48,
    minHeight: 48,
  },
  iconSlot: {
    alignItems: "center",
    justifyContent: "center",
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
  },
  indicator: {
    position: "absolute",
  },
  elevatedTab: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 56,
  },
  elevatedCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MidnightEdgeTabItem;
