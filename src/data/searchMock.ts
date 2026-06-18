import type { FilterOption } from "@/data/discoverMock";
import type { ResolvedNearestSalon } from "@/data/homeMock";

export type SearchTargetGender = "man" | "woman";

export interface SearchSalonEntry {
  shopId: string;
  distanceKm: number;
  categoryIds: readonly string[];
  targetGenders: readonly SearchTargetGender[];
}

export interface PopularArtist {
  id: string;
  name: string;
  role: string;
  imageUri: string;
  shopId?: string;
}

export const SEARCH_CATEGORIES: readonly FilterOption[] = [
  { id: "all", label: "All" },
  { id: "haircuts", label: "Haircuts" },
  { id: "make-up", label: "Make up" },
  { id: "massage", label: "Massage" },
  { id: "skin-care", label: "Skin care" },
] as const;

export const POPULAR_ARTISTS: readonly PopularArtist[] = [
  {
    id: "artist-1",
    name: "Lily",
    role: "Hair Stylist",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqtuW9NNkHfNvtWxb4UnD6V5O2w_Yxc7iijX9wPWEaKYN8wEs5KpxnZ6F8QBIVJtjOUwliZzZDUbY5C3-6uvxqM4iNfcXQD6h9bIzRyNEyHSByNUBAUWtO3RiYKbAi65Fq4b1L3hQQTl-VWv3J7SgJPSy0ErF_h_iAc_1LE-4XjrfpoEKMn37t2qaApBdiGnTvdSjUUnCeXd-vP5i6IZigcEXWfCLtyFuR6BcBsskbwc7UbX5uzhQ1cjGtuzoEyJJgtwj9KxGHgfo",
    shopId: "shop-1",
  },
  {
    id: "artist-2",
    name: "Lee",
    role: "Sx Barber",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBiqnV5fZQWLRtAwbNdKLGdEHOBVnh0zhXy82Q4e8vlTqXFqMVvLJGBOzk3XZj_VYv3nBshYjCzn5Xaln3O-7dEOb22fdgSI6MlOAmEFbJrewZ23iw0iCEnIO5oUM6xDqwwGdtvjhSGKqkgwF0Q7iX8_fBPPJaPZ6MXIpBTvXaLfU6o09hZPMohX2gZyQV3QyhCzzENYhAQIzRkj3CaRITfexgQC2RSigc8t4jpKhf-U0la4notMazzKpXOeq73xuX8kzLzLY4_IZs",
    shopId: "shop-2",
  },
  {
    id: "artist-3",
    name: "Connor",
    role: "Makeup Artist",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALaNMNdQ5ljWcpiyURCaoHhY8dYlGhvh0QVplBA9_C6MS5ZFJcancoDWe4p6OAZWmYZRyjzimN4b5z_n6NrG_q9pspu350UJJ2zwHBAYCTFikZ5eopnp7HSN37Cf3EXQ_uL_HWNpRdm2RFxcugrzyaca2-hoGloEYhgF_3vIz9Tw9UtVwPTVOpTnxpicWwmpamHaklH2IOpxKFE_0NTIELQzTc3x5kMUhP2yOld2uv8gOl-DqemeiF2WWxKfpD5PQsQaCktyP0lNY",
    shopId: "shop-3",
  },
  {
    id: "artist-4",
    name: "Jason",
    role: "Hair Stylist",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6vlbT_w2MD6s0XaOj8VYM2qlCUxMaS4fMDCS5gIN7ttfJ1p_D61zH-YcbNweGX6BtgSR-0JWSGhOqtwj9wkcFCzS2PazL-jpBpS54Wgr30qip7qYnKwTTP87whLlkNSzHm8cDWB7fu5SyO3vFFpfXCx73FVUP0NYlUf6vsLKoOgGGPNvKDH7yJ3XHNnUI1mjA7fWZASNL3gcV3oBeEr_tMVbLwZjlkK2XymLDpXuLXzopnkoBXntYVJEMJbA3WsuDKJS2YHWQfug",
    shopId: "shop-4",
  },
] as const;

export const SEARCH_SALON_ENTRIES: readonly SearchSalonEntry[] = [
  {
    shopId: "shop-3",
    distanceKm: 15,
    categoryIds: ["haircuts", "skin-care"],
    targetGenders: ["man", "woman"],
  },
  {
    shopId: "shop-4",
    distanceKm: 25,
    categoryIds: ["haircuts", "make-up"],
    targetGenders: ["woman"],
  },
  {
    shopId: "shop-5",
    distanceKm: 48,
    categoryIds: ["haircuts", "massage"],
    targetGenders: ["man", "woman"],
  },
  {
    shopId: "shop-6",
    distanceKm: 89,
    categoryIds: ["haircuts", "skin-care"],
    targetGenders: ["woman"],
  },
  {
    shopId: "shop-1",
    distanceKm: 5,
    categoryIds: ["haircuts", "make-up", "skin-care"],
    targetGenders: ["man", "woman"],
  },
  {
    shopId: "shop-2",
    distanceKm: 8,
    categoryIds: ["haircuts"],
    targetGenders: ["man"],
  },
] as const;

export type ResolvedSearchSalon = ResolvedNearestSalon;
