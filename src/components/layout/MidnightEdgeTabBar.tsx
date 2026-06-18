import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
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
  isElevated?: boolean;
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
    isElevated: true,
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

/** Fixed chrome height excluding safe-area inset (icon-only bar). */
export const TAB_BAR_PADDING_TOP = 4;
export const TAB_BAR_PADDING_BOTTOM = 8;
export const TAB_BAR_FLOAT_BOTTOM = 8;
const TAB_BAR_INNER_HEIGHT = 40;

export function getTabBarTotalHeight(safeAreaBottom: number): number {
  return (
    TAB_BAR_FLOAT_BOTTOM +
    safeAreaBottom +
    TAB_BAR_PADDING_TOP +
    TAB_BAR_INNER_HEIGHT +
    TAB_BAR_PADDING_BOTTOM
  );
}

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
  const pillRadius = theme.borderRadius.full;

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
        styles.host,
        {
          // paddingBottom: TAB_BAR_FLOAT_BOTTOM + insets.bottom,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          // backgroundColor: "black",
          elevation: 0,
        },
      ]}
    >
      <View
        style={[
          styles.glassShell,
          {
            borderRadius: pillRadius,
            borderColor: theme.colors.glass.border,
          },
        ]}
      >
        <BlurView
          intensity={theme.glassmorphism.blur}
          tint="dark"
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: pillRadius,
              backgroundColor: `${theme.colors.depth.level0}CC`,
            },
          ]}
          pointerEvents="none"
        />
        <View
          style={[
            styles.bar,
            {
              paddingTop: TAB_BAR_PADDING_TOP,
              paddingBottom: TAB_BAR_PADDING_BOTTOM,
              minHeight: TAB_BAR_INNER_HEIGHT,
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
                isElevated={config.isElevated ?? false}
                onPress={handlePress(config.name, isFocused)}
                accessibilityLabel={config.accessibilityLabel}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  host: {
    overflow: "visible",
    zIndex: 10,
  },
  glassShell: {
    overflow: "hidden",
    borderWidth: 1,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    overflow: "visible",
  },
});

export default MidnightEdgeTabBar;
