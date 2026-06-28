import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ForgotPasswordMethodCard } from "@/components/auth";
import { BookingPillButton } from "@/components/booking";
import Typography from "@/components/common/Typography";
import { useForgotPasswordMethodsScreen } from "@/hooks/useForgotPasswordMethodsScreen";
import { useTheme } from "@/hooks/useTheme";
import type { AuthStackScreenProps } from "@/navigation/types";

type Props = AuthStackScreenProps<"ForgotPasswordMethods">;

const ForgotPasswordMethodsScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const screen = useForgotPasswordMethodsScreen();

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={[styles.root, { backgroundColor: theme.colors.depth.level0 }]}
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
            Forgot Password
          </Typography>

          <Typography
            variant="bodyMd"
            color={theme.colors.text.secondary}
            style={{
              marginTop: theme.spacing.stackSm,
              marginBottom: theme.spacing.stackLg,
            }}
          >
            Select which contact details should we use to reset your password
          </Typography>

          <ForgotPasswordMethodCard
            method="email"
            contact={screen.emailContact}
            selected
            onPress={() => undefined}
            editable
            onContactChange={screen.onEmailContactChange}
          />
        </View>

        <View style={[styles.footer, { marginTop: theme.spacing.sectionGap }]}>
          <BookingPillButton
            variant="primary"
            label="Continue"
            onPress={screen.onContinue}
          />
        </View>
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
  footer: {
    width: "100%",
  },
});

export default ForgotPasswordMethodsScreen;
