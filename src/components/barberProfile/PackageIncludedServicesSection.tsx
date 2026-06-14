import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PackageServiceCheckItem from "@/components/barberProfile/PackageServiceCheckItem";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface PackageIncludedServicesSectionProps {
  services: readonly string[];
  selectedServices: ReadonlySet<string>;
  onToggleService: (service: string) => void;
}

const PackageIncludedServicesSection = ({
  services,
  selectedServices,
  onToggleService,
}: PackageIncludedServicesSectionProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={{ marginTop: theme.spacing.sectionGap }}>
      <Text
        style={[
          toTextStyle(theme.typography.headlineMd),
          styles.title,
          { color: theme.colors.text.primary },
        ]}
      >
        Services
      </Text>
      <View style={[styles.grid, { gap: theme.spacing.stackMd }]}>
        {services.map((service) => (
          <View key={service} style={styles.cell}>
            <PackageServiceCheckItem
              label={service}
              isChecked={selectedServices.has(service)}
              onPress={onToggleService}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: "48%",
  },
});

export default PackageIncludedServicesSection;
