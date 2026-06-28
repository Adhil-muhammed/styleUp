import React, { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Typography from "@/components/common/Typography";
import { toTextStyle } from "@/config/theme";
import { useTheme } from "@/hooks/useTheme";

export type ForgotPasswordMethod = "sms" | "email";

export interface ForgotPasswordMethodCardProps {
  method: ForgotPasswordMethod;
  contact: string;
  selected: boolean;
  onPress: (method: ForgotPasswordMethod) => void;
  /** When true, shows a "Change" link below the contact that opens an inline editor */
  editable?: boolean;
  onContactChange?: (text: string) => void;
}

const METHOD_CONFIG: Record<
  ForgotPasswordMethod,
  { icon: React.ComponentProps<typeof MaterialIcons>["name"]; label: string }
> = {
  sms: { icon: "sms", label: "via SMS:" },
  email: { icon: "mail-outline", label: "via Email:" },
};

const ForgotPasswordMethodCard = ({
  method,
  contact,
  selected,
  onPress,
  editable = false,
  onContactChange,
}: ForgotPasswordMethodCardProps): React.JSX.Element => {
  const { theme } = useTheme();
  const config = METHOD_CONFIG[method];
  const inputRef = useRef<TextInput>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handlePress = useCallback((): void => {
    onPress(method);
  }, [onPress, method]);

  const handleEditPress = useCallback((): void => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const handleInputBlur = useCallback((): void => {
    setIsEditing(false);
  }, []);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      hitSlop={4}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.colors.depth.level1,
          borderColor: selected
            ? theme.colors.accent.amber
            : theme.colors.border.level1,
          borderRadius: theme.borderRadius.md,
          paddingHorizontal: theme.spacing.stackMd,
          paddingVertical: theme.spacing.stackMd,
          opacity: pressed ? 0.88 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
      ]}
    >
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: `${theme.colors.accent.amber}1A` },
        ]}
      >
        <MaterialIcons
          name={config.icon}
          size={22}
          color={theme.colors.accent.amber}
        />
      </View>

      <View style={styles.textGroup}>
        <Typography variant="labelMd" color={theme.colors.text.secondary}>
          {config.label}
        </Typography>

        {isEditing && editable ? (
          <TextInput
            ref={inputRef}
            value={contact}
            onChangeText={onContactChange}
            onBlur={handleInputBlur}
            autoCapitalize="none"
            keyboardType={method === "email" ? "email-address" : "phone-pad"}
            returnKeyType="done"
            selectionColor={theme.colors.accent.amber}
            placeholderTextColor={theme.colors.text.secondary}
            style={[
              toTextStyle(theme.typography.bodyMd),
              styles.input,
              {
                color: theme.colors.text.primary,
                borderBottomColor: theme.colors.accent.amber,
              },
            ]}
          />
        ) : (
          <Typography variant="bodyMd" color={theme.colors.text.primary}>
            {contact}
          </Typography>
        )}

        {editable && !isEditing ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Change contact"
            hitSlop={8}
            onPress={handleEditPress}
            style={({ pressed }) => [
              styles.changeButton,
              { opacity: pressed ? 0.65 : 1 },
            ]}
          >
            <Typography variant="labelMd" color={theme.colors.accent.amber}>
              Change
            </Typography>
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1.5,
    gap: 16,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  textGroup: {
    flex: 1,
    gap: 3,
  },
  input: {
    paddingVertical: 2,
    borderBottomWidth: 1,
  },
  changeButton: {
    alignSelf: "flex-start",
    minHeight: 28,
    justifyContent: "center",
  },
});

export default ForgotPasswordMethodCard;
