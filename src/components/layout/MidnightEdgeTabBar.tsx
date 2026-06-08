import React, { useCallback, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { AppTabParamList } from "@/navigation/types";

type TabRouteName = keyof AppTabParamList;

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];
type CommunityIconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

interface TabConfig {
  name: TabRouteName;
  label: string;
  iconFamily: "material" | "community";
  icon: MaterialIconName | CommunityIconName;
  iconActive?: MaterialIconName | CommunityIconName;
}

const TAB_CONFIG: TabConfig[] = [
  { name: "Home", label: "Home", iconFamily: "material", icon: "home" },
  {
    name: "Discover",
    label: "Discover",
    iconFamily: "material",
    icon: "explore",
    iconActive: "explore",
  },
  {
    name: "Book",
    label: "Book",
    iconFamily: "community",
    icon: "calendar-plus",
  },
  { name: "Feed", label: "Feed", iconFamily: "material", icon: "style" },
  { name: "Profile", label: "Profile", iconFamily: "material", icon: "person" },
];

/** Fixed chrome height excluding safe-area inset (matches HTML pt-2 + content + pb-6). */
export const TAB_BAR_PADDING_TOP = 8;
export const TAB_BAR_PADDING_BOTTOM = 24;
const TAB_BAR_INNER_HEIGHT = 52;

export function getTabBarTotalHeight(safeAreaBottom: number): number {
  return TAB_BAR_PADDING_TOP + TAB_BAR_INNER_HEIGHT + TAB_BAR_PADDING_BOTTOM + safeAreaBottom;
}

interface TabItemProps {
  config: TabConfig;
  isFocused: boolean;
  onPress: () => void;
  inactiveColor: string;
  activeColor: string;
  iconGlowColor: string;
  springStiffness: number;
  springDamping: number;
  labelStyle: ReturnType<typeof toTextStyle>;
}

const TabItem = ({
  config,
  isFocused,
  onPress,
  inactiveColor,
  activeColor,
  iconGlowColor,
  springStiffness,
  springDamping,
  labelStyle,
}: TabItemProps): React.JSX.Element => {
  const scale = useSharedValue(isFocused ? 1.1 : 1);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1.1 : 1, {
      stiffness: springStiffness,
      damping: springDamping,
    });
  }, [isFocused, scale, springDamping, springStiffness]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const color = isFocused ? activeColor : inactiveColor;
  const iconName = isFocused && config.iconActive !== undefined ? config.iconActive : config.icon;
  const iconGlowStyle = isFocused
    ? {
        shadowColor: iconGlowColor,
        shadowOffset: { width: 0, height: 0 } as const,
        shadowOpacity: 1,
        shadowRadius: 4,
      }
    : undefined;

  return (
    <Pressable
      onPress={onPress}
      style={styles.tab}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
    >
      <Animated.View style={[styles.tabContent, animatedStyle]}>
        {config.iconFamily === "community" ? (
          <MaterialCommunityIcons
            name={iconName as CommunityIconName}
            size={24}
            color={color}
            style={[styles.icon, iconGlowStyle]}
          />
        ) : (
          <MaterialIcons
            name={iconName as MaterialIconName}
            size={24}
            color={color}
            style={[styles.icon, iconGlowStyle]}
          />
        )}
        <Text style={[labelStyle, { color }]}>{config.label}</Text>
        {isFocused && (
          <View style={[styles.activeDot, { backgroundColor: activeColor }]} />
        )}
      </Animated.View>
    </Pressable>
  );
};

const MidnightEdgeTabBar = ({
  state,
  navigation,
}: BottomTabBarProps): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const handlePress = useCallback(
    (routeName: TabRouteName, isFocused: boolean) => (): void => {
      if (!isFocused) {
        navigation.navigate(routeName);
      }
    },
    [navigation],
  );

  const labelStyle = {
    ...toTextStyle(theme.typography.labelSm),
    textTransform: "none" as const,
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: theme.colors.nav.surfaceScrim,
          borderTopColor: theme.colors.nav.border,
          paddingTop: TAB_BAR_PADDING_TOP,
          paddingBottom: TAB_BAR_PADDING_BOTTOM + insets.bottom,
          paddingHorizontal: theme.spacing.gutter,
          shadowColor: theme.colors.depth.level0,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
        },
      ]}
    >
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const config = TAB_CONFIG.find((tab) => tab.name === route.name);
          if (config === undefined) return null;

          const isFocused = state.index === index;

          return (
            <TabItem
              key={route.key}
              config={config}
              isFocused={isFocused}
              onPress={handlePress(config.name, isFocused)}
              inactiveColor={theme.colors.nav.inactive}
              activeColor={theme.colors.nav.active}
              iconGlowColor={theme.colors.nav.iconGlow}
              springStiffness={theme.motion.spring.stiffness}
              springDamping={theme.motion.spring.damping}
              labelStyle={labelStyle}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 56,
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 4,
  },
  icon: {
    marginBottom: 4,
  },
  activeDot: {
    position: "absolute",
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});

export default MidnightEdgeTabBar;
