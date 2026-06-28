import React, { useCallback, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type TextInputProps,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Typography from "@/components/common/Typography";
import { focusGlowStyle, toTextStyle } from "@/config/theme";
import { useTheme } from "@/hooks/useTheme";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

export interface AuthTextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  leadingIconName: MaterialIconName;
  label?: string;
  isPassword?: boolean;
  errorMessage?: string | undefined;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoComplete?: TextInputProps["autoComplete"];
  textContentType?: TextInputProps["textContentType"];
  returnKeyType?: TextInputProps["returnKeyType"];
}

const AuthTextField = ({
  value,
  onChangeText,
  placeholder,
  leadingIconName,
  label,
  isPassword = false,
  errorMessage,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoComplete,
  textContentType,
  returnKeyType = "done",
}: AuthTextFieldProps): React.JSX.Element => {
  const { theme } = useTheme();
  const textInputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const hasError = errorMessage !== undefined && errorMessage.length > 0;
  const secureTextEntry = isPassword && !passwordVisible;

  const handleFieldPress = useCallback((): void => {
    textInputRef.current?.focus();
  }, []);
  const handleFocus = useCallback((): void => setFocused(true), []);
  const handleBlur = useCallback((): void => setFocused(false), []);
  const handleTogglePassword = useCallback((): void => {
    setPasswordVisible((current) => !current);
  }, []);

  return (
    <View style={[styles.root, { gap: theme.spacing.stackSm }]}>
      {label !== undefined ? (
        <Typography
          variant="labelMd"
          color={theme.colors.text.secondary}
          style={styles.label}
        >
          {label}
        </Typography>
      ) : null}

      <Pressable
        onPress={handleFieldPress}
        style={[
          styles.field,
          {
            backgroundColor: theme.colors.depth.level1,
            borderColor: hasError
              ? theme.colors.semantic.error
              : focused
                ? theme.colors.primary.default
                : theme.colors.border.level1,
            borderRadius: theme.borderRadius.md,
            paddingHorizontal: theme.spacing.stackMd,
          },
          focused && !hasError ? focusGlowStyle(theme) : undefined,
        ]}
      >
        <MaterialIcons
          name={leadingIconName}
          size={20}
          color={focused ? theme.colors.primary.dim : theme.colors.text.secondary}
        />
        <TextInput
          ref={textInputRef}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.disabled}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          autoComplete={autoComplete}
          textContentType={textContentType}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          selectionColor={theme.colors.primary.dim}
          style={[
            styles.input,
            toTextStyle(theme.typography.bodyMd),
            { color: theme.colors.text.primary },
          ]}
        />
        {isPassword ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={passwordVisible ? "Hide password" : "Show password"}
            hitSlop={8}
            onPress={handleTogglePassword}
            style={({ pressed }) => [
              styles.iconButton,
              { opacity: pressed ? 0.72 : 1 },
            ]}
          >
            <MaterialIcons
              name={passwordVisible ? "visibility-off" : "visibility"}
              size={20}
              color={theme.colors.text.secondary}
            />
          </Pressable>
        ) : null}
      </Pressable>

      {hasError ? (
        <Typography variant="labelMd" color={theme.colors.semantic.error}>
          {errorMessage}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
  label: {
    marginLeft: 4,
  },
  field: {
    minHeight: 58,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  iconButton: {
    minHeight: 44,
    minWidth: 44,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default AuthTextField;
