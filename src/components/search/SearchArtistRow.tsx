import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import SearchArtistChip from "./SearchArtistChip";
import type { PopularArtist } from "@/data/searchMock";
import { useTheme } from "@/hooks/useTheme";

interface SearchArtistRowProps {
  artists: readonly PopularArtist[];
  onArtistPress: (artistId: string) => void;
}

const SearchArtistRow = ({
  artists,
  onArtistPress,
}: SearchArtistRowProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        { gap: theme.spacing.stackLg, paddingBottom: 4 },
      ]}
    >
      {artists.map((artist) => (
        <SearchArtistChip
          key={artist.id}
          artist={artist}
          onPress={onArtistPress}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

export default SearchArtistRow;
