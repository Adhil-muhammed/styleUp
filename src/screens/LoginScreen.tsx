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
  AuthCheckbox,
  AuthFooterLink,
  AuthSocialButton,
  AuthTextField,
} from "@/components/auth";
import { BookingPillButton } from "@/components/booking";
import Typography from "@/components/common/Typography";
import { useLoginScreen } from "@/hooks/useLoginScreen";
import { useTheme } from "@/hooks/useTheme";
import type { AuthStackScreenProps } from "@/navigation/types";

type Props = AuthStackScreenProps<"Login">;

const LoginScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const login = useLoginScreen();

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
          <View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={12}
              onPress={login.onBack}
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
              variant="displayLg"
              color={theme.colors.text.primary}
              style={[
                styles.title,
                {
                  marginTop: theme.spacing.stackLg,
                  marginBottom: theme.spacing.stackLg,
                },
              ]}
            >
              Login to your{"\n"}Account
            </Typography>

            <View style={[styles.form, { gap: theme.spacing.stackMd }]}>
              <AuthTextField
                value={login.email}
                onChangeText={login.onEmailChange}
                placeholder="daniel_austin@yourdomain.com"
                leadingIconName="email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="next"
                errorMessage={login.errors.email}
              />
              <AuthTextField
                value={login.password}
                onChangeText={login.onPasswordChange}
                placeholder="Password"
                leadingIconName="lock"
                isPassword
                autoCapitalize="none"
                autoComplete="password"
                textContentType="password"
                errorMessage={login.errors.password}
              />
              <AuthCheckbox
                checked={login.rememberMe}
                label="Remember me"
                onToggle={login.onRememberToggle}
              />
              <BookingPillButton
                variant="primary"
                label="Sign in"
                onPress={login.onSubmit}
              />
              <Pressable
                accessibilityRole="button"
                hitSlop={8}
                onPress={login.onForgotPassword}
                style={({ pressed }) => [
                  styles.forgotButton,
                  { opacity: pressed ? 0.72 : 1 },
                ]}
              >
                <Typography variant="labelMd" color={theme.colors.primary.dim}>
                  Forgot the password?
                </Typography>
              </Pressable>
            </View>
          </View>

          <View style={[styles.bottomSection, { gap: theme.spacing.stackLg }]}>
            <View style={[styles.dividerRow, { gap: theme.spacing.stackMd }]}>
              <View
                style={[
                  styles.divider,
                  { backgroundColor: theme.colors.border.level1 },
                ]}
              />
              <Typography variant="bodyMd" color={theme.colors.text.secondary}>
                or continue with
              </Typography>
              <View
                style={[
                  styles.divider,
                  { backgroundColor: theme.colors.border.level1 },
                ]}
              />
            </View>

            <View style={[styles.socialRow, { gap: theme.spacing.stackMd }]}>
              <AuthSocialButton
                provider="facebook"
                onPress={login.onSocialPress}
              />
              <AuthSocialButton
                provider="google"
                onPress={login.onSocialPress}
              />
              <AuthSocialButton
                provider="apple"
                onPress={login.onSocialPress}
              />
            </View>

            <AuthFooterLink
              prompt="Don't have an account?"
              actionLabel="Sign up"
              onPress={login.onCreateAccount}
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
  forgotButton: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: {
    paddingTop: 56,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    height: 1,
    flex: 1,
  },
  socialRow: {
    flexDirection: "row",
  },
});

export default LoginScreen;
