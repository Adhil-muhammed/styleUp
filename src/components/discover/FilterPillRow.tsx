import React, { useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import FilterPill from "./FilterPill";
import type { FilterOption } from "@/data/discoverMock";
import { useTheme } from "@/hooks/useTheme";

interface FilterPillRowProps {
  options: FilterOption[];
  activeId: string;
  onSelect: (id: string) => void;
}

const FilterPillRow = ({
  options,
  activeId,
  onSelect,
}: FilterPillRowProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handleSelect = useCallback(
    (id: string) => (): void => {
      onSelect(id);
    },
    [onSelect],
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        { gap: theme.spacing.stackSm, paddingBottom: 4 },
      ]}
    >
      {options.map((option) => (
        <FilterPill
          key={option.id}
          label={option.label}
          active={option.id === activeId}
          onPress={handleSelect(option.id)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FilterPillRow;
