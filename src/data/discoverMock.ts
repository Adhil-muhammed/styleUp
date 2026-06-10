// ─── Discover Screen Mock Data (sourced from .html prototype) ─────────────────

export type MapPinVariant = "primary" | "accent";

export interface MapPinData {
  id: string;
  name?: string;
  avatarUri: string;
  label: string;
  variant: MapPinVariant;
  latitude: number;
  longitude: number;
  size: number;
}

export interface ServiceAreaCircle {
  id: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
}

/** Demo stand-in for future DB/API fetch */
export const DEMO_SERVICE_AREA_CIRCLES: ServiceAreaCircle[] = [
  {
    id: "area-1",
    latitude: 9.06134290550408,
    longitude: 76.60384121258556,
    radiusMeters: 400,
  },
  {
    id: "area-2",
    latitude: 9.053932123917786,
    longitude: 76.60018930639828,
    radiusMeters: 400,
  },
];

export interface FilterOption {
  id: string;
  label: string;
}

export type BarberCardVariant = "featured" | "standard";

export interface BarberCardData {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  nextSlot: string;
  nextSlotHighlight?: boolean;
  ctaLabel: string;
  avatarUri?: string;
  variant: BarberCardVariant;
}

export const USER_AVATAR_URI =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDBvxU8uoOdFWHa2dxmQpTrDIh97vihqNiqMVlRGucRcfSntY8TR4OjhueYTWMJvZG6HTvcFtfNvHGECNMssTaUZ3qe5dcenPHH2nqDDsnX2fLw8wPyDhyY0y09rh4V_3cJtGfeREmymNVA7n-jATqSAxkR8UitZQ_o8TYo1epvg61lrhnAptfARCNbOMquiQUHc6JX42rzavXMFB2TAnXmRoldvWYbaKS9ByoRo_lRiwnY_IKgZKrNocY7Y0Ye_xct2CTP0IjEFMU";

/** Demo barber shops — stand-in for future DB/API fetch (Kerala demo area). */
export const DEMO_MAP_SHOPS: MapPinData[] = [
  {
    id: "shop-1",
    name: "StyleQuest Barber — Central",
    avatarUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_P62rMQpF4Xq17wHOXrvrqK9QaAmGEnokmHSzGEueJHFhPrpJtAxcy2FIFiFRiv-ycolfz_nHQ5h3DXjPRoq4V57bumOjywu2xX22FlaXUkQKXcxE57VXr8nZLOq_VYDqRy7yp3aLziurBVg_tqSTJxw1hICrth1F1GbEtTu3yOYt7q6AE8-AKUg91ndHvP1xyFS6_6p-j3Qnz6ZZ8R9Gued_ckEm4uvrPPgfwd8dP6bGPDvJTezXR4d12qElorxewMwTahGJtkM",
    label: "$45",
    variant: "primary",
    latitude: 9.06134290550408,
    longitude: 76.60384121258556,
    size: 48,
  },
  {
    id: "shop-2",
    name: "StyleQuest Barber — Riverside",
    avatarUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC28AGCzU2tUPxlZFtXvTqd8PCRnMmDzNwrDh2_ZcgtSfbMkz9tDaU2XhITYerKBh9phjsyXkSivrkX18LW0jBo3-csyGgQrdhe0Jy_GfRLVMlGrlAoc6Yl48Qs2nKaR9MRaYBVeTgn0zQeByyuZIbzdrwhDS5rE-HfmwnP_Cmp8EBc4E2uGNhcZlekjDLwzJSY_Ff6lfN712_VIg1q5vEo52uzhHpWsEpZjuDhJVwVs4h_1utj49NZGUz4EMDHa_XMimQOSmV5fgU",
    label: "Promo",
    variant: "accent",
    latitude: 9.053932123917786,
    longitude: 76.60018930639828,
    size: 40,
  },
];

/** @deprecated Use DEMO_MAP_SHOPS */
export const MAP_PINS = DEMO_MAP_SHOPS;

export const FILTER_OPTIONS: FilterOption[] = [
  { id: "all", label: "All" },
  { id: "fades", label: "Fades" },
  { id: "curly", label: "Curly" },
  { id: "locs", label: "Locs" },
  { id: "beard", label: "Beard" },
];

export const BARBER_CARDS: BarberCardData[] = [
  {
    id: "card-1",
    name: "Marcus T.",
    specialty: "Master Barber • 1.2 mi",
    rating: 4.9,
    nextSlot: "Today, 4:30 PM",
    nextSlotHighlight: true,
    ctaLabel: "Book Now",
    avatarUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwY5fvNuO9KKgoZx_1AVDvB6vZWpr7zLm82SGXvLR-r9ka-dCMkFoJUugAo-p7JMXrXsh86sf1xyjDkpAqt9BYC6mms3bfLGjPyjmKoCAaZB5y4-GwRQOU8nhtGHdmJQLQJmBngy1XuadQ6mVnpeIAUn_L-w9RtPlAcv-ZWq6Ie3gbG7YDF61Rpc8s2osyPIdXCajJrew-5N2XvUMi0UxKB1lNO8L4Q1touAOJLe2pu7j4qFOlDNMSTMu_pznREprYJ0N6MYm6JY0",
    variant: "featured",
  },
  {
    id: "card-2",
    name: "Julian R.",
    specialty: "Fades & Braids • 2.5 mi",
    rating: 4.8,
    nextSlot: "Tomorrow, 10:00 AM",
    ctaLabel: "View Profile",
    avatarUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0J_ennBdCX3ZxSYzNR_apWduJ6mYE_fHQpTO4dryWfJMQvDFe3rc3yDSRv1rkpabUcZyx_OfVPjoZps16Dt_yADQ8V712XnI3jCNTv9pASgdR08zC2smhedOKzNZu51qacfnATWyUIQwqxeERHKvyMnnuQqGBMDaKaay8Hgjd6VZD_MNrVmLQftpN8HUaxDqGWfJjL6KdvMAxJRZ_VvSGpc8pjwbWSieAe3JveK3ST0D1y7XLEE92Cvn0n9Vf9ED0K4CokX7LIm8",
    variant: "standard",
  },
  {
    id: "card-3",
    name: "Elias K.",
    specialty: "Beard Specialist • 3.1 mi",
    rating: 4.7,
    nextSlot: "Thurs, 1:15 PM",
    ctaLabel: "View Profile",
    variant: "standard",
  },
];

export const BARBER_CARD_WIDTH = 300;

// ─── Booking Bottom Sheet Mock Data ───────────────────────────────────────────

export interface BarberServiceOption {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  price: string;
  imageUri?: string;
}

export interface BookingQuickFilterOption {
  id: string;
  label: string;
  icon: "schedule" | "person" | "payments" | "credit-card";
}

export const BOOKING_SERVICES: BarberServiceOption[] = [
  {
    id: "service-1",
    title: "Master Haircut",
    subtitle: "12 mins away • Today, 4:30 PM",
    badge: "Faster",
    price: "$45",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwY5fvNuO9KKgoZx_1AVDvB6vZWpr7zLm82SGXvLR-r9ka-dCMkFoJUugAo-p7JMXrXsh86sf1xyjDkpAqt9BYC6mms3bfLGjPyjmKoCAaZB5y4-GwRQOU8nhtGHdmJQLQJmBngy1XuadQ6mVnpeIAUn_L-w9RtPlAcv-ZWq6Ie3gbG7YDF61Rpc8s2osyPIdXCajJrew-5N2XvUMi0UxKB1lNO8L4Q1touAOJLe2pu7j4qFOlDNMSTMu_pznREprYJ0N6MYm6JY0",
  },
  {
    id: "service-2",
    title: "Fade & Braids",
    subtitle: "18 mins away • Tomorrow, 10:00 AM",
    price: "$38",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0J_ennBdCX3ZxSYzNR_apWduJ6mYE_fHQpTO4dryWfJMQvDFe3rc3yDSRv1rkpabUcZyx_OfVPjoZps16Dt_yADQ8V712XnI3jCNTv9pASgdR08zC2smhedOKzNZu51qacfnATWyUIQwqxeERHKvyMnnuQqGBMDaKaay8Hgjd6VZD_MNrVmLQftpN8HUaxDqGWfJjL6KdvMAxJRZ_VvSGpc8pjwbWSieAe3JveK3ST0D1y7XLEE92Cvn0n9Vf9ED0K4CokX7LIm8",
  },
  {
    id: "service-3",
    title: "Beard Trim",
    subtitle: "22 mins away • Thurs, 1:15 PM",
    price: "$28",
  },
  {
    id: "service-4",
    title: "Line Up & Shape",
    subtitle: "8 mins away • Today, 6:00 PM",
    badge: "Popular",
    price: "$35",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_P62rMQpF4Xq17wHOXrvrqK9QaAmGEnokmHSzGEueJHFhPrpJtAxcy2FIFiFRiv-ycolfz_nHQ5h3DXjPRoq4V57bumOjywu2xX22FlaXUkQKXcxE57VXr8nZLOq_VYDqRy7yp3aLziurBVg_tqSTJxw1hICrth1F1GbEtTu3yOYt7q6AE8-AKUg91ndHvP1xyFS6_6p-j3Qnz6ZZ8R9Gued_ckEm4uvrPPgfwd8dP6bGPDvJTezXR4d12qElorxewMwTahGJtkM",
  },
];

export const BOOKING_TIME_FILTERS: BookingQuickFilterOption[] = [
  { id: "now", label: "Pickup now", icon: "schedule" },
  { id: "schedule", label: "Schedule", icon: "schedule" },
];

export const BOOKING_PROFILE_FILTERS: BookingQuickFilterOption[] = [
  { id: "me", label: "For me", icon: "person" },
  { id: "guest", label: "Someone else", icon: "person" },
];

export const PAYMENT_METHODS: BookingQuickFilterOption[] = [
  { id: "cash", label: "Cash", icon: "payments" },
  { id: "card", label: "Card", icon: "credit-card" },
];
