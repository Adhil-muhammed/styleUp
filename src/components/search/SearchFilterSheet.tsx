import React, { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetScrollView,
  useBottomSheetSpringConfigs,
  type BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import { ConfirmBookingBar } from "@/components/booking";
import DistanceFilterSlider from "./DistanceFilterSlider";
import RatingFilterPicker from "./RatingFilterPicker";
import SearchFilterSection from "./SearchFilterSection";
import SearchGenderFilterControl from "./SearchGenderFilter";
import ServiceFilterChips from "./ServiceFilterChips";
import { useTheme } from "@/hooks/useTheme";
import {
  SHEET_SPRING_DAMPING,
  SHEET_SPRING_STIFFNESS,
} from "@/utils/bookingSheetLayout";
import { toTextStyle } from "@/config/theme";
import type { FilterOption } from "@/data/discoverMock";
import type { SearchFilterState, SearchGenderFilter as SearchGenderFilterValue } from "@/types/searchFilters";

const SNAP_POINTS = ["75%", "92%"] as const;

interface SearchFilterSheetProps {
  serviceOptions: readonly FilterOption[];
  draftFilters: SearchFilterState;
  draftFilterCount: number;
  onDismiss: () => void;
  onClear: () => void;
  onApply: () => void;
  onToggleService: (serviceId: string) => void;
  onSelectRating: (minRating: number) => void;
  onSelectGender: (gender: SearchGenderFilterValue) => void;
  onSelectDistance: (maxDistanceKm: number) => void;
}

const SearchFilterSheet = ({
  serviceOptions,
  draftFilters,
  draftFilterCount,
  onDismiss,
  onClear,
  onApply,
  onToggleService,
  onSelectRating,
  onSelectGender,
  onSelectDistance,
}: SearchFilterSheetProps): React.JSX.Element => {
  const { theme } = useTheme();

  const animationConfigs = useBottomSheetSpringConfigs({
    stiffness: SHEET_SPRING_STIFFNESS,
    damping: SHEET_SPRING_DAMPING,
    overshootClamping: true,
  });

  const sheetIndex = 0;

  const applyLabel = useMemo((): string => {
    if (draftFilterCount === 0) {
      return "Apply Filters";
    }

    return `Apply Filters(${draftFilterCount})`;
  }, [draftFilterCount]);

  const handleSheetChange = useCallback(
    (index: number): void => {
      if (index === -1) {
        onDismiss();
      }
    },
    [onDismiss],
  );

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} bottomInset={0}>
        <View
          style={[
            styles.footer,
            {
              paddingHorizontal: theme.spacing.containerMargin,
              paddingBottom: theme.spacing.stackLg,
              paddingTop: theme.spacing.stackMd,
              backgroundColor: theme.colors.depth.level1,
              borderTopColor: theme.colors.border.level1,
            },
          ]}
        >
          <ConfirmBookingBar
            onConfirm={onApply}
            label={applyLabel}
            showArrow={false}
          />
        </View>
      </BottomSheetFooter>
    ),
    [
      applyLabel,
      onApply,
      theme.colors.border.level1,
      theme.colors.depth.level1,
      theme.spacing.containerMargin,
      theme.spacing.stackLg,
      theme.spacing.stackMd,
    ],
  );

  return (
    <BottomSheet
      index={sheetIndex}
      snapPoints={[...SNAP_POINTS]}
      enablePanDownToClose
      onChange={handleSheetChange}
      animationConfigs={animationConfigs}
      footerComponent={renderFooter}
      handleIndicatorStyle={{
        backgroundColor: `${theme.colors.text.disabled}99`,
        width: 40,
      }}
      backgroundStyle={{
        backgroundColor: theme.colors.depth.level1,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
      }}
    >
      <BottomSheetScrollView
        enableFooterMarginAdjustment
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: theme.spacing.containerMargin,
            paddingBottom: theme.spacing.sectionGap,
            gap: theme.spacing.sectionGap,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <View style={[styles.titleRow, { gap: theme.spacing.stackSm }]}>
            <MaterialIcons
              name="tune"
              size={22}
              color={theme.colors.text.primary}
            />
            <Text
              style={[
                toTextStyle(theme.typography.headlineMd),
                { color: theme.colors.text.primary },
              ]}
            >
              Filter
            </Text>
          </View>

          <Pressable
            onPress={onClear}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Clear filters"
            style={({ pressed }) => [
              styles.clearButton,
              { opacity: pressed ? 0.75 : 1 },
            ]}
          >
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                { color: theme.colors.primary.dim },
              ]}
            >
              Clear Filters
            </Text>
          </Pressable>
        </View>

        <SearchFilterSection title="Services:">
          <ServiceFilterChips
            options={serviceOptions}
            selectedIds={draftFilters.serviceIds}
            onToggle={onToggleService}
          />
        </SearchFilterSection>

        <SearchFilterSection title="Rating:">
          <RatingFilterPicker
            minRating={draftFilters.minRating}
            onSelect={onSelectRating}
          />
        </SearchFilterSection>

        <SearchFilterSection title="Gender:">
          <SearchGenderFilterControl
            activeGender={draftFilters.gender}
            onSelect={onSelectGender}
          />
        </SearchFilterSection>

        <SearchFilterSection title="Distance:">
          <DistanceFilterSlider
            maxDistanceKm={draftFilters.maxDistanceKm}
            onChange={onSelectDistance}
          />
        </SearchFilterSection>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearButton: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  footer: {
    borderTopWidth: 1,
  },
});

export default SearchFilterSheet;
