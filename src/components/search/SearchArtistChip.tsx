import React, { useCallback } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";
import type { PopularArtist } from "@/data/searchMock";

interface SearchArtistChipProps {
  artist: PopularArtist;
  onPress: (artistId: string) => void;
}

const AVATAR_SIZE = 80;
const CHIP_WIDTH = 96;

const SearchArtistChip = ({
  artist,
  onPress,
}: SearchArtistChipProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback((): void => {
    onPress(artist.id);
  }, [artist.id, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.chip,
        { width: CHIP_WIDTH, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <View
        style={[
          styles.avatarWrap,
          {
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: theme.borderRadius.full,
          },
        ]}
      >
        <Image source={{ uri: artist.imageUri }} style={styles.avatar} />
      </View>
      <Typography
        variant="labelMd"
        color={theme.colors.text.primary}
        numberOfLines={1}
        style={styles.name}
      >
        {artist.name}
      </Typography>
      <Typography
        variant="labelSm"
        color={theme.colors.text.secondary}
        numberOfLines={1}
        style={styles.role}
      >
        {artist.role}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },
  avatarWrap: {
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  name: {
    textTransform: "none",
    textAlign: "center",
  },
  role: {
    textTransform: "none",
    fontWeight: "400",
    textAlign: "center",
    fontSize: 11,
    lineHeight: 14,
  },
});

export default SearchArtistChip;
