import { useCallback, useEffect, useRef, useState } from "react";
import {
  AppState,
  Linking,
  Platform,
  type AppStateStatus,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as IntentLauncher from "expo-intent-launcher";
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
          onRequesting: () => {
            if (
              isMountedRef.current &&
              generation === syncGenerationRef.current
            ) {
              setLocationState("requesting");
            }
          },
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
          setUserLocation(null);
          setLocationState("services_disabled");

          if (Platform.OS === "android") {
            try {
              await Location.enableNetworkProviderAsync();

              if (
                !isMountedRef.current ||
                generation !== syncGenerationRef.current
              ) {
                return;
              }

              void syncLocation(true, false);
              return;
            } catch {
              try {
                await IntentLauncher.startActivityAsync(
                  IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS,
                );
              } catch (intentError: unknown) {
                console.warn(
                  "[useDiscoverLocation] Failed to open location settings:",
                  intentError,
                );
              }
              return;
            }
          }

          if (Platform.OS === "ios") {
            try {
              await Linking.openSettings();
            } catch (settingsError: unknown) {
              console.warn(
                "[useDiscoverLocation] Failed to open settings:",
                settingsError,
              );
            }
          }

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

        console.warn(
          "[useDiscoverLocation] Failed to resolve location:",
          error,
        );
        setUserLocation(null);
        setLocationState("error");
      }
    },
    [],
  );

  const retryLocation = useCallback((): void => {
    sessionPermissionRequest.hasRequested = false;
    isManualRetryRef.current = true;
    setRetryCount((count) => count + 1);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const timerId = setTimeout(() => {
        void syncLocation(true, false);
      }, 300);

      return () => {
        clearTimeout(timerId);
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
