import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import {
  getBarberCardWidth,
  getCardGap,
  getCarouselHeight,
  isCompactWidth,
} from "@/utils/discoverLayout";

export interface DiscoverLayoutMetrics {
  isCompact: boolean;
  cardWidth: number;
  carouselHeight: number;
  cardGap: number;
}

export function useDiscoverLayout(): DiscoverLayoutMetrics {
  const { width: screenWidth } = useWindowDimensions();
  const { theme } = useTheme();

  return useMemo(() => {
    const isCompact = isCompactWidth(screenWidth);
    const cardWidth = getBarberCardWidth(
      screenWidth,
      theme.spacing.containerMargin,
    );

    return {
      isCompact,
      cardWidth,
      carouselHeight: getCarouselHeight(cardWidth),
      cardGap: getCardGap(isCompact),
    };
  }, [screenWidth, theme.spacing.containerMargin]);
}
