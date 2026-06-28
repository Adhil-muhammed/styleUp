import "../global.css"; // NativeWind — must be imported at the application root
import React, { createContext, useContext, useEffect } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import * as SplashScreen from "expo-splash-screen";
import { useTheme } from "./hooks/useTheme";
import RootNavigator from "./navigation/RootNavigator";
import "@/store/settingsStore";
import type { Theme, AppTheme } from "./config/theme";

// ─── Theme Context ─────────────────────────────────────────────────────────────

export interface ThemeContextValue {
  theme: Theme;
  themePreference: AppTheme;
  setTheme: (theme: AppTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Consume the active theme from anywhere in the component tree.
 * Throws if used outside of a ThemeProvider.
 */
export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error(
      "useThemeContext must be used inside a <ThemeProvider>. " +
        "Ensure your component is rendered beneath the root App component.",
    );
  }
  return ctx;
}

// ─── ThemeProvider ────────────────────────────────────────────────────────────

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeValue = useTheme();

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

SplashScreen.preventAutoHideAsync();

// ─── Root App Component ────────────────────────────────────────────────────────
//
// Provider order (outermost → innermost):
//   BottomSheetModalProvider  — portal host for Gorhom bottom sheets above native views
//     SafeAreaProvider          — native safe area insets (must wrap NavigationContainer)
//       ThemeProvider           — active theme tokens via React Context
//         NavigationContainer   — React Navigation root
//           RootNavigator       — auth-gated navigation tree

const App: React.FC = () => {
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <ThemeProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </ThemeProvider>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
