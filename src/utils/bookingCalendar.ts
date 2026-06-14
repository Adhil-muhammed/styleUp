import type { MarkedDates } from "react-native-calendars/src/types";

export function toYMD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseYMD(ymd: string): Date {
  const parts = ymd.split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    throw new Error(`Invalid YMD date: ${ymd}`);
  }

  return new Date(year, month - 1, day);
}

export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function buildStubAvailableDates(daysAhead: number): string[] {
  const today = startOfToday();
  const dates: string[] = [];

  for (let offset = 1; offset <= daysAhead; offset += 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
    dates.push(toYMD(date));
  }

  return dates;
}

export function buildMarkedDates(
  selectedYmd: string,
  availableDates: readonly string[],
  colors: { selected: string; dot: string },
): MarkedDates {
  const marked: MarkedDates = {};

  for (const ymd of availableDates) {
    marked[ymd] = {
      marked: true,
      dotColor: colors.dot,
    };
  }

  const existing = marked[selectedYmd];

  marked[selectedYmd] = {
    ...existing,
    selected: true,
    selectedColor: colors.selected,
    ...(existing?.marked === true
      ? { marked: true, dotColor: colors.dot, selectedDotColor: colors.selected }
      : {}),
  };

  return marked;
}
