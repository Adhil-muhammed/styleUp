import {
  useAuthStore,
  type AuthUserUpdate,
  type PostAuthInitialTab,
} from "../store/authStore";
import type { User } from "../types";
import type { AuthTokenPair } from "../types/api";

// ─── Public Interface ─────────────────────────────────────────────────────────

export interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  /** True once Zustand persist has finished rehydrating from AsyncStorage */
  isHydrated: boolean;
  postAuthInitialTab: PostAuthInitialTab;
  login: (user: User, tokens: AuthTokenPair) => void;
  logout: () => void;
  updateUser: (updates: AuthUserUpdate) => void;
  setPostAuthInitialTab: (tab: PostAuthInitialTab) => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Provides a clean interface to the auth store.
 * Use this hook in components instead of accessing useAuthStore directly.
 */
export function useAuth(): UseAuthReturn {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const postAuthInitialTab = useAuthStore((state) => state.postAuthInitialTab);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const updateUser = useAuthStore((state) => state.updateUser);
  const setPostAuthInitialTab = useAuthStore(
    (state) => state.setPostAuthInitialTab,
  );

  return {
    user,
    isAuthenticated,
    isHydrated,
    postAuthInitialTab,
    login: setAuth,
    logout: clearAuth,
    updateUser,
    setPostAuthInitialTab,
  };
}
