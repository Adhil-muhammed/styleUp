import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { focusGlowStyle, toTextStyle } from "@/config/theme";
import type { TimeSlotOption } from "@/data/bookMock";

interface TimeSlotButtonProps {
  slot: TimeSlotOption;
  isSelected: boolean;
  onPress: (slotId: string) => void;
}

const TimeSlotButton = ({
  slot,
  isSelected,
  onPress,
}: TimeSlotButtonProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback((): void => {
    onPress(slot.id);
  }, [onPress, slot.id]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        {
          borderRadius: theme.borderRadius.lg,
          borderColor: isSelected
            ? theme.colors.primary.default
            : theme.colors.border.level1,
          backgroundColor: isSelected
            ? `${theme.colors.primary.default}33`
            : "transparent",
          opacity: pressed ? 0.85 : 1,
        },
        isSelected && focusGlowStyle(theme),
      ]}
    >
      <Text
        style={[
          toTextStyle(theme.typography.labelMd),
          {
            color: isSelected
              ? theme.colors.primary.dim
              : theme.colors.text.primary,
          },
        ]}
      >
        {slot.label}
      </Text>
    </Pressable>
  );
};

interface TimeSlotGridProps {
  slots: TimeSlotOption[];
  selectedSlotId: string;
  onSelectSlot: (slotId: string) => void;
}

const TimeSlotGrid = ({
  slots,
  selectedSlotId,
  onSelectSlot,
}: TimeSlotGridProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.grid, { gap: theme.spacing.stackSm }]}>
      {slots.map((slot) => (
        <View key={slot.id} style={styles.cell}>
          <TimeSlotButton
            slot={slot}
            isSelected={slot.id === selectedSlotId}
            onPress={onSelectSlot}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: "31%",
  },
  button: {
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});

export default TimeSlotGrid;
