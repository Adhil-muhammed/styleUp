import { create } from "zustand";
import { BOOK_TIME_SLOTS } from "@/data/bookMock";
import type { BookBarberSummary } from "@/data/bookMock";
import { mapDiscoverServiceToBookId } from "@/utils/mapDiscoverToBookDraft";
import { startOfToday, toYMD } from "@/utils/bookingCalendar";

export interface BookingDraft {
  shopPinId: string | null;
  barber: BookBarberSummary;
  discoverServiceId: string;
  bookServiceId: string;
  timeFilterId: string;
  profileId: string;
  paymentId: string;
  selectedDateYmd: string;
  selectedTimeId: string;
  selectedSpecialistId: string;
  selectedVariants: Record<string, string>;
}

export interface SetDraftFromDiscoverInput {
  shopPinId: string | null;
  barber: BookBarberSummary;
  discoverServiceId: string;
  timeFilterId: string;
  profileId: string;
  paymentId: string;
}

export interface SetAppointmentDetailsInput {
  selectedDateYmd: string;
  selectedTimeId: string;
  selectedSpecialistId: string;
}

export interface BookingDraftStoreState {
  draft: BookingDraft | null;
}

export interface BookingDraftStoreActions {
  setDraftFromDiscover: (input: SetDraftFromDiscoverInput) => void;
  setSelectedShopPin: (shopPinId: string, barber: BookBarberSummary) => void;
  setAppointmentDetails: (input: SetAppointmentDetailsInput) => void;
  setPaymentId: (paymentId: string) => void;
  setSelectedVariant: (categoryId: string, variantId: string) => void;
  clearDraft: () => void;
}

export type BookingDraftStore = BookingDraftStoreState & BookingDraftStoreActions;

const DEFAULT_TIME_SLOT_ID = BOOK_TIME_SLOTS[0]?.id ?? "";

function createDefaultAppointmentDetails(): SetAppointmentDetailsInput {
  return {
    selectedDateYmd: toYMD(startOfToday()),
    selectedTimeId: DEFAULT_TIME_SLOT_ID,
    selectedSpecialistId: "",
  };
}

export const useBookingDraftStore = create<BookingDraftStore>()((set, get) => ({
  draft: null,

  setDraftFromDiscover: (input: SetDraftFromDiscoverInput): void => {
    const bookServiceId = mapDiscoverServiceToBookId(input.discoverServiceId);
    const appointmentDefaults = createDefaultAppointmentDetails();

    set({
      draft: {
        shopPinId: input.shopPinId,
        barber: input.barber,
        discoverServiceId: input.discoverServiceId,
        bookServiceId,
        timeFilterId: input.timeFilterId,
        profileId: input.profileId,
        paymentId: input.paymentId,
        selectedVariants: {},
        ...appointmentDefaults,
      },
    });
  },

  setSelectedVariant: (categoryId: string, variantId: string): void => {
    const currentDraft = get().draft;

    if (currentDraft === null) {
      return;
    }

    set({
      draft: {
        ...currentDraft,
        selectedVariants: {
          ...currentDraft.selectedVariants,
          [categoryId]: variantId,
        },
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

  setAppointmentDetails: (input: SetAppointmentDetailsInput): void => {
    const currentDraft = get().draft;

    if (currentDraft === null) {
      return;
    }

    set({
      draft: {
        ...currentDraft,
        selectedDateYmd: input.selectedDateYmd,
        selectedTimeId: input.selectedTimeId,
        selectedSpecialistId: input.selectedSpecialistId,
      },
    });
  },

  setPaymentId: (paymentId: string): void => {
    const currentDraft = get().draft;

    if (currentDraft === null) {
      return;
    }

    set({
      draft: {
        ...currentDraft,
        paymentId,
      },
    });
  },

  clearDraft: (): void => {
    set({ draft: null });
  },
}));
