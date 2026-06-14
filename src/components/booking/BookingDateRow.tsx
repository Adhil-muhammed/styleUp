import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GlassPanel } from "@/components/common";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import { formatBookingDateLong } from "@/data/bookMock";

interface BookingDateRowProps {
  selectedDate: Date;
  onCalendarPress: () => void;
}

const BookingDateRow = ({
  selectedDate,
  onCalendarPress,
}: BookingDateRowProps): React.JSX.Element => {
  const { theme } = useTheme();

  const weekday = selectedDate
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  const handleCalendarPress = useCallback((): void => {
    onCalendarPress();
  }, [onCalendarPress]);

  return (
    <GlassPanel style={styles.panel}>
      <View
        style={[
          styles.content,
          {
            padding: theme.spacing.stackSm,
            backgroundColor: `${theme.colors.depth.level0}80`,
          },
        ]}
      >
        <View style={[styles.dateCol, { marginLeft: theme.spacing.stackSm }]}>
          <Text
            style={[
              toTextStyle(theme.typography.labelSm),
              { color: theme.colors.primary.dim },
            ]}
          >
            {weekday}
          </Text>
          <Text
            style={[
              toTextStyle(theme.typography.bodyLg),
              { color: theme.colors.text.primary },
            ]}
          >
            {formatBookingDateLong(selectedDate)}
          </Text>
        </View>

        <Pressable
          onPress={handleCalendarPress}
          hitSlop={8}
          style={({ pressed }) => [
            styles.calendarButton,
            {
              backgroundColor: theme.colors.depth.level2,
              borderRadius: theme.borderRadius.lg,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <MaterialIcons
            name="calendar-month"
            size={24}
            color={theme.colors.primary.dim}
          />
        </Pressable>
      </View>
    </GlassPanel>
  );
};

const styles = StyleSheet.create({
  panel: {
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateCol: {
    flex: 1,
    gap: 2,
  },
  calendarButton: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BookingDateRow;
