import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { ShopProfile } from "@/data/barberProfileMock";

interface ShopProfileHeaderProps {
  shop: Pick<ShopProfile, "name" | "isOpen" | "address" | "rating" | "reviewCount">;
}

const ShopProfileHeader = ({ shop }: ShopProfileHeaderProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { paddingHorizontal: theme.spacing.containerMargin }]}>
      <View style={styles.titleRow}>
        <Text
          style={[
            toTextStyle(theme.typography.headlineLg),
            styles.title,
            { color: theme.colors.text.primary, flex: 1 },
          ]}
        >
          {shop.name}
        </Text>
        {shop.isOpen ? (
          <View
            style={[
              styles.openBadge,
              {
                backgroundColor: theme.colors.accent.amber,
                borderRadius: theme.borderRadius.full,
              },
            ]}
          >
            <Text
              style={[
                toTextStyle(theme.typography.labelSm),
                { color: theme.colors.depth.level0, textTransform: "none" },
              ]}
            >
              Open
            </Text>
          </View>
        ) : null}
      </View>

      <View style={[styles.metaRow, { gap: theme.spacing.stackSm }]}>
        <MaterialIcons name="location-on" size={16} color={theme.colors.accent.amber} />
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            { color: theme.colors.text.secondary, flex: 1 },
          ]}
        >
          {shop.address}
        </Text>
      </View>

      <View style={styles.ratingRow}>
        <MaterialIcons name="star" size={16} color={theme.colors.accent.amber} />
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            { color: theme.colors.text.primary },
          ]}
        >
          {shop.rating.toFixed(1)}
        </Text>
        <Text
          style={[
            toTextStyle(theme.typography.labelSm),
            { color: theme.colors.text.disabled, textTransform: "none" },
          ]}
        >
          ({shop.reviewCount.toLocaleString()} reviews)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginTop: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    flexShrink: 1,
  },
  openBadge: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});

export default ShopProfileHeader;
