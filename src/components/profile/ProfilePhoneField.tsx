import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { focusGlowStyle, toTextStyle } from "@/config/theme";
import { useTheme } from "@/hooks/useTheme";

export interface ProfilePhoneFieldProps {
  value: string;
  onChangeText: (text: string) => void;
}

const ProfilePhoneField = ({
  value,
  onChangeText,
}: ProfilePhoneFieldProps): React.JSX.Element => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.field,
        {
          backgroundColor: theme.colors.depth.level1,
          borderColor: focused
            ? theme.colors.primary.default
            : theme.colors.border.level1,
          borderRadius: theme.borderRadius.md,
        },
        focused ? focusGlowStyle(theme) : undefined,
      ]}
    >
      <PhoneInput
        defaultCode="IN"
        defaultValue={value}
        value={value}
        layout="first"
        withDarkTheme={false}
        onChangeFormattedText={onChangeText}
        containerStyle={styles.phoneContainer}
        textContainerStyle={[
          styles.phoneTextContainer,
          {
            backgroundColor: theme.colors.depth.level1,
            borderLeftColor: theme.colors.border.level1,
          },
        ]}
        codeTextStyle={[
          toTextStyle(theme.typography.bodyMd),
          { color: theme.colors.text.primary },
        ]}
        textInputStyle={[
          styles.phoneInput,
          toTextStyle(theme.typography.bodyMd),
          { color: theme.colors.text.primary },
        ]}
        flagButtonStyle={[
          styles.flagButton,
          { backgroundColor: theme.colors.depth.level1 },
        ]}
        countryPickerProps={{
          withFilter: true,
          withFlag: true,
          withCountryNameButton: false,
          withAlphaFilter: true,
          withCallingCode: true,
          withEmoji: false,
          filterProps: {
            placeholder: "Search country",
          },
          theme: {
            backgroundColor: theme.colors.depth.level2,
            onBackgroundTextColor: theme.colors.text.primary,
            fontSize: 16,
            filterPlaceholderTextColor: theme.colors.text.secondary,
            activeOpacity: 0.7,
            itemHeight: 52,
            flagSize: 24,
          },
        }}
        textInputProps={{
          placeholder: "Phone Number",
          placeholderTextColor: theme.colors.text.secondary,
          selectionColor: theme.colors.primary.dim,
          onFocus: () => setFocused(true),
          onBlur: () => setFocused(false),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    minHeight: 56,
    borderWidth: 1,
  },
  phoneContainer: {
    width: "100%",
    minHeight: 56,
    backgroundColor: "transparent",
  },
  phoneTextContainer: {
    flex: 1,
    minHeight: 56,
    paddingVertical: 0,
    borderLeftWidth: 1,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  phoneInput: {
    minHeight: 56,
    paddingVertical: 0,
  },
  flagButton: {
    width: 72,
    minHeight: 56,
    paddingLeft: 8,
    paddingRight: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfilePhoneField;
