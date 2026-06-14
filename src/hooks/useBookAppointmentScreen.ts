import { useCallback, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BOOK_TIME_SLOTS, type TimeSlotOption } from "@/data/bookMock";
import { getShopProfile, type ShopSpecialist } from "@/data/barberProfileMock";
import type { RootStackParamList } from "@/navigation/types";
import { buildStubAvailableDates, startOfToday } from "@/utils/bookingCalendar";

const STUB_AVAILABILITY_DAYS = 14;

export interface UseBookAppointmentScreenResult {
  specialists: readonly ShopSpecialist[];
  timeSlots: readonly TimeSlotOption[];
  selectedDate: Date;
  availableDates: readonly string[];
  selectedTimeId: string;
  selectedSpecialistId: string;
  isSuccessVisible: boolean;
  onGoBack: () => void;
  onSelectDate: (date: Date) => void;
  onSelectTime: (timeId: string) => void;
  onSelectSpecialist: (specialistId: string) => void;
  onContinue: () => void;
  onDismissSuccess: () => void;
  onSeeAllTimes: () => void;
  onSeeAllSpecialists: () => void;
}

export function useBookAppointmentScreen(shopId: string): UseBookAppointmentScreenResult {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const shop = useMemo(() => getShopProfile(shopId), [shopId]);
  const defaultSpecialistId = shop.specialists[0]?.id ?? "";
  const availableDates = useMemo(
    () => buildStubAvailableDates(STUB_AVAILABILITY_DAYS),
    [],
  );

  const [selectedDate, setSelectedDate] = useState(() => startOfToday());
  const [selectedTimeId, setSelectedTimeId] = useState(BOOK_TIME_SLOTS[0]?.id ?? "");
  const [selectedSpecialistId, setSelectedSpecialistId] = useState(defaultSpecialistId);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const onGoBack = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const onSelectDate = useCallback((date: Date): void => {
    setSelectedDate(date);
  }, []);

  const onSelectTime = useCallback((timeId: string): void => {
    setSelectedTimeId(timeId);
  }, []);

  const onSelectSpecialist = useCallback((specialistId: string): void => {
    setSelectedSpecialistId(specialistId);
  }, []);

  const onContinue = useCallback((): void => {
    setIsSuccessVisible(true);
  }, []);

  const onDismissSuccess = useCallback((): void => {
    setIsSuccessVisible(false);
    navigation.goBack();
  }, [navigation]);

  const onSeeAllTimes = useCallback((): void => {
    // Stub for future full time-slot picker.
  }, []);

  const onSeeAllSpecialists = useCallback((): void => {
    // Stub for future full specialist list.
  }, []);

  return {
    specialists: shop.specialists,
    timeSlots: BOOK_TIME_SLOTS,
    selectedDate,
    availableDates,
    selectedTimeId,
    selectedSpecialistId,
    isSuccessVisible,
    onGoBack,
    onSelectDate,
    onSelectTime,
    onSelectSpecialist,
    onContinue,
    onDismissSuccess,
    onSeeAllTimes,
    onSeeAllSpecialists,
  };
}
