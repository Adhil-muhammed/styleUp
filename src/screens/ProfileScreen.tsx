import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileAvatarPicker, ProfileSettingsRow } from "@/components/profile";
import Typography from "@/components/common/Typography";
import { useProfileSettingsScreen } from "@/hooks/useProfileSettingsScreen";
import { useTheme } from "@/hooks/useTheme";
import type { AppTabScreenProps } from "@/navigation/types";

type Props = AppTabScreenProps<"Profile">;

const ProfileScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const screen = useProfileSettingsScreen();

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: theme.spacing.containerMargin,
            paddingBottom: theme.spacing.stackLg,
          },
        ]}
      >
        {/* ── Avatar + Identity ───────────────────────── */}
        <View
          style={[
            styles.identity,
            { marginTop: theme.spacing.stackLg, gap: theme.spacing.stackSm },
          ]}
        >
          <ProfileAvatarPicker
            avatarUri={screen.avatarUri}
            onPress={screen.onAvatarPress}
          />
          <Typography
            variant="headlineMd"
            color={theme.colors.text.primary}
            style={styles.displayName}
          >
            {screen.displayName.length > 0 ? screen.displayName : "Your Name"}
          </Typography>
          {screen.email.length > 0 ? (
            <Typography variant="bodyMd" color={theme.colors.text.secondary}>
              {screen.email}
            </Typography>
          ) : null}
        </View>

        {/* ── Divider ─────────────────────────────────── */}
        <View
          style={[
            styles.sectionDivider,
            {
              backgroundColor: theme.colors.border.level1,
              marginVertical: theme.spacing.stackLg,
            },
          ]}
        />

        {/* ── Settings menu ───────────────────────────── */}
        <View style={styles.menu}>
          <ProfileSettingsRow
            icon="person-outline"
            label="Edit Profile"
            type="chevron"
            onPress={() => screen.onMenuPress("edit-profile")}
          />
          <ProfileSettingsRow
            icon="notifications-none"
            label="Notification"
            type="chevron"
            onPress={() => screen.onMenuPress("notification")}
          />
          <ProfileSettingsRow
            icon="credit-card"
            label="Payment"
            type="chevron"
            onPress={() => screen.onMenuPress("payment")}
          />
          <ProfileSettingsRow
            icon="shield"
            label="Security"
            type="chevron"
            onPress={() => screen.onMenuPress("security")}
          />
          {/* <ProfileSettingsRow
            icon="language"
            label="Language"
            type="chevron"
            valueText="English (US)"
            onPress={() => screen.onMenuPress("language")}
          /> */}
          {/* <ProfileSettingsRow
            icon="dark-mode"
            label="Dark Mode"
            type="switch"
            switchValue={screen.darkMode}
            onSwitchChange={screen.onDarkModeToggle}
          /> */}
          <ProfileSettingsRow
            icon="lock-outline"
            label="Privacy Policy"
            type="chevron"
            onPress={() => screen.onMenuPress("privacy-policy")}
          />
          <ProfileSettingsRow
            icon="group-add"
            label="Invite Friends"
            type="chevron"
            onPress={() => screen.onMenuPress("invite-friends")}
          />
        </View>

        {/* ── Logout ──────────────────────────────────── */}
        <ProfileSettingsRow
          icon="logout"
          label="Logout"
          type="destructive"
          onPress={screen.onLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    textTransform: "none",
  },
  moreButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  identity: {
    alignItems: "center",
  },
  displayName: {
    textTransform: "none",
  },
  sectionDivider: {
    height: StyleSheet.hairlineWidth,
  },
  menu: {
    width: "100%",
  },
});

export default ProfileScreen;
