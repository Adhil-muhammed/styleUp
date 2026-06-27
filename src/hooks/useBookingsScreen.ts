import { useCallback, useMemo, useState } from "react";
import {
  BOOKING_APPOINTMENTS,
  type BookingAppointment,
  type BookingAppointmentStatus,
} from "@/data/bookingsMock";

export interface UseBookingsScreenResult {
  activeStatus: BookingAppointmentStatus;
  visibleAppointments: readonly BookingAppointment[];
  isCancellationDialogVisible: boolean;
  onStatusSelect: (status: BookingAppointmentStatus) => void;
  onToggleReminder: (appointmentId: string) => void;
  onRequestCancelAppointment: (appointmentId: string) => void;
  onReviewAppointment: (appointmentId: string) => void;
  onRescheduleAppointment: (appointmentId: string) => void;
  onDismissCancellationDialog: () => void;
  onConfirmCancellation: () => void;
}

type ReminderStateByAppointmentId = Record<string, boolean>;

function buildInitialReminderState(): ReminderStateByAppointmentId {
  return BOOKING_APPOINTMENTS.reduce<ReminderStateByAppointmentId>(
    (acc, appointment) => ({
      ...acc,
      [appointment.id]: appointment.reminderEnabled,
    }),
    {},
  );
}

export function useBookingsScreen(): UseBookingsScreenResult {
  const [activeStatus, setActiveStatus] =
    useState<BookingAppointmentStatus>("upcoming");
  const [reminderState, setReminderState] =
    useState<ReminderStateByAppointmentId>(buildInitialReminderState);
  const [canceledAppointmentIds, setCanceledAppointmentIds] = useState<
    readonly string[]
  >([]);
  const [pendingCancellationId, setPendingCancellationId] = useState<
    string | null
  >(null);

  const visibleAppointments = useMemo((): readonly BookingAppointment[] => {
    return BOOKING_APPOINTMENTS.filter((appointment) => {
      if (appointment.status !== activeStatus) {
        return false;
      }

      return !canceledAppointmentIds.includes(appointment.id);
    }).map((appointment) => ({
      ...appointment,
      reminderEnabled:
        reminderState[appointment.id] ?? appointment.reminderEnabled,
    }));
  }, [activeStatus, canceledAppointmentIds, reminderState]);

  const onStatusSelect = useCallback(
    (status: BookingAppointmentStatus): void => {
      setActiveStatus(status);
    },
    [],
  );

  const onToggleReminder = useCallback((appointmentId: string): void => {
    setReminderState((current) => ({
      ...current,
      [appointmentId]: !(current[appointmentId] ?? false),
    }));
  }, []);

  const onRequestCancelAppointment = useCallback((appointmentId: string): void => {
    setPendingCancellationId(appointmentId);
  }, []);

  const onReviewAppointment = useCallback((_appointmentId: string): void => {
    // Review flow is not connected yet; keep the past action ready for navigation.
  }, []);

  const onRescheduleAppointment = useCallback((_appointmentId: string): void => {
    // Reschedule flow is not connected yet; keep the past action ready for navigation.
  }, []);

  const onDismissCancellationDialog = useCallback((): void => {
    setPendingCancellationId(null);
  }, []);

  const onConfirmCancellation = useCallback((): void => {
    if (pendingCancellationId === null) {
      return;
    }

    setCanceledAppointmentIds((current) => {
      if (current.includes(pendingCancellationId)) {
        return current;
      }

      return [...current, pendingCancellationId];
    });
    setPendingCancellationId(null);
  }, [pendingCancellationId]);

  return {
    activeStatus,
    visibleAppointments,
    isCancellationDialogVisible: pendingCancellationId !== null,
    onStatusSelect,
    onToggleReminder,
    onRequestCancelAppointment,
    onReviewAppointment,
    onRescheduleAppointment,
    onDismissCancellationDialog,
    onConfirmCancellation,
  };
}
