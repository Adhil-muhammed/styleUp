import React, { useCallback } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { BarberCardData } from "@/data/discoverMock";

export type BarberCardDensity = "default" | "compact";

interface BarberCardProps {
  card: BarberCardData;
  width: number;
  density?: BarberCardDensity;
  onPressCta?: (cardId: string) => void;
}

const DENSITY_METRICS = {
  default: { padding: 24, gap: 16, avatarSize: 56, profileGap: 16 },
  compact: { padding: 16, gap: 12, avatarSize: 48, profileGap: 12 },
} as const;

const BarberCard = ({
  card,
  width,
  density = "default",
  onPressCta,
}: BarberCardProps): React.JSX.Element => {
  const { theme } = useTheme();
  const isFeatured = card.variant === "featured";
  const metrics = DENSITY_METRICS[density];
  const avatarRadius = metrics.avatarSize / 2;

  const handleCtaPress = useCallback((): void => {
    onPressCta?.(card.id);
  }, [card.id, onPressCta]);

  return (
    <BlurView
      intensity={theme.glassmorphism.blur}
      tint="dark"
      style={[
        styles.card,
        {
          width,
          padding: metrics.padding,
          gap: metrics.gap,
          borderRadius: theme.borderRadius.xl,
          borderColor: isFeatured
            ? `${theme.colors.primary.default}4D`
            : theme.colors.border.level1,
          backgroundColor: `${theme.colors.depth.level1}F2`,
          borderWidth: 1,
        },
      ]}
    >
      {isFeatured && (
        <View
          style={[
            styles.featuredTint,
            { backgroundColor: `${theme.colors.primary.default}1A` },
          ]}
          pointerEvents="none"
        />
      )}

      <View style={styles.header}>
        <View style={[styles.profileRow, { gap: metrics.profileGap }]}>
          {card.avatarUri ? (
            <Image
              source={{ uri: card.avatarUri }}
              style={[
                styles.avatar,
                {
                  width: metrics.avatarSize,
                  height: metrics.avatarSize,
                  borderRadius: avatarRadius,
                  borderColor: isFeatured
                    ? theme.colors.primary.default
                    : theme.colors.border.level1,
                  borderWidth: isFeatured ? 2 : 1,
                  ...(isFeatured
                    ? {
                        shadowColor: theme.colors.focus.glow,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 10,
                      }
                    : {}),
                },
              ]}
            />
          ) : (
            <View
              style={[
                styles.avatarPlaceholder,
                {
                  width: metrics.avatarSize,
                  height: metrics.avatarSize,
                  borderRadius: avatarRadius,
                  borderColor: theme.colors.border.level1,
                  backgroundColor: theme.colors.depth.level2,
                },
              ]}
            >
              <MaterialIcons
                name="person"
                size={24}
                color={theme.colors.text.secondary}
              />
            </View>
          )}
          <View style={styles.profileText}>
            <Text
              style={[
                toTextStyle(theme.typography.headlineMd),
                { color: theme.colors.text.primary },
              ]}
            >
              {card.name}
            </Text>
            <Text
              style={[
                toTextStyle(theme.typography.labelSm),
                { color: theme.colors.text.secondary, textTransform: "none" },
              ]}
            >
              {card.specialty}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.ratingPill,
            {
              backgroundColor: theme.colors.depth.level2,
              borderRadius: theme.borderRadius.full,
            },
          ]}
        >
          <MaterialIcons name="star" size={14} color={theme.colors.accent.amber} />
          <Text
            style={[
              toTextStyle(theme.typography.labelSm),
              { color: theme.colors.text.primary, textTransform: "none" },
            ]}
          >
            {card.rating.toFixed(1)}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.slotRow,
          {
            backgroundColor: isFeatured
              ? theme.colors.depth.level2
              : theme.colors.depth.level1,
            borderColor: `${theme.colors.border.level1}80`,
            borderRadius: theme.borderRadius.default,
          },
        ]}
      >
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            { color: theme.colors.text.secondary },
          ]}
        >
          Next slot
        </Text>
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            {
              color: card.nextSlotHighlight
                ? theme.colors.primary.dim
                : theme.colors.text.primary,
              fontWeight: card.nextSlotHighlight ? "700" : "600",
            },
          ]}
        >
          {card.nextSlot}
        </Text>
      </View>

      <Pressable
        onPress={handleCtaPress}
        style={({ pressed }) => [
          styles.cta,
          isFeatured
            ? {
                backgroundColor: pressed
                  ? theme.colors.primary.active
                  : theme.colors.primary.default,
                borderRadius: theme.borderRadius.default,
                shadowColor: "rgba(124, 58, 237, 0.3)",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 15,
              }
            : {
                backgroundColor: "transparent",
                borderColor: pressed
                  ? theme.colors.primary.default
                  : theme.colors.border.level1,
                borderWidth: 1,
                borderRadius: theme.borderRadius.default,
              },
        ]}
      >
        {({ pressed }) => (
          <Text
            style={[
              toTextStyle(theme.typography.labelMd),
              {
                color: isFeatured
                  ? theme.colors.text.onPrimary
                  : pressed
                    ? theme.colors.primary.dim
                    : theme.colors.text.primary,
              },
            ]}
          >
            {card.ctaLabel}
          </Text>
        )}
      </Pressable>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
  },
  featuredTint: {
    ...StyleSheet.absoluteFill,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 1,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    resizeMode: "cover",
  },
  avatarPlaceholder: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    flex: 1,
    gap: 4,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  slotRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    zIndex: 1,
  },
  cta: {
    paddingVertical: 12,
    alignItems: "center",
    zIndex: 1,
  },
});

export default React.memo(BarberCard);
