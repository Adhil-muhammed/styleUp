import { useCallback, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getShopProfile } from "@/data/barberProfileMock";
import {
  HOME_CATEGORIES,
  HOME_PROMO,
  HOME_USER_LOCATION,
  HOME_USER_NAME_FALLBACK,
  MOST_POPULAR_SALONS,
  NEAREST_SALONS,
  type HomeCategory,
  type HomePromo,
  type NearestSalon,
  type ResolvedNearestSalon,
} from "@/data/homeMock";
import { useAuth } from "@/hooks/useAuth";
import type { AppTabParamList, RootStackParamList } from "@/navigation/types";

type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>;

export type { ResolvedNearestSalon } from "@/data/homeMock";

function resolveSalonEntries(
  entries: readonly NearestSalon[],
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

export interface UseHomeScreenResult {
  searchQuery: string;
  userGreeting: string;
  userLocation: string;
  categories: readonly HomeCategory[];
  promo: HomePromo;
  nearestSalons: readonly ResolvedNearestSalon[];
  popularSalons: readonly ResolvedNearestSalon[];
  onSearchChange: (text: string) => void;
  onSearchPress: () => void;
  onNotificationPress: () => void;
  onFavoritesPress: () => void;
  onFilterPress: () => void;
  onCategoryPress: (categoryId: string) => void;
  onPromoBookPress: () => void;
  onSalonPress: (shopId: string) => void;
  onViewAllSalons: () => void;
  onViewAllPopularSalons: () => void;
}

export function useHomeScreen(): UseHomeScreenResult {
  const navigation = useNavigation<HomeNavigationProp>();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const userGreeting = useMemo((): string => {
    const displayName = user?.displayName?.trim();
    return displayName !== undefined && displayName.length > 0
      ? displayName
      : HOME_USER_NAME_FALLBACK;
  }, [user?.displayName]);

  const nearestSalons = useMemo(
    (): readonly ResolvedNearestSalon[] => resolveSalonEntries(NEAREST_SALONS),
    [],
  );

  const popularSalons = useMemo(
    (): readonly ResolvedNearestSalon[] =>
      resolveSalonEntries(MOST_POPULAR_SALONS),
    [],
  );

  const onSearchChange = useCallback((text: string): void => {
    setSearchQuery(text);
  }, []);

  const onSearchPress = useCallback((): void => {
    const query = searchQuery.trim();
    if (query.length > 0) {
      navigation.navigate("Search", { initialQuery: query });
    } else {
      navigation.navigate("Search");
    }
  }, [navigation, searchQuery]);

  const onNotificationPress = useCallback((): void => {
    // Stub for future notifications screen.
  }, []);

  const onFavoritesPress = useCallback((): void => {
    // Stub for future favorites screen.
  }, []);

  const onFilterPress = useCallback((): void => {
    // Stub for future search filters.
  }, []);

  const onCategoryPress = useCallback(
    (categoryId: string): void => {
      navigation.navigate("CategorySalons", { categoryId });
    },
    [navigation],
  );

  const onPromoBookPress = useCallback((): void => {
    navigation.navigate("Discover");
  }, [navigation]);

  const onSalonPress = useCallback(
    (shopId: string): void => {
      navigation.navigate("BarberProfile", { shopId });
    },
    [navigation],
  );

  const onViewAllSalons = useCallback((): void => {
    navigation.navigate("Discover");
  }, [navigation]);

  const onViewAllPopularSalons = useCallback((): void => {
    navigation.navigate("Search");
  }, [navigation]);

  return {
    searchQuery,
    userGreeting,
    userLocation: HOME_USER_LOCATION,
    categories: HOME_CATEGORIES,
    promo: HOME_PROMO,
    nearestSalons,
    popularSalons,
    onSearchChange,
    onSearchPress,
    onNotificationPress,
    onFavoritesPress,
    onFilterPress,
    onCategoryPress,
    onPromoBookPress,
    onSalonPress,
    onViewAllSalons,
    onViewAllPopularSalons,
  };
}
