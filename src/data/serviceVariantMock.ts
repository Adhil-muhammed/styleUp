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

const SHAVING_MAN_VARIANTS: readonly ServiceVariant[] = [
  {
    id: "sh-m-classic",
    categoryId: "shaving",
    gender: "man",
    title: "Classic Wet Shave",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaEwkbMk-Lvz2dVjyUrZZocClB-daJJK1zON6b3Qbk_U0Bl8xJs5bcBRcAOPTU2c9E6_dVg_XWPfHzwGC_gWKoAqUB5bIZfTvBis_56sz48WGX7fNTVr8BHIT7_i00QgkeZH-xaFSvcvuuGZ0LDDF4ywGu4nnixoOUzPrGuny_60aODBCrugy90x4-8kk2Hv-y2FgehhfOzdDOqk3WE1keKHJVlAqlJsybFY4M6R6wSE6fVtNXY0WAMgGvdRv2DDFrz02kSvZTr_s",
    bookedCount: 843,
    priceCents: 2500,
  },
  {
    id: "sh-m-beard-trim",
    categoryId: "shaving",
    gender: "man",
    title: "Beard Trim & Shape",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPpQOyObH0DxTDEDAuK3BA5dycrEfytQ3K-LSv4RpM36Il5r3kMxeICXlryR9F32_4UCttDnY1bmZYXsXP2fGIkd-Ud-79tgu6LtI9PYAYXPQ_fhcFne0zeLQNXqgIOYq0OCFJ3ESkY-srwgvdwecKaST48dhpxHfQ1Ca4LxnUhL_lWlaKNyE5DU-zK2hwQ56Aw24NFLRpPfGYrWbtU8VTDcPnDfCg1BqPsay7GmGDMSy2dJuMzzLUD52PDgObO3f9dAV4ocD9smE",
    bookedCount: 711,
    priceCents: 2000,
  },
  {
    id: "sh-m-hot-towel",
    categoryId: "shaving",
    gender: "man",
    title: "Hot Towel Shave",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfoknFoBlFzHIyDAdYrrLwHGsTNBgH10FVZOMK4mtaReZ2kdR33mrpdPejbgypz0dG2uzfR-_NEBU4UraQk7P_kq67bNWGGV58Jvsk6NFOXdMvNwvg7faQtBo0OT4pbJQDJzXStJmQJK_6RboVgQoOQcZHJ0oFdBMgE_b4wLer8KUc7Ckofzu7HzHIWerEZMb-ncQt2XzxqtLq-Rum6hFZwF4DfcO_UIkdW7IyUMjf70XtTjzgyEIdCMRCmUEJ22btpS53rt6KVrc",
    bookedCount: 594,
    priceCents: 3200,
  },
  {
    id: "sh-m-mustache",
    categoryId: "shaving",
    gender: "man",
    title: "Mustache Shave",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBCc76u5O4s-coRcaF_hIXLm8PBcsoMJsQllZ0DVE1lDVcKtg0s_cslFQN_YlgoHu5RSXO3pGJsRJ2tbQilG2RFXwU9uPnYkkgZ6pAM_FYf2C6xzHW4vZ83OP8Khwjb49QkqJMnXip3CRHXRBAd8HCySCMpOGAzcZkitPcuh1ZzKSeM8OxSjz7qzUhQYYNiMuATUTBjlBB7fsHQW-zbRLdutyj9D4PUQBkDkyJ6mN4h1NnsDgBCgqi7pfRfFCVaS8TlUw0_iiyZuf0",
    bookedCount: 372,
    priceCents: 1500,
  },
] as const;

const SHAVING_WOMAN_VARIANTS: readonly ServiceVariant[] = [
  {
    id: "sh-w-eyebrow",
    categoryId: "shaving",
    gender: "woman",
    title: "Eyebrow Shaping",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaEwkbMk-Lvz2dVjyUrZZocClB-daJJK1zON6b3Qbk_U0Bl8xJs5bcBRcAOPTU2c9E6_dVg_XWPfHzwGC_gWKoAqUB5bIZfTvBis_56sz48WGX7fNTVr8BHIT7_i00QgkeZH-xaFSvcvuuGZ0LDDF4ywGu4nnixoOUzPrGuny_60aODBCrugy90x4-8kk2Hv-y2FgehhfOzdDOqk3WE1keKHJVlAqlJsybFY4M6R6wSE6fVtNXY0WAMgGvdRv2DDFrz02kSvZTr_s",
    bookedCount: 682,
    priceCents: 1200,
  },
  {
    id: "sh-w-upper-lip",
    categoryId: "shaving",
    gender: "woman",
    title: "Upper Lip Wax",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPpQOyObH0DxTDEDAuK3BA5dycrEfytQ3K-LSv4RpM36Il5r3kMxeICXlryR9F32_4UCttDnY1bmZYXsXP2fGIkd-Ud-79tgu6LtI9PYAYXPQ_fhcFne0zeLQNXqgIOYq0OCFJ3ESkY-srwgvdwecKaST48dhpxHfQ1Ca4LxnUhL_lWlaKNyE5DU-zK2hwQ56Aw24NFLRpPfGYrWbtU8VTDcPnDfCg1BqPsay7GmGDMSy2dJuMzzLUD52PDgObO3f9dAV4ocD9smE",
    bookedCount: 501,
    priceCents: 800,
  },
  {
    id: "sh-w-full-face",
    categoryId: "shaving",
    gender: "woman",
    title: "Full Face Threading",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfoknFoBlFzHIyDAdYrrLwHGsTNBgH10FVZOMK4mtaReZ2kdR33mrpdPejbgypz0dG2uzfR-_NEBU4UraQk7P_kq67bNWGGV58Jvsk6NFOXdMvNwvg7faQtBo0OT4pbJQDJzXStJmQJK_6RboVgQoOQcZHJ0oFdBMgE_b4wLer8KUc7Ckofzu7HzHIWerEZMb-ncQt2XzxqtLq-Rum6hFZwF4DfcO_UIkdW7IyUMjf70XtTjzgyEIdCMRCmUEJ22btpS53rt6KVrc",
    bookedCount: 389,
    priceCents: 1800,
  },
] as const;

const SKIN_CARE_MAN_VARIANTS: readonly ServiceVariant[] = [
  {
    id: "sc-m-basic-facial",
    categoryId: "skin-care",
    gender: "man",
    title: "Basic Facial",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaEwkbMk-Lvz2dVjyUrZZocClB-daJJK1zON6b3Qbk_U0Bl8xJs5bcBRcAOPTU2c9E6_dVg_XWPfHzwGC_gWKoAqUB5bIZfTvBis_56sz48WGX7fNTVr8BHIT7_i00QgkeZH-xaFSvcvuuGZ0LDDF4ywGu4nnixoOUzPrGuny_60aODBCrugy90x4-8kk2Hv-y2FgehhfOzdDOqk3WE1keKHJVlAqlJsybFY4M6R6wSE6fVtNXY0WAMgGvdRv2DDFrz02kSvZTr_s",
    bookedCount: 430,
    priceCents: 3500,
  },
  {
    id: "sc-m-deep-cleanse",
    categoryId: "skin-care",
    gender: "man",
    title: "Deep Cleanse",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPpQOyObH0DxTDEDAuK3BA5dycrEfytQ3K-LSv4RpM36Il5r3kMxeICXlryR9F32_4UCttDnY1bmZYXsXP2fGIkd-Ud-79tgu6LtI9PYAYXPQ_fhcFne0zeLQNXqgIOYq0OCFJ3ESkY-srwgvdwecKaST48dhpxHfQ1Ca4LxnUhL_lWlaKNyE5DU-zK2hwQ56Aw24NFLRpPfGYrWbtU8VTDcPnDfCg1BqPsay7GmGDMSy2dJuMzzLUD52PDgObO3f9dAV4ocD9smE",
    bookedCount: 318,
    priceCents: 4800,
  },
  {
    id: "sc-m-anti-aging",
    categoryId: "skin-care",
    gender: "man",
    title: "Anti-Aging Treatment",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfoknFoBlFzHIyDAdYrrLwHGsTNBgH10FVZOMK4mtaReZ2kdR33mrpdPejbgypz0dG2uzfR-_NEBU4UraQk7P_kq67bNWGGV58Jvsk6NFOXdMvNwvg7faQtBo0OT4pbJQDJzXStJmQJK_6RboVgQoOQcZHJ0oFdBMgE_b4wLer8KUc7Ckofzu7HzHIWerEZMb-ncQt2XzxqtLq-Rum6hFZwF4DfcO_UIkdW7IyUMjf70XtTjzgyEIdCMRCmUEJ22btpS53rt6KVrc",
    bookedCount: 245,
    priceCents: 6500,
  },
] as const;

const SKIN_CARE_WOMAN_VARIANTS: readonly ServiceVariant[] = [
  {
    id: "sc-w-hydrating",
    categoryId: "skin-care",
    gender: "woman",
    title: "Hydrating Facial",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaEwkbMk-Lvz2dVjyUrZZocClB-daJJK1zON6b3Qbk_U0Bl8xJs5bcBRcAOPTU2c9E6_dVg_XWPfHzwGC_gWKoAqUB5bIZfTvBis_56sz48WGX7fNTVr8BHIT7_i00QgkeZH-xaFSvcvuuGZ0LDDF4ywGu4nnixoOUzPrGuny_60aODBCrugy90x4-8kk2Hv-y2FgehhfOzdDOqk3WE1keKHJVlAqlJsybFY4M6R6wSE6fVtNXY0WAMgGvdRv2DDFrz02kSvZTr_s",
    bookedCount: 689,
    priceCents: 5500,
  },
  {
    id: "sc-w-brightening",
    categoryId: "skin-care",
    gender: "woman",
    title: "Brightening Peel",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPpQOyObH0DxTDEDAuK3BA5dycrEfytQ3K-LSv4RpM36Il5r3kMxeICXlryR9F32_4UCttDnY1bmZYXsXP2fGIkd-Ud-79tgu6LtI9PYAYXPQ_fhcFne0zeLQNXqgIOYq0OCFJ3ESkY-srwgvdwecKaST48dhpxHfQ1Ca4LxnUhL_lWlaKNyE5DU-zK2hwQ56Aw24NFLRpPfGYrWbtU8VTDcPnDfCg1BqPsay7GmGDMSy2dJuMzzLUD52PDgObO3f9dAV4ocD9smE",
    bookedCount: 524,
    priceCents: 7000,
  },
  {
    id: "sc-w-acne",
    categoryId: "skin-care",
    gender: "woman",
    title: "Acne Control Facial",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfoknFoBlFzHIyDAdYrrLwHGsTNBgH10FVZOMK4mtaReZ2kdR33mrpdPejbgypz0dG2uzfR-_NEBU4UraQk7P_kq67bNWGGV58Jvsk6NFOXdMvNwvg7faQtBo0OT4pbJQDJzXStJmQJK_6RboVgQoOQcZHJ0oFdBMgE_b4wLer8KUc7Ckofzu7HzHIWerEZMb-ncQt2XzxqtLq-Rum6hFZwF4DfcO_UIkdW7IyUMjf70XtTjzgyEIdCMRCmUEJ22btpS53rt6KVrc",
    bookedCount: 411,
    priceCents: 6000,
  },
] as const;

const HAIR_COLORING_MAN_VARIANTS: readonly ServiceVariant[] = [
  {
    id: "hcol-m-global",
    categoryId: "hair-coloring",
    gender: "man",
    title: "Global Color",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaEwkbMk-Lvz2dVjyUrZZocClB-daJJK1zON6b3Qbk_U0Bl8xJs5bcBRcAOPTU2c9E6_dVg_XWPfHzwGC_gWKoAqUB5bIZfTvBis_56sz48WGX7fNTVr8BHIT7_i00QgkeZH-xaFSvcvuuGZ0LDDF4ywGu4nnixoOUzPrGuny_60aODBCrugy90x4-8kk2Hv-y2FgehhfOzdDOqk3WE1keKHJVlAqlJsybFY4M6R6wSE6fVtNXY0WAMgGvdRv2DDFrz02kSvZTr_s",
    bookedCount: 389,
    priceCents: 6000,
  },
  {
    id: "hcol-m-highlights",
    categoryId: "hair-coloring",
    gender: "man",
    title: "Highlights",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPpQOyObH0DxTDEDAuK3BA5dycrEfytQ3K-LSv4RpM36Il5r3kMxeICXlryR9F32_4UCttDnY1bmZYXsXP2fGIkd-Ud-79tgu6LtI9PYAYXPQ_fhcFne0zeLQNXqgIOYq0OCFJ3ESkY-srwgvdwecKaST48dhpxHfQ1Ca4LxnUhL_lWlaKNyE5DU-zK2hwQ56Aw24NFLRpPfGYrWbtU8VTDcPnDfCg1BqPsay7GmGDMSy2dJuMzzLUD52PDgObO3f9dAV4ocD9smE",
    bookedCount: 276,
    priceCents: 4500,
  },
  {
    id: "hcol-m-beard-dye",
    categoryId: "hair-coloring",
    gender: "man",
    title: "Beard Dye",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfoknFoBlFzHIyDAdYrrLwHGsTNBgH10FVZOMK4mtaReZ2kdR33mrpdPejbgypz0dG2uzfR-_NEBU4UraQk7P_kq67bNWGGV58Jvsk6NFOXdMvNwvg7faQtBo0OT4pbJQDJzXStJmQJK_6RboVgQoOQcZHJ0oFdBMgE_b4wLer8KUc7Ckofzu7HzHIWerEZMb-ncQt2XzxqtLq-Rum6hFZwF4DfcO_UIkdW7IyUMjf70XtTjzgyEIdCMRCmUEJ22btpS53rt6KVrc",
    bookedCount: 198,
    priceCents: 2500,
  },
] as const;

const HAIR_COLORING_WOMAN_VARIANTS: readonly ServiceVariant[] = [
  {
    id: "hcol-w-balayage",
    categoryId: "hair-coloring",
    gender: "woman",
    title: "Balayage",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaEwkbMk-Lvz2dVjyUrZZocClB-daJJK1zON6b3Qbk_U0Bl8xJs5bcBRcAOPTU2c9E6_dVg_XWPfHzwGC_gWKoAqUB5bIZfTvBis_56sz48WGX7fNTVr8BHIT7_i00QgkeZH-xaFSvcvuuGZ0LDDF4ywGu4nnixoOUzPrGuny_60aODBCrugy90x4-8kk2Hv-y2FgehhfOzdDOqk3WE1keKHJVlAqlJsybFY4M6R6wSE6fVtNXY0WAMgGvdRv2DDFrz02kSvZTr_s",
    bookedCount: 754,
    priceCents: 9500,
  },
  {
    id: "hcol-w-ombre",
    categoryId: "hair-coloring",
    gender: "woman",
    title: "Ombré",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPpQOyObH0DxTDEDAuK3BA5dycrEfytQ3K-LSv4RpM36Il5r3kMxeICXlryR9F32_4UCttDnY1bmZYXsXP2fGIkd-Ud-79tgu6LtI9PYAYXPQ_fhcFne0zeLQNXqgIOYq0OCFJ3ESkY-srwgvdwecKaST48dhpxHfQ1Ca4LxnUhL_lWlaKNyE5DU-zK2hwQ56Aw24NFLRpPfGYrWbtU8VTDcPnDfCg1BqPsay7GmGDMSy2dJuMzzLUD52PDgObO3f9dAV4ocD9smE",
    bookedCount: 612,
    priceCents: 8000,
  },
  {
    id: "hcol-w-full-color",
    categoryId: "hair-coloring",
    gender: "woman",
    title: "Full Color",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfoknFoBlFzHIyDAdYrrLwHGsTNBgH10FVZOMK4mtaReZ2kdR33mrpdPejbgypz0dG2uzfR-_NEBU4UraQk7P_kq67bNWGGV58Jvsk6NFOXdMvNwvg7faQtBo0OT4pbJQDJzXStJmQJK_6RboVgQoOQcZHJ0oFdBMgE_b4wLer8KUc7Ckofzu7HzHIWerEZMb-ncQt2XzxqtLq-Rum6hFZwF4DfcO_UIkdW7IyUMjf70XtTjzgyEIdCMRCmUEJ22btpS53rt6KVrc",
    bookedCount: 493,
    priceCents: 7500,
  },
  {
    id: "hcol-w-highlights",
    categoryId: "hair-coloring",
    gender: "woman",
    title: "Highlights & Lowlights",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBCc76u5O4s-coRcaF_hIXLm8PBcsoMJsQllZ0DVE1lDVcKtg0s_cslFQN_YlgoHu5RSXO3pGJsRJ2tbQilG2RFXwU9uPnYkkgZ6pAM_FYf2C6xzHW4vZ83OP8Khwjb49QkqJMnXip3CRHXRBAd8HCySCMpOGAzcZkitPcuh1ZzKSeM8OxSjz7qzUhQYYNiMuATUTBjlBB7fsHQW-zbRLdutyj9D4PUQBkDkyJ6mN4h1NnsDgBCgqi7pfRfFCVaS8TlUw0_iiyZuf0",
    bookedCount: 341,
    priceCents: 6500,
  },
] as const;

const ALL_VARIANTS: readonly ServiceVariant[] = [
  ...HAIR_CUT_MAN_VARIANTS,
  ...HAIR_CUT_WOMAN_VARIANTS,
  ...SHAVING_MAN_VARIANTS,
  ...SHAVING_WOMAN_VARIANTS,
  ...SKIN_CARE_MAN_VARIANTS,
  ...SKIN_CARE_WOMAN_VARIANTS,
  ...HAIR_COLORING_MAN_VARIANTS,
  ...HAIR_COLORING_WOMAN_VARIANTS,
];

const SUPPORTED_CATEGORY_IDS = new Set<string>([
  "hair-cut",
  "shaving",
  "skin-care",
  "hair-coloring",
]);

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
