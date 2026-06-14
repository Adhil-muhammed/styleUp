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
  latitude: number;
  longitude: number;
}

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
