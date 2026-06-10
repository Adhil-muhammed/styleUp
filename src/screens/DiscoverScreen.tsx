import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  DiscoverBookingSheet,
  DiscoverMap,
  LocationPermissionBanner,
  MapBackButton,
} from "@/components/discover";
import {
  BOOKING_PROFILE_FILTERS,
  BOOKING_SERVICES,
  BOOKING_TIME_FILTERS,
  DEMO_MAP_SHOPS,
  DEMO_SERVICE_AREA_CIRCLES,
  PAYMENT_METHODS,
} from "@/data/discoverMock";
import { useDiscoverMapLocation } from "@/hooks/useDiscoverMapLocation";
import { useNearbyMapShops } from "@/hooks/useNearbyMapShops";
import { useTheme } from "@/hooks/useTheme";
import type { AppTabScreenProps } from "@/navigation/types";

type Props = AppTabScreenProps<"Discover">;

const DiscoverScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const {
    userCoordinate,
    canShowUserLocation,
    permissionStatus,
    locationError,
    retryLocation,
  } = useDiscoverMapLocation();
  const { nearbyPins } = useNearbyMapShops(userCoordinate, DEMO_MAP_SHOPS);

  const [selectedServiceId, setSelectedServiceId] = useState(
    BOOKING_SERVICES[0]?.id ?? "",
  );
  const [activeTimeId, setActiveTimeId] = useState(
    BOOKING_TIME_FILTERS[0]?.id ?? "now",
  );
  const [activeProfileId, setActiveProfileId] = useState(
    BOOKING_PROFILE_FILTERS[0]?.id ?? "me",
  );
  const [activePaymentId, setActivePaymentId] = useState(
    PAYMENT_METHODS[0]?.id ?? "cash",
  );

  const handleMapPress = useCallback((): void => {
    // Stub for future map interaction (pan, zoom, pin focus).
  }, []);

  const handlePinPress = useCallback((_pinId: string): void => {
    // Stub for future pin focus / barber detail.
  }, []);

  const handleSelectService = useCallback((serviceId: string): void => {
    setSelectedServiceId(serviceId);
  }, []);

  const handleTimeSelect = useCallback((id: string): void => {
    setActiveTimeId(id);
  }, []);

  const handleProfileSelect = useCallback((id: string): void => {
    setActiveProfileId(id);
  }, []);

  const handlePaymentPress = useCallback((): void => {
    // Stub for future payment method picker.
  }, []);

  const handleConfirmBooking = useCallback((): void => {
    // Stub for future booking confirmation flow.
  }, []);

  const sheetProps = useMemo(
    () => ({
      services: BOOKING_SERVICES,
      selectedServiceId,
      onSelectService: handleSelectService,
      timeOptions: BOOKING_TIME_FILTERS,
      profileOptions: BOOKING_PROFILE_FILTERS,
      paymentOptions: PAYMENT_METHODS,
      activeTimeId,
      activeProfileId,
      activePaymentId,
      onTimeSelect: handleTimeSelect,
      onProfileSelect: handleProfileSelect,
      onPaymentPress: handlePaymentPress,
      onConfirmBooking: handleConfirmBooking,
    }),
    [
      activePaymentId,
      activeProfileId,
      activeTimeId,
      handleConfirmBooking,
      handlePaymentPress,
      handleProfileSelect,
      handleSelectService,
      handleTimeSelect,
      selectedServiceId,
    ],
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}>
      <DiscoverMap
        pins={nearbyPins}
        serviceAreas={DEMO_SERVICE_AREA_CIRCLES}
        userCoordinate={userCoordinate}
        canShowUserLocation={canShowUserLocation}
        onMapPress={handleMapPress}
        onPinPress={handlePinPress}
      />

      <MapBackButton />

      <LocationPermissionBanner
        permissionStatus={permissionStatus}
        locationError={locationError}
        onRetry={retryLocation}
      />

      <DiscoverBookingSheet {...sheetProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default DiscoverScreen;
