import AsyncStorage from "@react-native-async-storage/async-storage";
import type { StorageKey } from "../../config/constants";

// ─── Typed AsyncStorage Wrappers ───────────────────────────────────────────────
// All keys are constrained to the STORAGE_KEYS const to prevent magic strings.

/**
 * Retrieves and JSON-parses a value from AsyncStorage.
 * Returns null if the key is absent or parsing fails.
 */
export async function getItem<T>(key: StorageKey): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/**
 * JSON-serialises a value and writes it to AsyncStorage.
 */
export async function setItem<T>(key: StorageKey, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage write failures are non-critical in a mobile context; silently absorb.
  }
}

/**
 * Removes a single keyed entry from AsyncStorage.
 */
export async function removeItem(key: StorageKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // Non-critical; silently absorb.
  }
}

/**
 * Clears all AsyncStorage data for this application.
 * Use with caution — this will wipe all persisted state including Zustand stores.
 */
export async function clearAll(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch {
    // Non-critical; silently absorb.
  }
}
