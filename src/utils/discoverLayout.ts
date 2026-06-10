export const BARBER_CARD_MAX_WIDTH = 300;
export const BARBER_CARD_PEEK = 24;
export const CAROUSEL_MAX_HEIGHT = 280;
export const COMPACT_WIDTH_THRESHOLD = 390;

const CARD_GAP_DEFAULT = 20;
const CARD_GAP_COMPACT = 16;

export function isCompactWidth(screenWidth: number): boolean {
  return screenWidth < COMPACT_WIDTH_THRESHOLD;
}

export function getBarberCardWidth(
  screenWidth: number,
  containerMargin: number,
): number {
  const available =
    screenWidth - 2 * containerMargin - BARBER_CARD_PEEK;
  return Math.min(BARBER_CARD_MAX_WIDTH, available);
}

export function getCarouselHeight(cardWidth: number): number {
  const scale = cardWidth / BARBER_CARD_MAX_WIDTH;
  return Math.round(CAROUSEL_MAX_HEIGHT * scale);
}

export function getCardGap(isCompact: boolean): number {
  return isCompact ? CARD_GAP_COMPACT : CARD_GAP_DEFAULT;
}
