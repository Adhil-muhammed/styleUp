export type PaymentMethodKind = "paypal" | "google_pay" | "apple_pay" | "saved_card";

export interface PaymentMethodOption {
  id: string;
  kind: PaymentMethodKind;
  label: string;
  lastFour?: string;
}

export const DEFAULT_PAYMENT_METHOD_ID = "card-4679";

export const PAYMENT_METHOD_OPTIONS: PaymentMethodOption[] = [
  { id: "paypal", kind: "paypal", label: "PayPal" },
  { id: "googlepay", kind: "google_pay", label: "Google Pay" },
  { id: "applepay", kind: "apple_pay", label: "Apple Pay" },
  {
    id: DEFAULT_PAYMENT_METHOD_ID,
    kind: "saved_card",
    label: "Saved Card",
    lastFour: "4679",
  },
];

export function resolvePaymentMethodOption(
  paymentId: string | undefined,
): PaymentMethodOption {
  const match = PAYMENT_METHOD_OPTIONS.find((option) => option.id === paymentId);
  const fallback = PAYMENT_METHOD_OPTIONS.find(
    (option) => option.id === DEFAULT_PAYMENT_METHOD_ID,
  );
  return match ?? fallback ?? PAYMENT_METHOD_OPTIONS[0]!;
}
