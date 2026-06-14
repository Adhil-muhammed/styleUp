import React, { useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { ShopPackage } from "@/data/barberProfileMock";

interface PackageOfferCardProps {
  package: ShopPackage;
  onCardPress: (packageId: string) => void;
  onBookPress: (packageId: string) => void;
}

const IMAGE_SIZE = 112;

const PackageOfferCard = ({
  package: shopPackage,
  onCardPress,
  onBookPress,
}: PackageOfferCardProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handleCardPress = useCallback((): void => {
    onCardPress(shopPackage.id);
  }, [onCardPress, shopPackage.id]);

  const handleBookPress = useCallback((): void => {
    onBookPress(shopPackage.id);
  }, [onBookPress, shopPackage.id]);

  return (
    <View
      style={[
        styles.card,
        {
          gap: theme.spacing.stackMd,
          padding: 12,
          borderRadius: theme.borderRadius.xl,
          backgroundColor: theme.colors.depth.level1,
          borderColor: theme.colors.border.level1,
        },
      ]}
    >
      <Pressable
        onPress={handleCardPress}
        hitSlop={8}
        style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
      >
        <Image
          source={{ uri: shopPackage.imageUri }}
          style={[
            styles.image,
            { borderRadius: theme.borderRadius.lg },
          ]}
        />
      </Pressable>

      <View style={styles.content}>
        <Pressable
          onPress={handleCardPress}
          hitSlop={8}
          style={({ pressed }) => [{ flex: 1, opacity: pressed ? 0.85 : 1 }]}
        >
          <Text
            style={[
              toTextStyle(theme.typography.bodyMd),
              { color: theme.colors.text.primary, fontWeight: "600" },
            ]}
          >
            {shopPackage.title}
          </Text>
          <Text
            style={[
              toTextStyle(theme.typography.labelSm),
              styles.subtitle,
              { color: theme.colors.text.secondary, textTransform: "none" },
            ]}
          >
            {shopPackage.subtitle}
          </Text>
        </Pressable>

        <View style={styles.footer}>
          <Text
            style={[
              toTextStyle(theme.typography.bodyLg),
              { color: theme.colors.accent.amber, fontWeight: "700" },
            ]}
          >
            {shopPackage.price}
          </Text>

          <Pressable
            onPress={handleBookPress}
            hitSlop={8}
            style={({ pressed }) => [
              styles.bookButton,
              {
                backgroundColor: pressed
                  ? theme.colors.primary.active
                  : theme.colors.primary.default,
                borderRadius: theme.borderRadius.full,
                transform: [{ scale: pressed ? 0.96 : 1 }],
              },
            ]}
          >
            <Text
              style={[
                toTextStyle(theme.typography.labelSm),
                { color: theme.colors.text.onPrimary, fontWeight: "600", textTransform: "none" },
              ]}
            >
              Book Now
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderWidth: 1,
    width: "100%",
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  subtitle: {
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  bookButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});

export default React.memo(PackageOfferCard);
