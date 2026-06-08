import { create } from "zustand";
import type { ModalType } from "../types";
import type { AppTheme } from "../config/theme";

// ─── State & Action Interfaces ────────────────────────────────────────────────

export interface UIStoreState {
  isAppLoading: boolean;
  activeModal: ModalType | null;
  themePreference: AppTheme;
}

interface UIStoreActions {
  setAppLoading: (loading: boolean) => void;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  setThemePreference: (theme: AppTheme) => void;
}

export type UIStore = UIStoreState & UIStoreActions;

// ─── Store ────────────────────────────────────────────────────────────────────

export const useUIStore = create<UIStore>()((set) => ({
  // State
  isAppLoading: false,
  activeModal: null,
  themePreference: "midnight",

  // Actions
  setAppLoading: (loading: boolean) => set({ isAppLoading: loading }),
  openModal: (modal: ModalType) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
  setThemePreference: (theme: AppTheme) => set({ themePreference: theme }),
}));
