import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { BlurView } from "expo-blur";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { focusGlowStyle, toTextStyle } from "@/config/theme";

interface DiscoverSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  editable?: boolean;
  onPress?: () => void;
}

const DEFAULT_PLACEHOLDER = "Find your next cut...";

const DiscoverSearchBar = ({
  value,
  onChangeText,
  onFilterPress,
  placeholder = DEFAULT_PLACEHOLDER,
  autoFocus = false,
  editable = true,
  onPress,
}: DiscoverSearchBarProps): React.JSX.Element => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback((): void => setFocused(true), []);
  const handleBlur = useCallback((): void => setFocused(false), []);

  const containerStyle = [
    styles.container,
    {
      backgroundColor: `${theme.colors.depth.level1}99`,
      borderColor: theme.colors.border.level1,
      borderRadius: theme.borderRadius.full,
    },
    focused && focusGlowStyle(theme),
  ];

  const content = (
    <>
      <BlurView
        intensity={theme.glassmorphism.blur}
        tint="dark"
        style={[
          StyleSheet.absoluteFill,
          { borderRadius: theme.borderRadius.full },
        ]}
        pointerEvents="none"
      />
      <MaterialIcons
        name="search"
        size={22}
        color={theme.colors.text.secondary}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.secondary}
        autoFocus={autoFocus}
        editable={editable}
        pointerEvents={editable ? "auto" : "none"}
        style={[
          styles.input,
          toTextStyle(theme.typography.bodyMd),
          { color: theme.colors.text.primary },
        ]}
      />
      <Pressable onPress={onFilterPress} hitSlop={8}>
        <MaterialIcons
          name="tune"
          size={22}
          color={theme.colors.text.secondary}
        />
      </Pressable>
    </>
  );

  if (!editable && onPress !== undefined) {
    return (
      <Pressable
        onPress={onPress}
        hitSlop={4}
        style={({ pressed }) => [
          containerStyle,
          { opacity: pressed ? 0.85 : 1 },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    gap: 8,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    padding: 0,
  },
});

export default DiscoverSearchBar;
