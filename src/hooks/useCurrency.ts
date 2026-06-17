import { useCallback } from "react";
import { formatCurrency } from "@/utils/currency";
import { useSettingsStore } from "@/store/settingsStore";

export interface FormatCurrencyOptions {
  prefix?: string;
  currency?: string;
}

export interface UseCurrencyResult {
  format: (amountMinor: number, options?: FormatCurrencyOptions) => string;
  currency: string;
  locale: string;
}

export function useCurrency(currencyOverride?: string): UseCurrencyResult {
  const storeCurrency = useSettingsStore((state) => state.currency);
  const locale = useSettingsStore((state) => state.locale);
  const currency = currencyOverride ?? storeCurrency;

  const format = useCallback(
    (amountMinor: number, options?: FormatCurrencyOptions): string => {
      const activeCurrency = options?.currency ?? currency;
      const formatted = formatCurrency(amountMinor, activeCurrency, locale);
      return `${options?.prefix ?? ""}${formatted}`;
    },
    [currency, locale],
  );

  return { format, currency, locale };
}
