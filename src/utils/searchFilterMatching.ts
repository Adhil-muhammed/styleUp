import type { ResolvedNearestSalon } from "@/data/homeMock";
import type { SearchFilterState } from "@/types/searchFilters";

export type FilterableTargetGender = "man" | "woman";

export interface FilterableSalonEntry {
  shopId: string;
  distanceKm: number;
  categoryIds: readonly string[];
  targetGenders: readonly FilterableTargetGender[];
}

export function matchesSearchFilters(
  entry: FilterableSalonEntry,
  salon: ResolvedNearestSalon,
  filters: SearchFilterState,
): boolean {
  if (filters.serviceIds.length > 0) {
    const hasService = filters.serviceIds.some((serviceId) =>
      entry.categoryIds.includes(serviceId),
    );

    if (!hasService) {
      return false;
    }
  }

  if (filters.minRating > 0 && salon.rating < filters.minRating) {
    return false;
  }

  if (
    filters.gender !== "all" &&
    !entry.targetGenders.includes(filters.gender)
  ) {
    return false;
  }

  if (entry.distanceKm > filters.maxDistanceKm) {
    return false;
  }

  return true;
}
