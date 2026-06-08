import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BarberCardCarousel,
  DiscoverSearchBar,
  DiscoverTopBar,
  FilterPillRow,
  MapBackground,
  MapPin,
} from "@/components/discover";
import {
  BARBER_CARDS,
  FILTER_OPTIONS,
  MAP_PINS,
} from "@/data/discoverMock";
import { getTabBarTotalHeight } from "@/components/layout";
import { useTheme } from "@/hooks/useTheme";
import type { AppTabScreenProps } from "@/navigation/types";

type Props = AppTabScreenProps<"Discover">;

const TOP_BAR_CONTENT_HEIGHT = 56;

const DiscoverScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilterId, setActiveFilterId] = useState(FILTER_OPTIONS[0]?.id ?? "all");

  const handleFilterSelect = useCallback((id: string): void => {
    setActiveFilterId(id);
  }, []);

  const handleSearchChange = useCallback((text: string): void => {
    setSearchQuery(text);
  }, []);

  const searchStackTop = useMemo(
    () => insets.top + TOP_BAR_CONTENT_HEIGHT + theme.spacing.stackMd * 2,
    [insets.top, theme.spacing.stackMd],
  );

  const tabBarHeight = useMemo(
    () => getTabBarTotalHeight(insets.bottom),
    [insets.bottom],
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}>
      <MapBackground />

      {MAP_PINS.map((pin) => (
        <MapPin
          key={pin.id}
          avatarUri={pin.avatarUri}
          label={pin.label}
          variant={pin.variant}
          size={pin.size}
          style={{
            position: "absolute",
            top: `${pin.topPercent}%`,
            left: `${pin.leftPercent}%`,
            zIndex: 10,
          }}
        />
      ))}

      <DiscoverTopBar />

      <View
        style={[
          styles.searchStack,
          {
            top: searchStackTop,
            paddingHorizontal: theme.spacing.containerMargin,
            gap: theme.spacing.stackMd,
          },
        ]}
        pointerEvents="box-none"
      >
        <DiscoverSearchBar value={searchQuery} onChangeText={handleSearchChange} />
        <FilterPillRow
          options={FILTER_OPTIONS}
          activeId={activeFilterId}
          onSelect={handleFilterSelect}
        />
      </View>

      <View
        style={[
          styles.drawer,
          {
            bottom: tabBarHeight,
            paddingBottom: theme.spacing.stackMd,
          },
        ]}
        pointerEvents="box-none"
      >
        <View style={styles.handleWrap}>
          <View
            style={[
              styles.handle,
              {
                backgroundColor: `${theme.colors.text.disabled}66`,
                borderRadius: theme.borderRadius.full,
              },
            ]}
          />
        </View>
        <BarberCardCarousel cards={BARBER_CARDS} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: "hidden",
  },
  searchStack: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 40,
  },
  drawer: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 40,
  },
  handleWrap: {
    alignItems: "center",
    marginBottom: 8,
  },
  handle: {
    width: 48,
    height: 6,
  },
});

export default DiscoverScreen;
