import React, { useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface ProfileAddressSectionProps {
  address: string;
  mapImageUri?: string;
  onSeeOnMapsPress?: () => void;
}

const MAP_HEIGHT = 192;

const ProfileAddressSection = ({
  address,
  mapImageUri,
  onSeeOnMapsPress,
}: ProfileAddressSectionProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handleSeeOnMaps = useCallback((): void => {
    onSeeOnMapsPress?.();
  }, [onSeeOnMapsPress]);

  return (
    <View style={{ gap: theme.spacing.stackMd }}>
      <View style={styles.headerRow}>
        <Text
          style={[
            toTextStyle(theme.typography.headlineMd),
            { color: theme.colors.text.primary },
          ]}
        >
          Our Address
        </Text>
        <Pressable
          onPress={handleSeeOnMaps}
          hitSlop={8}
          style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
        >
          <Text
            style={[
              toTextStyle(theme.typography.labelMd),
              { color: theme.colors.accent.amber, fontWeight: "700" },
            ]}
          >
            See on Maps
          </Text>
        </Pressable>
      </View>

      <View style={styles.addressRow}>
        <MaterialIcons name="location-on" size={16} color={theme.colors.accent.amber} />
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            { color: theme.colors.text.secondary, flex: 1 },
          ]}
        >
          {address}
        </Text>
      </View>

      <View
        style={[
          styles.mapPlaceholder,
          {
            height: MAP_HEIGHT,
            backgroundColor: theme.colors.depth.level1,
            borderColor: theme.colors.border.level1,
            borderRadius: theme.borderRadius.xl * 2,
          },
        ]}
      >
        {mapImageUri ? (
          <Image source={{ uri: mapImageUri }} style={styles.mapImage} />
        ) : null}
        <View style={styles.mapOverlay} />
        <View style={styles.pinWrap}>
          <MaterialIcons
            name="location-on"
            size={48}
            color={theme.colors.accent.amber}
            style={styles.pinIcon}
          />
          {mapImageUri ? (
            <View
              style={[
                styles.pinAvatar,
                {
                  borderColor: theme.colors.accent.amber,
                  backgroundColor: theme.colors.depth.level0,
                },
              ]}
            >
              <Image source={{ uri: mapImageUri }} style={styles.pinAvatarImage} />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mapPlaceholder: {
    overflow: "hidden",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  mapImage: {
    ...StyleSheet.absoluteFill,
    opacity: 0.15,
    resizeMode: "cover",
  },
  mapOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(10,10,15,0.6)",
  },
  pinWrap: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  pinIcon: {
    marginBottom: -8,
  },
  pinAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    overflow: "hidden",
    marginTop: -20,
    marginLeft: 8,
  },
  pinAvatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default ProfileAddressSection;
