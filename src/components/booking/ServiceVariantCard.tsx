import React, { useCallback } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GlassPanel, Price } from "@/components/common";
import Typography from "@/components/common/Typography";
import ServiceRadioIndicator from "./ServiceRadioIndicator";
import { useTheme } from "@/hooks/useTheme";
import type { ServiceVariant } from "@/data/serviceVariantMock";

interface ServiceVariantCardProps {
  variant: ServiceVariant;
  isSelected: boolean;
  onPress: (variantId: string) => void;
}

const IMAGE_SIZE = 80;
const TRENDING_ICON_SIZE = 14;

function formatBookedCount(count: number): string {
  return count.toLocaleString("en-US");
}

const ServiceVariantCard = ({
  variant,
  isSelected,
  onPress,
}: ServiceVariantCardProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback((): void => {
    onPress(variant.id);
  }, [onPress, variant.id]);

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={4}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
    >
      <GlassPanel selected={isSelected} style={styles.panel}>
        <View style={[styles.content, { padding: theme.spacing.stackMd }]}>
          <Image
            source={{ uri: variant.imageUri }}
            style={[
              styles.image,
              {
                borderRadius: theme.borderRadius.lg,
                borderColor: isSelected
                  ? `${theme.colors.primary.default}4D`
                  : theme.colors.border.level1,
              },
            ]}
          />

          <View style={styles.textCol}>
            <Typography variant="bodyMd" color={theme.colors.text.primary}>
              {variant.title}
            </Typography>

            <View style={styles.bookedRow}>
              <MaterialIcons
                name="trending-up"
                size={TRENDING_ICON_SIZE}
                color={theme.colors.text.secondary}
              />
              <Typography
                variant="labelSm"
                color={theme.colors.text.secondary}
                style={{ textTransform: "none" }}
              >
                {formatBookedCount(variant.bookedCount)} booked
              </Typography>
            </View>

            <Price amountMinor={variant.priceCents} />
          </View>

          <ServiceRadioIndicator isSelected={isSelected} />
        </View>
      </GlassPanel>
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
    gap: 16,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: "cover",
    borderWidth: 1,
  },
  textCol: {
    flex: 1,
    gap: 4,
  },
  bookedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

export default React.memo(ServiceVariantCard);
