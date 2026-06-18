import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { BookingSectionHeader } from "@/components/booking";
import { DiscoverSearchBar } from "@/components/discover";
import {
  HomeCategoryRow,
  HomeHeader,
  HomePromoBanner,
  HomeSalonListCard,
} from "@/components/home";
import { getTabBarTotalHeight } from "@/components/layout/MidnightEdgeTabBar";
import { useHomeScreen } from "@/hooks/useHomeScreen";
import { useTheme } from "@/hooks/useTheme";
import type { AppTabScreenProps } from "@/navigation/types";

type Props = AppTabScreenProps<"Home">;

const HomeScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const home = useHomeScreen();

  const scrollBottomPadding =
    getTabBarTotalHeight(insets.bottom) + theme.spacing.stackMd;

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: scrollBottomPadding,
            gap: theme.spacing.sectionGap,
          },
        ]}
      >
        <View
          style={{
            paddingHorizontal: theme.spacing.containerMargin,
            gap: theme.spacing.stackLg,
          }}
        >
          <HomeHeader
            userGreeting={home.userGreeting}
            userLocation={home.userLocation}
            onNotificationPress={home.onNotificationPress}
            onFavoritesPress={home.onFavoritesPress}
          />
          <DiscoverSearchBar
            value={home.searchQuery}
            onChangeText={home.onSearchChange}
            onFilterPress={home.onFilterPress}
            onPress={home.onSearchPress}
            editable={false}
            placeholder="Search by Salons"
          />
        </View>

        <HomeCategoryRow
          categories={home.categories}
          onCategoryPress={home.onCategoryPress}
        />

        <HomePromoBanner promo={home.promo} onBookPress={home.onPromoBookPress} />

        <View
          style={{
            paddingHorizontal: theme.spacing.containerMargin,
            gap: theme.spacing.stackMd,
          }}
        >
          <BookingSectionHeader
            title="Nearest Salon"
            actionLabel="View All"
            onSeeAllPress={home.onViewAllSalons}
          />
          {home.nearestSalons.map((salon) => (
            <HomeSalonListCard
              key={salon.shopId}
              salon={salon}
              onPress={home.onSalonPress}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
  },
});

export default HomeScreen;
