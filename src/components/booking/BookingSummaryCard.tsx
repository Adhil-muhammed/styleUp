import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GlassPanel, Price } from "@/components/common";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import {
  formatBookingDate,
  formatDuration,
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
            <Typography variant="bodyMd" color={theme.colors.text.secondary}>
              {service.title}
            </Typography>
            <Price
              amountMinor={service.priceCents}
              color={theme.colors.text.primary}
            />
          </View>

          <View style={styles.lineItem}>
            <Typography variant="bodyMd" color={theme.colors.text.secondary}>
              {formatBookingDate(selectedDate)} • {selectedTime.label}
            </Typography>
            <Typography variant="bodyMd" color={theme.colors.text.secondary}>
              {formatDuration(service.durationMinutes)}
            </Typography>
          </View>

          <View style={[styles.lineItem, { paddingTop: theme.spacing.stackSm }]}>
            <Typography
              variant="labelMd"
              color={theme.colors.text.primary}
              style={{ fontWeight: "700" }}
            >
              Total
            </Typography>
            <Price
              amountMinor={service.priceCents}
              color={theme.colors.primary.dim}
              style={{ fontWeight: "700" }}
            />
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
