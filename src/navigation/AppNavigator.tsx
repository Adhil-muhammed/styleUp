import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { AppTabParamList } from "./types";
import HelloWorldScreen from "../screens/HelloWorldScreen";

const Tab = createBottomTabNavigator<AppTabParamList>();

// ─── Placeholder Screen Shells ────────────────────────────────────────────────
// Feature implementation is deferred. Each shell returns null intentionally.

const FeedScreen = HelloWorldScreen;
const BookingScreen = (): null => null; /* Feature Screen Shell */
const JourneyScreen = (): null => null; /* Feature Screen Shell */
const SettingsScreen = (): null => null; /* Feature Screen Shell */

// ─── Navigator ────────────────────────────────────────────────────────────────

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Feed"
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Journey" component={JourneyScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
