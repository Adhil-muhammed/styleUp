import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

const STAR_COUNT = 5;

interface RatingFilterPickerProps {
  minRating: number;
  onSelect: (rating: number) => void;
}

const RatingFilterPicker = ({
  minRating,
  onSelect,
}: RatingFilterPickerProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback(
    (rating: number) => (): void => {
      onSelect(minRating === rating ? 0 : rating);
    },
    [minRating, onSelect],
  );

  const displayRating = minRating > 0 ? `${minRating.toFixed(1)} Stars` : "Any";

  return (
    <View style={styles.row}>
      <View style={styles.stars}>
        {Array.from({ length: STAR_COUNT }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= minRating;

          return (
            <Pressable
              key={starValue}
              onPress={handlePress(starValue)}
              hitSlop={8}
              style={({ pressed }) => [
                styles.starButton,
                { opacity: pressed ? 0.75 : 1 },
              ]}
            >
              <MaterialIcons
                name="star"
                size={28}
                color={
                  isFilled
                    ? theme.colors.accent.amber
                    : theme.colors.text.disabled
                }
              />
            </Pressable>
          );
        })}
      </View>
      <Text
        style={[
          toTextStyle(theme.typography.bodyMd),
          { color: theme.colors.text.primary },
        ]}
      >
        {displayRating}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
  },
  starButton: {
    paddingHorizontal: 2,
  },
});

export default RatingFilterPicker;
