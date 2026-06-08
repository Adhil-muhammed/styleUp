// ─── Discover Screen Mock Data (sourced from .html prototype) ─────────────────

export type MapPinVariant = "primary" | "accent";

export interface MapPinData {
  id: string;
  avatarUri: string;
  label: string;
  variant: MapPinVariant;
  topPercent: number;
  leftPercent: number;
  size: number;
}

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

export const MAP_IMAGE_URI =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAbvdeImz3Xrc1KvDME_BIHJUjt0ndoMt9jQg9-LSNt4uv8Xkhzkga-sg-pJol11xFOqgdRvT9MvGAsfCl2xcSMn7DvIVJ55AAOVFGf-x7UwfDbUCLldWlWOQDPwtpcS6gXD0w_lkqJdxgrb1122MLMvrdDI5VBi5yP6YuNiZgxaX4mHlNJpg6Ty5koXbl1NOx-d0YL-F-tl3S2y1jWGgciuYfp_JCC7IM6_k9xDEfnXolwobQ7DLQbC6T_f00LhZXVKzn8EspnjV8";

export const USER_AVATAR_URI =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDBvxU8uoOdFWHa2dxmQpTrDIh97vihqNiqMVlRGucRcfSntY8TR4OjhueYTWMJvZG6HTvcFtfNvHGECNMssTaUZ3qe5dcenPHH2nqDDsnX2fLw8wPyDhyY0y09rh4V_3cJtGfeREmymNVA7n-jATqSAxkR8UitZQ_o8TYo1epvg61lrhnAptfARCNbOMquiQUHc6JX42rzavXMFB2TAnXmRoldvWYbaKS9ByoRo_lRiwnY_IKgZKrNocY7Y0Ye_xct2CTP0IjEFMU";

export const MAP_PINS: MapPinData[] = [
  {
    id: "pin-1",
    avatarUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_P62rMQpF4Xq17wHOXrvrqK9QaAmGEnokmHSzGEueJHFhPrpJtAxcy2FIFiFRiv-ycolfz_nHQ5h3DXjPRoq4V57bumOjywu2xX22FlaXUkQKXcxE57VXr8nZLOq_VYDqRy7yp3aLziurBVg_tqSTJxw1hICrth1F1GbEtTu3yOYt7q6AE8-AKUg91ndHvP1xyFS6_6p-j3Qnz6ZZ8R9Gued_ckEm4uvrPPgfwd8dP6bGPDvJTezXR4d12qElorxewMwTahGJtkM",
    label: "$45",
    variant: "primary",
    topPercent: 33,
    leftPercent: 25,
    size: 48,
  },
  {
    id: "pin-2",
    avatarUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC28AGCzU2tUPxlZFtXvTqd8PCRnMmDzNwrDh2_ZcgtSfbMkz9tDaU2XhITYerKBh9phjsyXkSivrkX18LW0jBo3-csyGgQrdhe0Jy_GfRLVMlGrlAoc6Yl48Qs2nKaR9MRaYBVeTgn0zQeByyuZIbzdrwhDS5rE-HfmwnP_Cmp8EBc4E2uGNhcZlekjDLwzJSY_Ff6lfN712_VIg1q5vEo52uzhHpWsEpZjuDhJVwVs4h_1utj49NZGUz4EMDHa_XMimQOSmV5fgU",
    label: "Promo",
    variant: "accent",
    topPercent: 50,
    leftPercent: 67,
    size: 40,
  },
];

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
