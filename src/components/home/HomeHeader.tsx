import React from "react";
import { Image, StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Typography from "@/components/common/Typography";
import HomeIconButton from "./HomeIconButton";
import { useTheme } from "@/hooks/useTheme";
import { USER_AVATAR_URI } from "@/data/discoverMock";

interface HomeHeaderProps {
  userGreeting: string;
  userLocation: string;
  onNotificationPress: () => void;
  onFavoritesPress: () => void;
}

const AVATAR_SIZE = 48;

const HomeHeader = ({
  userGreeting,
  userLocation,
  onNotificationPress,
  onFavoritesPress,
}: HomeHeaderProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { gap: theme.spacing.stackLg }]}>
      <View style={styles.topRow}>
        <View style={[styles.profileColumn, { gap: theme.spacing.stackMd }]}>
          <View
            style={[
              styles.avatarWrap,
              {
                borderColor: theme.colors.border.level1,
                borderRadius: theme.borderRadius.full,
              },
            ]}
          >
            <Image source={{ uri: USER_AVATAR_URI }} style={styles.avatar} />
          </View>

          <View style={{ gap: theme.spacing.stackSm }}>
            <Typography variant="headlineMd" color={theme.colors.text.primary}>
              Hi, {userGreeting}
            </Typography>
            <View style={[styles.locationRow, { gap: 4 }]}>
              <MaterialIcons
                name="location-on"
                size={12}
                color={theme.colors.primary.dim}
              />
              <Typography
                variant="labelSm"
                color={theme.colors.primary.dim}
                style={styles.locationText}
                numberOfLines={1}
              >
                {userLocation}
              </Typography>
            </View>
          </View>
        </View>

        <View style={[styles.actions, { gap: theme.spacing.stackSm }]}>
          <HomeIconButton
            icon="notifications-none"
            onPress={onNotificationPress}
            showBadge
          />
          <HomeIconButton icon="favorite-border" onPress={onFavoritesPress} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  profileColumn: {
    flex: 1,
    alignItems: "flex-start",
    paddingRight: 96,
  },
  avatarWrap: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderWidth: 2,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
  },
  locationText: {
    flexShrink: 1,
    textTransform: "none",
    fontWeight: "400",
  },
  actions: {
    position: "absolute",
    top: 0,
    right: 0,
    flexDirection: "row",
  },
});

export default HomeHeader;
