import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";

const ICON_SIZE = 96;
const CHECK_SIZE = 48;

const BookingConfirmedIcon = (): React.JSX.Element => {
  const { theme } = useTheme();
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      150,
      withSpring(1, {
        stiffness: theme.motion.spring.stiffness,
        damping: theme.motion.spring.damping,
      }),
    );
  }, [scale, theme.motion.spring.damping, theme.motion.spring.stiffness]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: ICON_SIZE,
          height: ICON_SIZE,
          borderRadius: theme.borderRadius.full,
          backgroundColor: theme.colors.gamification.emerald,
          shadowColor: theme.colors.gamification.emerald,
        },
        animatedStyle,
      ]}
    >
      <View style={styles.iconInner}>
        <MaterialIcons
          name="check"
          size={CHECK_SIZE}
          color={theme.colors.text.onPrimary}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 8,
  },
  iconInner: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BookingConfirmedIcon;
