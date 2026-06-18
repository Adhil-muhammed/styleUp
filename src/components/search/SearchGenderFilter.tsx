import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlassPanel } from "@/components/common";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { SearchGenderFilter as SearchGenderFilterValue } from "@/types/searchFilters";

interface SearchGenderFilterProps {
  activeGender: SearchGenderFilterValue;
  onSelect: (gender: SearchGenderFilterValue) => void;
}

const SEGMENTS: readonly { id: SearchGenderFilterValue; label: string }[] = [
  { id: "all", label: "All" },
  { id: "man", label: "Man" },
  { id: "woman", label: "Woman" },
];

const SearchGenderFilter = ({
  activeGender,
  onSelect,
}: SearchGenderFilterProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handleSelect = useCallback(
    (gender: SearchGenderFilterValue) => (): void => {
      onSelect(gender);
    },
    [onSelect],
  );

  return (
    <GlassPanel style={styles.panel}>
      <View style={[styles.row, { padding: 4 }]}>
        {SEGMENTS.map((segment) => {
          const isActive = segment.id === activeGender;

          return (
            <Pressable
              key={segment.id}
              onPress={handleSelect(segment.id)}
              hitSlop={8}
              style={({ pressed }) => [
                styles.segment,
                {
                  borderRadius: theme.borderRadius.lg,
                  backgroundColor: isActive
                    ? theme.colors.primary.default
                    : "transparent",
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Text
                style={[
                  toTextStyle(theme.typography.labelMd),
                  {
                    color: isActive
                      ? theme.colors.text.onPrimary
                      : theme.colors.text.secondary,
                  },
                ]}
              >
                {segment.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </GlassPanel>
  );
};

const styles = StyleSheet.create({
  panel: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
  },
  segment: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});

export default SearchGenderFilter;
