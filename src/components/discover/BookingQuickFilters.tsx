import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { BookingQuickFilterOption } from "@/data/discoverMock";

interface BookingQuickFiltersProps {
  timeOptions: BookingQuickFilterOption[];
  profileOptions: BookingQuickFilterOption[];
  activeTimeId: string;
  activeProfileId: string;
  onTimeSelect?: (id: string) => void;
  onProfileSelect?: (id: string) => void;
}

const BookingQuickFilters = ({
  timeOptions,
  profileOptions,
  activeTimeId,
  activeProfileId,
  onTimeSelect,
  onProfileSelect,
}: BookingQuickFiltersProps): React.JSX.Element => {
  const { theme } = useTheme();
  const activeTime =
    timeOptions.find((option) => option.id === activeTimeId) ?? timeOptions[0];
  const activeProfile =
    profileOptions.find((option) => option.id === activeProfileId) ??
    profileOptions[0];

  const handleTimePress = useCallback((): void => {
    onTimeSelect?.(activeTimeId);
  }, [activeTimeId, onTimeSelect]);

  const handleProfilePress = useCallback((): void => {
    onProfileSelect?.(activeProfileId);
  }, [activeProfileId, onProfileSelect]);

  if (activeTime === undefined || activeProfile === undefined) {
    return <View />;
  }

  return (
    <View style={[styles.row, { gap: theme.spacing.stackSm }]}>
      <FilterPill
        icon={activeTime.icon}
        label={activeTime.label}
        onPress={handleTimePress}
      />
      <FilterPill
        icon={activeProfile.icon}
        label={activeProfile.label}
        onPress={handleProfilePress}
      />
    </View>
  );
};

interface FilterPillProps {
  icon: BookingQuickFilterOption["icon"];
  label: string;
  onPress: () => void;
}

const FilterPill = ({
  icon,
  label,
  onPress,
}: FilterPillProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        {
          backgroundColor: theme.colors.depth.level2,
          borderColor: theme.colors.border.level1,
          borderRadius: theme.borderRadius.full,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <MaterialIcons
        name={icon}
        size={18}
        color={theme.colors.text.secondary}
      />
      <Text
        style={[
          toTextStyle(theme.typography.labelMd),
          { color: theme.colors.text.primary },
        ]}
      >
        {label}
      </Text>
      <MaterialIcons
        name="keyboard-arrow-down"
        size={18}
        color={theme.colors.text.secondary}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    gap: 6,
  },
});

export default BookingQuickFilters;
