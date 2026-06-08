// ─── API ─────────────────────────────────────────────────────────────────────
export const API_BASE_URL = "https://api.stylequest.app/v1";

// ─── Storage Keys ─────────────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  AUTH_TOKEN: "@stylequest/auth_token",
  USER_PROFILE: "@stylequest/user_profile",
  THEME_PREFERENCE: "@stylequest/theme_preference",
  ONBOARDING_COMPLETE: "@stylequest/onboarding_complete",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

// ─── App Config ───────────────────────────────────────────────────────────────
export const APP_CONFIG = {
  REQUEST_TIMEOUT_MS: 15_000,
  MAX_RETRY_ATTEMPTS: 3,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEBOUNCE_DELAY_MS: 350,
  XP_ANIMATION_DURATION_MS: 800,
} as const;
