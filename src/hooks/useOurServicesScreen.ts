import { useCallback, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getShopProfile, type ServiceCategory } from "@/data/barberProfileMock";
import { getVariantById, sumVariantPrices } from "@/data/serviceVariantMock";
import type { SelectedServiceVariantSummary } from "@/components/barberProfile/ServiceCategoryRow";
import { useCurrency } from "@/hooks/useCurrency";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import type { RootStackParamList } from "@/navigation/types";

export interface CategoryWithSelection {
  category: ServiceCategory;
  selectedVariant?: SelectedServiceVariantSummary;
}

export interface UseOurServicesScreenResult {
  categories: readonly CategoryWithSelection[];
  hasSelection: boolean;
  bookNowLabel: string;
  onGoBack: () => void;
  onCategoryPress: (categoryId: string) => void;
  onBookNow: () => void;
}

export function useOurServicesScreen(
  shopId: string,
): UseOurServicesScreenResult {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const selectedVariants = useBookingDraftStore(
    (s) => s.draft?.selectedVariants ?? {},
  );
  const { format } = useCurrency();

  const shop = useMemo(() => getShopProfile(shopId), [shopId]);

  const categories = useMemo((): readonly CategoryWithSelection[] => {
    return shop.serviceCategories.map((category) => {
      const variantId = selectedVariants[category.id];
      const variant =
        variantId !== undefined ? getVariantById(variantId) : undefined;

      if (variant === undefined) {
        return { category };
      }

      return {
        category,
        selectedVariant: {
          title: variant.title,
          priceCents: variant.priceCents,
        },
      };
    });
  }, [shop.serviceCategories, selectedVariants]);

  const hasSelection = Object.keys(selectedVariants).length > 0;

  const bookNowLabel = useMemo((): string => {
    if (!hasSelection) {
      return "Select Service";
    }

    const variantIds = Object.values(selectedVariants);
    const totalCents = sumVariantPrices(variantIds);
    return `Book Now - ${format(totalCents)}`;
  }, [format, hasSelection, selectedVariants]);

  const onGoBack = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const onCategoryPress = useCallback(
    (categoryId: string): void => {
      navigation.navigate("ServiceVariants", { shopId, categoryId });
    },
    [navigation, shopId],
  );

  const onBookNow = useCallback((): void => {
    if (!hasSelection) {
      return;
    }

    navigation.navigate("BookAppointment", { shopId });
  }, [hasSelection, navigation, shopId]);

  return {
    categories,
    hasSelection,
    bookNowLabel,
    onGoBack,
    onCategoryPress,
    onBookNow,
  };
}
