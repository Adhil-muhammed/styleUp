import type { MapCoordinate } from "@/config/map";

export const NEARBY_SHOP_RADIUS_METERS = 5000;

const EARTH_RADIUS_METERS = 6_371_000;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function getDistanceMeters(
  a: MapCoordinate,
  b: MapCoordinate,
): number {
  const dLat = toRadians(b.latitude - a.latitude);
  const dLng = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);

  const sinHalfDLat = Math.sin(dLat / 2);
  const sinHalfDLng = Math.sin(dLng / 2);

  const haversine =
    sinHalfDLat * sinHalfDLat +
    Math.cos(lat1) * Math.cos(lat2) * sinHalfDLng * sinHalfDLng;

  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.min(1, Math.sqrt(haversine)));
}
