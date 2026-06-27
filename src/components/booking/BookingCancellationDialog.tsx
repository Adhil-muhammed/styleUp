import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface BookingCancellationDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
}

const BookingCancellationDialog = ({
  visible,
  onDismiss,
  onConfirm,
}: BookingCancellationDialogProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <View style={styles.root}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss cancellation dialog"
        >
          <BlurView
            intensity={theme.glassmorphism.blur}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: theme.colors.nav.surfaceScrim },
            ]}
          />
        </Pressable>

        <View
          style={[
            styles.dialog,
            {
              backgroundColor: theme.colors.text.onPrimary,
              borderRadius: theme.borderRadius.xl,
              paddingHorizontal: theme.spacing.stackLg,
              paddingVertical: theme.spacing.stackLg,
            },
          ]}
        >
          <Text
            style={[
              toTextStyle(theme.typography.bodyLg),
              styles.title,
              { color: theme.colors.depth.level1 },
            ]}
          >
            Cancellation of appointment
          </Text>
          <Text
            style={[
              toTextStyle(theme.typography.bodyMd),
              styles.message,
              { color: theme.colors.depth.level2 },
            ]}
          >
            Are you sure you want to cancel this appointment?
          </Text>

          <View
            style={[
              styles.actions,
              {
                gap: theme.spacing.stackMd,
                marginTop: theme.spacing.stackLg,
              },
            ]}
          >
            <Pressable
              onPress={onDismiss}
              hitSlop={8}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.button,
                {
                  borderColor: "#E1E1EA",
                  borderRadius: theme.borderRadius.md,
                  opacity: pressed ? 0.85 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
            >
              <Text
                style={[
                  toTextStyle(theme.typography.labelMd),
                  styles.buttonText,
                  { color: theme.colors.depth.level1 },
                ]}
              >
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              hitSlop={8}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.button,
                styles.confirmButton,
                {
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: pressed ? "#E8272D" : "#FF3138",
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
            >
              <Text
                style={[
                  toTextStyle(theme.typography.labelMd),
                  styles.buttonText,
                  { color: theme.colors.text.onPrimary },
                ]}
              >
                Select
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  dialog: {
    width: "100%",
    maxWidth: 335,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  title: {
    fontWeight: "800",
    textAlign: "center",
    textTransform: "none",
  },
  message: {
    marginTop: 12,
    maxWidth: 260,
    textAlign: "center",
    textTransform: "none",
  },
  actions: {
    width: "100%",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  confirmButton: {
    borderWidth: 0,
  },
  buttonText: {
    fontWeight: "800",
    textTransform: "none",
  },
});

export default BookingCancellationDialog;
