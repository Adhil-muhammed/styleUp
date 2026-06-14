import { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  BOOK_BARBER,
  BOOK_DEFAULT_DATE,
  BOOK_TAB_SERVICES,
  BOOK_TIME_SLOTS,
  formatPrice,
  type BookBarberSummary,
  type BookServiceOption,
  type TimeSlotOption,
} from "@/data/bookMock";
import { useBookingDraftStore } from "@/store/bookingDraftStore";

export interface BookAppointmentInitialState {
  serviceId?: string;
  timeId?: string;
  barber?: BookBarberSummary;
}

export interface UseBookAppointmentResult {
  selectedServiceId: string;
  selectedTimeId: string;
  selectedDate: Date;
  notes: string;
  isSuccessVisible: boolean;
  isDatePickerVisible: boolean;
  selectedService: BookServiceOption;
  selectedTime: TimeSlotOption;
  barber: BookBarberSummary;
  totalLabel: string;
  onSelectService: (id: string) => void;
  onSelectTime: (id: string) => void;
  onNotesChange: (text: string) => void;
  onOpenDatePicker: () => void;
  onDateChange: (date: Date) => void;
  onDismissDatePicker: () => void;
  onConfirm: () => void;
  onDismissSuccess: () => void;
}

function resolveInitialServiceId(serviceId?: string): string {
  if (serviceId !== undefined) {
    const exists = BOOK_TAB_SERVICES.some(
      (service) => service.id === serviceId,
    );
    if (exists) {
      return serviceId;
    }
  }

  return BOOK_TAB_SERVICES[0]?.id ?? "";
}

function resolveInitialTimeId(timeId?: string): string {
  if (timeId !== undefined) {
    const exists = BOOK_TIME_SLOTS.some((slot) => slot.id === timeId);
    if (exists) {
      return timeId;
    }
  }

  return BOOK_TIME_SLOTS[2]?.id ?? BOOK_TIME_SLOTS[0]?.id ?? "";
}

function buildInitialStateFromDraft(): BookAppointmentInitialState | undefined {
  const draft = useBookingDraftStore.getState().draft;

  if (draft === null) {
    return undefined;
  }

  const timeId =
    draft.timeFilterId === "now"
      ? (BOOK_TIME_SLOTS[0]?.id ?? undefined)
      : undefined;

  return {
    serviceId: draft.bookServiceId,
    ...(timeId !== undefined ? { timeId } : {}),
    barber: draft.barber,
  };
}

export function useBookAppointment(
  initial?: BookAppointmentInitialState,
): UseBookAppointmentResult {
  const draftInitial = buildInitialStateFromDraft();
  const mergedInitial = draftInitial ?? initial;

  const [selectedServiceId, setSelectedServiceId] = useState(() =>
    resolveInitialServiceId(mergedInitial?.serviceId),
  );
  const [selectedTimeId, setSelectedTimeId] = useState(() =>
    resolveInitialTimeId(mergedInitial?.timeId),
  );
  const [barber, setBarber] = useState<BookBarberSummary>(
    mergedInitial?.barber ?? BOOK_BARBER,
  );
  const [selectedDate, setSelectedDate] = useState(BOOK_DEFAULT_DATE);
  const [notes, setNotes] = useState("");
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const draft = useBookingDraftStore.getState().draft;

      if (draft === null) {
        return;
      }

      setSelectedServiceId(resolveInitialServiceId(draft.bookServiceId));
      setBarber(draft.barber);

      if (draft.timeFilterId === "now") {
        const firstSlot = BOOK_TIME_SLOTS[0]?.id;
        if (firstSlot !== undefined) {
          setSelectedTimeId(firstSlot);
        }
      }
    }, []),
  );

  const selectedService = useMemo(
    () =>
      BOOK_TAB_SERVICES.find((service) => service.id === selectedServiceId) ??
      BOOK_TAB_SERVICES[0]!,
    [selectedServiceId],
  );

  const selectedTime = useMemo(
    () =>
      BOOK_TIME_SLOTS.find((slot) => slot.id === selectedTimeId) ??
      BOOK_TIME_SLOTS[0]!,
    [selectedTimeId],
  );

  const totalLabel = useMemo(
    () => formatPrice(selectedService.priceCents),
    [selectedService.priceCents],
  );

  const onSelectService = useCallback((id: string): void => {
    setSelectedServiceId(id);
  }, []);

  const onSelectTime = useCallback((id: string): void => {
    setSelectedTimeId(id);
  }, []);

  const onNotesChange = useCallback((text: string): void => {
    setNotes(text);
  }, []);

  const onOpenDatePicker = useCallback((): void => {
    setIsDatePickerVisible(true);
  }, []);

  const onDateChange = useCallback((date: Date): void => {
    setSelectedDate(date);
    setIsDatePickerVisible(false);
  }, []);

  const onDismissDatePicker = useCallback((): void => {
    setIsDatePickerVisible(false);
  }, []);

  const onConfirm = useCallback((): void => {
    setIsSuccessVisible(true);
  }, []);

  const onDismissSuccess = useCallback((): void => {
    setIsSuccessVisible(false);
  }, []);

  return {
    selectedServiceId,
    selectedTimeId,
    selectedDate,
    notes,
    isSuccessVisible,
    isDatePickerVisible,
    selectedService,
    selectedTime,
    barber,
    totalLabel,
    onSelectService,
    onSelectTime,
    onNotesChange,
    onOpenDatePicker,
    onDateChange,
    onDismissDatePicker,
    onConfirm,
    onDismissSuccess,
  };
}
