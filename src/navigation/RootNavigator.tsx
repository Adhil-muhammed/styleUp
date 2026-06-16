import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./AppNavigator";
import BarberProfileScreen from "../screens/BarberProfileScreen";
import PackageDetailsScreen from "../screens/PackageDetailsScreen";
import BookAppointmentScreen from "../screens/BookAppointmentScreen";
import PaymentMethodScreen from "../screens/PaymentMethodScreen";
import PaymentSummaryScreen from "../screens/PaymentSummaryScreen";
import PaymentSuccessScreen from "../screens/PaymentSuccessScreen";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="App" component={AppNavigator} />
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
        name="BookAppointment"
        component={BookAppointmentScreen}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethodScreen}
        options={{ animation: "slide_from_right" }}
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
          presentation: "transparentModal",
          animation: "fade",
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
