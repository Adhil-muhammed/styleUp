import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
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
  bottom: 200,
  left: 40,
} as const;

interface DiscoverMapProps {
  pins: MapPinData[];
  serviceAreas?: ServiceAreaCircle[];
  canShowUserLocation: boolean;
  userCoordinate?: MapCoordinate | null;
  onMapPress?: () => void;
  onPinPress?: (pinId: string) => void;
}

const DiscoverMap = ({
  pins,
  serviceAreas = [],
  canShowUserLocation,
  userCoordinate,
  onMapPress,
  onPinPress,
}: DiscoverMapProps): React.JSX.Element => {
  const { theme } = useTheme();
  const mapRef = useRef<MapView>(null);
  const mapReadyRef = useRef(false);

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

    const coordinates: MapCoordinate[] = [...pinCenters, ...serviceAreaCenters];

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
      style={[styles.container, { backgroundColor: theme.colors.depth.level0 }]}
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
        {serviceAreas.map((area) => (
          <Circle
            key={area.id}
            center={{
              latitude: area.latitude,
              longitude: area.longitude,
            }}
            radius={area.radiusMeters}
            fillColor={`${theme.colors.primary.default}26`}
            strokeColor={theme.colors.primary.default}
            strokeWidth={2}
          />
        ))}
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
      {gradientOverlay}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
});

export default DiscoverMap;
