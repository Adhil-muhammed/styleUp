import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  PackageDetailsFooter,
  PackageDetailsHeader,
  PackageIncludedServicesSection,
  ProfileAboutSection,
  PACKAGE_DETAILS_FOOTER_APPROX_HEIGHT,
} from "@/components/barberProfile";
import { usePackageDetails } from "@/hooks/usePackageDetails";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"PackageDetails">;

const FOOTER_EXTRA_PADDING = 16;

const PackageDetailsScreen = ({ route }: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { shopId, packageId } = route.params;
  const details = usePackageDetails(shopId, packageId);

  const scrollBottomPadding =
    PACKAGE_DETAILS_FOOTER_APPROX_HEIGHT +
    FOOTER_EXTRA_PADDING +
    insets.bottom +
    theme.spacing.stackMd * 2;

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}>
      <PackageDetailsHeader
        onGoBack={details.onGoBack}
        onOptionsPress={details.onOptionsPress}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: theme.spacing.containerMargin,
            paddingBottom: scrollBottomPadding,
          },
        ]}
      >
        <Image
          source={{ uri: details.package.detailImageUri }}
          style={[
            styles.heroImage,
            {
              borderRadius: theme.borderRadius.xl,
              borderColor: theme.colors.border.level1,
            },
          ]}
        />

        <Text
          style={[
            toTextStyle(theme.typography.headlineLgMobile),
            styles.title,
            { color: theme.colors.text.primary },
          ]}
        >
          {details.package.title}
        </Text>

        <Text
          style={[
            toTextStyle(theme.typography.labelSm),
            styles.subtitle,
            { color: theme.colors.text.secondary, textTransform: "none", fontWeight: "500" },
          ]}
        >
          {details.package.subtitle}
        </Text>

        <View style={{ marginTop: theme.spacing.stackLg }}>
          <ProfileAboutSection
            about={details.package.description}
            isExpanded={details.isDescriptionExpanded}
            onToggleExpanded={details.onToggleDescription}
          />
        </View>

        <PackageIncludedServicesSection
          services={details.package.includedServices}
          selectedServices={details.selectedServices}
          onToggleService={details.onToggleService}
        />
      </ScrollView>

      <View style={styles.footer}>
        <PackageDetailsFooter
          price={details.package.price}
          onBookPress={details.onBookNow}
        />
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
  heroImage: {
    width: "100%",
    aspectRatio: 4 / 3,
    resizeMode: "cover",
    borderWidth: 1,
  },
  title: {
    marginTop: 32,
  },
  subtitle: {
    marginTop: 8,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 30,
  },
});

export default PackageDetailsScreen;
