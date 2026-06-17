import { useCallback, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  getShopProfile,
  PROFILE_TAB_OPTIONS,
  type ProfileTabId,
  type ServiceCategory,
  type ShopPackage,
  type ShopProfile,
} from "@/data/barberProfileMock";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import { navigateToOurServices } from "@/utils/navigateToOurServices";
import type { RootStackParamList } from "@/navigation/types";

export interface UseBarberProfileResult {
  shop: ShopProfile;
  activeTab: ProfileTabId;
  isAboutExpanded: boolean;
  tabOptions: typeof PROFILE_TAB_OPTIONS;
  serviceCategories: readonly ServiceCategory[];
  packages: readonly ShopPackage[];
  onTabChange: (tabId: string) => void;
  onToggleAboutExpanded: () => void;
  onBookNow: () => void;
  onGoBack: () => void;
  onActionPress: (actionId: string) => void;
  onServiceCategoryPress: (categoryId: string) => void;
  onPackagePress: (packageId: string) => void;
  onPackageBookPress: (packageId: string) => void;
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

  const navigateToBook = useCallback((): void => {
    navigateToOurServices(navigation, setDraftFromDiscover, shop.id);
  }, [navigation, setDraftFromDiscover, shop.id]);

  const onBookNow = useCallback((): void => {
    navigateToBook();
  }, [navigateToBook]);

  const onActionPress = useCallback((_actionId: string): void => {
    // Stub for future website, message, call, direction, share handlers.
  }, []);

  const onServiceCategoryPress = useCallback((_categoryId: string): void => {
    // Stub for future service category detail drill-down.
  }, []);

  const onPackagePress = useCallback(
    (packageId: string): void => {
      navigation.navigate("PackageDetails", { shopId: shop.id, packageId });
    },
    [navigation, shop.id],
  );

  const onPackageBookPress = useCallback(
    (packageId: string): void => {
      navigation.navigate("PackageDetails", { shopId: shop.id, packageId });
    },
    [navigation, shop.id],
  );

  return {
    shop,
    activeTab,
    isAboutExpanded,
    tabOptions: PROFILE_TAB_OPTIONS,
    serviceCategories: shop.serviceCategories,
    packages: shop.packages,
    onTabChange,
    onToggleAboutExpanded,
    onBookNow,
    onGoBack,
    onActionPress,
    onServiceCategoryPress,
    onPackagePress,
    onPackageBookPress,
  };
}
