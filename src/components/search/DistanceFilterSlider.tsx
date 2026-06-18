import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import {
  SEARCH_DISTANCE_MAX_KM,
  SEARCH_DISTANCE_MIN_KM,
} from "@/types/searchFilters";

interface DistanceFilterSliderProps {
  maxDistanceKm: number;
  onChange: (distanceKm: number) => void;
}

const TOOLTIP_HALF_WIDTH = 20;

const DistanceFilterSlider = ({
  maxDistanceKm,
  onChange,
}: DistanceFilterSliderProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handleValueChange = useCallback(
    (value: number): void => {
      onChange(Math.round(value));
    },
    [onChange],
  );

  const thumbPositionPercent =
    ((maxDistanceKm - SEARCH_DISTANCE_MIN_KM) /
      (SEARCH_DISTANCE_MAX_KM - SEARCH_DISTANCE_MIN_KM)) *
    100;

  return (
    <View style={styles.wrapper}>
      <View style={styles.tooltipTrack} pointerEvents="none">
        <View
          style={[
            styles.tooltip,
            {
              left: `${thumbPositionPercent}%`,
              backgroundColor: theme.colors.primary.default,
              borderRadius: theme.borderRadius.md,
              transform: [{ translateX: -TOOLTIP_HALF_WIDTH }],
            },
          ]}
        >
          <Text
            style={[
              toTextStyle(theme.typography.labelSm),
              { color: theme.colors.text.onPrimary },
            ]}
          >
            {maxDistanceKm}km
          </Text>
        </View>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={SEARCH_DISTANCE_MIN_KM}
        maximumValue={SEARCH_DISTANCE_MAX_KM}
        step={1}
        value={maxDistanceKm}
        onValueChange={handleValueChange}
        minimumTrackTintColor={theme.colors.primary.default}
        maximumTrackTintColor={theme.colors.border.level1}
        thumbTintColor={theme.colors.primary.default}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingTop: 8,
  },
  tooltipTrack: {
    position: "relative",
    height: 28,
    marginBottom: 4,
  },
  tooltip: {
    position: "absolute",
    top: 0,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 40,
    alignItems: "center",
  },
  slider: {
    width: "100%",
    height: 40,
  },
});

export default DistanceFilterSlider;
