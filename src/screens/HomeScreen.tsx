import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookingSectionHeader } from "@/components/booking";
import { DiscoverSearchBar } from "@/components/discover";
import {
  HomeCategoryRow,
  HomeHeader,
  HomePromoBanner,
  HomeSalonListCard,
} from "@/components/home";
import Typography from "@/components/common/Typography";
import { useAuth } from "@/hooks/useAuth";
import { useHomeScreen } from "@/hooks/useHomeScreen";
import { useTheme } from "@/hooks/useTheme";
import type { AppTabScreenProps } from "@/navigation/types";

type Props = AppTabScreenProps<"Home">;

const HomeScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const home = useHomeScreen();

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
            paddingBottom: theme.spacing.stackMd,
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
          {__DEV__ && (
            <Pressable
              onPress={logout}
              hitSlop={8}
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            >
              <Typography variant="labelSm" color={theme.colors.semantic.error}>
                [DEV] Sign Out
              </Typography>
            </Pressable>
          )}
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
        <HomePromoBanner
          promo={home.promo}
          onBookPress={home.onPromoBookPress}
        />

        <View
          style={{
            paddingHorizontal: theme.spacing.containerMargin,
            gap: theme.spacing.stackMd,
          }}
        >
          <BookingSectionHeader
            title="Most Popular"
            actionLabel="View All"
            onSeeAllPress={home.onViewAllPopularSalons}
          />
          {home.popularSalons.map((salon) => (
            <HomeSalonListCard
              key={salon.shopId}
              salon={salon}
              onPress={home.onSalonPress}
            />
          ))}
        </View>

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
