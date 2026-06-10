import type { MapStyleElement, Region } from "react-native-maps";

export const DEFAULT_MAP_LATITUDE_DELTA = 0.015;
export const DEFAULT_MAP_LONGITUDE_DELTA = 0.015;

export interface MapCoordinate {
  latitude: number;
  longitude: number;
}

export const DISCOVER_MAP_REGION: Region = {
  latitude: 9.057637514710933,
  longitude: 76.60201525949192,
  latitudeDelta: DEFAULT_MAP_LATITUDE_DELTA,
  longitudeDelta: DEFAULT_MAP_LONGITUDE_DELTA,
};

export function getMapRegionForCoordinates(
  coordinates: MapCoordinate[],
  paddingDelta = 0.002,
): Region {
  if (coordinates.length === 0) {
    return DISCOVER_MAP_REGION;
  }

  const latitudes = coordinates.map((coord) => coord.latitude);
  const longitudes = coordinates.map((coord) => coord.longitude);

  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: Math.max(maxLat - minLat + paddingDelta, DEFAULT_MAP_LATITUDE_DELTA),
    longitudeDelta: Math.max(maxLng - minLng + paddingDelta, DEFAULT_MAP_LONGITUDE_DELTA),
  };
}

/** Dark map style aligned with Midnight Edge depth tokens. */
export const MIDNIGHT_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#131318" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#A1A1AA" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0A0A0F" }] },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#2A2A3A" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#1A1A24" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#111118" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1F1F25" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#2A2A3A" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#2A2A3A" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#1A1A24" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0A0A0F" }],
  },
] satisfies MapStyleElement[];
