import { useCallback, useEffect, useState } from "react";
import { AppState, type AppStateStatus } from "react-native";
import * as Location from "expo-location";
import type { MapCoordinate } from "@/config/map";

export type DiscoverLocationError =
  | "permission_denied"
  | "services_disabled"
  | "position_unavailable"
  | null;

export interface DiscoverMapLocationState {
  userCoordinate: MapCoordinate | null;
  /** Permission granted and a GPS fix was obtained. */
  isLocationEnabled: boolean;
  /** Permission granted — enables native user dot on the map. */
  canShowUserLocation: boolean;
  permissionStatus: Location.PermissionStatus;
  locationError: DiscoverLocationError;
  retryLocation: () => void;
}

async function resolveForegroundPermissionStatus(): Promise<Location.PermissionStatus> {
  const existing = await Location.getForegroundPermissionsAsync();

  if (existing.status !== Location.PermissionStatus.GRANTED) {
    await Location.requestForegroundPermissionsAsync();
  }

  const { status } = await Location.getForegroundPermissionsAsync();
  return status;
}

export function useDiscoverMapLocation(): DiscoverMapLocationState {
  const [userCoordinate, setUserCoordinate] = useState<MapCoordinate | null>(
    null,
  );
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [canShowUserLocation, setCanShowUserLocation] = useState(false);
  const [permissionStatus, setPermissionStatus] =
    useState<Location.PermissionStatus>(Location.PermissionStatus.UNDETERMINED);
  const [locationError, setLocationError] =
    useState<DiscoverLocationError>(null);
  const [retryCount, setRetryCount] = useState(0);

  const retryLocation = useCallback((): void => {
    setRetryCount((count) => count + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const syncPermissionState = (status: Location.PermissionStatus): boolean => {
      setPermissionStatus(status);
      const permissionGranted =
        status === Location.PermissionStatus.GRANTED;
      setCanShowUserLocation(permissionGranted);
      return permissionGranted;
    };

    const fetchPosition = async (): Promise<void> => {
      const servicesEnabled = await Location.hasServicesEnabledAsync();

      if (!isMounted) {
        return;
      }

      if (!servicesEnabled) {
        setIsLocationEnabled(false);
        setUserCoordinate(null);
        setLocationError("services_disabled");
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      if (!isMounted) {
        return;
      }

      setUserCoordinate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setIsLocationEnabled(true);
      setLocationError(null);
    };

    const resolveLocation = async (shouldRequest: boolean): Promise<void> => {
      try {
        setLocationError(null);

        const status = shouldRequest
          ? await resolveForegroundPermissionStatus()
          : (await Location.getForegroundPermissionsAsync()).status;

        if (!isMounted) {
          return;
        }

        const permissionGranted = syncPermissionState(status);

        if (!permissionGranted) {
          setIsLocationEnabled(false);
          setUserCoordinate(null);
          setLocationError("permission_denied");
          return;
        }

        await fetchPosition();
      } catch {
        if (!isMounted) {
          return;
        }

        setIsLocationEnabled(false);
        setUserCoordinate(null);
        setLocationError("position_unavailable");
      }
    };

    void resolveLocation(true);

    const handleAppStateChange = (nextState: AppStateStatus): void => {
      if (nextState === "active") {
        void resolveLocation(false);
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, [retryCount]);

  return {
    userCoordinate,
    isLocationEnabled,
    canShowUserLocation,
    permissionStatus,
    locationError,
    retryLocation,
  };
}
