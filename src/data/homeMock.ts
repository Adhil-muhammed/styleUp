// ─── Home Screen Mock Data (sourced from home.html) ───────────────────────────

export interface HomeCategory {
  id: string;
  label: string;
  imageUri: string;
}

export interface HomePromo {
  discountLabel: string;
  subtitle: string;
  imageUri: string;
  ctaLabel: string;
}

export interface NearestSalon {
  shopId: string;
  distanceKm: number;
}

export const HOME_USER_NAME_FALLBACK = "Jaxon Reyes";

export const HOME_USER_LOCATION = "6391 Elgin St. Celina, Delaware";

export const HOME_CATEGORIES: readonly HomeCategory[] = [
  {
    id: "haircuts",
    label: "Haircuts",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvjgmPd8TeO6DyoNqbAi_PyJ0MTvr1FW7CdV3lh5zklCV8IxL-zLZyV2MeXV8gGpdY3k5Y51lEKdRYZPzsGIVEJ5rxuroutIfVo9O00twFXoMGE0VBKffq1f5ee0hfcR0M537vKApmDJn3qh_aL3Tox0Q-FXu5kkaK6uNihrP483-VYSu-x-P-ZAImTDBlwljcDyqLpb-017n9eviC4T4oMUzvdrL1BXA4dQkmkgOQ0DLQo8l5uDrP_b20r8260QpodFUzNBg1H5Q",
  },
  {
    id: "beard",
    label: "Beard",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCav_JrCy9J3aFWBf7lH4exPgwYYX5p-SZ87SB1VRz_ncLTwZEAZh4t4XurJgMi2z_z-RTyy8cv7MKOHfJU8DJAollngPsj3YpO99rV5lq03tkq1MqEMJhJJcWCGN-wA_8gSIGDKxUxK6P6be6rE7YCU1pMAPhpug35TwbBom54oDpJPx96zJZe3_vlq5U7Rux__NNHnMfykr8xQ7-woZPmBBOzOZbT4lRFYkDim7brXV3oM66dFe72S4o3G26Mv7uIUOfao8EoAZU",
  },
  {
    id: "make-up",
    label: "Make up",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARADWRSz24YfL4aPYvk1lk3jpR_31s9s0bTV8boVlRQ3diJDER-EviH27ihdG5wIyNCWxjR-N1uu93IRWP4gltvy2NrwL45cUyW4DGw_7NZhrhgnlIfb_sWO5co2fADhnXtsFyCmcm3z7_VfSlm5hVUrUiXlObU87kw00PIJ5r05pNEfNZIoW0IwXWhbofE1_Hc_SXcyA97RkhN9cr2InKR0fs4Ddldb52vbhIpW7XAEWTY8oFKnl9D4yVYsJfs0PrT8AJScRCqlg",
  },
  {
    id: "manicure",
    label: "Manicure",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6T0L1wtP0t_ncisWlJxR0Kur4Cfzv8N2cKC1qKoshfWlqhFYcA41u1uiJITZY8gpuhWGV2rLk6SbX2uICpm1Z6BYosFRjfL4UTb2oSCa0HLoNqzJAWpHHiq6fhFQtT9JE_6XGoHggsqMMWMHCks8i0-BcP9jef16yLx9jUIjmyl8R-dqFPAM3-NDl7GhuHkIhgzBtZICCgswjFiz_S_Tl1UblXZFnvi4Adqzn_SieyZbhereZRVN4edXHw9N9hAYXUMo3FbMHg6A",
  },
] as const;

export const HOME_PROMO: HomePromo = {
  discountLabel: "-40%",
  subtitle: "Voucher for your next haircut service",
  imageUri:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDSUirm6PWfStGOb9JJk9M-7DlK0H413lMgv9StWqgowgMrmcJCNgzqrvBZ6CR3QS90EDUSX6HFZgrWL1UnHH1kjQqYiOGbyRAMVNp9vUj4KR5_Zz98KaLVJcpK6UrWrUyPXkcgVOonGMWoAekCTetWfJyIRCkj80MEn3O-lI32mQA7JcPp6IyLcGDanev-7fZoyqdPpmQ58AOlv18pigmiid2Gf_24OlPpRFoUjTMPml2Ix5EpPmuwFKfMeKnTod8nJHQoH2iQ0wM",
  ctaLabel: "Book now",
};

export interface ResolvedNearestSalon {
  shopId: string;
  name: string;
  address: string;
  rating: number;
  imageUri: string;
  distanceKm: number;
}

export const NEAREST_SALONS: readonly NearestSalon[] = [
  { shopId: "shop-1", distanceKm: 5 },
  { shopId: "shop-2", distanceKm: 8 },
] as const;
