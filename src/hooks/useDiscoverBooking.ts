import { useCallback, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import {
  resolveBarberFromShopPin,
  resolveShopIdForDiscoverBooking,
} from "@/utils/mapDiscoverToBookDraft";
import type { AppTabParamList, RootStackParamList } from "@/navigation/types";

type DiscoverNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, "Discover">,
  NativeStackNavigationProp<RootStackParamList>
>;

export interface UseDiscoverBookingResult {
  selectedServiceId: string;
  activeTimeId: string;
  activeProfileId: string;
  activePaymentId: string;
  handleSelectService: (serviceId: string) => void;
  handleTimeSelect: (id: string) => void;
  handleProfileSelect: (id: string) => void;
  handlePaymentPress: () => void;
  handlePinPress: (pinId: string) => void;
  handleConfirmBooking: () => void;
}

export function useDiscoverBooking(
  initialServiceId: string,
  initialTimeId: string,
  initialProfileId: string,
  initialPaymentId: string,
): UseDiscoverBookingResult {
  const navigation = useNavigation<DiscoverNavigationProp>();
  const setSelectedShopPin = useBookingDraftStore((s) => s.setSelectedShopPin);

  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);
  const [activeTimeId, setActiveTimeId] = useState(initialTimeId);
  const [activeProfileId, setActiveProfileId] = useState(initialProfileId);
  const [activePaymentId, setActivePaymentId] = useState(initialPaymentId);
  const [selectedShopPinId, setSelectedShopPinId] = useState<string | null>(null);

  const handleSelectService = useCallback((serviceId: string): void => {
    setSelectedServiceId(serviceId);
  }, []);

  const handleTimeSelect = useCallback((id: string): void => {
    setActiveTimeId(id);
  }, []);

  const handleProfileSelect = useCallback((id: string): void => {
    setActiveProfileId(id);
  }, []);

  const handlePaymentPress = useCallback((): void => {
    // Stub for future payment method picker.
  }, []);

  const handlePinPress = useCallback(
    (pinId: string): void => {
      setSelectedShopPinId(pinId);
      const barber = resolveBarberFromShopPin(pinId);
      setSelectedShopPin(pinId, barber);
      navigation.navigate("BarberProfile", { shopId: pinId });
    },
    [navigation, setSelectedShopPin],
  );

  const handleConfirmBooking = useCallback((): void => {
    const shopId = resolveShopIdForDiscoverBooking(
      selectedShopPinId,
      selectedServiceId,
    );

    navigation.navigate("BarberProfile", { shopId });
  }, [navigation, selectedServiceId, selectedShopPinId]);

  return useMemo(
    () => ({
      selectedServiceId,
      activeTimeId,
      activeProfileId,
      activePaymentId,
      handleSelectService,
      handleTimeSelect,
      handleProfileSelect,
      handlePaymentPress,
      handlePinPress,
      handleConfirmBooking,
    }),
    [
      activePaymentId,
      activeProfileId,
      activeTimeId,
      handleConfirmBooking,
      handlePaymentPress,
      handlePinPress,
      handleProfileSelect,
      handleSelectService,
      handleTimeSelect,
      selectedServiceId,
    ],
  );
}
