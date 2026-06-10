import { useMemo } from "react";
import type { MapCoordinate } from "@/config/map";
import type { MapPinData } from "@/data/discoverMock";
import { getDistanceMeters, NEARBY_SHOP_RADIUS_METERS } from "@/utils/geo";

export interface NearbyMapShopsResult {
  nearbyPins: MapPinData[];
  distancesMeters: Record<string, number>;
}

export function useNearbyMapShops(
  userCoordinate: MapCoordinate | null,
  shops: MapPinData[],
): NearbyMapShopsResult {
  return useMemo(() => {
    if (userCoordinate === null) {
      return { nearbyPins: shops, distancesMeters: {} };
    }

    const withDistance = shops
      .map((shop) => ({
        shop,
        distance: getDistanceMeters(userCoordinate, {
          latitude: shop.latitude,
          longitude: shop.longitude,
        }),
      }))
      .filter(({ distance }) => distance <= NEARBY_SHOP_RADIUS_METERS)
      .sort((a, b) => a.distance - b.distance);

    const distancesMeters: Record<string, number> = {};
    for (const { shop, distance } of withDistance) {
      distancesMeters[shop.id] = distance;
    }

    return {
      nearbyPins: withDistance.map(({ shop }) => shop),
      distancesMeters,
    };
  }, [shops, userCoordinate]);
}
