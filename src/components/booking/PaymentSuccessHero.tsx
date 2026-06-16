import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";

const HERO_SIZE = 128;
const INNER_TILE_SIZE = 56;

const PaymentSuccessHero = (): React.JSX.Element => {
  const { theme } = useTheme();
  const heroScale = useSharedValue(0);
  const pulseOpacity = useSharedValue(0.4);

  useEffect(() => {
    heroScale.value = withDelay(
      150,
      withSpring(1, {
        stiffness: theme.motion.spring.stiffness,
        damping: theme.motion.spring.damping,
      }),
    );
    pulseOpacity.value = withRepeat(
      withSequence(withTiming(0.2, { duration: 800 }), withTiming(0.4, { duration: 800 })),
      -1,
      false,
    );
  }, [heroScale, pulseOpacity, theme.motion.spring.damping, theme.motion.spring.stiffness]);

  const heroStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heroScale.value }],
  }));

  const pulseDotStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.heroContainer,
        { width: HERO_SIZE, height: HERO_SIZE, marginBottom: theme.spacing.stackLg },
        heroStyle,
      ]}
    >
      <View
        style={[
          styles.glow,
          {
            backgroundColor: theme.colors.accent.amber,
            opacity: 0.2,
            shadowColor: theme.colors.accent.amber,
          },
        ]}
      />

      <View
        style={[
          styles.mainCircle,
          {
            backgroundColor: theme.colors.accent.amber,
            shadowColor: theme.colors.accent.amber,
          },
        ]}
      >
        <View
          style={[
            styles.innerTile,
            {
              borderRadius: theme.borderRadius.lg,
              backgroundColor: "#FFFFFF",
            },
          ]}
        >
          <MaterialIcons name="check" size={28} color={theme.colors.accent.amber} />
        </View>
      </View>

      <Animated.View
        style={[
          styles.decorativeDot,
          styles.dotTopRight,
          { backgroundColor: theme.colors.accent.amber },
          pulseDotStyle,
        ]}
      />
      <View
        style={[
          styles.decorativeDot,
          styles.dotBottomLeft,
          { backgroundColor: theme.colors.accent.amber, opacity: 0.3 },
        ]}
      />
      <View
        style={[
          styles.decorativeDot,
          styles.dotMidLeft,
          { backgroundColor: theme.colors.accent.amber, opacity: 0.2 },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: HERO_SIZE / 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 32,
  },
  mainCircle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: HERO_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
  },
  innerTile: {
    width: INNER_TILE_SIZE,
    height: INNER_TILE_SIZE,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "3deg" }],
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  decorativeDot: {
    position: "absolute",
    borderRadius: 999,
  },
  dotTopRight: {
    width: 16,
    height: 16,
    top: -8,
    right: -8,
  },
  dotBottomLeft: {
    width: 12,
    height: 12,
    bottom: -4,
    left: -12,
  },
  dotMidLeft: {
    width: 8,
    height: 8,
    top: HERO_SIZE * 0.25,
    left: -16,
  },
});

export default PaymentSuccessHero;
