import React, { useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BottomSheetHandle } from "@gorhom/bottom-sheet";
import Animated, {
  cancelAnimation,
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import { EXPANDED_SNAP_INDEX } from "@/utils/bookingSheetLayout";

type BookingSheetExpandHandleProps = React.ComponentProps<
  typeof BottomSheetHandle
>;

const BookingSheetExpandHandle = ({
  animatedIndex,
  indicatorStyle,
  style,
  ...rest
}: BookingSheetExpandHandleProps): React.JSX.Element => {
  const { theme } = useTheme();
  const bounceY = useSharedValue(0);

  useAnimatedReaction(
    () => animatedIndex.value,
    (index) => {
      if (index >= EXPANDED_SNAP_INDEX) {
        cancelAnimation(bounceY);
        bounceY.value = 0;
        return;
      }

      cancelAnimation(bounceY);
      bounceY.value = withRepeat(
        withSequence(
          withTiming(-5, {
            duration: 650,
            easing: Easing.inOut(Easing.quad),
          }),
          withTiming(0, {
            duration: 650,
            easing: Easing.inOut(Easing.quad),
          }),
        ),
        -1,
        false,
      );
    },
    [animatedIndex],
  );

  const hintStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceY.value }],
    opacity: interpolate(
      animatedIndex.value,
      [0, EXPANDED_SNAP_INDEX - 0.15, EXPANDED_SNAP_INDEX],
      [1, 0.35, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const mergedIndicatorStyle = useMemo(
    () => [
      indicatorStyle,
      {
        backgroundColor: `${theme.colors.text.disabled}99`,
        width: 48,
      },
    ],
    [indicatorStyle, theme.colors.text.disabled],
  );

  return (
    <BottomSheetHandle
      animatedIndex={animatedIndex}
      indicatorStyle={mergedIndicatorStyle}
      style={style}
      {...rest}
    >
      <Animated.View style={[styles.hint, hintStyle]}>
        <MaterialIcons
          name="keyboard-arrow-up"
          size={18}
          color={theme.colors.text.secondary}
        />
        <Text
          style={[
            toTextStyle(theme.typography.labelSm),
            {
              color: theme.colors.text.disabled,
              textTransform: "none",
            },
          ]}
        >
          Swipe up to expand
        </Text>
      </Animated.View>
    </BottomSheetHandle>
  );
};

const styles = StyleSheet.create({
  hint: {
    alignItems: "center",
    gap: 2,
    paddingTop: 4,
  },
});

export default React.memo(BookingSheetExpandHandle);
