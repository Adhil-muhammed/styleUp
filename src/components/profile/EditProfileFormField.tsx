import React, { useCallback, useRef } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type TextInputProps,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { toTextStyle } from "@/config/theme";
import { useTheme } from "@/hooks/useTheme";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

export interface EditProfileFormFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  trailingIconName?: MaterialIconName;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoComplete?: TextInputProps["autoComplete"];
  textContentType?: TextInputProps["textContentType"];
  returnKeyType?: TextInputProps["returnKeyType"];
  multiline?: boolean;
}

const EditProfileFormField = ({
  value,
  onChangeText,
  placeholder,
  trailingIconName,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoComplete,
  textContentType,
  returnKeyType = "next",
  multiline = false,
}: EditProfileFormFieldProps): React.JSX.Element => {
  const { theme } = useTheme();
  const inputRef = useRef<TextInput>(null);

  const handlePress = useCallback((): void => {
    inputRef.current?.focus();
  }, []);

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.field,
        {
          backgroundColor: theme.colors.depth.level1,
          borderRadius: theme.borderRadius.md,
          paddingHorizontal: theme.spacing.stackMd,
          minHeight: multiline ? 80 : 56,
        },
      ]}
    >
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.secondary}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        autoComplete={autoComplete}
        textContentType={textContentType}
        returnKeyType={returnKeyType}
        multiline={multiline}
        selectionColor={theme.colors.primary.dim}
        style={[
          styles.input,
          toTextStyle(theme.typography.bodyMd),
          {
            color: theme.colors.text.primary,
            textAlignVertical: multiline ? "top" : "center",
          },
        ]}
      />
      {trailingIconName !== undefined ? (
        <MaterialIcons
          name={trailingIconName}
          size={20}
          color={theme.colors.text.secondary}
        />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
});

export default EditProfileFormField;
