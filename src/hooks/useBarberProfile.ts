import { useCallback, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  getShopProfile,
  PROFILE_TAB_OPTIONS,
  type ProfileTabId,
  type ShopProfile,
} from "@/data/barberProfileMock";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import { resolveBarberFromShopPin } from "@/utils/mapDiscoverToBookDraft";
import type { RootStackParamList } from "@/navigation/types";

const DEFAULT_DISCOVER_SERVICE_ID = "service-1";
const DEFAULT_TIME_FILTER_ID = "schedule";
const DEFAULT_PROFILE_ID = "me";
const DEFAULT_PAYMENT_ID = "cash";

export interface UseBarberProfileResult {
  shop: ShopProfile;
  activeTab: ProfileTabId;
  isAboutExpanded: boolean;
  tabOptions: typeof PROFILE_TAB_OPTIONS;
  onTabChange: (tabId: string) => void;
  onToggleAboutExpanded: () => void;
  onBookNow: () => void;
  onGoBack: () => void;
  onActionPress: (actionId: string) => void;
}

export function useBarberProfile(shopId: string): UseBarberProfileResult {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const setDraftFromDiscover = useBookingDraftStore((s) => s.setDraftFromDiscover);

  const shop = useMemo(() => getShopProfile(shopId), [shopId]);
  const [activeTab, setActiveTab] = useState<ProfileTabId>("about");
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  const onTabChange = useCallback((tabId: string): void => {
    if (
      tabId === "about" ||
      tabId === "services" ||
      tabId === "package" ||
      tabId === "gallery"
    ) {
      setActiveTab(tabId);
    }
  }, []);

  const onToggleAboutExpanded = useCallback((): void => {
    setIsAboutExpanded((prev) => !prev);
  }, []);

  const onGoBack = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const onBookNow = useCallback((): void => {
    const barber = resolveBarberFromShopPin(shop.id);

    setDraftFromDiscover({
      shopPinId: shop.id,
      barber,
      discoverServiceId: DEFAULT_DISCOVER_SERVICE_ID,
      timeFilterId: DEFAULT_TIME_FILTER_ID,
      profileId: DEFAULT_PROFILE_ID,
      paymentId: DEFAULT_PAYMENT_ID,
    });

    navigation.navigate("App", {
      screen: "Book",
      params: { fromDiscover: true },
    });
  }, [navigation, setDraftFromDiscover, shop.id]);

  const onActionPress = useCallback((_actionId: string): void => {
    // Stub for future website, message, call, direction, share handlers.
  }, []);

  return {
    shop,
    activeTab,
    isAboutExpanded,
    tabOptions: PROFILE_TAB_OPTIONS,
    onTabChange,
    onToggleAboutExpanded,
    onBookNow,
    onGoBack,
    onActionPress,
  };
}
