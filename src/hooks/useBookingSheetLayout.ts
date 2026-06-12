import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  getBookingSheetSnapPoints,
  getCollapsedSnapPointPx,
  getExpandedSnapPointPx,
} from "@/utils/bookingSheetLayout";

export interface BookingSheetLayoutMetrics {
  snapPoints: [string, string];
  collapsedPx: number;
  expandedPx: number;
  bottomInset: number;
  topInset: number;
}

export function useBookingSheetLayout(): BookingSheetLayoutMetrics {
  const { height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return useMemo(() => {
    return {
      snapPoints: getBookingSheetSnapPoints(),
      collapsedPx: getCollapsedSnapPointPx(screenHeight),
      expandedPx: getExpandedSnapPointPx(screenHeight),
      bottomInset: insets.bottom,
      topInset: insets.top,
    };
  }, [insets.bottom, insets.top, screenHeight]);
}
