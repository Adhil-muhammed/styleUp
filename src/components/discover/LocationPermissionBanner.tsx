import React, { useCallback } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import type { DiscoverLocationState } from "@/utils/discoverLocation";
import { toTextStyle } from "@/config/theme";

interface LocationPermissionBannerProps {
  locationState: DiscoverLocationState;
  onRetry: () => void;
}

const LocationPermissionBanner = ({
  locationState,
  onRetry,
}: LocationPermissionBannerProps): React.JSX.Element | null => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const handleOpenSettings = useCallback((): void => {
    void Linking.openSettings();
  }, []);

  const isVisible =
    locationState === "denied" ||
    locationState === "blocked" ||
    locationState === "error";

  if (!isVisible) {
    return null;
  }

  const message =
    locationState === "error"
      ? "Unable to get your location. Turn on GPS or try again."
      : locationState === "blocked"
        ? "Location access is blocked. Enable it in Settings to find nearby barbers."
        : "Enable location to find nearby barbers.";

  const showRetry = locationState === "denied" || locationState === "error";

  return (
    <View
      style={[
        styles.container,
        {
          top: insets.top + theme.spacing.stackMd + 52,
          left: theme.spacing.containerMargin,
          right: theme.spacing.containerMargin,
          backgroundColor: theme.colors.depth.level1,
          borderColor: theme.colors.border.level1,
          borderRadius: theme.borderRadius.lg,
          gap: theme.spacing.stackSm,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <MaterialIcons
          name="location-off"
          size={20}
          color={theme.colors.text.secondary}
        />
        <Text
          style={[
            toTextStyle(theme.typography.labelMd),
            styles.message,
            { color: theme.colors.text.primary },
          ]}
        >
          {message}
        </Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          onPress={handleOpenSettings}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: theme.colors.primary.default,
              borderRadius: theme.borderRadius.full,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Text
            style={[
              toTextStyle(theme.typography.labelMd),
              { color: theme.colors.text.onPrimary },
            ]}
          >
            Enable Location
          </Text>
        </Pressable>
        {showRetry ? (
          <Pressable
            onPress={onRetry}
            style={({ pressed }) => [
              styles.button,
              styles.secondaryButton,
              {
                borderColor: theme.colors.border.level1,
                borderRadius: theme.borderRadius.full,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                { color: theme.colors.text.primary },
              ]}
            >
              Retry
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 60,
    elevation: 60,
    padding: 12,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  message: {
    flex: 1,
    textTransform: "none",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
});

export default LocationPermissionBanner;
