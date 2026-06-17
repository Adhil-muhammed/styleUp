import React, { useCallback, useMemo } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Price } from "@/components/common";
import Typography from "@/components/common/Typography";
import { useCurrency } from "@/hooks/useCurrency";
import { useTheme } from "@/hooks/useTheme";
import type { MapPinVariant } from "@/data/discoverMock";

interface MapPinProps {
  avatarUri: string;
  label?: string;
  priceCents?: number;
  variant: MapPinVariant;
  size: number;
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MapPin = ({
  avatarUri,
  label,
  priceCents,
  variant,
  size,
  onPress,
}: MapPinProps): React.JSX.Element => {
  const { theme } = useTheme();
  const { format } = useCurrency();
  const scale = useSharedValue(1);

  const isPrimary = variant === "primary";
  const ringColor = isPrimary
    ? theme.colors.primary.default
    : theme.colors.accent.amber;

  const displayLabel = useMemo((): string => {
    if (priceCents !== undefined) {
      return format(priceCents);
    }

    return label ?? "";
  }, [format, label, priceCents]);

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
      style={[styles.wrapper, animatedStyle]}
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
        {priceCents !== undefined ? (
          <Price
            amountMinor={priceCents}
            variant="labelSm"
            color={
              isPrimary
                ? theme.colors.text.primary
                : theme.colors.accent.amber
            }
          />
        ) : (
          <Typography
            variant="labelSm"
            color={
              isPrimary
                ? theme.colors.text.primary
                : theme.colors.accent.amber
            }
          >
            {displayLabel}
          </Typography>
        )}
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
