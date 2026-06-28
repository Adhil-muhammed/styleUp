import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { AppTabParamList } from "./types";
import { MidnightEdgeTabBar } from "../components/layout";
import HomeScreen from "../screens/HomeScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import BookingsScreen from "../screens/BookingsScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator<AppTabParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => {
        const focusedRoute = props.state.routes[props.state.index];
        if (focusedRoute?.name === "Discover") {
          return null;
        }
        return <MidnightEdgeTabBar {...props} />;
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
