import React, { useCallback } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DiscoverTopBar from "@/components/discover/DiscoverTopBar";
import {
  BookingDateRow,
  BookingNotesInput,
  BookingServiceOptionRow,
  BookingStepHeader,
  BookingSuccessOverlay,
  BookingSummaryCard,
  ConfirmBookingBar,
  CONFIRM_CTA_APPROX_HEIGHT,
  TimeSlotGrid,
} from "@/components/booking";
import { getTabBarTotalHeight } from "@/components/layout/MidnightEdgeTabBar";
import { BOOK_TAB_SERVICES, BOOK_TIME_SLOTS } from "@/data/bookMock";
import { useBookAppointment } from "@/hooks/useBookAppointment";
import { useTheme } from "@/hooks/useTheme";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import type { AppTabScreenProps } from "@/navigation/types";

type Props = AppTabScreenProps<"Book">;

const TOP_BAR_CONTENT_HEIGHT = 40 + 16;

const BookScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const clearDraft = useBookingDraftStore((s) => s.clearDraft);
  const booking = useBookAppointment();

  const topBarHeight = insets.top + theme.spacing.stackMd + TOP_BAR_CONTENT_HEIGHT + theme.spacing.stackMd;
  const tabBarHeight = getTabBarTotalHeight(insets.bottom);
  const ctaBottomOffset = tabBarHeight + theme.spacing.stackMd;
  const scrollBottomPadding = ctaBottomOffset + CONFIRM_CTA_APPROX_HEIGHT + theme.spacing.sectionGap;

  const handleDateChange = useCallback(
    (event: DateTimePickerEvent, date?: Date): void => {
      if (event.type === "dismissed") {
        booking.onDismissDatePicker();
        return;
      }
      if (date !== undefined) {
        booking.onDateChange(date);
      }
    },
    [booking.onDateChange, booking.onDismissDatePicker],
  );

  const handleConfirm = useCallback((): void => {
    booking.onConfirm();
    clearDraft();
  }, [booking.onConfirm, clearDraft]);

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}>
      <DiscoverTopBar variant="book" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={topBarHeight}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: topBarHeight,
              paddingBottom: scrollBottomPadding,
              paddingHorizontal: theme.spacing.containerMargin,
              gap: theme.spacing.sectionGap,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ gap: theme.spacing.stackMd }}>
            <BookingStepHeader title="Select Service" stepLabel="Step 1 of 3" />
            <View style={{ gap: theme.spacing.stackSm }}>
              {BOOK_TAB_SERVICES.map((service) => (
                <BookingServiceOptionRow
                  key={service.id}
                  service={service}
                  isSelected={service.id === booking.selectedServiceId}
                  onPress={booking.onSelectService}
                />
              ))}
            </View>
          </View>

          <View style={{ gap: theme.spacing.stackMd }}>
            <BookingStepHeader title="Schedule" stepLabel="Step 2 of 3" />
            <BookingDateRow
              selectedDate={booking.selectedDate}
              onCalendarPress={booking.onOpenDatePicker}
            />
            <TimeSlotGrid
              slots={BOOK_TIME_SLOTS}
              selectedSlotId={booking.selectedTimeId}
              onSelectSlot={booking.onSelectTime}
            />
          </View>

          <View style={{ gap: theme.spacing.stackMd }}>
            <BookingStepHeader title="Summary" stepLabel="Final Step" />
            <BookingSummaryCard
              barber={booking.barber}
              service={booking.selectedService}
              selectedDate={booking.selectedDate}
              selectedTime={booking.selectedTime}
            />
            <BookingNotesInput
              value={booking.notes}
              onChangeText={booking.onNotesChange}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View
        style={[
          styles.ctaContainer,
          {
            bottom: ctaBottomOffset,
            paddingHorizontal: theme.spacing.containerMargin,
          },
        ]}
        pointerEvents="box-none"
      >
        <ConfirmBookingBar onConfirm={handleConfirm} />
      </View>

      {booking.isDatePickerVisible ? (
        <DateTimePicker
          value={booking.selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      ) : null}

      <BookingSuccessOverlay
        visible={booking.isSuccessVisible}
        onDismiss={booking.onDismissSuccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  ctaContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 30,
  },
});

export default BookScreen;
