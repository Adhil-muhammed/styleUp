import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  DiscoverBookingSheet,
  DiscoverMap,
  type DiscoverMapHandle,
  LocationPermissionBanner,
  MapBackButton,
  MapUserLocationButton,
} from "@/components/discover";
import {
  BOOKING_PROFILE_FILTERS,
  BOOKING_SERVICES,
  BOOKING_TIME_FILTERS,
  DEMO_MAP_SHOPS,
  DEMO_SERVICE_AREA_CIRCLES,
  PAYMENT_METHODS,
} from "@/data/discoverMock";
import { useBookingSheetLayout } from "@/hooks/useBookingSheetLayout";
import { useDiscoverLocation } from "@/hooks/useDiscoverLocation";
import { useNearbyMapShops } from "@/hooks/useNearbyMapShops";
import { useTheme } from "@/hooks/useTheme";
import type { AppTabScreenProps } from "@/navigation/types";

type Props = AppTabScreenProps<"Discover">;

const DiscoverScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const mapRef = useRef<DiscoverMapHandle>(null);
  const { collapsedPx, bottomInset } = useBookingSheetLayout();
  const { locationState, userLocation, canShowUserLocation, retryLocation } =
    useDiscoverLocation();
  const { nearbyPins } = useNearbyMapShops(userLocation, DEMO_MAP_SHOPS);

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

  const showUserLocationButton =
    locationState === "granted" && userLocation !== null;

  const userLocationButtonOffset =
    collapsedPx + bottomInset + theme.spacing.stackMd;

  const handleRecenterOnUser = useCallback((): void => {
    mapRef.current?.recenterOnUser();
  }, []);

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
      <View style={styles.mapRegion}>
        <DiscoverMap
          ref={mapRef}
          pins={nearbyPins}
          serviceAreas={DEMO_SERVICE_AREA_CIRCLES}
          userCoordinate={userLocation}
          canShowUserLocation={canShowUserLocation}
          isLocationChecking={
            locationState === "checking" || locationState === "requesting"
          }
          onMapPress={handleMapPress}
          onPinPress={handlePinPress}
        />

        <MapBackButton />

        <LocationPermissionBanner
          locationState={locationState}
          onRetry={retryLocation}
        />
      </View>

      <View style={styles.sheetOverlay} pointerEvents="box-none">
        {showUserLocationButton ? (
          <MapUserLocationButton
            bottomOffset={userLocationButtonOffset}
            onPress={handleRecenterOnUser}
          />
        ) : null}
        <DiscoverBookingSheet {...sheetProps} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
  mapRegion: {
    height: "70%",
    overflow: "hidden",
    position: "relative",
  },
  sheetOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default DiscoverScreen;
