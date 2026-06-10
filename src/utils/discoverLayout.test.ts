import {
  BARBER_CARD_MAX_WIDTH,
  CAROUSEL_MAX_HEIGHT,
  getBarberCardWidth,
  getCardGap,
  getCarouselHeight,
  isCompactWidth,
} from "./discoverLayout";

const CONTAINER_MARGIN = 20;

describe("discoverLayout", () => {
  describe("isCompactWidth", () => {
    it("returns true for narrow screens", () => {
      expect(isCompactWidth(320)).toBe(true);
      expect(isCompactWidth(389)).toBe(true);
    });

    it("returns false for standard screens", () => {
      expect(isCompactWidth(390)).toBe(false);
      expect(isCompactWidth(414)).toBe(false);
    });
  });

  describe("getBarberCardWidth", () => {
    it("scales down on compact phones", () => {
      // 320 - 40 - 24 = 256
      expect(getBarberCardWidth(320, CONTAINER_MARGIN)).toBe(256);
    });

    it("caps at max width on standard phones", () => {
      expect(getBarberCardWidth(414, CONTAINER_MARGIN)).toBe(BARBER_CARD_MAX_WIDTH);
    });
  });

  describe("getCarouselHeight", () => {
    it("scales proportionally with card width", () => {
      expect(getCarouselHeight(256)).toBe(Math.round(CAROUSEL_MAX_HEIGHT * (256 / 300)));
      expect(getCarouselHeight(BARBER_CARD_MAX_WIDTH)).toBe(CAROUSEL_MAX_HEIGHT);
    });
  });

  describe("getCardGap", () => {
    it("uses tighter gap on compact screens", () => {
      expect(getCardGap(true)).toBe(16);
      expect(getCardGap(false)).toBe(20);
    });
  });
});
