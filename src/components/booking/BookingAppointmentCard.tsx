import React, { useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { BookingAppointment } from "@/data/bookingsMock";

interface BookingAppointmentCardProps {
  appointment: BookingAppointment;
  onToggleReminder: (appointmentId: string) => void;
  onCancel: (appointmentId: string) => void;
  onReview: (appointmentId: string) => void;
  onReschedule: (appointmentId: string) => void;
}

const THUMBNAIL_SIZE = 80;

function formatServices(services: readonly string[]): string {
  if (services.length === 0) {
    return "";
  }

  return `Services: ${services.join(", ")}`;
}

const BookingAppointmentCard = ({
  appointment,
  onToggleReminder,
  onCancel,
  onReview,
  onReschedule,
}: BookingAppointmentCardProps): React.JSX.Element => {
  const { theme } = useTheme();
  const isUpcoming = appointment.status === "upcoming";
  const isDimmed = appointment.dimmed === true;
  const servicesLabel = formatServices(appointment.services);

  const handleToggleReminder = useCallback((): void => {
    onToggleReminder(appointment.id);
  }, [appointment.id, onToggleReminder]);

  const handleCancel = useCallback((): void => {
    onCancel(appointment.id);
  }, [appointment.id, onCancel]);

  const handleReview = useCallback((): void => {
    onReview(appointment.id);
  }, [appointment.id, onReview]);

  const handleReschedule = useCallback((): void => {
    onReschedule(appointment.id);
  }, [appointment.id, onReschedule]);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.depth.level1,
          borderColor: theme.colors.border.level1,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.stackMd,
          opacity: isDimmed ? 0.5 : 1,
        },
      ]}
    >
      <Typography
        variant="bodyMd"
        color={theme.colors.text.primary}
        style={styles.dateLabel}
      >
        {appointment.dateTimeLabel}
      </Typography>

      <View
        style={[
          styles.contentRow,
          {
            gap: theme.spacing.stackMd,
            marginTop: theme.spacing.stackMd,
          },
        ]}
      >
        <View
          style={[
            styles.imageWrap,
            {
              width: THUMBNAIL_SIZE,
              height: THUMBNAIL_SIZE,
              borderColor: theme.colors.border.level1,
              borderRadius: theme.borderRadius.md,
              backgroundColor: theme.colors.depth.level2,
            },
          ]}
        >
          <Image
            source={{ uri: appointment.imageUri }}
            style={styles.image}
          />
        </View>

        <View style={styles.details}>
          <Typography
            variant="bodyLg"
            color={theme.colors.text.primary}
            numberOfLines={1}
            style={styles.shopName}
          >
            {appointment.shopName}
          </Typography>
          <Typography
            variant="labelSm"
            color={theme.colors.text.secondary}
            numberOfLines={1}
            style={styles.address}
          >
            {appointment.address}
          </Typography>
          {servicesLabel.length > 0 ? (
            <Typography
              variant="labelSm"
              color={theme.colors.primary.dim}
              numberOfLines={2}
              style={styles.services}
            >
              {servicesLabel}
            </Typography>
          ) : null}
        </View>
      </View>

      {isUpcoming ? (
        <View
          style={[
            styles.footer,
            {
              marginTop: theme.spacing.stackMd,
              gap: theme.spacing.stackMd,
            },
          ]}
        >
          <View style={[styles.reminderGroup, { gap: theme.spacing.stackSm }]}>
            <Pressable
              onPress={handleToggleReminder}
              hitSlop={8}
              accessibilityRole="switch"
              accessibilityState={{ checked: appointment.reminderEnabled }}
              style={({ pressed }) => [
                styles.toggle,
                {
                  backgroundColor: appointment.reminderEnabled
                    ? theme.colors.primary.default
                    : theme.colors.depth.level2,
                  borderColor: appointment.reminderEnabled
                    ? theme.colors.primary.default
                    : theme.colors.border.level1,
                  borderRadius: theme.borderRadius.full,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <View
                style={[
                  styles.toggleKnob,
                  appointment.reminderEnabled
                    ? styles.toggleKnobOn
                    : styles.toggleKnobOff,
                  {
                    backgroundColor: appointment.reminderEnabled
                      ? theme.colors.text.onPrimary
                      : theme.colors.text.secondary,
                    borderRadius: theme.borderRadius.full,
                  },
                ]}
              />
            </Pressable>

            <View style={styles.reminderLabelRow}>
              <Text
                style={[
                  toTextStyle(theme.typography.labelMd),
                  {
                    color: theme.colors.text.secondary,
                    textTransform: "none",
                  },
                ]}
              >
                {appointment.reminderEnabled
                  ? appointment.reminderLabel
                  : "Remind me"}
              </Text>
              <MaterialIcons
                name="expand-more"
                size={18}
                color={theme.colors.text.secondary}
              />
            </View>
          </View>

          <Pressable
            onPress={handleCancel}
            hitSlop={8}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.cancelButton,
              {
                borderColor: theme.colors.border.level1,
                borderRadius: theme.borderRadius.full,
                backgroundColor: pressed
                  ? theme.colors.depth.level2
                  : "transparent",
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                {
                  color: theme.colors.text.primary,
                  fontWeight: "700",
                  textTransform: "none",
                },
              ]}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      ) : (
        <View
          style={[
            styles.pastActions,
            {
              marginTop: theme.spacing.stackMd,
              gap: theme.spacing.stackSm,
            },
          ]}
        >
          <Pressable
            onPress={handleReview}
            hitSlop={8}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.pastActionButton,
              {
                borderColor: theme.colors.border.level1,
                borderRadius: theme.borderRadius.default,
                backgroundColor: pressed
                  ? theme.colors.depth.level2
                  : "transparent",
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                styles.pastActionLabel,
                {
                  color: theme.colors.text.primary,
                },
              ]}
            >
              Review
            </Text>
          </Pressable>

          <Pressable
            onPress={handleReschedule}
            hitSlop={8}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.pastActionButton,
              {
                borderColor: theme.colors.primary.default,
                borderRadius: theme.borderRadius.default,
                backgroundColor: pressed
                  ? theme.colors.primary.active
                  : theme.colors.primary.default,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                styles.pastActionLabel,
                {
                  color: theme.colors.text.onPrimary,
                },
              ]}
            >
              Reschedule
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: "hidden",
  },
  dateLabel: {
    fontWeight: "700",
    textTransform: "none",
  },
  contentRow: {
    flexDirection: "row",
  },
  imageWrap: {
    borderWidth: 1,
    overflow: "hidden",
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  details: {
    flex: 1,
    justifyContent: "center",
    minWidth: 0,
    gap: 4,
  },
  shopName: {
    fontWeight: "700",
    textTransform: "none",
  },
  address: {
    fontWeight: "400",
    textTransform: "none",
  },
  services: {
    marginTop: 4,
    fontWeight: "600",
    textTransform: "none",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reminderGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },
  toggle: {
    width: 48,
    height: 24,
    borderWidth: 1,
    justifyContent: "center",
    flexShrink: 0,
  },
  toggleKnob: {
    width: 16,
    height: 16,
    position: "absolute",
  },
  toggleKnobOn: {
    right: 4,
  },
  toggleKnobOff: {
    left: 4,
  },
  reminderLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },
  cancelButton: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexShrink: 0,
  },
  pastActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  pastActionButton: {
    borderWidth: 1,
    minWidth: 88,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  pastActionLabel: {
    fontWeight: "700",
    textTransform: "none",
  },
});

export default React.memo(BookingAppointmentCard);
