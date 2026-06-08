import { useUIStore } from "../store/uiStore";
import { themes } from "../config/theme";
import type { Theme, AppTheme } from "../config/theme";

// ─── Public Interface ─────────────────────────────────────────────────────────

export interface UseThemeReturn {
  theme: Theme;
  themePreference: AppTheme;
  setTheme: (theme: AppTheme) => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Returns the currently active theme object and a setter for switching themes.
 * This hook is the backing value source for the ThemeContext in App.tsx.
 */
export function useTheme(): UseThemeReturn {
  const themePreference = useUIStore((state) => state.themePreference);
  const setThemePreference = useUIStore((state) => state.setThemePreference);

  return {
    theme: themes[themePreference],
    themePreference,
    setTheme: setThemePreference,
  };
}
