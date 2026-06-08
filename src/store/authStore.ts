import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User } from "../types";
import type { AuthTokenPair } from "../types/api";
import { STORAGE_KEYS } from "../config/constants";

// ─── State & Action Interfaces ────────────────────────────────────────────────

export interface AuthStoreState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  /**
   * True once Zustand persist has finished rehydrating from AsyncStorage.
   * Always starts as false; flipped to true by onRehydrateStorage callback.
   */
  isHydrated: boolean;
}

interface AuthStoreActions {
  setAuth: (user: User, tokens: AuthTokenPair) => void;
  clearAuth: () => void;
  setHydrated: (hydrated: boolean) => void;
}

export type AuthStore = AuthStoreState & AuthStoreActions;

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: AuthStoreState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isHydrated: false,
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      setAuth: (user: User, tokens: AuthTokenPair) =>
        set({
          user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
        }),

      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),
    }),
    {
      name: STORAGE_KEYS.AUTH_TOKEN,
      storage: createJSONStorage(() => AsyncStorage),

      // Flip isHydrated after persist finishes reading from AsyncStorage
      onRehydrateStorage: (_currentState) => (rehydratedState, error) => {
        if (error) {
          console.error("[StyleQuest] Auth store rehydration error:", error);
        }
        rehydratedState?.setHydrated(true);
      },

      // Only persist auth credentials — isHydrated must always start as false
      partialize: (state): Omit<AuthStoreState, "isHydrated"> => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
