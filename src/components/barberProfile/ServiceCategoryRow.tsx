import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GlassPanel } from "@/components/common";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { ServiceCategory } from "@/data/barberProfileMock";

interface ServiceCategoryRowProps {
  category: ServiceCategory;
  onPress: (categoryId: string) => void;
}

const CHEVRON_SIZE = 18;

const ServiceCategoryRow = ({
  category,
  onPress,
}: ServiceCategoryRowProps): React.JSX.Element => {
  const { theme } = useTheme();

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
          selected={pressed}
          style={[
            styles.panel,
            pressed && { borderColor: theme.colors.primary.default },
          ]}
        >
          <View
            style={[
              styles.content,
              { padding: theme.spacing.stackMd },
            ]}
          >
            <Text
              style={[
                toTextStyle(theme.typography.bodyMd),
                { color: theme.colors.text.primary },
              ]}
            >
              {category.name}
            </Text>

            <View style={styles.trailing}>
              <Text
                style={[
                  toTextStyle(theme.typography.labelMd),
                  { color: theme.colors.text.secondary },
                ]}
              >
                {category.variantCount} types
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={CHEVRON_SIZE}
                color={theme.colors.primary.default}
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
});

export default React.memo(ServiceCategoryRow);
