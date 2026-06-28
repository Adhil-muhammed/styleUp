import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import * as Haptics from "expo-haptics";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MidnightEdgeTabItem from "./MidnightEdgeTabItem";
import { useTheme } from "@/hooks/useTheme";
import type { AppTabParamList } from "@/navigation/types";

type TabRouteName = keyof AppTabParamList;

type CommunityIconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

interface TabConfig {
  name: TabRouteName;
  accessibilityLabel: string;
  icon: CommunityIconName;
  iconActive: CommunityIconName;
}

const TAB_CONFIG: TabConfig[] = [
  {
    name: "Home",
    accessibilityLabel: "Home",
    icon: "home-outline",
    iconActive: "home",
  },
  {
    name: "Discover",
    accessibilityLabel: "Map",
    icon: "map-marker-outline",
    iconActive: "map-marker",
  },
  {
    name: "Bookings",
    accessibilityLabel: "Bookings",
    icon: "calendar-outline",
    iconActive: "calendar",
  },
  {
    name: "Chat",
    accessibilityLabel: "Chat",
    icon: "message-text-outline",
    iconActive: "message-text",
  },
  {
    name: "Profile",
    accessibilityLabel: "Profile",
    icon: "account-outline",
    iconActive: "account",
  },
];

async function triggerTabHaptic(): Promise<void> {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {
    // Unavailable on web or some simulators.
  }
}

const MidnightEdgeTabBar = ({
  state,
  navigation,
}: BottomTabBarProps): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const handlePress = useCallback(
    (routeName: TabRouteName, isFocused: boolean) => (): void => {
      if (!isFocused) {
        void triggerTabHaptic();
        navigation.navigate(routeName);
      }
    },
    [navigation],
  );

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: theme.colors.depth.level1,
          borderTopColor: theme.colors.border.level1,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const config = TAB_CONFIG.find((tab) => tab.name === route.name);
        if (config === undefined) {
          return null;
        }

        const isFocused = state.index === index;

        return (
          <MidnightEdgeTabItem
            key={route.key}
            icon={config.icon}
            iconActive={config.iconActive}
            isFocused={isFocused}
            onPress={handlePress(config.name, isFocused)}
            accessibilityLabel={config.accessibilityLabel}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
  },
});

export default MidnightEdgeTabBar;
