import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

const ABOUT_PREVIEW_LENGTH = 120;

interface ProfileAboutSectionProps {
  about: string;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

const ProfileAboutSection = ({
  about,
  isExpanded,
  onToggleExpanded,
}: ProfileAboutSectionProps): React.JSX.Element => {
  const { theme } = useTheme();
  const shouldTruncate = about.length > ABOUT_PREVIEW_LENGTH;
  const displayText =
    isExpanded || !shouldTruncate
      ? about
      : `${about.slice(0, ABOUT_PREVIEW_LENGTH).trim()}...`;

  return (
    <View>
      <Text
        style={[
          toTextStyle(theme.typography.bodyMd),
          { color: theme.colors.text.secondary, lineHeight: 22 },
        ]}
      >
        {displayText}
        {shouldTruncate && !isExpanded ? (
          <Text> </Text>
        ) : null}
        {shouldTruncate && !isExpanded ? (
          <Pressable onPress={onToggleExpanded} hitSlop={8}>
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                { color: theme.colors.accent.amber, fontWeight: "700" },
              ]}
            >
              Read more...
            </Text>
          </Pressable>
        ) : null}
      </Text>
    </View>
  );
};

export default ProfileAboutSection;
