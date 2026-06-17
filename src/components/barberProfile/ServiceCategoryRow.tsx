import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GlassPanel, Price } from "@/components/common";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { ServiceCategory } from "@/data/barberProfileMock";

export interface SelectedServiceVariantSummary {
  title: string;
  priceCents: number;
}

interface ServiceCategoryRowProps {
  category: ServiceCategory;
  onPress: (categoryId: string) => void;
  selectedVariant?: SelectedServiceVariantSummary;
}

const CHEVRON_SIZE = 18;

const ServiceCategoryRow = ({
  category,
  onPress,
  selectedVariant,
}: ServiceCategoryRowProps): React.JSX.Element => {
  const { theme } = useTheme();
  const hasSelection = selectedVariant !== undefined;

  const handlePress = useCallback((): void => {
    onPress(category.id);
  }, [onPress, category.id]);

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
    >
      {({ pressed }) => (
        <GlassPanel
          selected={hasSelection || pressed}
          style={[
            styles.panel,
            hasSelection && {
              borderColor: theme.colors.accent.amber,
            },
            pressed &&
              !hasSelection && { borderColor: theme.colors.primary.default },
          ]}
        >
          <View style={[styles.content, { padding: theme.spacing.stackMd }]}>
            <Text
              style={[
                toTextStyle(theme.typography.bodyMd),
                {
                  color: hasSelection
                    ? theme.colors.text.secondary
                    : theme.colors.text.primary,
                },
              ]}
            >
              {category.name}
            </Text>

            <View style={styles.trailing}>
              {hasSelection ? (
                <View style={styles.selectionCol}>
                  <Text
                    style={[
                      toTextStyle(theme.typography.bodyMd),
                      { color: theme.colors.text.primary },
                    ]}
                  >
                    {selectedVariant.title}
                  </Text>
                  <Price amountMinor={selectedVariant.priceCents} />
                </View>
              ) : (
                <Text
                  style={[
                    toTextStyle(theme.typography.labelSm),
                    { color: theme.colors.text.secondary },
                  ]}
                >
                  {category.variantCount} types
                </Text>
              )}
              <MaterialIcons
                name="chevron-right"
                size={CHEVRON_SIZE}
                color={theme.colors.accent.amber}
              />
            </View>
          </View>
        </GlassPanel>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  panel: {
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  trailing: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  selectionCol: {
    alignItems: "flex-end",
    gap: 2,
  },
});

export default React.memo(ServiceCategoryRow);
