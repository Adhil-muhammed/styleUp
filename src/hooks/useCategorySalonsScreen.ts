import { useCallback, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getShopProfile } from "@/data/barberProfileMock";
import {
  HOME_CATEGORIES,
  HOME_CATEGORY_SALON_ENTRIES,
  type HomeCategory,
  type HomeCategorySalonEntry,
  type ResolvedNearestSalon,
} from "@/data/homeMock";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import type { RootStackParamList } from "@/navigation/types";
import { matchesSearchFilters } from "@/utils/searchFilterMatching";
import type { SearchFilterState, SearchGenderFilter } from "@/types/searchFilters";

type CategorySalonsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CategorySalons"
>;
type CategorySalonsRouteProp = RouteProp<RootStackParamList, "CategorySalons">;

export interface UseCategorySalonsScreenResult {
  categoryTitle: string;
  searchQuery: string;
  filteredSalons: readonly ResolvedNearestSalon[];
  resultCount: number;
  isFilterSheetOpen: boolean;
  draftFilters: SearchFilterState;
  draftFilterCount: number;
  onGoBack: () => void;
  onSearchChange: (text: string) => void;
  onFilterPress: () => void;
  onFilterSheetDismiss: () => void;
  onClearDraftFilters: () => void;
  onApplyFilters: () => void;
  onSelectDraftRating: (minRating: number) => void;
  onSelectDraftGender: (gender: SearchGenderFilter) => void;
  onSelectDraftDistance: (maxDistanceKm: number) => void;
  onSalonPress: (shopId: string) => void;
}

function resolveCategorySalons(
  entries: readonly HomeCategorySalonEntry[],
): readonly ResolvedNearestSalon[] {
  return entries.map((entry) => {
    const shop = getShopProfile(entry.shopId);
    const heroImage = shop.heroImages[0];

    return {
      shopId: entry.shopId,
      name: shop.name,
      address: shop.address,
      rating: shop.rating,
      imageUri: heroImage ?? "",
      distanceKm: entry.distanceKm,
    };
  });
}

function matchesQuery(salon: ResolvedNearestSalon, query: string): boolean {
  if (query.length === 0) {
    return true;
  }

  const normalized = query.trim().toLowerCase();
  return (
    salon.name.toLowerCase().includes(normalized) ||
    salon.address.toLowerCase().includes(normalized)
  );
}

export function useCategorySalonsScreen(): UseCategorySalonsScreenResult {
  const navigation = useNavigation<CategorySalonsNavigationProp>();
  const route = useRoute<CategorySalonsRouteProp>();
  const { categoryId } = route.params;
  const filters = useSearchFilters();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const category = useMemo((): HomeCategory | undefined => {
    return HOME_CATEGORIES.find((entry) => entry.id === categoryId);
  }, [categoryId]);

  const categoryTitle = category?.label ?? "Category";

  const categoryEntries = useMemo((): readonly HomeCategorySalonEntry[] => {
    return HOME_CATEGORY_SALON_ENTRIES.filter((entry) =>
      entry.categoryIds.includes(categoryId),
    );
  }, [categoryId]);

  const categorySalons = useMemo(
    (): readonly ResolvedNearestSalon[] =>
      resolveCategorySalons(categoryEntries),
    [categoryEntries],
  );

  const entryByShopId = useMemo(
    (): Map<string, HomeCategorySalonEntry> =>
      new Map(categoryEntries.map((entry) => [entry.shopId, entry])),
    [categoryEntries],
  );

  const filteredSalons = useMemo((): readonly ResolvedNearestSalon[] => {
    return categorySalons.filter((salon) => {
      const entry = entryByShopId.get(salon.shopId);
      if (entry === undefined) {
        return false;
      }

      return (
        matchesQuery(salon, debouncedQuery) &&
        matchesSearchFilters(entry, salon, filters.appliedFilters)
      );
    });
  }, [categorySalons, debouncedQuery, entryByShopId, filters.appliedFilters]);

  const resultCount = filteredSalons.length;

  const onGoBack = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const onSearchChange = useCallback((text: string): void => {
    setSearchQuery(text);
  }, []);

  const onFilterPress = useCallback((): void => {
    filters.presentSheet();
  }, [filters]);

  const onSalonPress = useCallback(
    (shopId: string): void => {
      navigation.navigate("BarberProfile", { shopId });
    },
    [navigation],
  );

  return {
    categoryTitle,
    searchQuery,
    filteredSalons,
    resultCount,
    isFilterSheetOpen: filters.isSheetOpen,
    draftFilters: filters.draftFilters,
    draftFilterCount: filters.draftFilterCount,
    onGoBack,
    onSearchChange,
    onFilterPress,
    onFilterSheetDismiss: filters.onSheetDismiss,
    onClearDraftFilters: filters.clearDraft,
    onApplyFilters: filters.applyDraft,
    onSelectDraftRating: filters.setDraftMinRating,
    onSelectDraftGender: filters.setDraftGender,
    onSelectDraftDistance: filters.setDraftMaxDistanceKm,
    onSalonPress,
  };
}
