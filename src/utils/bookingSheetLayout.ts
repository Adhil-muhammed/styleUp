export const COLLAPSED_SHEET_PERCENT = 0.42;
export const EXPANDED_SHEET_PERCENT = 0.88;
export const EXPANDED_SNAP_INDEX = 1;

/** Calmer spring than global theme tokens — tuned for large draggable sheet. */
export const SHEET_SPRING_STIFFNESS = 220;
export const SHEET_SPRING_DAMPING = 48;

export function getBookingSheetSnapPoints(): [string, string] {
  return [
    `${Math.round(COLLAPSED_SHEET_PERCENT * 100)}%`,
    `${Math.round(EXPANDED_SHEET_PERCENT * 100)}%`,
  ];
}

export function getCollapsedSnapPointPx(screenHeight: number): number {
  return Math.round(screenHeight * COLLAPSED_SHEET_PERCENT);
}

export function getExpandedSnapPointPx(screenHeight: number): number {
  return Math.round(screenHeight * EXPANDED_SHEET_PERCENT);
}

export function isValidSnapPointOrder(collapsed: number, expanded: number): boolean {
  return collapsed > 0 && expanded > collapsed;
}
