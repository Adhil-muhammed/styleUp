import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  EditProfileDateField,
  EditProfileFormField,
  EditProfileSelectField,
  ProfilePhoneField,
} from "@/components/profile";
import { BookingPillButton } from "@/components/booking";
import Typography from "@/components/common/Typography";
import { useEditProfileScreen } from "@/hooks/useEditProfileScreen";
import { useTheme } from "@/hooks/useTheme";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"EditProfile">;

const EditProfileScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const screen = useEditProfileScreen();

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: theme.spacing.containerMargin,
              paddingTop: theme.spacing.stackSm,
              paddingBottom: theme.spacing.stackLg,
            },
          ]}
        >
          {/* ── Header ─────────────────────────────────── */}
          <View style={styles.header}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={12}
              onPress={screen.onBack}
              style={({ pressed }) => [
                styles.headerButton,
                { opacity: pressed ? 0.72 : 1 },
              ]}
            >
              <MaterialIcons
                name="arrow-back"
                size={28}
                color={theme.colors.text.primary}
              />
            </Pressable>

            <Typography
              variant="headlineMd"
              color={theme.colors.text.primary}
              style={styles.headerTitle}
            >
              Edit Profile
            </Typography>

            <View style={styles.headerButton} />
          </View>

          {/* ── Form ────────────────────────────────────── */}
          <View
            style={[
              styles.form,
              {
                marginTop: theme.spacing.stackLg,
                gap: theme.spacing.stackMd,
              },
            ]}
          >
            <EditProfileFormField
              value={screen.fullName}
              onChangeText={screen.onFullNameChange}
              placeholder="Full Name"
              autoCapitalize="words"
              textContentType="name"
            />

            <EditProfileFormField
              value={screen.nickname}
              onChangeText={screen.onNicknameChange}
              placeholder="Nickname"
              autoCapitalize="words"
            />

            <EditProfileDateField
              value={screen.dateOfBirth}
              label={screen.dateOfBirthLabel}
              onChange={screen.onDateOfBirthChange}
            />

            <EditProfileFormField
              value={screen.email}
              onChangeText={screen.onEmailChange}
              placeholder="Email"
              trailingIconName="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />

            <EditProfileSelectField
              value={screen.country}
              options={screen.countryOptions}
              placeholder="Country"
              onChange={screen.onCountryChange}
            />

            <ProfilePhoneField
              value={screen.phoneNumber}
              onChangeText={screen.onPhoneNumberChange}
            />

            <EditProfileSelectField
              value={screen.gender}
              options={screen.genderOptions}
              placeholder="Gender"
              onChange={screen.onGenderChange}
            />

            <EditProfileFormField
              value={screen.address}
              onChangeText={screen.onAddressChange}
              placeholder="Address"
              autoCapitalize="words"
              textContentType="fullStreetAddress"
              returnKeyType="done"
            />
          </View>

          {/* ── CTA ─────────────────────────────────────── */}
          <View style={[styles.cta, { marginTop: theme.spacing.sectionGap }]}>
            <BookingPillButton
              variant="primary"
              label="Update"
              onPress={screen.onUpdate}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    textTransform: "none",
  },
  form: {
    width: "100%",
  },
  cta: {
    width: "100%",
  },
});

export default EditProfileScreen;
