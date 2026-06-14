// ─── Shop Profile Mock Data (sourced from barberProfile.html) ────────────────

export interface ShopSpecialist {
  id: string;
  name: string;
  role: string;
  avatarUri: string;
}

export interface ShopWorkingHours {
  label: string;
  hours: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  variantCount: number;
}

export interface ShopPackage {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  imageUri: string;
  description: string;
  detailImageUri: string;
  includedServices: readonly string[];
}

export interface ShopProfile {
  id: string;
  name: string;
  isOpen: boolean;
  address: string;
  rating: number;
  reviewCount: number;
  phone: string;
  about: string;
  heroImages: string[];
  specialists: ShopSpecialist[];
  workingHours: ShopWorkingHours[];
  serviceCategories: readonly ServiceCategory[];
  packages: readonly ShopPackage[];
  latitude: number;
  longitude: number;
}

export const DEFAULT_SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  { id: "hair-cut", name: "Hair Cut", variantCount: 44 },
  { id: "hair-coloring", name: "Hair Coloring", variantCount: 12 },
  { id: "hair-wash", name: "Hair Wash", variantCount: 8 },
  { id: "shaving", name: "Shaving", variantCount: 22 },
  { id: "skin-care", name: "Skin Care", variantCount: 12 },
  { id: "hair-dryer", name: "Hair Dryer", variantCount: 4 },
  { id: "face-makeup", name: "Face Make up", variantCount: 18 },
] as const;

const PACKAGE_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.";

const PKG_HAIRCUT_STYLE_DETAIL_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuARhML_3sNRvkZxeKqzJ9mIUAfp9QmN6eWXlQWmZ1AR3v3nZ2UmveckomnLiolqDHB5lKWu1e4PzC-qFvaqQQ-aUyS54FLbod5RiUkT62Wbogh2plcsTF-lYLMzAP5zgMTjX_RbbSPuCSlFHl5_kKFSynnxU8JhKfS1sIWmpROiRZSAhJq0LIC-FayYECM93zIfNKWdoubPZF9rjrZlaX4BEsRlExQCswnqoeHaZkF2-1D2f130EI3Olgx48DhrVl3LmdI4w77HYKQ";

export const DEFAULT_SHOP_PACKAGES: readonly ShopPackage[] = [
  {
    id: "pkg-haircut-style",
    title: "Haircut & Hairstyle",
    subtitle: "Special Offers Package, valid until Dec 10, 2024",
    price: "$125",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBp1vR2PraP8YxRuK_3h7FSy99keYFnkVeahLU27xErsV5lepDjmaH8f9_rbmKiCaGdcvZIIqVZ-mHwDUsU9BmICXqZBpBN6N4mx5ods_Rn04ZbE0fTgLVbgA_9m_ZpWzomk48Og8AdPhohVOzidbLYYle2yGhy-FA5Xj8ai0UmdogZymkgf9d6NnFgnkmng7u-lzXuZS59_w3BL7bfB6zN9mGHzS1KYTporEWxreCfCbo4VrvbkN66xe6bAdBFztNDiK_myjog4A8",
    description: PACKAGE_DESCRIPTION,
    detailImageUri: PKG_HAIRCUT_STYLE_DETAIL_IMAGE,
    includedServices: [
      "Haircut",
      "Shave Mustache",
      "Hairstyling",
      "Shave the Beard",
      "Hair Coloring",
      "Facial",
    ],
  },
  {
    id: "pkg-beauty-makeup",
    title: "Beauty Make up",
    subtitle: "Special Offers Package, valid until Dec 20, 2024",
    price: "$140",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMyUG_pzoljBqz7fnXdBoPdZxERvKxbZRWVdYqywKjoIhNXntm88YP1DLvB7dlSQOOle0__b-sYh1H1SuEhcKvZOSHxYHpiEn9Mx-_yEUe_3dcleR7sqduSr5Ue2VN4B0mjf-caBPULerZUnY_uylmuT3j-iHc80u24y1QeSjyLhMM5KKDROMLqYkLqEI8vKvbHL9Wbv4sIeBscy84YzMqjT7IOIFOT7ADw5E586RrDcQwzbdMUIliG_Z-UT7fY9ZDEh8ldIhAhII",
    description: PACKAGE_DESCRIPTION,
    detailImageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMyUG_pzoljBqz7fnXdBoPdZxERvKxbZRWVdYqywKjoIhNXntm88YP1DLvB7dlSQOOle0__b-sYh1H1SuEhcKvZOSHxYHpiEn9Mx-_yEUe_3dcleR7sqduSr5Ue2VN4B0mjf-caBPULerZUnY_uylmuT3j-iHc80u24y1QeSjyLhMM5KKDROMLqYkLqEI8vKvbHL9Wbv4sIeBscy84YzMqjT7IOIFOT7ADw5E586RrDcQwzbdMUIliG_Z-UT7fY9ZDEh8ldIhAhII",
    includedServices: ["Makeup Application", "Skin Prep", "Lash Styling", "Brow Shaping"],
  },
  {
    id: "pkg-haircut-coloring",
    title: "Haircut & Hair Coloring",
    subtitle: "Special Offers Package, valid until Dec 16, 2024",
    price: "$100",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjid2-cpgSZpLcys9TZXlKG37rBG8K8mxB4nycodxHlcAuNTDBkz-YNtVOut9hyiroClwyxUdpdlv8rW71XgV1OifrccUwszKbcRXFmZJ0y1cyuvl8mScD5qwWWV1ouSdiMPMmAYCOTagnrvo6UO4_H0X-skzW1Mu27yjr6iSYTQtfVZd8w7yKKQ1SKiKVqbolrqSDRrLuOcHbJOwQG3St2b7HpqybljxwfAot0cAMxtWNfUAfXmba9RrpBTYnTdxjUK_bsfDd8FY",
    description: PACKAGE_DESCRIPTION,
    detailImageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjid2-cpgSZpLcys9TZXlKG37rBG8K8mxB4nycodxHlcAuNTDBkz-YNtVOut9hyiroClwyxUdpdlv8rW71XgV1OifrccUwszKbcRXFmZJ0y1cyuvl8mScD5qwWWV1ouSdiMPMmAYCOTagnrvo6UO4_H0X-skzW1Mu27yjr6iSYTQtfVZd8w7yKKQ1SKiKVqbolrqSDRrLuOcHbJOwQG3St2b7HpqybljxwfAot0cAMxtWNfUAfXmba9RrpBTYnTdxjUK_bsfDd8FY",
    includedServices: ["Haircut", "Hair Coloring", "Blow Dry", "Scalp Treatment"],
  },
  {
    id: "pkg-bridal-makeup",
    title: "Bridal Make up",
    subtitle: "Special Offers Package, valid until Dec 24, 2024",
    price: "$160",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYlaTyXEMvLHzn_64bVKjTmm5Rcg9InygH2s7awgwu7s4LaAsJxaM3HZPAUq_OQwFpwgLlsuwMf8X1s98PhFojTVpU3LM8ms9em6KEk8Qlpe9Xmd2kzrVQiSlo0FfZGd2IzgnVnPez08VAAuw3PpLjsw7lHzwELIQUmRkcQojbCDQGq342sS3o4wNUe0pLNdoeZUTr9MGCyser4QrcrRjvveurzTqadsXH_7pBydxAHThM1ga2_dvVKnVfK06Ro90TKMYnGwUX-6M",
    description: PACKAGE_DESCRIPTION,
    detailImageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYlaTyXEMvLHzn_64bVKjTmm5Rcg9InygH2s7awgwu7s4LaAsJxaM3HZPAUq_OQwFpwgLlsuwMf8X1s98PhFojTVpU3LM8ms9em6KEk8Qlpe9Xmd2kzrVQiSlo0FfZGd2IzgnVnPez08VAAuw3PpLjsw7lHzwELIQUmRkcQojbCDQGq342sS3o4wNUe0pLNdoeZUTr9MGCyser4QrcrRjvveurzTqadsXH_7pBydxAHThM1ga2_dvVKnVfK06Ro90TKMYnGwUX-6M",
    includedServices: ["Bridal Makeup", "Hair Styling", "Trial Session", "Touch-up Kit"],
  },
  {
    id: "pkg-hair-wash-coloring",
    title: "Hair Wash & Coloring",
    subtitle: "Special Offers Package, valid until Dec 24, 2024",
    price: "$90",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4pq0iclvHlm8Zv8F0Xm59PtzC1JoyHexbaBCdGiB9zxmY4yoS0V5NZfGF5Q9XEefJrY7Cq00DpTEs0Z4xVdZcOTX3SJFyhx8seNhFIHR5QYv2QV6AAxqCN22GQcah565XA-Vs6XFHo4AvuLTRiH-bDRYoizTLOp9vlKAWW3lKBLHBywvpPO2NUKtESHxAYH4Eh1FRUOC_1rVQlge4VjE9UYB215V_PV2be8Js2qj9FrN_cGn5cWo9IOXItHvCOcNwMDR_nSE_lXA",
    description: PACKAGE_DESCRIPTION,
    detailImageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4pq0iclvHlm8Zv8F0Xm59PtzC1JoyHexbaBCdGiB9zxmY4yoS0V5NZfGF5Q9XEefJrY7Cq00DpTEs0Z4xVdZcOTX3SJFyhx8seNhFIHR5QYv2QV6AAxqCN22GQcah565XA-Vs6XFHo4AvuLTRiH-bDRYoizTLOp9vlKAWW3lKBLHBywvpPO2NUKtESHxAYH4Eh1FRUOC_1rVQlge4VjE9UYB215V_PV2be8Js2qj9FrN_cGn5cWo9IOXItHvCOcNwMDR_nSE_lXA",
    includedServices: ["Hair Wash", "Hair Coloring", "Conditioning", "Blow Dry"],
  },
] as const;

export const DEFAULT_SHOP_ID = "shop-1";

const HERO_IMAGE_SHOP_1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDlfvP9AHRxufYzsxi8Lcp8V5QVFdfuY_OOdMudD3zWaQXwGcswybCcNO-b0bATSWfR-YjaIGX12J0Ql4UM_YEROX5pHqkr36Dx9UWh6m2EY16OHc78hnGh-BWiKv3KBZGLjtB3s8kG0wBU6Ggoz8vFjDnvvOk7i9oekCgJB0lhJLcKI8yRdYNsOCKEV7ZiyGWK-6Fu2fk33bylvNA9A3m7eu6HSbqMRSVsH1ZenkA3Z4sYK8h_9Dp3rS4Wxncd-ab7IRnA3hRDWiM";

const ABOUT_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.";

export const DEMO_SHOP_PROFILES: Record<string, ShopProfile> = {
  "shop-1": {
    id: "shop-1",
    name: "Barbarella Inova",
    isOpen: true,
    address: "6993 Meadow Valley Terrace, New York",
    rating: 4.8,
    reviewCount: 3279,
    phone: "(406) 555-0120",
    about: ABOUT_TEXT,
    heroImages: [HERO_IMAGE_SHOP_1, HERO_IMAGE_SHOP_1, HERO_IMAGE_SHOP_1, HERO_IMAGE_SHOP_1],
    specialists: [
      {
        id: "specialist-1",
        name: "Nathan",
        role: "Sr. Barber",
        avatarUri:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBQDLGiD2Em2s487zHhI80EahnTS2fOk4NC2iNWtQ7sIip4APTkJpc7zvriTHwmZiRrX9RFAUhBUZZlLA3w2z5_A-9eM_EsBVyMynlY1yRKAgwxmcRbKnEWGe-ygOtBQ8NSb2wnUoE0sTsOsUy3cFQc4ob3AfQq33rrOOxFPQsVQMogNot1xl6-U7GXEi2qqsKbQpKCTpsCR5TgiKtgRz_C7UxfAVdvsjC14s-H1PNeWBwjf4zCj30dt4cYaADHG5LLN-JDt-df-S8",
      },
      {
        id: "specialist-2",
        name: "Jenny",
        role: "Hair Stylist",
        avatarUri:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBbkU7EK1b3puHy8lQDz_kg6czWJwb1k4LzJjqKIDOqH1WK5g-m_WGwwN4MrKEvPx0UcmCI5S4p6alonY6lvYBCD8ejxh9sXjClL9ov7xak3VYn46d40i-0V3de8kmOiMJWJuEHDTTRBbi5XPNzxSgYLYWfWJpB5AN46HaJrG67kl7amKIiAucrBvGyYWzJxhrRq9HgB5q4heH12l4Rg0-mv0afC8Noi1nS_Z8fy4v98TpM1B9jm1UxCjwJqlCDHgiIv3ZSASmXZ3c",
      },
      {
        id: "specialist-3",
        name: "Sarah",
        role: "Makeup Artist",
        avatarUri:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA99TgGkSkm3TctuT2OYBz13GzJrOJITZHzSGxwfbsj9AMvNn4SOaDGWj3rIckWFnRAustWqmkJXYVxmCmdopfm2LMTx0mINIG3tlQvCY5vQ51En7x6Gds-9vgZeZMTY4R-J9x8mCr_lO_Ti5vV-zYOzP-_PQ4yTa3h1ssoKI-gn4W7E8jXlHV6IK9g0b_CfR4Rhqosi-UPScQ3xNxDFtjG8NaswuH39G4oo2BbggWho43Vv7NJi9jTLO_Vliz7HieBVdlO0EFWkIA",
      },
    ],
    workingHours: [
      { label: "Monday - Friday", hours: "08:00 AM - 21:00 PM" },
      { label: "Saturday - Sunday", hours: "10:00 AM - 20:00 PM" },
    ],
    serviceCategories: DEFAULT_SERVICE_CATEGORIES,
    packages: DEFAULT_SHOP_PACKAGES,
    latitude: 9.06134290550408,
    longitude: 76.60384121258556,
  },
  "shop-2": {
    id: "shop-2",
    name: "StyleQuest Riverside",
    isOpen: true,
    address: "214 Riverside Avenue, New York",
    rating: 4.6,
    reviewCount: 1842,
    phone: "(406) 555-0199",
    about: ABOUT_TEXT,
    heroImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC28AGCzU2tUPxlZFtXvTqd8PCRnMmDzNwrDh2_ZcgtSfbMkz9tDaU2XhITYerKBh9phjsyXkSivrkX18LW0jBo3-csyGgQrdhe0Jy_GfRLVMlGrlAoc6Yl48Qs2nKaR9MRaYBVeTgn0zQeByyuZIbzdrwhDS5rE-HfmwnP_Cmp8EBc4E2uGNhcZlekjDLwzJSY_Ff6lfN712_VIg1q5vEo52uzhHpWsEpZjuDhJVwVs4h_1utj49NZGUz4EMDHa_XMimQOSmV5fgU",
    ],
    specialists: [
      {
        id: "specialist-4",
        name: "Julian R.",
        role: "Fades & Braids",
        avatarUri:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuB0J_ennBdCX3ZxSYzNR_apWduJ6mYE_fHQpTO4dryWfJMQvDFe3rc3yDSRv1rkpabUcZyx_OfVPjoZps16Dt_yADQ8V712XnI3jCNTv9pASgdR08zC2smhedOKzNZu51qacfnATWyUIQwqxeERHKvyMnnuQqGBMDaKaay8Hgjd6VZD_MNrVmLQftpN8HUaxDqGWfJjL6KdvMAxJRZ_VvSGpc8pjwbWSieAe3JveK3ST0D1y7XLEE92Cvn0n9Vf9ED0K4CokX7LIm8",
      },
    ],
    workingHours: [
      { label: "Monday - Friday", hours: "09:00 AM - 20:00 PM" },
      { label: "Saturday - Sunday", hours: "10:00 AM - 18:00 PM" },
    ],
    serviceCategories: DEFAULT_SERVICE_CATEGORIES,
    packages: DEFAULT_SHOP_PACKAGES,
    latitude: 9.053932123917786,
    longitude: 76.60018930639828,
  },
};

export const PROFILE_TAB_OPTIONS = [
  { id: "about", label: "About us" },
  { id: "services", label: "Services" },
  { id: "package", label: "Package" },
  { id: "gallery", label: "Gallery" },
] as const;

export type ProfileTabId = (typeof PROFILE_TAB_OPTIONS)[number]["id"];

export function getShopProfile(shopId: string): ShopProfile {
  return DEMO_SHOP_PROFILES[shopId] ?? DEMO_SHOP_PROFILES[DEFAULT_SHOP_ID]!;
}

export function getShopPackage(shopId: string, packageId: string): ShopPackage {
  const shop = getShopProfile(shopId);
  const match = shop.packages.find((pkg) => pkg.id === packageId);
  return match ?? shop.packages[0]!;
}
