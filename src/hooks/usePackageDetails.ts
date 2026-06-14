import { useCallback, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getShopPackage, type ShopPackage } from "@/data/barberProfileMock";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import { navigateToBookAppointment } from "@/utils/navigateToBookAppointment";
import type { RootStackParamList } from "@/navigation/types";

export interface UsePackageDetailsResult {
  package: ShopPackage;
  isDescriptionExpanded: boolean;
  selectedServices: ReadonlySet<string>;
  onGoBack: () => void;
  onToggleDescription: () => void;
  onToggleService: (service: string) => void;
  onBookNow: () => void;
  onOptionsPress: () => void;
}

function createInitialSelectedServices(services: readonly string[]): Set<string> {
  return new Set(services);
}

export function usePackageDetails(
  shopId: string,
  packageId: string,
): UsePackageDetailsResult {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const setDraftFromDiscover = useBookingDraftStore((s) => s.setDraftFromDiscover);

  const shopPackage = useMemo(
    () => getShopPackage(shopId, packageId),
    [shopId, packageId],
  );
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(() =>
    createInitialSelectedServices(shopPackage.includedServices),
  );

  const onGoBack = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const onToggleDescription = useCallback((): void => {
    setIsDescriptionExpanded((prev) => !prev);
  }, []);

  const onToggleService = useCallback((service: string): void => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(service)) {
        next.delete(service);
      } else {
        next.add(service);
      }
      return next;
    });
  }, []);

  const onBookNow = useCallback((): void => {
    navigateToBookAppointment(navigation, setDraftFromDiscover, shopId);
  }, [navigation, setDraftFromDiscover, shopId]);

  const onOptionsPress = useCallback((): void => {
    // Stub for future share, save, or report handlers.
  }, []);

  return {
    package: shopPackage,
    isDescriptionExpanded,
    selectedServices,
    onGoBack,
    onToggleDescription,
    onToggleService,
    onBookNow,
    onOptionsPress,
  };
}
