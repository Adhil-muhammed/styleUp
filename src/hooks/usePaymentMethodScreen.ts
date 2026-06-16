import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  PAYMENT_METHOD_OPTIONS,
  resolvePaymentMethodOption,
  type PaymentMethodOption,
} from "@/data/paymentMethodMock";
import type { RootStackParamList } from "@/navigation/types";
import { useBookingDraftStore } from "@/store/bookingDraftStore";

export interface UsePaymentMethodScreenResult {
  paymentOptions: readonly PaymentMethodOption[];
  selectedPaymentId: string;
  onGoBack: () => void;
  onSelectPayment: (paymentId: string) => void;
  onAddNewCard: () => void;
  onContinue: () => void;
}

export function usePaymentMethodScreen(shopId: string): UsePaymentMethodScreenResult {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const draftPaymentId = useBookingDraftStore((s) => s.draft?.paymentId);
  const setPaymentId = useBookingDraftStore((s) => s.setPaymentId);

  const [selectedPaymentId, setSelectedPaymentId] = useState(() =>
    resolvePaymentMethodOption(draftPaymentId).id,
  );

  useFocusEffect(
    useCallback((): void => {
      setSelectedPaymentId(resolvePaymentMethodOption(draftPaymentId).id);
    }, [draftPaymentId]),
  );

  const onGoBack = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const onSelectPayment = useCallback((paymentId: string): void => {
    setSelectedPaymentId(paymentId);
  }, []);

  const onAddNewCard = useCallback((): void => {
    // Stub for future add-card flow.
  }, []);

  const onContinue = useCallback((): void => {
    setPaymentId(selectedPaymentId);
    navigation.navigate("PaymentSummary", { shopId });
  }, [navigation, selectedPaymentId, setPaymentId, shopId]);

  return {
    paymentOptions: PAYMENT_METHOD_OPTIONS,
    selectedPaymentId,
    onGoBack,
    onSelectPayment,
    onAddNewCard,
    onContinue,
  };
}
