import { BARBER_CARDS } from "@/data/discoverMock";
import {
  BOOK_BARBER,
  BOOK_TAB_SERVICES,
  type BookBarberSummary,
} from "@/data/bookMock";

const DISCOVER_TO_BOOK_SERVICE_MAP: Record<string, string> = {
  "service-1": "service-skin-fade",
  "service-3": "service-beard-trim",
};

const DEFAULT_BOOK_SERVICE_ID = BOOK_TAB_SERVICES[0]?.id ?? "service-skin-fade";

const SHOP_PIN_TO_BARBER_CARD_ID: Record<string, string> = {
  "shop-1": "card-1",
  "shop-2": "card-2",
};

const DISCOVER_SERVICE_TO_BARBER_CARD_ID: Record<string, string> = {
  "service-1": "card-1",
  "service-2": "card-2",
  "service-3": "card-3",
  "service-4": "card-1",
};

const BARBER_CARD_TO_SHOP_ID: Record<string, string> = {
  "card-1": "shop-1",
  "card-2": "shop-2",
};

const DEFAULT_SHOP_ID = "shop-1";

export function mapDiscoverServiceToBookId(discoverServiceId: string): string {
  return DISCOVER_TO_BOOK_SERVICE_MAP[discoverServiceId] ?? DEFAULT_BOOK_SERVICE_ID;
}

function barberCardToSummary(card: (typeof BARBER_CARDS)[number]): BookBarberSummary {
  const specialtyParts = card.specialty.split("•");
  const title = specialtyParts[0]?.trim() ?? "Barber";

  return {
    id: card.id,
    name: card.name,
    rating: card.rating,
    title,
    avatarUri: card.avatarUri ?? BOOK_BARBER.avatarUri,
  };
}

export function resolveBarberFromDiscoverService(
  discoverServiceId: string,
): BookBarberSummary {
  const barberCardId = DISCOVER_SERVICE_TO_BARBER_CARD_ID[discoverServiceId];
  const card = BARBER_CARDS.find((entry) => entry.id === barberCardId);

  if (card === undefined) {
    return BOOK_BARBER;
  }

  return barberCardToSummary(card);
}

export function resolveBarberForDiscoverBooking(
  shopPinId: string | null,
  discoverServiceId: string,
): BookBarberSummary {
  if (shopPinId !== null) {
    return resolveBarberFromShopPin(shopPinId);
  }

  return resolveBarberFromDiscoverService(discoverServiceId);
}

export function resolveShopIdFromDiscoverService(
  discoverServiceId: string,
): string {
  const barberCardId = DISCOVER_SERVICE_TO_BARBER_CARD_ID[discoverServiceId];
  const shopId = barberCardId
    ? BARBER_CARD_TO_SHOP_ID[barberCardId]
    : undefined;
  return shopId ?? DEFAULT_SHOP_ID;
}

export function resolveShopIdForDiscoverBooking(
  shopPinId: string | null,
  discoverServiceId: string,
): string {
  if (shopPinId !== null) {
    return shopPinId;
  }

  return resolveShopIdFromDiscoverService(discoverServiceId);
}

export function resolveBarberFromShopPin(
  shopPinId: string | null,
): BookBarberSummary {
  if (shopPinId === null) {
    return BOOK_BARBER;
  }

  const barberCardId = SHOP_PIN_TO_BARBER_CARD_ID[shopPinId];
  const card = BARBER_CARDS.find((entry) => entry.id === barberCardId);

  if (card === undefined) {
    return BOOK_BARBER;
  }

  return barberCardToSummary(card);
}

export function resolveBarberById(barberId: string | null): BookBarberSummary {
  if (barberId === null) {
    return BOOK_BARBER;
  }

  const card = BARBER_CARDS.find((entry) => entry.id === barberId);

  if (card === undefined) {
    return BOOK_BARBER;
  }

  return barberCardToSummary(card);
}
