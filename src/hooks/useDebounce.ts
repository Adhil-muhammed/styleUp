import { useState, useEffect } from "react";

/**
 * Delays updating `value` until it has stopped changing for `delay` ms.
 * Useful for deferring expensive search or filter operations.
 *
 * @param value  The reactive value to debounce.
 * @param delay  Milliseconds to wait after the last change before resolving.
 * @returns      The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
