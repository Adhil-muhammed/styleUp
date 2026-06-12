import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import MapPin from "./MapPin";
import { useTheme } from "@/hooks/useTheme";
import {
  DISCOVER_MAP_REGION,
  MIDNIGHT_MAP_STYLE,
  type MapCoordinate,
} from "@/config/map";
import type { MapPinData, ServiceAreaCircle } from "@/data/discoverMock";

const MAP_FIT_EDGE_PADDING = {
  top: 80,
  right: 40,
  bottom: 120,
  left: 40,
} as const;

const USER_LOCATION_REGION_DELTA = 0.01;

export interface DiscoverMapHandle {
  recenterOnUser: () => void;
}

interface DiscoverMapProps {
  pins: MapPinData[];
  serviceAreas?: ServiceAreaCircle[];
  canShowUserLocation: boolean;
  isLocationChecking?: boolean;
  userCoordinate?: MapCoordinate | null;
  onMapPress?: () => void;
  onPinPress?: (pinId: string) => void;
}

const DiscoverMap = forwardRef<DiscoverMapHandle, DiscoverMapProps>(
  (
    {
      pins,
      serviceAreas = [],
      canShowUserLocation,
      isLocationChecking = false,
      userCoordinate,
      onMapPress,
      onPinPress,
    },
    ref,
  ): React.JSX.Element => {
    const { theme } = useTheme();
    const mapRef = useRef<MapView>(null);
    const mapReadyRef = useRef(false);
    const lastAnimatedCoordinateRef = useRef<MapCoordinate | null>(null);
    const userCoordinateRef = useRef<MapCoordinate | null>(
      userCoordinate ?? null,
    );

    useEffect(() => {
      userCoordinateRef.current = userCoordinate ?? null;
    }, [userCoordinate]);

    const animateToUserLocation = useCallback(
      (coordinate: MapCoordinate): void => {
        if (!mapReadyRef.current) {
          return;
        }

        try {
          mapRef.current?.animateToRegion(
            {
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: USER_LOCATION_REGION_DELTA,
              longitudeDelta: USER_LOCATION_REGION_DELTA,
            },
            500,
          );
        } catch {
          // Map may not be laid out yet; initialRegion still shows demo area.
        }
      },
      [],
    );

    useImperativeHandle(
      ref,
      () => ({
        recenterOnUser: (): void => {
          const coordinate = userCoordinateRef.current;
          if (coordinate !== null) {
            animateToUserLocation(coordinate);
          }
        },
      }),
      [animateToUserLocation],
    );

    const handleMapPress = useCallback((): void => {
      onMapPress?.();
    }, [onMapPress]);

    const serviceAreaCenters = useMemo(
      () =>
        serviceAreas.map((area) => ({
          latitude: area.latitude,
          longitude: area.longitude,
        })),
      [serviceAreas],
    );

    const pinCenters = useMemo(
      () =>
        pins.map((pin) => ({
          latitude: pin.latitude,
          longitude: pin.longitude,
        })),
      [pins],
    );

    const fitMapToContent = useCallback((): void => {
      if (!mapReadyRef.current) {
        return;
      }

      const coordinates: MapCoordinate[] = [
        ...pinCenters,
        ...serviceAreaCenters,
      ];

      if (userCoordinate !== null && userCoordinate !== undefined) {
        coordinates.unshift(userCoordinate);
      }

      if (coordinates.length === 0) {
        return;
      }

      try {
        mapRef.current?.fitToCoordinates(coordinates, {
          edgePadding: MAP_FIT_EDGE_PADDING,
          animated: true,
        });
      } catch {
        // Map may not be laid out yet; initialRegion still shows demo area.
      }
    }, [pinCenters, serviceAreaCenters, userCoordinate]);

    const handleMapReady = useCallback((): void => {
      mapReadyRef.current = true;
      fitMapToContent();
    }, [fitMapToContent]);

    useEffect(() => {
      fitMapToContent();
    }, [fitMapToContent]);

    useEffect(() => {
      if (userCoordinate === null || userCoordinate === undefined) {
        lastAnimatedCoordinateRef.current = null;
        return;
      }

      const last = lastAnimatedCoordinateRef.current;
      const isSameCoordinate =
        last !== null &&
        last.latitude === userCoordinate.latitude &&
        last.longitude === userCoordinate.longitude;

      if (isSameCoordinate) {
        return;
      }

      lastAnimatedCoordinateRef.current = userCoordinate;
      animateToUserLocation(userCoordinate);
    }, [animateToUserLocation, userCoordinate]);

    const gradientOverlay = (
      <LinearGradient
        colors={[
          `${theme.colors.depth.background}CC`,
          "transparent",
          `${theme.colors.depth.background}E6`,
        ]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
    );

    if (Platform.OS === "web") {
      return (
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.depth.level0 },
          ]}
        >
          {gradientOverlay}
        </View>
      );
    }

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.depth.level0 },
        ]}
      >
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          initialRegion={DISCOVER_MAP_REGION}
          customMapStyle={MIDNIGHT_MAP_STYLE}
          showsUserLocation={canShowUserLocation}
          showsCompass={false}
          rotateEnabled={false}
          onPress={handleMapPress}
          onMapReady={handleMapReady}
        >
          {pins.map((pin) => (
            <Marker
              key={pin.id}
              coordinate={{
                latitude: pin.latitude,
                longitude: pin.longitude,
              }}
              anchor={{ x: 0.5, y: 0.42 }}
              tracksViewChanges={false}
              onPress={() => onPinPress?.(pin.id)}
            >
              <MapPin
                avatarUri={pin.avatarUri}
                label={pin.label}
                variant={pin.variant}
                size={pin.size}
              />
            </Marker>
          ))}
        </MapView>
        {isLocationChecking ? (
          <View style={styles.loadingOverlay} pointerEvents="none">
            <ActivityIndicator
              size="small"
              color={theme.colors.primary.default}
            />
          </View>
        ) : null}
        {gradientOverlay}
      </View>
    );
  },
);

DiscoverMap.displayName = "DiscoverMap";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  loadingOverlay: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    elevation: 10,
    padding: 8,
    borderRadius: 9999,
    backgroundColor: "rgba(10, 10, 15, 0.75)",
  },
});

export default DiscoverMap;
