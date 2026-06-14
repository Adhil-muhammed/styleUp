import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

type ProfileActionIcon = "explore" | "chat-bubble-outline" | "call" | "location-on" | "send";

interface ProfileAction {
  id: string;
  label: string;
  icon: ProfileActionIcon;
}

const PROFILE_ACTIONS: ProfileAction[] = [
  { id: "website", label: "Website", icon: "explore" },
  { id: "message", label: "Message", icon: "chat-bubble-outline" },
  { id: "call", label: "Call", icon: "call" },
  { id: "direction", label: "Direction", icon: "location-on" },
  { id: "share", label: "Share", icon: "send" },
];

interface ProfileActionBarProps {
  onActionPress?: (actionId: string) => void;
}

const ProfileActionBar = ({
  onActionPress,
}: ProfileActionBarProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback(
    (actionId: string) => (): void => {
      onActionPress?.(actionId);
    },
    [onActionPress],
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: theme.spacing.containerMargin,
          paddingVertical: theme.spacing.stackLg,
        },
      ]}
    >
      {PROFILE_ACTIONS.map((action) => (
        <Pressable
          key={action.id}
          onPress={handlePress(action.id)}
          style={({ pressed }) => [
            styles.actionCol,
            { opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: theme.colors.depth.level1,
                borderColor: theme.colors.border.level1,
                borderRadius: theme.borderRadius.full,
              },
            ]}
          >
            <MaterialIcons
              name={action.icon}
              size={22}
              color={theme.colors.primary.dim}
            />
          </View>
          <Text
            style={[
              styles.actionLabel,
              toTextStyle(theme.typography.labelSm),
              { color: theme.colors.text.disabled, textTransform: "uppercase" },
            ]}
          >
            {action.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  actionCol: {
    alignItems: "center",
    gap: 8,
    minWidth: 48,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: {
    fontSize: 10,
    letterSpacing: 1,
  },
});

export default ProfileActionBar;
