// ─── Book Tab Mock Data (sourced from .html prototype) ──────────────────────

import { BARBER_CARDS } from "@/data/discoverMock";

export interface BookServiceOption {
  id: string;
  title: string;
  durationMinutes: number;
  priceCents: number;
}

export interface TimeSlotOption {
  id: string;
  label: string;
}

export interface BookBarberSummary {
  id: string;
  name: string;
  rating: number;
  title: string;
  avatarUri: string;
}

export const BOOK_TAB_SERVICES: BookServiceOption[] = [
  {
    id: "service-skin-fade",
    title: "Skin Fade",
    durationMinutes: 45,
    priceCents: 4500,
  },
  {
    id: "service-beard-trim",
    title: "Beard Trim",
    durationMinutes: 30,
    priceCents: 2500,
  },
];

export const BOOK_TIME_SLOTS: TimeSlotOption[] = [
  { id: "slot-0900", label: "09:00 AM" },
  { id: "slot-1000", label: "10:00 AM" },
  { id: "slot-1300", label: "01:00 PM" },
  { id: "slot-1400", label: "02:00 PM" },
  { id: "slot-1530", label: "03:30 PM" },
  { id: "slot-1630", label: "04:30 PM" },
];

const marcusCard = BARBER_CARDS[0];

export const BOOK_BARBER: BookBarberSummary = {
  id: marcusCard?.id ?? "card-1",
  name: marcusCard?.name ?? "Marcus T.",
  rating: marcusCard?.rating ?? 4.9,
  title: "Master Barber",
  avatarUri:
    marcusCard?.avatarUri ??
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDkVhJtIfrRvQ1vo7htP7nr4cNwpeNCUN36aM5C2ZiRw4ub9qvLSOHq1AuSWwb2oWDdcqaEhIaFZ0NmXrEVtTBK5bEWXDvp-pjZbBucqN54VUNp2oJ5Lqrmm9cO7fkVLbLmpKht-bZVheadZGw10nVV6wibMFEa6oL2iXS95xLQQcaNa5_2rtwcxzpOb3Dj97DViYgUgyNcfmNWWh1aGKKzRU_uR-VpI30M-3ycKhrTKc5Wb1C2nsh5RpcmmlRgIFt_By49sEA5Llw",
};

/** Thursday, October 15 — static demo date from HTML prototype */
export const BOOK_DEFAULT_DATE = new Date(2026, 9, 15);

export function formatDuration(minutes: number): string {
  return `${minutes}m`;
}

export function formatBookingDate(date: Date): string {
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${weekday}, ${monthDay}`;
}

export function formatBookingDateLong(date: Date): string {
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  return `${weekday} ${monthDay}`;
}
