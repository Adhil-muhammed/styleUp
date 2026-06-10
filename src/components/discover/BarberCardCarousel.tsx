import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { FlashList, type ListRenderItemInfo } from "@shopify/flash-list";
import BarberCard, { type BarberCardDensity } from "./BarberCard";
import { useTheme } from "@/hooks/useTheme";
import type { BarberCardData } from "@/data/discoverMock";

interface BarberCardCarouselProps {
  cards: BarberCardData[];
  cardWidth: number;
  carouselHeight: number;
  cardGap: number;
  density?: BarberCardDensity;
  onPressCta?: (cardId: string) => void;
}

const BarberCardCarousel = ({
  cards,
  cardWidth,
  carouselHeight,
  cardGap,
  density = "default",
  onPressCta,
}: BarberCardCarouselProps): React.JSX.Element => {
  const { theme } = useTheme();

  const itemSize = useMemo(() => cardWidth + cardGap, [cardWidth, cardGap]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<BarberCardData>) => (
      <View style={{ marginRight: cardGap }}>
        <BarberCard
          card={item}
          width={cardWidth}
          density={density}
          {...(onPressCta !== undefined ? { onPressCta } : {})}
        />
      </View>
    ),
    [cardGap, cardWidth, density, onPressCta],
  );

  const keyExtractor = useCallback((item: BarberCardData) => item.id, []);

  return (
    <View style={[styles.listContainer, { height: carouselHeight }]}>
      <FlashList
        data={cards}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.containerMargin,
        }}
        snapToInterval={itemSize}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {},
});

export default BarberCardCarousel;
