export interface PriceLineItem {
  label: string;
  amountCents: number;
}

export interface BookingCustomerInfo {
  name: string;
  phone: string;
}

export const DEMO_BOOKING_CUSTOMER: BookingCustomerInfo = {
  name: "Daniel Austin",
  phone: "+1 111 467 378 399",
};

export const DEMO_PRICE_LINE_ITEMS: PriceLineItem[] = [
  { label: "Haircut (Quiff)", amountCents: 600 },
  { label: "Hair Wash (Aloe Vera Shampoo)", amountCents: 550 },
  { label: "Shaving (Thin Shaving)", amountCents: 450 },
];

export function computeTotalCents(items: readonly PriceLineItem[]): number {
  return items.reduce((sum, item) => sum + item.amountCents, 0);
}

export function formatSummaryDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
