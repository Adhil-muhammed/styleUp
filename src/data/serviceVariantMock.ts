// ─── Service Variant Mock Data (sourced from hair-cut.html) ─────────────────

export type ServiceGender = "man" | "woman";

export interface ServiceVariant {
  id: string;
  categoryId: string;
  gender: ServiceGender;
  title: string;
  imageUri: string;
  bookedCount: number;
  priceCents: number;
}

const HAIR_CUT_MAN_VARIANTS: readonly ServiceVariant[] = [
  {
    id: "hc-undercut",
    categoryId: "hair-cut",
    gender: "man",
    title: "Undercut",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaEwkbMk-Lvz2dVjyUrZZocClB-daJJK1zON6b3Qbk_U0Bl8xJs5bcBRcAOPTU2c9E6_dVg_XWPfHzwGC_gWKoAqUB5bIZfTvBis_56sz48WGX7fNTVr8BHIT7_i00QgkeZH-xaFSvcvuuGZ0LDDF4ywGu4nnixoOUzPrGuny_60aODBCrugy90x4-8kk2Hv-y2FgehhfOzdDOqk3WE1keKHJVlAqlJsybFY4M6R6wSE6fVtNXY0WAMgGvdRv2DDFrz02kSvZTr_s",
    bookedCount: 728,
    priceCents: 4500,
  },
  {
    id: "hc-quiff",
    categoryId: "hair-cut",
    gender: "man",
    title: "Quiff",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPpQOyObH0DxTDEDAuK3BA5dycrEfytQ3K-LSv4RpM36Il5r3kMxeICXlryR9F32_4UCttDnY1bmZYXsXP2fGIkd-Ud-79tgu6LtI9PYAYXPQ_fhcFne0zeLQNXqgIOYq0OCFJ3ESkY-srwgvdwecKaST48dhpxHfQ1Ca4LxnUhL_lWlaKNyE5DU-zK2hwQ56Aw24NFLRpPfGYrWbtU8VTDcPnDfCg1BqPsay7GmGDMSy2dJuMzzLUD52PDgObO3f9dAV4ocD9smE",
    bookedCount: 629,
    priceCents: 4200,
  },
  {
    id: "hc-crew-cut",
    categoryId: "hair-cut",
    gender: "man",
    title: "Crew Cut",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfoknFoBlFzHIyDAdYrrLwHGsTNBgH10FVZOMK4mtaReZ2kdR33mrpdPejbgypz0dG2uzfR-_NEBU4UraQk7P_kq67bNWGGV58Jvsk6NFOXdMvNwvg7faQtBo0OT4pbJQDJzXStJmQJK_6RboVgQoOQcZHJ0oFdBMgE_b4wLer8KUc7Ckofzu7HzHIWerEZMb-ncQt2XzxqtLq-Rum6hFZwF4DfcO_UIkdW7IyUMjf70XtTjzgyEIdCMRCmUEJ22btpS53rt6KVrc",
    bookedCount: 922,
    priceCents: 3850,
  },
  {
    id: "hc-regular-cut",
    categoryId: "hair-cut",
    gender: "man",
    title: "Regular Cut",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBCc76u5O4s-coRcaF_hIXLm8PBcsoMJsQllZ0DVE1lDVcKtg0s_cslFQN_YlgoHu5RSXO3pGJsRJ2tbQilG2RFXwU9uPnYkkgZ6pAM_FYf2C6xzHW4vZ83OP8Khwjb49QkqJMnXip3CRHXRBAd8HCySCMpOGAzcZkitPcuh1ZzKSeM8OxSjz7qzUhQYYNiMuATUTBjlBB7fsHQW-zbRLdutyj9D4PUQBkDkyJ6mN4h1NnsDgBCgqi7pfRfFCVaS8TlUw0_iiyZuf0",
    bookedCount: 1029,
    priceCents: 3500,
  },
] as const;

const HAIR_CUT_WOMAN_VARIANTS: readonly ServiceVariant[] = [
  {
    id: "hc-w-bob",
    categoryId: "hair-cut",
    gender: "woman",
    title: "Classic Bob",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaEwkbMk-Lvz2dVjyUrZZocClB-daJJK1zON6b3Qbk_U0Bl8xJs5bcBRcAOPTU2c9E6_dVg_XWPfHzwGC_gWKoAqUB5bIZfTvBis_56sz48WGX7fNTVr8BHIT7_i00QgkeZH-xaFSvcvuuGZ0LDDF4ywGu4nnixoOUzPrGuny_60aODBCrugy90x4-8kk2Hv-y2FgehhfOzdDOqk3WE1keKHJVlAqlJsybFY4M6R6wSE6fVtNXY0WAMgGvdRv2DDFrz02kSvZTr_s",
    bookedCount: 512,
    priceCents: 4800,
  },
  {
    id: "hc-w-layers",
    categoryId: "hair-cut",
    gender: "woman",
    title: "Layered Cut",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPpQOyObH0DxTDEDAuK3BA5dycrEfytQ3K-LSv4RpM36Il5r3kMxeICXlryR9F32_4UCttDnY1bmZYXsXP2fGIkd-Ud-79tgu6LtI9PYAYXPQ_fhcFne0zeLQNXqgIOYq0OCFJ3ESkY-srwgvdwecKaST48dhpxHfQ1Ca4LxnUhL_lWlaKNyE5DU-zK2hwQ56Aw24NFLRpPfGYrWbtU8VTDcPnDfCg1BqPsay7GmGDMSy2dJuMzzLUD52PDgObO3f9dAV4ocD9smE",
    bookedCount: 438,
    priceCents: 5200,
  },
  {
    id: "hc-w-pixie",
    categoryId: "hair-cut",
    gender: "woman",
    title: "Pixie Cut",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfoknFoBlFzHIyDAdYrrLwHGsTNBgH10FVZOMK4mtaReZ2kdR33mrpdPejbgypz0dG2uzfR-_NEBU4UraQk7P_kq67bNWGGV58Jvsk6NFOXdMvNwvg7faQtBo0OT4pbJQDJzXStJmQJK_6RboVgQoOQcZHJ0oFdBMgE_b4wLer8KUc7Ckofzu7HzHIWerEZMb-ncQt2XzxqtLq-Rum6hFZwF4DfcO_UIkdW7IyUMjf70XtTjzgyEIdCMRCmUEJ22btpS53rt6KVrc",
    bookedCount: 367,
    priceCents: 4400,
  },
] as const;

const ALL_VARIANTS: readonly ServiceVariant[] = [
  ...HAIR_CUT_MAN_VARIANTS,
  ...HAIR_CUT_WOMAN_VARIANTS,
];

const SUPPORTED_CATEGORY_IDS = new Set<string>(["hair-cut"]);

export function isCategorySupported(categoryId: string): boolean {
  return SUPPORTED_CATEGORY_IDS.has(categoryId);
}

export function getVariantsForCategory(
  categoryId: string,
  gender: ServiceGender,
): readonly ServiceVariant[] {
  return ALL_VARIANTS.filter(
    (variant) => variant.categoryId === categoryId && variant.gender === gender,
  );
}

export function getVariantById(variantId: string): ServiceVariant | undefined {
  return ALL_VARIANTS.find((variant) => variant.id === variantId);
}

export function sumVariantPrices(variantIds: readonly string[]): number {
  return variantIds.reduce((total, variantId) => {
    const variant = getVariantById(variantId);
    return total + (variant?.priceCents ?? 0);
  }, 0);
}
