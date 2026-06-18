import React, { useCallback } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { FilterOption } from "@/data/discoverMock";

interface ServiceFilterChipsProps {
  options: readonly FilterOption[];
  selectedIds: readonly string[];
  onToggle: (serviceId: string) => void;
}

const ServiceFilterChips = ({
  options,
  selectedIds,
  onToggle,
}: ServiceFilterChipsProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback(
    (serviceId: string) => (): void => {
      onToggle(serviceId);
    },
    [onToggle],
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.row,
        { gap: theme.spacing.stackSm },
      ]}
    >
      {options.map((option) => {
        const isSelected = selectedIds.includes(option.id);

        return (
          <Pressable
            key={option.id}
            onPress={handlePress(option.id)}
            hitSlop={8}
            style={({ pressed }) => [
              styles.chip,
              {
                backgroundColor: isSelected
                  ? theme.colors.primary.default
                  : theme.colors.depth.level2,
                borderColor: isSelected
                  ? theme.colors.primary.default
                  : theme.colors.border.level1,
                borderRadius: theme.borderRadius.full,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                {
                  color: isSelected
                    ? theme.colors.text.onPrimary
                    : theme.colors.text.secondary,
                },
              ]}
            >
              {option.label}
            </Text>
            {isSelected ? (
              <View style={styles.closeIcon}>
                <MaterialIcons
                  name="close"
                  size={14}
                  color={theme.colors.text.onPrimary}
                />
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  closeIcon: {
    marginLeft: 2,
  },
});

export default ServiceFilterChips;
