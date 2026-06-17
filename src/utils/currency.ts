// ─── ISO 4217 Currency Formatting ───────────────────────────────────────────

import { getLocales } from "expo-localization";

export const SUPPORTED_CURRENCIES = ["USD", "INR", "EUR", "GBP"] as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

const DEFAULT_CURRENCY: SupportedCurrency = "INR";
const DEFAULT_LOCALE = "en-IN";

/** ISO 4217 minor-unit exponents for common currencies. */
const MINOR_UNIT_EXPONENT: Record<string, number> = {
  USD: 2,
  INR: 2,
  EUR: 2,
  GBP: 2,
  JPY: 0,
  KWD: 3,
};

const REGION_TO_CURRENCY: Record<string, SupportedCurrency> = {
  IN: "INR",
  US: "USD",
  GB: "GBP",
  DE: "EUR",
  FR: "EUR",
  ES: "EUR",
  IT: "EUR",
  NL: "EUR",
};

const FALLBACK_SYMBOLS: Record<string, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  KWD: "KD",
};

let intlCurrencySupported: boolean | null = null;

export function getMinorUnitFactor(currencyCode: string): number {
  const normalized = currencyCode.toUpperCase();
  const mapped = MINOR_UNIT_EXPONENT[normalized];

  if (mapped !== undefined) {
    return 10 ** mapped;
  }

  try {
    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: normalized,
    });
    const fractionDigits = formatter.resolvedOptions().maximumFractionDigits ?? 2;
    return 10 ** fractionDigits;
  } catch {
    return 100;
  }
}

export function supportsIntlCurrency(): boolean {
  if (intlCurrencySupported !== null) {
    return intlCurrencySupported;
  }

  try {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(1);
    intlCurrencySupported = formatted.includes("$");
  } catch {
    intlCurrencySupported = false;
  }

  return intlCurrencySupported;
}

/** @internal Reset cached Intl probe — for tests only. */
export function resetIntlCurrencySupportCache(): void {
  intlCurrencySupported = null;
}

function minorToMajor(amountMinor: number, currencyCode: string): number {
  const factor = getMinorUnitFactor(currencyCode);
  return amountMinor / factor;
}

function formatMajorWithGrouping(
  majorAmount: number,
  fractionDigits: number,
): string {
  const fixed = majorAmount.toFixed(fractionDigits);
  const parts = fixed.split(".");
  const wholePart = parts[0] ?? "0";
  const decimalPart = parts[1];
  const withGrouping = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (fractionDigits === 0 || decimalPart === undefined) {
    return withGrouping;
  }

  return `${withGrouping}.${decimalPart}`;
}

function formatCurrencyFallback(
  amountMinor: number,
  currencyCode: string,
): string {
  const normalized = currencyCode.toUpperCase();
  const exponent = Math.log10(getMinorUnitFactor(normalized));
  const fractionDigits = Number.isInteger(exponent) ? exponent : 2;
  const major = minorToMajor(amountMinor, normalized);
  const formatted = formatMajorWithGrouping(major, fractionDigits);
  const symbol = FALLBACK_SYMBOLS[normalized] ?? normalized;

  if (normalized === "INR") {
    return `${symbol}${formatted}`;
  }

  return `${symbol}${formatted}`;
}

export function formatCurrency(
  amountMinor: number,
  currencyCode: string = DEFAULT_CURRENCY,
  locale: string = DEFAULT_LOCALE,
): string {
  const normalized = currencyCode.toUpperCase();
  const major = minorToMajor(amountMinor, normalized);

  if (supportsIntlCurrency()) {
    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: normalized,
      }).format(major);
    } catch {
      return formatCurrencyFallback(amountMinor, normalized);
    }
  }

  return formatCurrencyFallback(amountMinor, normalized);
}

export function detectLocaleFromDevice(): string {
  const locales = getLocales();
  const primary = locales[0];

  if (primary?.languageTag !== undefined && primary.languageTag.length > 0) {
    return primary.languageTag;
  }

  return DEFAULT_LOCALE;
}

export function detectCurrencyFromLocale(): SupportedCurrency {
  const locales = getLocales();
  const primary = locales[0];
  const regionCode = primary?.regionCode?.toUpperCase();

  if (regionCode !== undefined && regionCode in REGION_TO_CURRENCY) {
    return REGION_TO_CURRENCY[regionCode] as SupportedCurrency;
  }

  return DEFAULT_CURRENCY;
}

export const DEFAULT_SETTINGS_CURRENCY = DEFAULT_CURRENCY;
export const DEFAULT_SETTINGS_LOCALE = DEFAULT_LOCALE;
