import { useCallback, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getShopProfile } from "@/data/barberProfileMock";
import {
  POPULAR_ARTISTS,
  SEARCH_CATEGORIES,
  SEARCH_SALON_ENTRIES,
  type PopularArtist,
  type ResolvedSearchSalon,
} from "@/data/searchMock";
import type { FilterOption } from "@/data/discoverMock";
import { useDebounce } from "@/hooks/useDebounce";
import type { RootStackParamList } from "@/navigation/types";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import { navigateToBookAppointment } from "@/utils/navigateToBookAppointment";

type SearchNavigationProp = NativeStackNavigationProp<RootStackParamList, "Search">;
type SearchRouteProp = RouteProp<RootStackParamList, "Search">;

export interface UseSearchScreenResult {
  searchQuery: string;
  activeCategoryId: string;
  categories: readonly FilterOption[];
  popularArtists: readonly PopularArtist[];
  filteredSalons: readonly ResolvedSearchSalon[];
  resultCount: number;
  onSearchChange: (text: string) => void;
  onCategorySelect: (categoryId: string) => void;
  onClose: () => void;
  onFilterPress: () => void;
  onArtistPress: (artistId: string) => void;
  onSalonPress: (shopId: string) => void;
  onBookPress: (shopId: string) => void;
}

function matchesQuery(salon: ResolvedSearchSalon, query: string): boolean {
  if (query.length === 0) {
    return true;
  }
  const normalized = query.trim().toLowerCase();
  return (
    salon.name.toLowerCase().includes(normalized) ||
    salon.address.toLowerCase().includes(normalized)
  );
}

export function useSearchScreen(): UseSearchScreenResult {
  const navigation = useNavigation<SearchNavigationProp>();
  const route = useRoute<SearchRouteProp>();
  const setDraftFromDiscover = useBookingDraftStore((s) => s.setDraftFromDiscover);

  const [searchQuery, setSearchQuery] = useState(
    route.params?.initialQuery ?? "",
  );
  const [activeCategoryId, setActiveCategoryId] = useState("all");

  const debouncedQuery = useDebounce(searchQuery, 300);

  const allSalons = useMemo((): readonly ResolvedSearchSalon[] => {
    return SEARCH_SALON_ENTRIES.map((entry) => {
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
  }, []);

  const filteredSalons = useMemo((): readonly ResolvedSearchSalon[] => {
    const entryByShopId = new Map(
      SEARCH_SALON_ENTRIES.map((entry) => [entry.shopId, entry]),
    );

    return allSalons.filter((salon) => {
      const entry = entryByShopId.get(salon.shopId);
      if (entry === undefined) {
        return false;
      }

      const matchesCategory =
        activeCategoryId === "all" ||
        entry.categoryIds.includes(activeCategoryId);

      return matchesCategory && matchesQuery(salon, debouncedQuery);
    });
  }, [activeCategoryId, allSalons, debouncedQuery]);

  const resultCount = filteredSalons.length;

  const onSearchChange = useCallback((text: string): void => {
    setSearchQuery(text);
  }, []);

  const onCategorySelect = useCallback((categoryId: string): void => {
    setActiveCategoryId(categoryId);
  }, []);

  const onClose = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const onFilterPress = useCallback((): void => {
    // Stub for future filter sheet.
  }, []);

  const onArtistPress = useCallback(
    (artistId: string): void => {
      const artist = POPULAR_ARTISTS.find((entry) => entry.id === artistId);
      if (artist?.shopId !== undefined) {
        navigation.navigate("BarberProfile", { shopId: artist.shopId });
      }
    },
    [navigation],
  );

  const onSalonPress = useCallback(
    (shopId: string): void => {
      navigation.navigate("BarberProfile", { shopId });
    },
    [navigation],
  );

  const onBookPress = useCallback(
    (shopId: string): void => {
      navigateToBookAppointment(navigation, setDraftFromDiscover, shopId);
    },
    [navigation, setDraftFromDiscover],
  );

  return {
    searchQuery,
    activeCategoryId,
    categories: SEARCH_CATEGORIES,
    popularArtists: POPULAR_ARTISTS,
    filteredSalons,
    resultCount,
    onSearchChange,
    onCategorySelect,
    onClose,
    onFilterPress,
    onArtistPress,
    onSalonPress,
    onBookPress,
  };
}
