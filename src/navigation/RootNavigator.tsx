import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import BarberProfileScreen from "../screens/BarberProfileScreen";
import PackageDetailsScreen from "../screens/PackageDetailsScreen";
import BookAppointmentScreen from "../screens/BookAppointmentScreen";
import OurServicesScreen from "../screens/OurServicesScreen";
import ServiceVariantScreen from "../screens/ServiceVariantScreen";
import PaymentMethodScreen from "../screens/PaymentMethodScreen";
import PaymentSummaryScreen from "../screens/PaymentSummaryScreen";
import PaymentSuccessScreen from "../screens/PaymentSuccessScreen";
import SearchScreen from "../screens/SearchScreen";
import CategorySalonsScreen from "../screens/CategorySalonsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import { useAuth } from "@/hooks/useAuth";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { isAuthenticated, isHydrated, postAuthInitialTab } = useAuth();

  // Wait for Zustand persist to finish reading from AsyncStorage.
  // Fonts are guaranteed loaded by the time RootNavigator renders (App.tsx guard).
  if (!isHydrated) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        // Auth screens — conditionally first so they are the initial route.
        // React Navigation removes them from the stack once isAuthenticated flips.
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        // Authenticated screens — main tabs + all detail/modal routes.
        <>
          <Stack.Screen
            name="App"
            component={AppNavigator}
            initialParams={
              postAuthInitialTab === "Profile"
                ? { screen: "Profile" }
                : undefined
            }
          />
          <Stack.Screen
            name="BarberProfile"
            component={BarberProfileScreen}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="PackageDetails"
            component={PackageDetailsScreen}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="OurServices"
            component={OurServicesScreen}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="ServiceVariants"
            component={ServiceVariantScreen}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="BookAppointment"
            component={BookAppointmentScreen}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="PaymentMethod"
            component={PaymentMethodScreen}
            options={{
              presentation: "transparentModal",
              animation: "slide_from_bottom",
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
          <Stack.Screen
            name="PaymentSummary"
            component={PaymentSummaryScreen}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="PaymentSuccess"
            component={PaymentSuccessScreen}
            options={{
              animation: "fade",
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="CategorySalons"
            component={CategorySalonsScreen}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ animation: "slide_from_right" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
