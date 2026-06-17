import {
  formatCurrency,
  getMinorUnitFactor,
  resetIntlCurrencySupportCache,
} from "./currency";

jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageTag: "en-IN", regionCode: "IN" }],
}));

describe("currency", () => {
  beforeEach(() => {
    resetIntlCurrencySupportCache();
  });

  describe("getMinorUnitFactor", () => {
    it("returns 100 for INR and USD", () => {
      expect(getMinorUnitFactor("INR")).toBe(100);
      expect(getMinorUnitFactor("USD")).toBe(100);
    });

    it("returns 1 for JPY", () => {
      expect(getMinorUnitFactor("JPY")).toBe(1);
    });
  });

  describe("formatCurrency", () => {
    it("formats INR minor units with rupee symbol", () => {
      const formatted = formatCurrency(600, "INR", "en-IN");
      expect(formatted).toContain("₹");
      expect(formatted).toMatch(/6(\.00)?/);
    });

    it("formats USD minor units with dollar symbol", () => {
      const formatted = formatCurrency(4200, "USD", "en-US");
      expect(formatted).toContain("$");
      expect(formatted).toMatch(/42(\.00)?/);
    });

    it("uses different major amounts for JPY vs INR with same minor value", () => {
      const inr = formatCurrency(1000, "INR", "en-IN");
      const jpy = formatCurrency(1000, "JPY", "ja-JP");

      expect(inr).toMatch(/10(\.00)?/);
      expect(jpy).toMatch(/1,?000/);
    });
  });

  describe("fallback formatter", () => {
    it("formats USD when Intl currency support is unavailable", () => {
      jest.spyOn(
        require("./currency") as typeof import("./currency"),
        "supportsIntlCurrency",
      ).mockReturnValue(false);

      const formatted = formatCurrency(4200, "USD", "en-US");
      expect(formatted).toBe("$42.00");
    });
  });
});
