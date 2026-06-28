import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { OTPBox, OTPKeypad } from "@/components/auth";
import { BookingPillButton } from "@/components/booking";
import Typography from "@/components/common/Typography";
import { useForgotPasswordOTPScreen } from "@/hooks/useForgotPasswordOTPScreen";
import { useTheme } from "@/hooks/useTheme";
import type { AuthStackScreenProps } from "@/navigation/types";

type Props = AuthStackScreenProps<"ForgotPasswordOTP">;

const OTP_LENGTH = 4;

const ForgotPasswordOTPScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const screen = useForgotPasswordOTPScreen();

  const otpChars = Array.from({ length: OTP_LENGTH }, (_, i) =>
    screen.otp[i] ?? "",
  );

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}
    >
      <View
        style={[
          styles.header,
          {
            paddingHorizontal: theme.spacing.containerMargin,
            paddingTop: theme.spacing.stackSm,
          },
        ]}
      >
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
          Forgot Password
        </Typography>
      </View>

      <View
        style={[
          styles.otpSection,
          { paddingHorizontal: theme.spacing.containerMargin },
        ]}
      >
        <Typography
          variant="bodyMd"
          color={theme.colors.text.secondary}
          style={[styles.sentToText, { marginBottom: theme.spacing.stackLg }]}
        >
          Code has been sent to{" "}
          <Typography variant="bodyMd" color={theme.colors.text.primary}>
            {screen.maskedContact}
          </Typography>
        </Typography>

        <View style={[styles.boxRow, { gap: theme.spacing.stackMd }]}>
          {otpChars.map((char, index) => {
            const isFilled = char.length > 0;
            const isActive = index === screen.otp.length && !screen.isFull;
            return (
              <OTPBox
                key={index}
                char={char}
                isActive={isActive}
                isFilled={isFilled}
              />
            );
          })}
        </View>

        <View
          style={[styles.resendRow, { marginTop: theme.spacing.stackLg }]}
        >
          {screen.canResend ? (
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={screen.onResend}
              style={({ pressed }) => ({ opacity: pressed ? 0.72 : 1 })}
            >
              <Typography
                variant="labelMd"
                color={theme.colors.accent.amber}
              >
                Resend code
              </Typography>
            </Pressable>
          ) : (
            <Typography variant="bodyMd" color={theme.colors.text.secondary}>
              Resend code in{" "}
              <Typography variant="bodyMd" color={theme.colors.accent.amber}>
                {screen.secondsLeft} s
              </Typography>
            </Typography>
          )}
        </View>
      </View>

      <View
        style={[
          styles.bottomSection,
          {
            paddingHorizontal: theme.spacing.containerMargin,
            paddingBottom: theme.spacing.stackLg,
          },
        ]}
      >
        {screen.isFull ? (
          <BookingPillButton
            variant="primary"
            label="Verify"
            onPress={screen.onVerify}
          />
        ) : (
          <OTPKeypad
            onKeyPress={screen.onKeyPress}
            onBackspace={screen.onBackspace}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    width: "100%",
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
  otpSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sentToText: {
    textAlign: "center",
  },
  boxRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  resendRow: {
    alignItems: "center",
  },
  bottomSection: {
    width: "100%",
  },
});

export default ForgotPasswordOTPScreen;
