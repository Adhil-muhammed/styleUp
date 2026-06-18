import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/types";
import { useBookingDraftStore } from "@/store/bookingDraftStore";

export interface UsePaymentSuccessScreenResult {
  onContinueBooking: () => void;
  onGoToAppointment: () => void;
}

export function usePaymentSuccessScreen(
  _shopId: string,
): UsePaymentSuccessScreenResult {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const clearDraft = useBookingDraftStore((state) => state.clearDraft);

  const onContinueBooking = useCallback((): void => {
    clearDraft();
    navigation.reset({
      index: 0,
      routes: [{ name: "App" }],
    });
  }, [clearDraft, navigation]);

  const onGoToAppointment = useCallback((): void => {
    clearDraft();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "App",
          params: { screen: "Bookings" },
        },
      ],
    });
  }, [clearDraft, navigation]);

  return {
    onContinueBooking,
    onGoToAppointment,
  };
}
