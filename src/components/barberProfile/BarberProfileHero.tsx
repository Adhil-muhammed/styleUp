import React, { useCallback } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";

interface BarberProfileHeroProps {
  heroImageUri: string;
  imageCount: number;
  activeImageIndex?: number;
  onGoBack: () => void;
  onBookmarkPress?: () => void;
}

const BarberProfileHero = ({
  heroImageUri,
  imageCount,
  activeImageIndex = 0,
  onGoBack,
  onBookmarkPress,
}: BarberProfileHeroProps): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const handleBookmark = useCallback((): void => {
    onBookmarkPress?.();
  }, [onBookmarkPress]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: heroImageUri }} style={styles.image} />
      <LinearGradient
        colors={["rgba(0,0,0,0.4)", "transparent", theme.colors.depth.level0]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={[
          styles.headerRow,
          {
            top: insets.top + theme.spacing.stackMd,
            paddingHorizontal: theme.spacing.containerMargin,
          },
        ]}
      >
        <Pressable
          onPress={onGoBack}
          hitSlop={8}
          style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
        >
          <BlurView intensity={theme.glassmorphism.blur} tint="dark" style={styles.iconButton}>
            <MaterialIcons name="arrow-back" size={22} color={theme.colors.text.onPrimary} />
          </BlurView>
        </Pressable>

        <Pressable
          onPress={handleBookmark}
          hitSlop={8}
          style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
        >
          <BlurView intensity={theme.glassmorphism.blur} tint="dark" style={styles.iconButton}>
            <MaterialIcons name="bookmark-border" size={22} color={theme.colors.text.onPrimary} />
          </BlurView>
        </Pressable>
      </View>

      <View style={[styles.dotsRow, { bottom: theme.spacing.stackMd }]}>
        {Array.from({ length: imageCount }, (_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeImageIndex
                ? {
                    width: 24,
                    backgroundColor: theme.colors.primary.default,
                  }
                : {
                    width: 6,
                    backgroundColor: "rgba(255,255,255,0.5)",
                  },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 4 / 3,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  headerRow: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  dotsRow: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    zIndex: 10,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
});

export default BarberProfileHero;
