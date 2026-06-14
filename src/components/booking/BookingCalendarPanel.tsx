import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, type DateData } from "react-native-calendars";
import { useTheme } from "@/hooks/useTheme";
import {
  buildMarkedDates,
  parseYMD,
  startOfToday,
  toYMD,
} from "@/utils/bookingCalendar";

interface BookingCalendarPanelProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  availableDates?: readonly string[];
}

const BookingCalendarPanel = ({
  selectedDate,
  onSelectDate,
  availableDates = [],
}: BookingCalendarPanelProps): React.JSX.Element => {
  const { theme } = useTheme();

  const selectedYmd = useMemo(() => toYMD(selectedDate), [selectedDate]);
  const minDate = useMemo(() => toYMD(startOfToday()), []);

  const markedDates = useMemo(
    () =>
      buildMarkedDates(selectedYmd, availableDates, {
        selected: theme.colors.accent.amber,
        dot: theme.colors.accent.amber,
      }),
    [availableDates, selectedYmd, theme.colors.accent.amber],
  );

  const calendarTheme = useMemo(
    () => ({
      calendarBackground: theme.colors.depth.level1,
      textSectionTitleColor: theme.colors.text.secondary,
      textSectionTitleDisabledColor: theme.colors.text.disabled,
      selectedDayBackgroundColor: theme.colors.accent.amber,
      selectedDayTextColor: theme.colors.depth.level0,
      todayTextColor: theme.colors.primary.dim,
      dayTextColor: theme.colors.text.primary,
      textDisabledColor: theme.colors.text.disabled,
      dotColor: theme.colors.accent.amber,
      selectedDotColor: theme.colors.depth.level0,
      arrowColor: theme.colors.text.primary,
      monthTextColor: theme.colors.text.primary,
      textMonthFontWeight: "700" as const,
      textDayFontWeight: "400" as const,
      textDayHeaderFontWeight: "500" as const,
      textMonthFontSize: theme.typography.headlineMd.fontSize,
      textDayFontSize: theme.typography.bodyMd.fontSize,
      textDayHeaderFontSize: theme.typography.labelSm.fontSize,
    }),
    [theme],
  );

  const handleDayPress = useCallback(
    (day: DateData): void => {
      onSelectDate(parseYMD(day.dateString));
    },
    [onSelectDate],
  );

  return (
    <View
      style={[
        styles.panel,
        {
          backgroundColor: theme.colors.depth.level1,
          borderColor: theme.colors.border.level1,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.stackLg,
        },
      ]}
    >
      <Calendar
        current={selectedYmd}
        minDate={minDate}
        markedDates={markedDates}
        onDayPress={handleDayPress}
        theme={calendarTheme}
        firstDay={1}
        enableSwipeMonths
        hideExtraDays
        disableAllTouchEventsForDisabledDays
        style={styles.calendar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    overflow: "hidden",
  },
  calendar: {
    marginHorizontal: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default BookingCalendarPanel;
