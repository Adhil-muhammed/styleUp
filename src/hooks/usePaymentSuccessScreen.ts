import { useCallback } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/types";
import { useBookingDraftStore } from "@/store/bookingDraftStore";

export interface UsePaymentSuccessScreenResult {
  onViewReceipt: () => void;
  onHome: () => void;
}

export function usePaymentSuccessScreen(_shopId: string): UsePaymentSuccessScreenResult {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const clearDraft = useBookingDraftStore((state) => state.clearDraft);

  const onViewReceipt = useCallback((): void => {
    Alert.alert("Coming soon", "E-Receipt is not available yet.");
  }, []);

  const onHome = useCallback((): void => {
    clearDraft();
    navigation.reset({
      index: 0,
      routes: [{ name: "App" }],
    });
  }, [clearDraft, navigation]);

  return {
    onViewReceipt,
    onHome,
  };
}
