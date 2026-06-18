import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { BookingPillButton } from "@/components/booking";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { HomePromo } from "@/data/homeMock";

interface HomePromoBannerProps {
  promo: HomePromo;
  onBookPress: () => void;
}

const BANNER_HEIGHT = 192;

const HomePromoBanner = ({
  promo,
  onBookPress,
}: HomePromoBannerProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.depth.level1,
          borderColor: theme.colors.border.level1,
          borderRadius: theme.borderRadius.xl,
          marginHorizontal: theme.spacing.containerMargin,
        },
      ]}
    >
      <View style={[styles.copy, { padding: theme.spacing.stackLg, gap: theme.spacing.stackSm }]}>
        <Text
          style={[
            toTextStyle(theme.typography.displayLg),
            styles.discount,
            { color: theme.colors.text.primary },
          ]}
        >
          {promo.discountLabel}
        </Text>
        <Text
          style={[
            toTextStyle(theme.typography.labelSm),
            styles.subtitle,
            { color: theme.colors.primary.dim },
          ]}
        >
          {promo.subtitle}
        </Text>
        <View style={styles.ctaWrap}>
          <BookingPillButton
            label={promo.ctaLabel}
            onPress={onBookPress}
            variant="primary"
          />
        </View>
      </View>
      <View style={styles.imageWrap}>
        <Image source={{ uri: promo.imageUri }} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    height: BANNER_HEIGHT,
    borderWidth: 1,
    overflow: "hidden",
  },
  copy: {
    flex: 1,
    justifyContent: "center",
  },
  discount: {
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "900",
  },
  subtitle: {
    textTransform: "none",
    fontWeight: "400",
    lineHeight: 16,
    maxWidth: 160,
  },
  ctaWrap: {
    marginTop: 8,
    width: 120,
  },
  imageWrap: {
    width: "40%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default HomePromoBanner;
