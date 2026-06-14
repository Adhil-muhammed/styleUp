import React from "react";
import { StyleSheet, View } from "react-native";
import PackageOfferCard from "@/components/barberProfile/PackageOfferCard";
import { useTheme } from "@/hooks/useTheme";
import type { ShopPackage } from "@/data/barberProfileMock";

interface ProfilePackagesSectionProps {
  packages: readonly ShopPackage[];
  onPackagePress: (packageId: string) => void;
  onPackageBookPress: (packageId: string) => void;
}

const ProfilePackagesSection = ({
  packages,
  onPackagePress,
  onPackageBookPress,
}: ProfilePackagesSectionProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.list, { gap: theme.spacing.stackMd }]}>
      {packages.map((shopPackage) => (
        <PackageOfferCard
          key={shopPackage.id}
          package={shopPackage}
          onCardPress={onPackagePress}
          onBookPress={onPackageBookPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
});

export default ProfilePackagesSection;
