import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ServiceCategoryRow from "@/components/barberProfile/ServiceCategoryRow";
import {
  BookingAppointmentHeader,
  CONFIRM_CTA_APPROX_HEIGHT,
  ConfirmBookingBar,
} from "@/components/booking";
import { useOurServicesScreen } from "@/hooks/useOurServicesScreen";
import { useTheme } from "@/hooks/useTheme";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"OurServices">;

const FOOTER_EXTRA_PADDING = 16;

const OurServicesScreen = ({ route }: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { shopId } = route.params;
  const services = useOurServicesScreen(shopId);

  const scrollBottomPadding =
    CONFIRM_CTA_APPROX_HEIGHT +
    FOOTER_EXTRA_PADDING +
    insets.bottom +
    theme.spacing.stackMd * 2;

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}>
      <BookingAppointmentHeader
        title="Our Services"
        onGoBack={services.onGoBack}
      />

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
        {services.categories.map(({ category, selectedVariant }) => (
          <ServiceCategoryRow
            key={category.id}
            category={category}
            {...(selectedVariant !== undefined ? { selectedVariant } : {})}
            onPress={services.onCategoryPress}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View
          style={[
            styles.footerInner,
            {
              paddingBottom: insets.bottom + theme.spacing.stackMd,
              paddingTop: theme.spacing.stackMd,
              paddingHorizontal: theme.spacing.containerMargin,
              borderTopColor: theme.colors.border.level1,
            },
          ]}
        >
          <BlurView
            intensity={theme.glassmorphism.blur}
            tint="dark"
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: `${theme.colors.depth.level0}CC` },
            ]}
            pointerEvents="none"
          />
          <ConfirmBookingBar
            onConfirm={services.onBookNow}
            label={services.bookNowLabel}
            showArrow={false}
            // disabled={!services.hasSelection}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 30,
  },
  footerInner: {
    borderTopWidth: 1,
    overflow: "hidden",
  },
});

export default OurServicesScreen;
