export type SearchGenderFilter = "all" | "man" | "woman";

export const SEARCH_DISTANCE_MIN_KM = 1;
export const SEARCH_DISTANCE_MAX_KM = 100;

export interface SearchFilterState {
  serviceIds: readonly string[];
  minRating: number;
  gender: SearchGenderFilter;
  maxDistanceKm: number;
}

export const DEFAULT_SEARCH_FILTERS: SearchFilterState = {
  serviceIds: [],
  minRating: 0,
  gender: "all",
  maxDistanceKm: SEARCH_DISTANCE_MAX_KM,
};

export function isDefaultSearchFilters(filters: SearchFilterState): boolean {
  return (
    filters.serviceIds.length === 0 &&
    filters.minRating === 0 &&
    filters.gender === "all" &&
    filters.maxDistanceKm === SEARCH_DISTANCE_MAX_KM
  );
}

export function countActiveSearchFilters(filters: SearchFilterState): number {
  let count = 0;

  if (filters.serviceIds.length > 0) {
    count += filters.serviceIds.length;
  }

  if (filters.minRating > 0) {
    count += 1;
  }

  if (filters.gender !== "all") {
    count += 1;
  }

  if (filters.maxDistanceKm < SEARCH_DISTANCE_MAX_KM) {
    count += 1;
  }

  return count;
}

export function categoryIdFromServiceIds(
  serviceIds: readonly string[],
): string {
  if (serviceIds.length === 0) {
    return "all";
  }

  return serviceIds[0] ?? "all";
}
