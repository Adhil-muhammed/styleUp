import React, { useCallback } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { MapPinVariant } from "@/data/discoverMock";

interface MapPinProps {
  avatarUri: string;
  label: string;
  variant: MapPinVariant;
  size: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MapPin = ({
  avatarUri,
  label,
  variant,
  size,
  style,
  onPress,
}: MapPinProps): React.JSX.Element => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const isPrimary = variant === "primary";
  const ringColor = isPrimary ? theme.colors.primary.default : theme.colors.accent.amber;
  const glowColor = isPrimary
    ? "rgba(124, 58, 237, 0.5)"
    : "rgba(255, 185, 95, 0.4)";

  const handlePressIn = useCallback((): void => {
    scale.value = withSpring(1.1, {
      stiffness: theme.motion.spring.stiffness,
      damping: theme.motion.spring.damping,
    });
  }, [scale, theme.motion.spring.damping, theme.motion.spring.stiffness]);

  const handlePressOut = useCallback((): void => {
    scale.value = withSpring(1, {
      stiffness: theme.motion.spring.stiffness,
      damping: theme.motion.spring.damping,
    });
  }, [scale, theme.motion.spring.damping, theme.motion.spring.stiffness]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.wrapper, style, animatedStyle]}
    >
      <View
        style={[
          styles.avatarRing,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: ringColor,
            backgroundColor: theme.colors.depth.background,
            shadowColor: glowColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 15,
          },
        ]}
      >
        <Image
          source={{ uri: avatarUri }}
          style={[
            styles.avatar,
            {
              width: size - 8,
              height: size - 8,
              borderRadius: (size - 8) / 2,
            },
          ]}
        />
      </View>
      <View
        style={[
          styles.tag,
          isPrimary
            ? {
                backgroundColor: theme.colors.depth.level2,
                borderColor: theme.colors.border.level1,
              }
            : {
                backgroundColor: "rgba(255, 185, 95, 0.2)",
                borderColor: "rgba(255, 185, 95, 0.3)",
              },
        ]}
      >
        <Text
          style={[
            toTextStyle(theme.typography.labelSm),
            { color: isPrimary ? theme.colors.text.primary : theme.colors.accent.amber },
          ]}
        >
          {label}
        </Text>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  avatarRing: {
    borderWidth: 3,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    resizeMode: "cover",
  },
  tag: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
  },
});

export default React.memo(MapPin);
