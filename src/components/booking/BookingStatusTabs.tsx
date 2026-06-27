import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BOOKING_STATUS_OPTIONS, type BookingAppointmentStatus } from "@/data/bookingsMock";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface BookingStatusTabsProps {
  activeStatus: BookingAppointmentStatus;
  onSelect: (status: BookingAppointmentStatus) => void;
}

const BookingStatusTabs = ({
  activeStatus,
  onSelect,
}: BookingStatusTabsProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handleSelect = useCallback(
    (status: BookingAppointmentStatus) => (): void => {
      onSelect(status);
    },
    [onSelect],
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.depth.level0,
          borderColor: theme.colors.border.level1,
          borderRadius: theme.borderRadius.full,
          padding: 4,
        },
      ]}
    >
      {BOOKING_STATUS_OPTIONS.map((option) => {
        const isActive = option.id === activeStatus;

        return (
          <Pressable
            key={option.id}
            onPress={handleSelect(option.id)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            style={({ pressed }) => [
              styles.segment,
              {
                backgroundColor: isActive
                  ? theme.colors.primary.default
                  : "transparent",
                borderRadius: theme.borderRadius.full,
                opacity: pressed ? 0.85 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
          >
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                styles.label,
                {
                  color: isActive
                    ? theme.colors.text.onPrimary
                    : theme.colors.text.secondary,
                },
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    overflow: "hidden",
  },
  segment: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  label: {
    fontWeight: "700",
    textTransform: "none",
  },
});

export default BookingStatusTabs;
