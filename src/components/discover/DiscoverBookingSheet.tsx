import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet, Text, View, type ListRenderItem } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import BottomSheetModal, {
  BottomSheetFlatList,
  BottomSheetFooter,
  useBottomSheetSpringConfigs,
  type BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import BarberServiceRow from "./BarberServiceRow";
import BookingQuickFilters from "./BookingQuickFilters";
import BookingSheetExpandHandle from "./BookingSheetExpandHandle";
import BookingSheetFooter from "./BookingSheetFooter";
import { useBookingSheetLayout } from "@/hooks/useBookingSheetLayout";
import { useTheme } from "@/hooks/useTheme";
import {
  SHEET_SPRING_DAMPING,
  SHEET_SPRING_STIFFNESS,
} from "@/utils/bookingSheetLayout";
import { toTextStyle } from "@/config/theme";
import type {
  BarberServiceOption,
  BookingQuickFilterOption,
} from "@/data/discoverMock";

const LIST_SEPARATOR = 12;

interface DiscoverBookingSheetProps {
  services: BarberServiceOption[];
  selectedServiceId: string;
  onSelectService: (serviceId: string) => void;
  timeOptions: BookingQuickFilterOption[];
  profileOptions: BookingQuickFilterOption[];
  paymentOptions: BookingQuickFilterOption[];
  activeTimeId: string;
  activeProfileId: string;
  activePaymentId: string;
  onTimeSelect?: (id: string) => void;
  onProfileSelect?: (id: string) => void;
  onPaymentPress?: () => void;
  onConfirmBooking: () => void;
}

const DiscoverBookingSheet = ({
  services,
  selectedServiceId,
  onSelectService,
  timeOptions,
  profileOptions,
  paymentOptions,
  activeTimeId,
  activeProfileId,
  activePaymentId,
  onTimeSelect,
  onProfileSelect,
  onPaymentPress,
  onConfirmBooking,
}: DiscoverBookingSheetProps): React.JSX.Element => {
  const { theme } = useTheme();
  const { snapPoints, bottomInset } = useBookingSheetLayout();
  const sheetRef = useRef<BottomSheetModalMethods | null>(null);
  const isMountedRef = useRef<boolean>(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     let retryTimeoutId: ReturnType<typeof setTimeout> | undefined;

  //     const attemptPresent = (): void => {
  //       if (!isMountedRef.current) {
  //         return;
  //       }

  //       if (typeof sheetRef.current?.present !== "function") {
  //         return;
  //       }

  //       try {
  //         sheetRef.current.present();
  //       } catch (err: unknown) {
  //         console.warn(
  //           "[DiscoverBookingSheet] present() called before ref was ready — retrying.",
  //           err,
  //         );
  //       }
  //     };

  //     const frameId = requestAnimationFrame(() => {
  //       if (typeof sheetRef.current?.present === "function") {
  //         attemptPresent();
  //         return;
  //       }

  //       console.warn(
  //         "[DiscoverBookingSheet] present() called before ref was ready — retrying.",
  //       );

  //       retryTimeoutId = setTimeout(() => {
  //         attemptPresent();
  //       }, 50);
  //     });

  //     return () => {
  //       cancelAnimationFrame(frameId);
  //       if (retryTimeoutId !== undefined) {
  //         clearTimeout(retryTimeoutId);
  //       }
  //       sheetRef.current?.dismiss?.();
  //     };
  //   }, []),
  // );

  useFocusEffect(
    useCallback(() => {
      let frameId: ReturnType<typeof requestAnimationFrame>;
      let attempts = 0;
      const MAX_ATTEMPTS = 10;

      const tryPresent = (): void => {
        if (!isMountedRef.current) return;

        if (typeof sheetRef.current?.present === "function") {
          sheetRef.current.present();
          return;
        }

        if (attempts < MAX_ATTEMPTS) {
          attempts++;
          frameId = requestAnimationFrame(tryPresent);
        }
      };

      frameId = requestAnimationFrame(tryPresent);

      return () => {
        cancelAnimationFrame(frameId);
        sheetRef.current?.dismiss?.();
      };
    }, []),
  );

  const animationConfigs = useBottomSheetSpringConfigs({
    stiffness: SHEET_SPRING_STIFFNESS,
    damping: SHEET_SPRING_DAMPING,
    overshootClamping: true,
  });

  const selectedService = useMemo(
    () =>
      services.find((service) => service.id === selectedServiceId) ??
      services[0],
    [selectedServiceId, services],
  );

  const paymentMethod = useMemo(
    () =>
      paymentOptions.find((option) => option.id === activePaymentId) ??
      paymentOptions[0],
    [activePaymentId, paymentOptions],
  );

  const renderItem = useCallback<ListRenderItem<BarberServiceOption>>(
    ({ item }) => (
      <BarberServiceRow
        service={item}
        isSelected={item.id === selectedServiceId}
        onPress={onSelectService}
      />
    ),
    [onSelectService, selectedServiceId],
  );

  const keyExtractor = useCallback((item: BarberServiceOption) => item.id, []);

  const ListHeaderComponent = useMemo(
    () => (
      <View style={[styles.header, { gap: theme.spacing.stackMd }]}>
        <Text
          style={[
            toTextStyle(theme.typography.headlineLgMobile),
            { color: theme.colors.text.primary },
          ]}
        >
          Choose a Barber
        </Text>
        <BookingQuickFilters
          timeOptions={timeOptions}
          profileOptions={profileOptions}
          activeTimeId={activeTimeId}
          activeProfileId={activeProfileId}
          {...(onTimeSelect !== undefined ? { onTimeSelect } : {})}
          {...(onProfileSelect !== undefined ? { onProfileSelect } : {})}
        />
      </View>
    ),
    [
      activeProfileId,
      activeTimeId,
      onProfileSelect,
      onTimeSelect,
      profileOptions,
      theme.colors.text.primary,
      theme.spacing.stackMd,
      theme.typography.headlineLgMobile,
      timeOptions,
    ],
  );

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => {
      if (selectedService === undefined || paymentMethod === undefined) {
        return null;
      }

      return (
        <BottomSheetFooter {...props} bottomInset={0}>
          <BookingSheetFooter
            paymentMethod={paymentMethod}
            selectedServiceTitle={selectedService.title}
            onConfirmBooking={onConfirmBooking}
            {...(onPaymentPress !== undefined ? { onPaymentPress } : {})}
          />
        </BottomSheetFooter>
      );
    },
    [onConfirmBooking, onPaymentPress, paymentMethod, selectedService],
  );

  const ItemSeparator = useCallback(
    () => <View style={{ height: LIST_SEPARATOR }} />,
    [],
  );

  return (
    <BottomSheetModal
      ref={(instance) => {
        sheetRef.current = instance as BottomSheetModalMethods | null;
      }}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      bottomInset={bottomInset}
      animationConfigs={animationConfigs}
      keyboardBehavior="interactive"
      android_keyboardInputMode="adjustResize"
      footerComponent={renderFooter}
      handleComponent={BookingSheetExpandHandle}
      backgroundStyle={{
        backgroundColor: theme.colors.depth.level1,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
      }}
    >
      <BottomSheetFlatList
        data={
          selectedService === undefined || paymentMethod === undefined
            ? []
            : services
        }
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparator}
        enableFooterMarginAdjustment
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.containerMargin,
          paddingBottom: theme.spacing.stackLg,
        }}
      />
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 16,
  },
});

export default DiscoverBookingSheet;
