import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface ProfileContactSectionProps {
  phone: string;
}

const ProfileContactSection = ({
  phone,
}: ProfileContactSectionProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.stackSm }}>
      <Text
        style={[
          toTextStyle(theme.typography.headlineMd),
          { color: theme.colors.text.primary },
        ]}
      >
        Contact us
      </Text>
      <Text
        style={[
          toTextStyle(theme.typography.bodyLg),
          { color: theme.colors.accent.amber, fontWeight: "700" },
        ]}
      >
        {phone}
      </Text>
    </View>
  );
};

export default ProfileContactSection;
