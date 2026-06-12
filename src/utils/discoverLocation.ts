import * as Location from "expo-location";
import { DISCOVER_MAP_REGION } from "@/config/map";
import type { MapCoordinate } from "@/config/map";

export const DEFAULT_DISCOVER_REGION = DISCOVER_MAP_REGION;

export const LOCATION_FETCH_TIMEOUT_MS = 10_000;

export type DiscoverLocationState =
  | "idle"
  | "checking"
  | "requesting"
  | "granted"
  | "denied"
  | "blocked"
  | "error"
  | "services_disabled";

/** Signals the caller should fetch device position after permission is granted. */
export type PermissionResolveResult = DiscoverLocationState | "fetch";

export interface PermissionSessionFlag {
  hasRequested: boolean;
}

export interface ResolvePermissionOptions {
  shouldAutoRequest: boolean;
  allowDeniedRetryRequest: boolean;
  sessionFlag: PermissionSessionFlag;
  onRequesting?: () => void;
}

export class LocationFetchTimeoutError extends Error {
  constructor() {
    super("LOCATION_FETCH_TIMEOUT");
    this.name = "LocationFetchTimeoutError";
  }
}

export function mapPermissionToState(
  status: Location.PermissionStatus,
  canAskAgain: boolean,
): PermissionResolveResult {
  if (status === Location.PermissionStatus.GRANTED) {
    return "fetch";
  }

  if (status === Location.PermissionStatus.UNDETERMINED) {
    return "idle";
  }

  if (status === Location.PermissionStatus.DENIED) {
    return canAskAgain ? "denied" : "blocked";
  }

  return "denied";
}

export async function resolvePermissionStatus(
  options: ResolvePermissionOptions,
): Promise<Location.LocationPermissionResponse> {
  let response = await Location.getForegroundPermissionsAsync();

  const shouldRequestUndetermined =
    response.status === Location.PermissionStatus.UNDETERMINED &&
    options.shouldAutoRequest &&
    !options.sessionFlag.hasRequested;

  const shouldRequestDeniedRetry =
    response.status === Location.PermissionStatus.DENIED &&
    options.allowDeniedRetryRequest &&
    response.canAskAgain;

  if (shouldRequestUndetermined) {
    options.sessionFlag.hasRequested = true;
    options.onRequesting?.();
    await Location.requestForegroundPermissionsAsync();
  } else if (shouldRequestDeniedRetry) {
    options.onRequesting?.();
    await Location.requestForegroundPermissionsAsync();
  }

  response = await Location.getForegroundPermissionsAsync();
  return response;
}

export async function getCurrentPositionWithTimeout(
  timeoutMs: number = LOCATION_FETCH_TIMEOUT_MS,
): Promise<Location.LocationObject> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new LocationFetchTimeoutError());
    }, timeoutMs);
  });

  try {
    return await Promise.race([
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      }),
      timeoutPromise,
    ]);
  } finally {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  }
}

export function toMapCoordinate(
  position: Location.LocationObject,
): MapCoordinate {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
}
