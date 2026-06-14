import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { USER_AVATAR_URI } from "@/data/discoverMock";

interface DiscoverTopBarProps {
  onBadgePress?: () => void;
}

const DiscoverTopBar = ({ onBadgePress }: DiscoverTopBarProps): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + theme.spacing.stackMd,
          paddingHorizontal: theme.spacing.containerMargin,
          paddingBottom: theme.spacing.stackMd,
        },
      ]}
    >
      <BlurView
        intensity={theme.glassmorphism.blur}
        tint="dark"
        style={[
          styles.bar,
          {
            backgroundColor: `${theme.colors.depth.background}CC`,
            borderBottomColor: theme.colors.border.level1,
          },
        ]}
      >
        <View style={styles.row}>
          <View
            style={[
              styles.avatarWrap,
              {
                borderColor: theme.colors.border.level1,
                backgroundColor: theme.colors.depth.level1,
              },
            ]}
          >
            <Image source={{ uri: USER_AVATAR_URI }} style={styles.avatar} />
          </View>

          <View style={styles.spacer} />

          <Pressable
            onPress={onBadgePress}
            style={({ pressed }) => [
              styles.badgeButton,
              {
                borderColor: theme.colors.border.level1,
                backgroundColor: theme.colors.depth.level1,
                opacity: pressed ? 0.85 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            <MaterialIcons
              name="military-tech"
              size={22}
              color={theme.colors.primary.dim}
            />
          </Pressable>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  bar: {
    overflow: "hidden",
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  spacer: {
    flex: 1,
  },
  badgeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DiscoverTopBar;
