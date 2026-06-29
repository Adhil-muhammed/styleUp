import { useCallback, useEffect, useMemo, useState } from "react";
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
import { getVariantById } from "@/data/serviceVariantMock";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import {
  navigateToBookAppointment,
  navigateToOurServices,
} from "@/utils/navigateToOurServices";
import type { SelectedServiceVariantSummary } from "@/components/barberProfile/ServiceCategoryRow";
import type { RootStackParamList } from "@/navigation/types";

export interface UseBarberProfileResult {
  shop: ShopProfile;
  activeTab: ProfileTabId;
  isAboutExpanded: boolean;
  tabOptions: typeof PROFILE_TAB_OPTIONS;
  serviceCategories: readonly ServiceCategory[];
  selectedVariantSummaries: Record<string, SelectedServiceVariantSummary>;
  totalSelectedCents: number;
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
  const setSelectedVariant = useBookingDraftStore((s) => s.setSelectedVariant);
  const clearBrowsingSelections = useBookingDraftStore((s) => s.clearBrowsingSelections);
  const browsingSelections = useBookingDraftStore((s) => s.browsingSelections);

  const shop = useMemo(() => getShopProfile(shopId), [shopId]);
  const [activeTab, setActiveTab] = useState<ProfileTabId>("about");
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  // Clear any stale browsing selections from a previous shop visit on fresh mount.
  // With native stack, this effect does NOT re-fire when returning from
  // BookAppointment (the screen stays mounted), so in-progress selections survive.
  useEffect(() => {
    clearBrowsingSelections();
    // shopId is the key — if a new profile is opened, clear and start fresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId]);

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
    if (Object.keys(browsingSelections).length > 0) {
      navigateToBookAppointment(
        navigation,
        setDraftFromDiscover,
        setSelectedVariant,
        browsingSelections,
        shop.id,
      );
    } else {
      navigateToOurServices(navigation, setDraftFromDiscover, shop.id);
    }
  }, [
    browsingSelections,
    navigation,
    setDraftFromDiscover,
    setSelectedVariant,
    shop.id,
  ]);

  const onActionPress = useCallback((_actionId: string): void => {
    // Stub for future website, message, call, direction, share handlers.
  }, []);

  const onServiceCategoryPress = useCallback(
    (categoryId: string): void => {
      navigation.navigate("ServiceVariants", { shopId: shop.id, categoryId });
    },
    [navigation, shop.id],
  );

  const selectedVariantSummaries = useMemo((): Record<
    string,
    SelectedServiceVariantSummary
  > => {
    const result: Record<string, SelectedServiceVariantSummary> = {};
    for (const [categoryId, variantId] of Object.entries(browsingSelections)) {
      const variant = getVariantById(variantId);
      if (variant !== undefined) {
        result[categoryId] = {
          title: variant.title,
          priceCents: variant.priceCents,
        };
      }
    }
    return result;
  }, [browsingSelections]);

  const totalSelectedCents = useMemo(
    () =>
      Object.values(selectedVariantSummaries).reduce(
        (sum, v) => sum + v.priceCents,
        0,
      ),
    [selectedVariantSummaries],
  );

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
    selectedVariantSummaries,
    totalSelectedCents,
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
