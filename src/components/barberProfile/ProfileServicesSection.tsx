import React from "react";
import { StyleSheet, View } from "react-native";
import ServiceCategoryRow, {
  type SelectedServiceVariantSummary,
} from "@/components/barberProfile/ServiceCategoryRow";
import { useTheme } from "@/hooks/useTheme";
import type { ServiceCategory } from "@/data/barberProfileMock";

interface ProfileServicesSectionProps {
  categories: readonly ServiceCategory[];
  selectedVariantSummaries: Record<string, SelectedServiceVariantSummary>;
  onCategoryPress: (categoryId: string) => void;
}

const ProfileServicesSection = ({
  categories,
  selectedVariantSummaries,
  onCategoryPress,
}: ProfileServicesSectionProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.list, { gap: theme.spacing.stackMd }]}>
      {categories.map((category) => {
        const selectedVariant = selectedVariantSummaries[category.id];
        return (
          <ServiceCategoryRow
            key={category.id}
            category={category}
            {...(selectedVariant !== undefined ? { selectedVariant } : {})}
            onPress={onCategoryPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
});

export default ProfileServicesSection;
