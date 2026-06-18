import React, { useCallback } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";
import type { HomeCategory } from "@/data/homeMock";

interface HomeCategoryChipProps {
  category: HomeCategory;
  onPress: (categoryId: string) => void;
}

const TILE_SIZE = 80;

const HomeCategoryChip = ({
  category,
  onPress,
}: HomeCategoryChipProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback((): void => {
    onPress(category.id);
  }, [category.id, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.container,
        { gap: theme.spacing.stackSm, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <View
        style={[
          styles.tile,
          {
            backgroundColor: theme.colors.depth.level1,
            borderColor: theme.colors.border.level1,
            borderRadius: theme.borderRadius.lg,
          },
        ]}
      >
        <Image source={{ uri: category.imageUri }} style={styles.image} />
      </View>
      <Typography
        variant="labelMd"
        color={theme.colors.text.primary}
        style={styles.label}
      >
        {category.label}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    minWidth: TILE_SIZE,
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  label: {
    textTransform: "none",
    fontWeight: "500",
  },
});

export default HomeCategoryChip;
