import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { focusGlowStyle, toTextStyle } from "@/config/theme";

interface BookingNotesInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const BookingNotesInput = ({
  value,
  onChangeText,
}: BookingNotesInputProps): React.JSX.Element => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback((): void => setFocused(true), []);
  const handleBlur = useCallback((): void => setFocused(false), []);

  return (
    <View style={{ gap: theme.spacing.stackSm }}>
      <Text
        style={[
          toTextStyle(theme.typography.labelMd),
          {
            color: theme.colors.text.secondary,
            marginLeft: 4,
          },
        ]}
      >
        Special Requests (Optional)
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="E.g., I'm sensitive to strong colognes..."
        placeholderTextColor={theme.colors.text.disabled}
        multiline
        numberOfLines={2}
        textAlignVertical="top"
        style={[
          styles.input,
          toTextStyle(theme.typography.bodyMd),
          {
            color: theme.colors.text.primary,
            backgroundColor: theme.colors.depth.level0,
            borderColor: focused
              ? theme.colors.primary.default
              : theme.colors.border.level1,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.stackMd,
          },
          focused && focusGlowStyle(theme),
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    minHeight: 72,
  },
});

export default BookingNotesInput;
