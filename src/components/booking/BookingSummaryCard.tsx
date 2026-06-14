import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GlassPanel } from "@/components/common";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import {
  formatBookingDate,
  formatDuration,
  formatPrice,
  type BookBarberSummary,
  type BookServiceOption,
  type TimeSlotOption,
} from "@/data/bookMock";

interface BookingSummaryCardProps {
  barber: BookBarberSummary;
  service: BookServiceOption;
  selectedDate: Date;
  selectedTime: TimeSlotOption;
}

const AVATAR_SIZE = 56;

const BookingSummaryCard = ({
  barber,
  service,
  selectedDate,
  selectedTime,
}: BookingSummaryCardProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <GlassPanel style={styles.panel}>
      <View style={[styles.content, { padding: theme.spacing.stackMd, gap: theme.spacing.stackMd }]}>
        <View
          style={[
            styles.barberRow,
            {
              paddingBottom: theme.spacing.stackMd,
              borderBottomColor: theme.colors.border.level1,
            },
          ]}
        >
          <Image
            source={{ uri: barber.avatarUri }}
            style={[
              styles.avatar,
              {
                borderRadius: theme.borderRadius.xl,
                backgroundColor: theme.colors.depth.level2,
              },
            ]}
          />
          <View style={styles.barberInfo}>
            <Text
              style={[
                toTextStyle(theme.typography.headlineMd),
                { color: theme.colors.text.primary },
              ]}
            >
              {barber.name}
            </Text>
            <View style={styles.ratingRow}>
              <MaterialIcons
                name="star"
                size={16}
                color={theme.colors.primary.dim}
              />
              <Text
                style={[
                  toTextStyle(theme.typography.labelSm),
                  { color: theme.colors.primary.dim, textTransform: "none" },
                ]}
              >
                {barber.rating} {barber.title}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ gap: theme.spacing.stackSm }}>
          <View style={styles.lineItem}>
            <Text
              style={[
                toTextStyle(theme.typography.bodyMd),
                { color: theme.colors.text.secondary },
              ]}
            >
              {service.title}
            </Text>
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                { color: theme.colors.text.primary },
              ]}
            >
              {formatPrice(service.priceCents)}
            </Text>
          </View>

          <View style={styles.lineItem}>
            <Text
              style={[
                toTextStyle(theme.typography.bodyMd),
                { color: theme.colors.text.secondary },
              ]}
            >
              {formatBookingDate(selectedDate)} • {selectedTime.label}
            </Text>
            <Text
              style={[
                toTextStyle(theme.typography.bodyMd),
                { color: theme.colors.text.secondary },
              ]}
            >
              {formatDuration(service.durationMinutes)}
            </Text>
          </View>

          <View style={[styles.lineItem, { paddingTop: theme.spacing.stackSm }]}>
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                { color: theme.colors.text.primary, fontWeight: "700" },
              ]}
            >
              Total
            </Text>
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                { color: theme.colors.primary.dim, fontWeight: "700" },
              ]}
            >
              {formatPrice(service.priceCents)}
            </Text>
          </View>
        </View>
      </View>
    </GlassPanel>
  );
};

const styles = StyleSheet.create({
  panel: {
    width: "100%",
  },
  content: {},
  barberRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    gap: 16,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    resizeMode: "cover",
  },
  barberInfo: {
    flex: 1,
    gap: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  lineItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default BookingSummaryCard;
