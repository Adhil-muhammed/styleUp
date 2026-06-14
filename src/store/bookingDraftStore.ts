import { create } from "zustand";
import type { BookBarberSummary } from "@/data/bookMock";
import { mapDiscoverServiceToBookId } from "@/utils/mapDiscoverToBookDraft";

export interface BookingDraft {
  shopPinId: string | null;
  barber: BookBarberSummary;
  discoverServiceId: string;
  bookServiceId: string;
  timeFilterId: string;
  profileId: string;
  paymentId: string;
}

export interface SetDraftFromDiscoverInput {
  shopPinId: string | null;
  barber: BookBarberSummary;
  discoverServiceId: string;
  timeFilterId: string;
  profileId: string;
  paymentId: string;
}

export interface BookingDraftStoreState {
  draft: BookingDraft | null;
}

export interface BookingDraftStoreActions {
  setDraftFromDiscover: (input: SetDraftFromDiscoverInput) => void;
  setSelectedShopPin: (shopPinId: string, barber: BookBarberSummary) => void;
  clearDraft: () => void;
}

export type BookingDraftStore = BookingDraftStoreState & BookingDraftStoreActions;

export const useBookingDraftStore = create<BookingDraftStore>()((set, get) => ({
  draft: null,

  setDraftFromDiscover: (input: SetDraftFromDiscoverInput): void => {
    const bookServiceId = mapDiscoverServiceToBookId(input.discoverServiceId);

    set({
      draft: {
        shopPinId: input.shopPinId,
        barber: input.barber,
        discoverServiceId: input.discoverServiceId,
        bookServiceId,
        timeFilterId: input.timeFilterId,
        profileId: input.profileId,
        paymentId: input.paymentId,
      },
    });
  },

  setSelectedShopPin: (shopPinId: string, barber: BookBarberSummary): void => {
    const currentDraft = get().draft;

    if (currentDraft === null) {
      return;
    }

    set({
      draft: {
        ...currentDraft,
        shopPinId,
        barber,
      },
    });
  },

  clearDraft: (): void => {
    set({ draft: null });
  },
}));
