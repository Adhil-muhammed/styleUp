import { useCallback, useMemo, useState } from "react";
import {
  categoryIdFromServiceIds,
  countActiveSearchFilters,
  DEFAULT_SEARCH_FILTERS,
  type SearchFilterState,
  type SearchGenderFilter,
} from "@/types/searchFilters";

export interface UseSearchFiltersResult {
  isSheetOpen: boolean;
  appliedFilters: SearchFilterState;
  draftFilters: SearchFilterState;
  activeCategoryId: string;
  activeFilterCount: number;
  draftFilterCount: number;
  presentSheet: () => void;
  dismissSheet: () => void;
  onSheetDismiss: () => void;
  updateDraft: (partial: Partial<SearchFilterState>) => void;
  toggleDraftService: (serviceId: string) => void;
  setDraftMinRating: (minRating: number) => void;
  setDraftGender: (gender: SearchGenderFilter) => void;
  setDraftMaxDistanceKm: (maxDistanceKm: number) => void;
  applyDraft: () => void;
  clearDraft: () => void;
  syncServiceFromCategory: (categoryId: string) => void;
}

function cloneFilters(filters: SearchFilterState): SearchFilterState {
  return {
    serviceIds: [...filters.serviceIds],
    minRating: filters.minRating,
    gender: filters.gender,
    maxDistanceKm: filters.maxDistanceKm,
  };
}

export function useSearchFilters(): UseSearchFiltersResult {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<SearchFilterState>(
    () => cloneFilters(DEFAULT_SEARCH_FILTERS),
  );
  const [draftFilters, setDraftFilters] = useState<SearchFilterState>(() =>
    cloneFilters(DEFAULT_SEARCH_FILTERS),
  );

  const activeCategoryId = useMemo(
    () => categoryIdFromServiceIds(appliedFilters.serviceIds),
    [appliedFilters.serviceIds],
  );

  const activeFilterCount = useMemo(
    () => countActiveSearchFilters(appliedFilters),
    [appliedFilters],
  );

  const draftFilterCount = useMemo(
    () => countActiveSearchFilters(draftFilters),
    [draftFilters],
  );

  const presentSheet = useCallback((): void => {
    setDraftFilters(cloneFilters(appliedFilters));
    setIsSheetOpen(true);
  }, [appliedFilters]);

  const dismissSheet = useCallback((): void => {
    setIsSheetOpen(false);
  }, []);

  const onSheetDismiss = useCallback((): void => {
    setDraftFilters(cloneFilters(appliedFilters));
    setIsSheetOpen(false);
  }, [appliedFilters]);

  const updateDraft = useCallback((partial: Partial<SearchFilterState>): void => {
    setDraftFilters((current) => ({
      ...current,
      ...partial,
      ...(partial.serviceIds !== undefined
        ? { serviceIds: [...partial.serviceIds] }
        : {}),
    }));
  }, []);

  const toggleDraftService = useCallback((serviceId: string): void => {
    setDraftFilters((current) => {
      const isSelected = current.serviceIds.includes(serviceId);
      const serviceIds = isSelected
        ? current.serviceIds.filter((id) => id !== serviceId)
        : [...current.serviceIds, serviceId];

      return { ...current, serviceIds };
    });
  }, []);

  const setDraftMinRating = useCallback((minRating: number): void => {
    updateDraft({ minRating });
  }, [updateDraft]);

  const setDraftGender = useCallback((gender: SearchGenderFilter): void => {
    updateDraft({ gender });
  }, [updateDraft]);

  const setDraftMaxDistanceKm = useCallback((maxDistanceKm: number): void => {
    updateDraft({ maxDistanceKm });
  }, [updateDraft]);

  const applyDraft = useCallback((): void => {
    setAppliedFilters(cloneFilters(draftFilters));
    dismissSheet();
  }, [dismissSheet, draftFilters]);

  const clearDraft = useCallback((): void => {
    setDraftFilters(cloneFilters(DEFAULT_SEARCH_FILTERS));
  }, []);

  const syncServiceFromCategory = useCallback((categoryId: string): void => {
    const serviceIds = categoryId === "all" ? [] : [categoryId];
    const nextFilters: SearchFilterState = {
      ...appliedFilters,
      serviceIds,
    };

    setAppliedFilters(cloneFilters(nextFilters));
    setDraftFilters(cloneFilters(nextFilters));
  }, [appliedFilters]);

  return {
    isSheetOpen,
    appliedFilters,
    draftFilters,
    activeCategoryId,
    activeFilterCount,
    draftFilterCount,
    presentSheet,
    dismissSheet,
    onSheetDismiss,
    updateDraft,
    toggleDraftService,
    setDraftMinRating,
    setDraftGender,
    setDraftMaxDistanceKm,
    applyDraft,
    clearDraft,
    syncServiceFromCategory,
  };
}
