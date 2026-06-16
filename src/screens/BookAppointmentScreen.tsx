import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BookingAppointmentHeader,
  BookingCalendarPanel,
  BookingContinueBar,
  BookingSectionHeader,
  BookingSpecialistCarousel,
  BookingTimeSlotCarousel,
  BOOKING_CONTINUE_BAR_APPROX_HEIGHT,
} from "@/components/booking";
import { useBookAppointmentScreen } from "@/hooks/useBookAppointmentScreen";
import { useTheme } from "@/hooks/useTheme";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"BookAppointment">;

const FOOTER_EXTRA_PADDING = 16;

const BookAppointmentScreen = ({ route }: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { shopId } = route.params;
  const booking = useBookAppointmentScreen(shopId);

  const scrollBottomPadding =
    BOOKING_CONTINUE_BAR_APPROX_HEIGHT +
    FOOTER_EXTRA_PADDING +
    insets.bottom +
    theme.spacing.stackMd * 2;

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}>
      <BookingAppointmentHeader onGoBack={booking.onGoBack} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: theme.spacing.containerMargin,
            paddingBottom: scrollBottomPadding,
            gap: theme.spacing.sectionGap,
          },
        ]}
      >
        <BookingCalendarPanel
          selectedDate={booking.selectedDate}
          onSelectDate={booking.onSelectDate}
          availableDates={booking.availableDates}
        />

        <View style={{ gap: theme.spacing.stackMd }}>
          <BookingSectionHeader
            title="Select Hours"
            onSeeAllPress={booking.onSeeAllTimes}
          />
          <BookingTimeSlotCarousel
            slots={booking.timeSlots}
            selectedSlotId={booking.selectedTimeId}
            onSelectSlot={booking.onSelectTime}
          />
        </View>

        <BookingSpecialistCarousel
          specialists={booking.specialists}
          selectedId={booking.selectedSpecialistId}
          onSelect={booking.onSelectSpecialist}
          onSeeAllPress={booking.onSeeAllSpecialists}
        />
      </ScrollView>

      <View style={styles.footer}>
        <BookingContinueBar onContinue={booking.onContinue} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 30,
  },
});

export default BookAppointmentScreen;
