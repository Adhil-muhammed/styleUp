import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BookingAppointmentHeader,
  BookingSectionHeader,
} from "@/components/booking";
import { DiscoverSearchBar } from "@/components/discover";
import { HomeSalonListCard } from "@/components/home";
import { SearchFilterSheet } from "@/components/search";
import { useCategorySalonsScreen } from "@/hooks/useCategorySalonsScreen";
import { useTheme } from "@/hooks/useTheme";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"CategorySalons">;

const CategorySalonsScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const categoryScreen = useCategorySalonsScreen();

  return (
    <>
      <SafeAreaView
        edges={["bottom"]}
        style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}
      >
        <BookingAppointmentHeader
          title={categoryScreen.categoryTitle}
          onGoBack={categoryScreen.onGoBack}
        />

        <View
          style={[
            styles.stickyHeader,
            {
              paddingHorizontal: theme.spacing.containerMargin,
              paddingTop: theme.spacing.stackMd,
              gap: theme.spacing.stackMd,
              backgroundColor: theme.colors.depth.level0,
            },
          ]}
        >
          <DiscoverSearchBar
            value={categoryScreen.searchQuery}
            onChangeText={categoryScreen.onSearchChange}
            onFilterPress={categoryScreen.onFilterPress}
            placeholder="Search salons"
            editable
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
              gap: theme.spacing.stackMd,
            },
          ]}
        >
          {/* <BookingSectionHeader
            title={`Result found(${categoryScreen.resultCount})`}
          /> */}
          {categoryScreen.filteredSalons.map((salon) => (
            <HomeSalonListCard
              key={salon.shopId}
              salon={salon}
              onPress={categoryScreen.onSalonPress}
              ratingDisplay="score"
            />
          ))}
        </ScrollView>
      </SafeAreaView>

      {categoryScreen.isFilterSheetOpen ? (
        <SearchFilterSheet
          serviceOptions={[]}
          draftFilters={categoryScreen.draftFilters}
          draftFilterCount={categoryScreen.draftFilterCount}
          showServiceFilters={false}
          onDismiss={categoryScreen.onFilterSheetDismiss}
          onClear={categoryScreen.onClearDraftFilters}
          onApply={categoryScreen.onApplyFilters}
          onToggleService={() => undefined}
          onSelectRating={categoryScreen.onSelectDraftRating}
          onSelectGender={categoryScreen.onSelectDraftGender}
          onSelectDistance={categoryScreen.onSelectDraftDistance}
        />
      ) : null}
    </>
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

export default CategorySalonsScreen;
