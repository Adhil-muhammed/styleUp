import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FilterPillRow from "@/components/discover/FilterPillRow";
import {
  BarberProfileHero,
  ProfileAboutSection,
  ProfileActionBar,
  ProfileAddressSection,
  ProfileBookBar,
  ProfileContactSection,
  ProfilePackagesSection,
  ProfileServicesSection,
  ProfileWorkingHours,
  ShopProfileHeader,
  SpecialistCarousel,
} from "@/components/barberProfile";
import { CONFIRM_CTA_APPROX_HEIGHT } from "@/components/booking";
import { useBarberProfile } from "@/hooks/useBarberProfile";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"BarberProfile">;

const BOOK_BAR_EXTRA_PADDING = 16;

const BarberProfileScreen = ({ route }: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const profile = useBarberProfile(route.params.shopId);

  const showBookBar = profile.activeTab !== "package";

  const scrollBottomPadding = showBookBar
    ? CONFIRM_CTA_APPROX_HEIGHT +
      BOOK_BAR_EXTRA_PADDING +
      insets.bottom +
      theme.spacing.stackMd * 2
    : insets.bottom + theme.spacing.stackMd;

  const heroImage = profile.shop.heroImages[0] ?? "";

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scrollBottomPadding }}
      >
        <BarberProfileHero
          heroImageUri={heroImage}
          imageCount={profile.shop.heroImages.length}
          onGoBack={profile.onGoBack}
        />

        <ShopProfileHeader shop={profile.shop} />

        <ProfileActionBar onActionPress={profile.onActionPress} />

        <SpecialistCarousel specialists={profile.shop.specialists} />

        <View
          style={{
            paddingHorizontal: theme.spacing.containerMargin,
            marginBottom: theme.spacing.stackLg,
          }}
        >
          <FilterPillRow
            options={[...profile.tabOptions]}
            activeId={profile.activeTab}
            onSelect={profile.onTabChange}
          />
        </View>

        <View
          style={[
            styles.tabContent,
            {
              paddingHorizontal: theme.spacing.containerMargin,
              gap: theme.spacing.sectionGap,
            },
          ]}
        >
          {profile.activeTab === "about" ? (
            <>
              <ProfileAboutSection
                about={profile.shop.about}
                isExpanded={profile.isAboutExpanded}
                onToggleExpanded={profile.onToggleAboutExpanded}
              />
              <ProfileWorkingHours workingHours={profile.shop.workingHours} />
              <ProfileContactSection phone={profile.shop.phone} />
              <ProfileAddressSection
                address={profile.shop.address}
                mapImageUri={heroImage}
              />
            </>
          ) : profile.activeTab === "services" ? (
            <ProfileServicesSection
              categories={profile.serviceCategories}
              onCategoryPress={profile.onServiceCategoryPress}
            />
          ) : profile.activeTab === "package" ? (
            <ProfilePackagesSection
              packages={profile.packages}
              onPackagePress={profile.onPackagePress}
              onPackageBookPress={profile.onPackageBookPress}
            />
          ) : (
            <Text
              style={[
                toTextStyle(theme.typography.bodyMd),
                { color: theme.colors.text.secondary },
              ]}
            >
              {profile.activeTab.charAt(0).toUpperCase() + profile.activeTab.slice(1)} content coming soon.
            </Text>
          )}
        </View>
      </ScrollView>

      {showBookBar ? (
        <View style={styles.bookBar}>
          <ProfileBookBar onBookNow={profile.onBookNow} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabContent: {
    flexGrow: 1,
  },
  bookBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 30,
  },
});

export default BarberProfileScreen;
