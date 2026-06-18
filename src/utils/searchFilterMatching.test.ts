import {
  countActiveSearchFilters,
  DEFAULT_SEARCH_FILTERS,
  isDefaultSearchFilters,
} from "@/types/searchFilters";
import { matchesSearchFilters } from "@/utils/searchFilterMatching";
import { SEARCH_SALON_ENTRIES } from "@/data/searchMock";
import { getShopProfile } from "@/data/barberProfileMock";

describe("searchFilters", () => {
  it("counts active filters", () => {
    expect(countActiveSearchFilters(DEFAULT_SEARCH_FILTERS)).toBe(0);
    expect(
      countActiveSearchFilters({
        serviceIds: ["haircuts"],
        minRating: 4,
        gender: "woman",
        maxDistanceKm: 20,
      }),
    ).toBe(4);
  });

  it("detects default filters", () => {
    expect(isDefaultSearchFilters(DEFAULT_SEARCH_FILTERS)).toBe(true);
    expect(
      isDefaultSearchFilters({
        ...DEFAULT_SEARCH_FILTERS,
        minRating: 3,
      }),
    ).toBe(false);
  });
});

describe("matchesSearchFilters", () => {
  const entry = SEARCH_SALON_ENTRIES[0];
  if (entry === undefined) {
    throw new Error("Expected SEARCH_SALON_ENTRIES to have at least one entry");
  }

  const shop = getShopProfile(entry.shopId);

  const salon = {
    shopId: entry.shopId,
    name: shop.name,
    address: shop.address,
    rating: shop.rating,
    imageUri: shop.heroImages[0] ?? "",
    distanceKm: entry.distanceKm,
  };

  it("matches when filters are default", () => {
    expect(matchesSearchFilters(entry, salon, DEFAULT_SEARCH_FILTERS)).toBe(
      true,
    );
  });

  it("filters by minimum rating", () => {
    expect(
      matchesSearchFilters(entry, salon, {
        ...DEFAULT_SEARCH_FILTERS,
        minRating: 5,
      }),
    ).toBe(false);
  });

  it("filters by distance", () => {
    expect(
      matchesSearchFilters(entry, salon, {
        ...DEFAULT_SEARCH_FILTERS,
        maxDistanceKm: 10,
      }),
    ).toBe(false);
  });
});
