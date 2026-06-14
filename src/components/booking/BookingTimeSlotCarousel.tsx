import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { TimeSlotOption } from "@/data/bookMock";

interface BookingTimeSlotCarouselProps {
  slots: readonly TimeSlotOption[];
  selectedSlotId: string;
  onSelectSlot: (slotId: string) => void;
}

const BookingTimeSlotCarousel = ({
  slots,
  selectedSlotId,
  onSelectSlot,
}: BookingTimeSlotCarouselProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.scrollContent, { gap: theme.spacing.stackMd }]}
    >
      {slots.map((slot) => {
        const isSelected = slot.id === selectedSlotId;

        return (
          <Pressable
            key={slot.id}
            onPress={() => onSelectSlot(slot.id)}
            style={({ pressed }) => [
              styles.pill,
              isSelected
                ? {
                    backgroundColor: theme.colors.primary.default,
                    borderRadius: theme.borderRadius.full,
                    shadowColor: theme.colors.primary.default,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.4,
                    shadowRadius: 10,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  }
                : {
                    borderWidth: 1,
                    borderColor: theme.colors.primary.default,
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
                    : theme.colors.primary.dim,
                },
              ]}
            >
              {slot.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default BookingTimeSlotCarousel;
