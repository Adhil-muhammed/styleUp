import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/useTheme";
import { MAP_IMAGE_URI } from "@/data/discoverMock";

const MapBackground = (): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.depth.level0 }]}>
      <ImageBackground
        source={{ uri: MAP_IMAGE_URI }}
        style={styles.mapImage}
        imageStyle={styles.mapImageInner}
        resizeMode="cover"
      />
      <LinearGradient
        colors={[
          `${theme.colors.depth.background}CC`,
          "transparent",
          `${theme.colors.depth.background}E6`,
        ]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
  mapImage: {
    flex: 1,
    opacity: 0.4,
  },
  mapImageInner: {
    opacity: 0.85,
  },
});

export default MapBackground;
