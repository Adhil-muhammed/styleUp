import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookingSectionHeader } from "@/components/booking";
import { FilterPillRow } from "@/components/discover";
import { HomeSalonListCard } from "@/components/home";
import {
  SearchArtistRow,
  SearchHeaderRow,
} from "@/components/search";
import { useSearchScreen } from "@/hooks/useSearchScreen";
import { useTheme } from "@/hooks/useTheme";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"Search">;

const SearchScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const search = useSearchScreen();

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}
    >
      <View
        style={[
          styles.stickyHeader,
          {
            paddingHorizontal: theme.spacing.containerMargin,
            paddingTop: theme.spacing.stackLg,
            paddingBottom: theme.spacing.stackMd,
            gap: theme.spacing.stackMd,
            backgroundColor: theme.colors.depth.level0,
            borderBottomColor: theme.colors.border.level1,
          },
        ]}
      >
        <SearchHeaderRow
          searchQuery={search.searchQuery}
          onSearchChange={search.onSearchChange}
          onFilterPress={search.onFilterPress}
          onClose={search.onClose}
        />
        <FilterPillRow
          options={[...search.categories]}
          activeId={search.activeCategoryId}
          onSelect={search.onCategorySelect}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: theme.spacing.containerMargin,
            paddingTop: theme.spacing.sectionGap,
            paddingBottom: theme.spacing.sectionGap,
            gap: theme.spacing.sectionGap,
          },
        ]}
      >
        <View style={{ gap: theme.spacing.stackMd }}>
          <BookingSectionHeader title="Popular artist" />
          <SearchArtistRow
            artists={search.popularArtists}
            onArtistPress={search.onArtistPress}
          />
        </View>

        <View style={{ gap: theme.spacing.stackMd }}>
          <BookingSectionHeader
            title={`Result found(${search.resultCount})`}
          />
          <View style={{ gap: theme.spacing.stackMd }}>
            {search.filteredSalons.map((salon) => (
              <HomeSalonListCard
                key={salon.shopId}
                salon={salon}
                onPress={search.onSalonPress}
                ratingDisplay="score"
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  stickyHeader: {
    borderBottomWidth: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default SearchScreen;
