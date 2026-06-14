import React, { useCallback, useMemo, useRef } from "react";
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
import { useDiscoverBooking } from "@/hooks/useDiscoverBooking";
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

  const booking = useDiscoverBooking(
    BOOKING_SERVICES[0]?.id ?? "",
    BOOKING_TIME_FILTERS[0]?.id ?? "now",
    BOOKING_PROFILE_FILTERS[0]?.id ?? "me",
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

  const sheetProps = useMemo(
    () => ({
      services: BOOKING_SERVICES,
      selectedServiceId: booking.selectedServiceId,
      onSelectService: booking.handleSelectService,
      timeOptions: BOOKING_TIME_FILTERS,
      profileOptions: BOOKING_PROFILE_FILTERS,
      paymentOptions: PAYMENT_METHODS,
      activeTimeId: booking.activeTimeId,
      activeProfileId: booking.activeProfileId,
      activePaymentId: booking.activePaymentId,
      onTimeSelect: booking.handleTimeSelect,
      onProfileSelect: booking.handleProfileSelect,
      onPaymentPress: booking.handlePaymentPress,
      onConfirmBooking: booking.handleConfirmBooking,
    }),
    [booking],
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
          onPinPress={booking.handlePinPress}
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
      </View>
      <DiscoverBookingSheet {...sheetProps} />
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
