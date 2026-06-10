import React, { useCallback } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { useTheme } from "@/hooks/useTheme";
import type { DiscoverLocationError } from "@/hooks/useDiscoverMapLocation";
import { toTextStyle } from "@/config/theme";

interface LocationPermissionBannerProps {
  permissionStatus: Location.PermissionStatus;
  locationError: DiscoverLocationError;
  onRetry: () => void;
}

const LocationPermissionBanner = ({
  permissionStatus,
  locationError,
  onRetry,
}: LocationPermissionBannerProps): React.JSX.Element | null => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const isDenied =
    permissionStatus === Location.PermissionStatus.DENIED ||
    locationError === "permission_denied";
  const isServicesDisabled = locationError === "services_disabled";
  const isPositionUnavailable = locationError === "position_unavailable";

  const isVisible = isDenied || isServicesDisabled || isPositionUnavailable;

  const handleOpenSettings = useCallback((): void => {
    void Linking.openSettings();
  }, []);

  if (!isVisible) {
    return null;
  }

  const message = isServicesDisabled
    ? "Turn on location services to find nearby barbers."
    : isPositionUnavailable
      ? "Unable to get your location. Try again or check GPS settings."
      : "Enable location to find nearby barbers.";

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
          onPress={onRetry}
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
            Retry
          </Text>
        </Pressable>
        <Pressable
          onPress={handleOpenSettings}
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
            Settings
          </Text>
        </Pressable>
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
