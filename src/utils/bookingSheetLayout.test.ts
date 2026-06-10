import {
  COLLAPSED_SHEET_PERCENT,
  EXPANDED_SHEET_PERCENT,
  getBookingSheetSnapPoints,
  getCollapsedSnapPointPx,
  getExpandedSnapPointPx,
  isValidSnapPointOrder,
  SHEET_SPRING_DAMPING,
} from "./bookingSheetLayout";

const GLOBAL_SPRING_DAMPING = 20;

describe("bookingSheetLayout", () => {
  describe("getBookingSheetSnapPoints", () => {
    it("returns collapsed and expanded percentage snap points", () => {
      expect(getBookingSheetSnapPoints()).toEqual(["42%", "88%"]);
    });
  });

  describe("getCollapsedSnapPointPx", () => {
    it("computes collapsed height from screen height", () => {
      expect(getCollapsedSnapPointPx(800)).toBe(
        Math.round(800 * COLLAPSED_SHEET_PERCENT),
      );
    });

    it("returns valid values on compact screens", () => {
      const collapsed = getCollapsedSnapPointPx(640);
      const expanded = getExpandedSnapPointPx(640);
      expect(isValidSnapPointOrder(collapsed, expanded)).toBe(true);
    });
  });

  describe("getExpandedSnapPointPx", () => {
    it("computes expanded height from screen height", () => {
      expect(getExpandedSnapPointPx(800)).toBe(
        Math.round(800 * EXPANDED_SHEET_PERCENT),
      );
    });
  });

  describe("isValidSnapPointOrder", () => {
    it("requires expanded to be greater than collapsed", () => {
      expect(isValidSnapPointOrder(336, 704)).toBe(true);
      expect(isValidSnapPointOrder(704, 336)).toBe(false);
    });
  });

  describe("sheet spring constants", () => {
    it("uses higher damping than global default for calmer sheet motion", () => {
      expect(SHEET_SPRING_DAMPING).toBeGreaterThan(GLOBAL_SPRING_DAMPING);
    });
  });
});
