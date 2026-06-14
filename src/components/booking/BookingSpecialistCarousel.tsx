import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import BookingSectionHeader from "./BookingSectionHeader";
import BookingSpecialistCard from "./BookingSpecialistCard";
import { useTheme } from "@/hooks/useTheme";
import type { ShopSpecialist } from "@/data/barberProfileMock";

interface BookingSpecialistCarouselProps {
  specialists: readonly ShopSpecialist[];
  selectedId: string;
  onSelect: (specialistId: string) => void;
  onSeeAllPress?: () => void;
}

const BookingSpecialistCarousel = ({
  specialists,
  selectedId,
  onSelect,
  onSeeAllPress,
}: BookingSpecialistCarouselProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.stackMd }}>
      <BookingSectionHeader
        title="Select Specialist"
        {...(onSeeAllPress !== undefined ? { onSeeAllPress } : {})}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { gap: theme.spacing.gutter },
        ]}
      >
        {specialists.map((specialist) => (
          <BookingSpecialistCard
            key={specialist.id}
            specialist={specialist}
            isSelected={specialist.id === selectedId}
            onPress={onSelect}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

export default BookingSpecialistCarousel;
