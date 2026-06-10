import { getDistanceMeters, NEARBY_SHOP_RADIUS_METERS } from "./geo";

describe("geo", () => {
  describe("getDistanceMeters", () => {
    it("returns zero for identical coordinates", () => {
      const point = { latitude: 9.06134290550408, longitude: 76.60384121258556 };
      expect(getDistanceMeters(point, point)).toBe(0);
    });

    it("computes a plausible distance between Kerala demo shops", () => {
      const shop1 = {
        latitude: 9.06134290550408,
        longitude: 76.60384121258556,
      };
      const shop2 = {
        latitude: 9.053932123917786,
        longitude: 76.60018930639828,
      };

      const distance = getDistanceMeters(shop1, shop2);

      expect(distance).toBeGreaterThan(800);
      expect(distance).toBeLessThan(1200);
    });
  });

  describe("NEARBY_SHOP_RADIUS_METERS", () => {
    it("is a positive search radius", () => {
      expect(NEARBY_SHOP_RADIUS_METERS).toBeGreaterThan(0);
    });
  });
});
