import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BookingAppointmentHeader,
  GenderSegmentedControl,
  SERVICE_SELECTION_FOOTER_APPROX_HEIGHT,
  ServiceSelectionFooter,
  ServiceVariantCard,
} from "@/components/booking";
import { useServiceVariantScreen } from "@/hooks/useServiceVariantScreen";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"ServiceVariants">;

const FOOTER_EXTRA_PADDING = 16;

const ServiceVariantScreen = ({ route }: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { shopId, categoryId } = route.params;
  const variantScreen = useServiceVariantScreen(shopId, categoryId);

  const scrollBottomPadding =
    SERVICE_SELECTION_FOOTER_APPROX_HEIGHT +
    FOOTER_EXTRA_PADDING +
    insets.bottom +
    theme.spacing.stackMd * 2;

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}>
      <BookingAppointmentHeader
        title={variantScreen.categoryName}
        onGoBack={variantScreen.onGoBack}
      />

      {variantScreen.isSupported ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingHorizontal: theme.spacing.containerMargin,
                paddingBottom: scrollBottomPadding,
                gap: theme.spacing.stackMd,
              },
            ]}
          >
            <GenderSegmentedControl
              activeGender={variantScreen.activeGender}
              onSelect={variantScreen.onSelectGender}
            />

            {variantScreen.variants.map((variant) => (
              <ServiceVariantCard
                key={variant.id}
                variant={variant}
                isSelected={variant.id === variantScreen.selectedVariantId}
                onPress={variantScreen.onSelectVariant}
              />
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <ServiceSelectionFooter
              onApply={variantScreen.onApplySelection}
              estimateCents={variantScreen.estimateCents}
            />
          </View>
        </>
      ) : (
        <View
          style={[
            styles.emptyState,
            { paddingHorizontal: theme.spacing.containerMargin },
          ]}
        >
          <Text
            style={[
              toTextStyle(theme.typography.headlineMd),
              { color: theme.colors.text.primary, textAlign: "center" },
            ]}
          >
            Coming Soon
          </Text>
          <Text
            style={[
              toTextStyle(theme.typography.bodyMd),
              {
                color: theme.colors.text.secondary,
                textAlign: "center",
                marginTop: theme.spacing.stackSm,
              },
            ]}
          >
            Variants for this service are coming soon.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 30,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ServiceVariantScreen;
