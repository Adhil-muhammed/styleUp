import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/config/constants";
import { mmkvStorage } from "@/services/storage/mmkvStorage";
import {
  detectCurrencyFromLocale,
  detectLocaleFromDevice,
} from "@/utils/currency";

export interface SettingsStoreState {
  currency: string;
  locale: string;
}

interface SettingsStoreActions {
  setCurrency: (currency: string) => void;
  setLocale: (locale: string) => void;
}

export type SettingsStore = SettingsStoreState & SettingsStoreActions;

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      currency: detectCurrencyFromLocale(),
      locale: detectLocaleFromDevice(),

      setCurrency: (currency: string): void => {
        set({ currency: currency.toUpperCase() });
      },

      setLocale: (locale: string): void => {
        set({ locale });
      },
    }),
    {
      name: STORAGE_KEYS.SETTINGS,
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
