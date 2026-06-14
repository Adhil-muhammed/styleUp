import React from "react";
import { StyleSheet, View } from "react-native";
import ServiceCategoryRow from "@/components/barberProfile/ServiceCategoryRow";
import { useTheme } from "@/hooks/useTheme";
import type { ServiceCategory } from "@/data/barberProfileMock";

interface ProfileServicesSectionProps {
  categories: readonly ServiceCategory[];
  onCategoryPress: (categoryId: string) => void;
}

const ProfileServicesSection = ({
  categories,
  onCategoryPress,
}: ProfileServicesSectionProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.list, { gap: theme.spacing.stackMd }]}>
      {categories.map((category) => (
        <ServiceCategoryRow
          key={category.id}
          category={category}
          onPress={onCategoryPress}
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

export default ProfileServicesSection;
