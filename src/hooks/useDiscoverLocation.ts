import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, type AppStateStatus } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import type { MapCoordinate } from "@/config/map";
import {
  getCurrentPositionWithTimeout,
  mapPermissionToState,
  resolvePermissionStatus,
  toMapCoordinate,
  type DiscoverLocationState,
  type PermissionSessionFlag,
} from "@/utils/discoverLocation";

export type { DiscoverLocationState };

export interface DiscoverLocationResult {
  locationState: DiscoverLocationState;
  userLocation: MapCoordinate | null;
  canShowUserLocation: boolean;
  retryLocation: () => void;
}

const sessionPermissionRequest: PermissionSessionFlag = { hasRequested: false };

export function useDiscoverLocation(): DiscoverLocationResult {
  const [locationState, setLocationState] =
    useState<DiscoverLocationState>("idle");
  const [userLocation, setUserLocation] = useState<MapCoordinate | null>(null);
  const [canShowUserLocation, setCanShowUserLocation] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const isManualRetryRef = useRef(false);
  const syncGenerationRef = useRef(0);
  const isMountedRef = useRef(true);

  const syncLocation = useCallback(
    async (
      shouldAutoRequest: boolean,
      allowDeniedRetryRequest: boolean,
    ): Promise<void> => {
      const generation = ++syncGenerationRef.current;

      if (!isMountedRef.current) {
        return;
      }

      setLocationState("checking");

      try {
        const permission = await resolvePermissionStatus({
          shouldAutoRequest,
          allowDeniedRetryRequest,
          sessionFlag: sessionPermissionRequest,
        });

        if (!isMountedRef.current || generation !== syncGenerationRef.current) {
          return;
        }

        const permissionGranted =
          permission.status === Location.PermissionStatus.GRANTED;
        setCanShowUserLocation(permissionGranted);

        const permissionState = mapPermissionToState(
          permission.status,
          permission.canAskAgain,
        );

        if (permissionState !== "fetch") {
          setUserLocation(null);
          setLocationState(permissionState);
          return;
        }

        const servicesEnabled = await Location.hasServicesEnabledAsync();

        if (!isMountedRef.current || generation !== syncGenerationRef.current) {
          return;
        }

        if (!servicesEnabled) {
          console.warn(
            "[useDiscoverLocation] Location services disabled on device.",
          );
          setUserLocation(null);
          setLocationState("error");
          return;
        }

        const position = await getCurrentPositionWithTimeout();

        if (!isMountedRef.current || generation !== syncGenerationRef.current) {
          return;
        }

        setUserLocation(toMapCoordinate(position));
        setLocationState("granted");
      } catch (error: unknown) {
        if (!isMountedRef.current || generation !== syncGenerationRef.current) {
          return;
        }

        console.warn("[useDiscoverLocation] Failed to resolve location:", error);
        setUserLocation(null);
        setLocationState("error");
      }
    },
    [],
  );

  const retryLocation = useCallback((): void => {
    isManualRetryRef.current = true;
    setRetryCount((count) => count + 1);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void syncLocation(true, false);

      return () => {
        syncGenerationRef.current += 1;
      };
    }, [syncLocation]),
  );

  useEffect(() => {
    if (retryCount === 0) {
      return;
    }

    const allowDeniedRetry = isManualRetryRef.current;
    isManualRetryRef.current = false;
    void syncLocation(true, allowDeniedRetry);
  }, [retryCount, syncLocation]);

  useEffect(() => {
    isMountedRef.current = true;

    const handleAppStateChange = (nextState: AppStateStatus): void => {
      if (nextState === "active") {
        void syncLocation(false, false);
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    return () => {
      isMountedRef.current = false;
      syncGenerationRef.current += 1;
      subscription.remove();
    };
  }, [syncLocation]);

  return {
    locationState,
    userLocation,
    canShowUserLocation,
    retryLocation,
  };
}
