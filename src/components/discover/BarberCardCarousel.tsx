import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { FlashList, type ListRenderItemInfo } from "@shopify/flash-list";
import BarberCard from "./BarberCard";
import { useTheme } from "@/hooks/useTheme";
import {
  BARBER_CARD_WIDTH,
  type BarberCardData,
} from "@/data/discoverMock";

interface BarberCardCarouselProps {
  cards: BarberCardData[];
  onPressCta?: (cardId: string) => void;
}

const CARD_GAP = 20;
const ITEM_SIZE = BARBER_CARD_WIDTH + CARD_GAP;

const BarberCardCarousel = ({
  cards,
  onPressCta,
}: BarberCardCarouselProps): React.JSX.Element => {
  const { theme } = useTheme();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<BarberCardData>) => (
      <View style={{ marginRight: CARD_GAP }}>
        <BarberCard
          card={item}
          {...(onPressCta !== undefined ? { onPressCta } : {})}
        />
      </View>
    ),
    [onPressCta],
  );

  const keyExtractor = useCallback((item: BarberCardData) => item.id, []);

  return (
    <View style={styles.listContainer}>
      <FlashList
        data={cards}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.containerMargin,
        }}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: 280,
  },
});

export default BarberCardCarousel;
