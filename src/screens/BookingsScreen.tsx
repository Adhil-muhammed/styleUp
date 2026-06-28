import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  BookingAppointmentCard,
  BookingCancellationDialog,
  BookingStatusTabs,
} from "@/components/booking";
import Typography from "@/components/common/Typography";
import { useBookingsScreen } from "@/hooks/useBookingsScreen";
import { useTheme } from "@/hooks/useTheme";
import type { AppTabScreenProps } from "@/navigation/types";

type Props = AppTabScreenProps<"Bookings">;

const BookingsScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const bookings = useBookingsScreen();

  const scrollBottomPadding = theme.spacing.stackLg;
  const hasAppointments = bookings.visibleAppointments.length > 0;
  const headerIconButtonStyle = [
    styles.headerIconButton,
    {
      width: 44,
      height: 44,
      borderColor: theme.colors.border.level1,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.depth.level1,
    },
  ];

  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: theme.spacing.containerMargin,
              paddingTop: theme.spacing.stackLg,
              paddingBottom: scrollBottomPadding,
              gap: theme.spacing.stackMd,
            },
          ]}
        >
          <View style={styles.header}>
            <Typography
              variant="headlineLgMobile"
              color={theme.colors.text.primary}
              style={styles.headerTitle}
            >
              Your Appointments
            </Typography>
            <View
              style={[
                styles.headerActions,
                {
                  gap: theme.spacing.stackSm,
                },
              ]}
            >
              <View style={headerIconButtonStyle}>
                <MaterialIcons
                  name="map"
                  size={22}
                  color={theme.colors.text.primary}
                />
              </View>
              <View style={headerIconButtonStyle}>
                <MaterialIcons
                  name="tune"
                  size={22}
                  color={theme.colors.text.primary}
                />
              </View>
            </View>
          </View>

          <BookingStatusTabs
            activeStatus={bookings.activeStatus}
            onSelect={bookings.onStatusSelect}
          />

          {hasAppointments ? (
            bookings.visibleAppointments.map((appointment) => (
              <BookingAppointmentCard
                key={appointment.id}
                appointment={appointment}
                onToggleReminder={bookings.onToggleReminder}
                onCancel={bookings.onRequestCancelAppointment}
                onReview={bookings.onReviewAppointment}
                onReschedule={bookings.onRescheduleAppointment}
              />
            ))
          ) : (
            <View
              style={[
                styles.emptyState,
                {
                  backgroundColor: theme.colors.depth.level1,
                  borderColor: theme.colors.border.level1,
                  borderRadius: theme.borderRadius.xl,
                  padding: theme.spacing.stackLg,
                },
              ]}
            >
              <Typography
                variant="headlineMd"
                color={theme.colors.text.primary}
                style={styles.emptyTitle}
              >
                No bookings here
              </Typography>
              <Typography
                variant="bodyMd"
                color={theme.colors.text.secondary}
                style={styles.emptyCopy}
              >
                Your {bookings.activeStatus} appointments will appear here.
              </Typography>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      <BookingCancellationDialog
        visible={bookings.isCancellationDialogVisible}
        onDismiss={bookings.onDismissCancellationDialog}
        onConfirm={bookings.onConfirmCancellation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  headerTitle: {
    flex: 1,
    textTransform: "none",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
  },
  headerIconButton: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  emptyTitle: {
    textAlign: "center",
    textTransform: "none",
  },
  emptyCopy: {
    marginTop: 8,
    textAlign: "center",
    textTransform: "none",
  },
});

export default BookingsScreen;
