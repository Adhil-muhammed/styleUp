import React, { useEffect, useMemo } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface BookingSuccessOverlayProps {
  visible: boolean;
  onDismiss: () => void;
}

const PARTICLE_COUNT = 30;
const PARTICLE_COLORS = ["#D2BBFF", "#7C3AED", "#EC4899"] as const;

interface ParticleConfig {
  id: number;
  size: number;
  color: string;
  translateX: number;
  translateY: number;
  duration: number;
}

function createParticles(): ParticleConfig[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 150 + 50;
    return {
      id: index,
      size: Math.random() * 6 + 4,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)] ?? "#D2BBFF",
      translateX: Math.cos(angle) * velocity,
      translateY: Math.sin(angle) * velocity,
      duration: Math.random() * 600 + 400,
    };
  });
}

const Particle = ({
  config,
  active,
}: {
  config: ParticleConfig;
  active: boolean;
}): React.JSX.Element => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (active) {
      progress.value = 0;
      progress.value = withTiming(1, {
        duration: config.duration,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [active, config.duration, progress]);

  const style = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [
      { translateX: config.translateX * progress.value },
      { translateY: config.translateY * progress.value },
      { scale: 1 - progress.value * 0.8 },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          width: config.size,
          height: config.size,
          borderRadius: config.size / 2,
          backgroundColor: config.color,
        },
        style,
      ]}
    />
  );
};

const BookingSuccessOverlay = ({
  visible,
  onDismiss,
}: BookingSuccessOverlayProps): React.JSX.Element => {
  const { theme } = useTheme();
  const overlayOpacity = useSharedValue(0);
  const contentScale = useSharedValue(0.9);
  const contentOpacity = useSharedValue(0);
  const checkScale = useSharedValue(0);
  const pillScale = useSharedValue(0);
  const particles = useMemo(() => createParticles(), []);

  useEffect(() => {
    if (visible) {
      overlayOpacity.value = withTiming(1, { duration: 300 });
      contentOpacity.value = withDelay(50, withTiming(1, { duration: 400 }));
      contentScale.value = withDelay(
        50,
        withSpring(1, {
          stiffness: theme.motion.spring.stiffness,
          damping: theme.motion.spring.damping,
        }),
      );
      checkScale.value = withDelay(
        300,
        withSpring(1, {
          stiffness: theme.motion.spring.stiffness,
          damping: theme.motion.spring.damping,
        }),
      );
      pillScale.value = withDelay(
        800,
        withSpring(1, {
          stiffness: theme.motion.spring.stiffness,
          damping: theme.motion.spring.damping,
        }),
      );
    } else {
      overlayOpacity.value = 0;
      contentScale.value = 0.9;
      contentOpacity.value = 0;
      checkScale.value = 0;
      pillScale.value = 0;
    }
  }, [
    checkScale,
    contentOpacity,
    contentScale,
    overlayOpacity,
    pillScale,
    theme.motion.spring.damping,
    theme.motion.spring.stiffness,
    visible,
  ]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ scale: contentScale.value }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pillScale.value }],
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.modalRoot} onPress={onDismiss}>
        <Animated.View
          style={[
            styles.overlay,
            { backgroundColor: `${theme.colors.depth.level0}F2` },
            overlayStyle,
          ]}
        >
          <View style={styles.particleContainer} pointerEvents="none">
            {visible
              ? particles.map((particle) => (
                  <Particle key={particle.id} config={particle} active={visible} />
                ))
              : null}
          </View>

          <Animated.View style={[styles.content, contentStyle]}>
            <Animated.View
              style={[
                styles.checkCircle,
                {
                  borderColor: theme.colors.primary.dim,
                  backgroundColor: `${theme.colors.primary.default}33`,
                  shadowColor: theme.colors.primary.default,
                },
                checkStyle,
              ]}
            >
              <MaterialIcons
                name="check"
                size={48}
                color={theme.colors.primary.dim}
              />
            </Animated.View>

            <Text
              style={[
                toTextStyle(theme.typography.displayLg),
                { color: theme.colors.text.primary, marginBottom: 8 },
              ]}
            >
              Confirmed
            </Text>
            <Text
              style={[
                toTextStyle(theme.typography.bodyLg),
                {
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing.sectionGap,
                },
              ]}
            >
              Your chair is reserved.
            </Text>

            <Animated.View style={pillStyle}>
              <LinearGradient
                colors={[...theme.colors.gradient.premium]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[
                  styles.xpPill,
                  {
                    shadowColor: theme.colors.gradient.premium[1],
                  },
                ]}
              >
                <Text
                  style={[
                    toTextStyle(theme.typography.headlineMd),
                    {
                      color: theme.colors.text.onPrimary,
                      letterSpacing: 2,
                    },
                  ]}
                >
                  +50 XP
                </Text>
              </LinearGradient>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  particleContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  particle: {
    position: "absolute",
  },
  content: {
    alignItems: "center",
    zIndex: 10,
  },
  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  xpPill: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 999,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
});

export default BookingSuccessOverlay;
