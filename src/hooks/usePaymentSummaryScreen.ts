import { useCallback, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BOOK_TIME_SLOTS } from "@/data/bookMock";
import { getShopProfile } from "@/data/barberProfileMock";
import {
  resolvePaymentMethodOption,
  type PaymentMethodOption,
} from "@/data/paymentMethodMock";
import {
  DEMO_BOOKING_CUSTOMER,
  DEMO_PRICE_LINE_ITEMS,
  formatSummaryDate,
  type PriceLineItem,
} from "@/data/paymentSummaryMock";
import type { RootStackParamList } from "@/navigation/types";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import { parseYMD } from "@/utils/bookingCalendar";
import type { BookingDetailItem } from "@/components/booking/BookingDetailsCard";

export interface UsePaymentSummaryScreenResult {
  bookingDetails: readonly BookingDetailItem[];
  priceLineItems: readonly PriceLineItem[];
  selectedPayment: PaymentMethodOption;
  onGoBack: () => void;
  onChangePayment: () => void;
  onConfirmPayment: () => void;
}

export function usePaymentSummaryScreen(shopId: string): UsePaymentSummaryScreenResult {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const draft = useBookingDraftStore((s) => s.draft);

  const shop = useMemo(() => getShopProfile(shopId), [shopId]);

  const selectedPayment = useMemo(
    (): PaymentMethodOption => resolvePaymentMethodOption(draft?.paymentId),
    [draft?.paymentId],
  );

  const bookingDetails = useMemo((): readonly BookingDetailItem[] => {
    const selectedDateYmd = draft?.selectedDateYmd;
    const selectedDate =
      selectedDateYmd !== undefined ? parseYMD(selectedDateYmd) : new Date();

    const timeSlot = BOOK_TIME_SLOTS.find((slot) => slot.id === draft?.selectedTimeId);
    const specialist = shop.specialists.find(
      (item) => item.id === draft?.selectedSpecialistId,
    );

    return [
      { label: "Barber / Salon", value: shop.name },
      { label: "Address", value: shop.address },
      { label: "Name", value: DEMO_BOOKING_CUSTOMER.name },
      { label: "Phone", value: DEMO_BOOKING_CUSTOMER.phone },
      { label: "Booking Date", value: formatSummaryDate(selectedDate) },
      { label: "Booking Hours", value: timeSlot?.label ?? "10:00 AM" },
      {
        label: "Specialist",
        value: specialist?.name ?? "Nathan Alexander",
        emphasizeValue: true,
      },
    ];
  }, [draft?.selectedDateYmd, draft?.selectedSpecialistId, draft?.selectedTimeId, shop]);

  const onGoBack = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const onChangePayment = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const onConfirmPayment = useCallback((): void => {
    navigation.navigate("PaymentSuccess", { shopId });
  }, [navigation, shopId]);

  return {
    bookingDetails,
    priceLineItems: DEMO_PRICE_LINE_ITEMS,
    selectedPayment,
    onGoBack,
    onChangePayment,
    onConfirmPayment,
  };
}
