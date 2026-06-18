import React, { useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { ResolvedNearestSalon } from "@/data/homeMock";

type RatingDisplay = "stars" | "score";

interface HomeSalonListCardProps {
  salon: ResolvedNearestSalon;
  onPress: (shopId: string) => void;
  onBookPress?: (shopId: string) => void;
  ratingDisplay?: RatingDisplay;
}

const THUMBNAIL_SIZE_DEFAULT = 96;
const THUMBNAIL_SIZE_SEARCH = 100;
const STAR_COUNT = 3;

const HomeSalonListCard = ({
  salon,
  onPress,
  onBookPress,
  ratingDisplay = "stars",
}: HomeSalonListCardProps): React.JSX.Element => {
  const { theme } = useTheme();
  const isSearchVariant = ratingDisplay === "score";
  const thumbnailSize = isSearchVariant
    ? THUMBNAIL_SIZE_SEARCH
    : THUMBNAIL_SIZE_DEFAULT;

  const handlePress = useCallback((): void => {
    onPress(salon.shopId);
  }, [onPress, salon.shopId]);

  const handleBookPress = useCallback((): void => {
    onBookPress?.(salon.shopId);
  }, [onBookPress, salon.shopId]);

  const cardContent = (
    <View
      style={[
        styles.card,
        isSearchVariant && styles.cardSearch,
        {
          backgroundColor: theme.colors.depth.level1,
          borderColor: theme.colors.border.level1,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.stackMd,
          gap: theme.spacing.stackMd,
        },
      ]}
    >
      <View
        style={[
          styles.thumbnailWrap,
          {
            width: thumbnailSize,
            height: thumbnailSize,
            borderRadius: theme.borderRadius.lg,
          },
        ]}
      >
        <Image source={{ uri: salon.imageUri }} style={styles.thumbnail} />
      </View>

      <View
        style={[
          styles.details,
          !isSearchVariant && { gap: 4 },
          isSearchVariant && {
            minHeight: thumbnailSize,
            justifyContent: "space-between",
            paddingVertical: 4,
          },
        ]}
      >
        <View style={styles.textBlock}>
          <Typography
            variant={ratingDisplay === "score" ? "bodyLg" : "labelMd"}
            color={theme.colors.text.primary}
            style={styles.name}
          >
            {salon.name}
          </Typography>
          <Typography
            variant="labelSm"
            color={
              ratingDisplay === "score"
                ? theme.colors.text.secondary
                : theme.colors.primary.dim
            }
            numberOfLines={1}
            style={styles.address}
          >
            {salon.address}
          </Typography>
        </View>

        <View
          style={[
            styles.metaRow,
            isSearchVariant && { marginTop: 0 },
          ]}
        >
          <View
            style={[
              styles.metaLeft,
              isSearchVariant && styles.metaLeftSearch,
            ]}
          >
            {ratingDisplay === "score" ? (
              <View style={styles.ratingRow}>
                <MaterialIcons
                  name="star"
                  size={16}
                  color={theme.colors.accent.amber}
                />
                <Text
                  style={[
                    toTextStyle(theme.typography.labelMd),
                    styles.scoreText,
                    { color: theme.colors.accent.amber },
                  ]}
                >
                  {salon.rating.toFixed(1)}
                </Text>
              </View>
            ) : (
              <View style={styles.ratingRow}>
                {Array.from({ length: STAR_COUNT }, (_, index) => (
                  <MaterialIcons
                    key={`star-${salon.shopId}-${String(index)}`}
                    name="star"
                    size={16}
                    color={theme.colors.accent.amber}
                  />
                ))}
                <Text
                  style={[
                    toTextStyle(theme.typography.labelSm),
                    styles.ratingText,
                    { color: theme.colors.primary.dim },
                  ]}
                >
                  ({salon.rating.toFixed(1)})
                </Text>
              </View>
            )}

            <View style={[styles.distanceRow, isSearchVariant && styles.distanceRowSearch]}>
              <MaterialIcons
                name="location-on"
                size={16}
                color={
                  ratingDisplay === "score"
                    ? theme.colors.text.secondary
                    : theme.colors.primary.dim
                }
              />
              <Text
                numberOfLines={1}
                style={[
                  toTextStyle(theme.typography.labelMd),
                  styles.distanceText,
                  isSearchVariant && styles.distanceTextSearch,
                  {
                    color:
                      ratingDisplay === "score"
                        ? theme.colors.text.secondary
                        : theme.colors.primary.dim,
                  },
                ]}
              >
                {salon.distanceKm} km
              </Text>
            </View>
          </View>

          {onBookPress !== undefined ? (
            <Pressable
              onPress={handleBookPress}
              hitSlop={8}
              style={({ pressed }) => [
                styles.bookButton,
                {
                  backgroundColor: theme.colors.primary.default,
                  borderRadius: theme.borderRadius.full,
                  marginLeft: theme.spacing.stackSm,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Typography
                variant="labelMd"
                color={theme.colors.text.onPrimary}
                style={styles.bookLabel}
              >
                Book
              </Typography>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={4}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
    >
      {cardContent}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  cardSearch: {
    alignItems: "flex-start",
  },
  thumbnailWrap: {
    overflow: "hidden",
    flexShrink: 0,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  details: {
    flex: 1,
    minWidth: 0,
  },
  textBlock: {
    gap: 4,
  },
  name: {
    textTransform: "none",
    fontWeight: "700",
  },
  address: {
    textTransform: "none",
    fontWeight: "400",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 8,
  },
  metaLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    minWidth: 0,
  },
  metaLeftSearch: {
    flexShrink: 0,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    flexShrink: 0,
  },
  ratingText: {
    textTransform: "none",
    marginLeft: 4,
    fontWeight: "400",
  },
  scoreText: {
    textTransform: "none",
    fontWeight: "700",
  },
  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  distanceRowSearch: {
    flexShrink: 0,
  },
  distanceText: {
    textTransform: "none",
    fontWeight: "400",
  },
  distanceTextSearch: {
    flexShrink: 0,
  },
  bookButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexShrink: 0,
  },
  bookLabel: {
    textTransform: "none",
  },
});

export default HomeSalonListCard;
