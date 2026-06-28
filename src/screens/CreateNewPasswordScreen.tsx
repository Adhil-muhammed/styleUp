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
import { AuthCheckbox, AuthTextField } from "@/components/auth";
import { BookingPillButton } from "@/components/booking";
import Typography from "@/components/common/Typography";
import { useCreateNewPasswordScreen } from "@/hooks/useCreateNewPasswordScreen";
import { useTheme } from "@/hooks/useTheme";
import type { AuthStackScreenProps } from "@/navigation/types";

type Props = AuthStackScreenProps<"CreateNewPassword">;

const CreateNewPasswordScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const screen = useCreateNewPasswordScreen();

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
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
          <View style={styles.topSection}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={12}
              onPress={screen.onBack}
              style={({ pressed }) => [
                styles.backButton,
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
              variant="headlineLgMobile"
              color={theme.colors.text.primary}
              style={[styles.title, { marginTop: theme.spacing.stackLg }]}
            >
              Create New Password
            </Typography>

            <Typography
              variant="headlineMd"
              color={theme.colors.text.primary}
              style={{ marginTop: theme.spacing.sectionGap, marginBottom: theme.spacing.stackMd }}
            >
              Create Your New Password
            </Typography>

            <View style={[styles.form, { gap: theme.spacing.stackMd }]}>
              <AuthTextField
                value={screen.newPassword}
                onChangeText={screen.onNewPasswordChange}
                placeholder="New password"
                leadingIconName="lock"
                isPassword
                autoCapitalize="none"
                autoComplete="new-password"
                textContentType="newPassword"
                returnKeyType="next"
                errorMessage={screen.errors.newPassword}
              />
              <AuthTextField
                value={screen.confirmPassword}
                onChangeText={screen.onConfirmPasswordChange}
                placeholder="Confirm new password"
                leadingIconName="lock"
                isPassword
                autoCapitalize="none"
                autoComplete="new-password"
                textContentType="newPassword"
                returnKeyType="done"
                errorMessage={screen.errors.confirmPassword}
              />

              <View style={styles.checkboxRow}>
                <AuthCheckbox
                  checked={screen.rememberMe}
                  label="Remember me"
                  onToggle={screen.onRememberToggle}
                />
              </View>
            </View>
          </View>

          <View style={[styles.footer, { marginTop: theme.spacing.sectionGap }]}>
            <BookingPillButton
              variant="primary"
              label="Continue"
              onPress={screen.onSubmit}
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
    justifyContent: "space-between",
  },
  topSection: {
    flex: 1,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    textTransform: "none",
  },
  form: {
    width: "100%",
  },
  checkboxRow: {
    alignItems: "center",
  },
  footer: {
    width: "100%",
  },
});

export default CreateNewPasswordScreen;
