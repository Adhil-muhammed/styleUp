import React, { useCallback } from "react";
import { Pressable, StyleSheet, Switch, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

export type ProfileSettingsRowType = "chevron" | "switch" | "destructive";

export interface ProfileSettingsRowProps {
  icon: MaterialIconName;
  label: string;
  type: ProfileSettingsRowType;
  valueText?: string;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
}

const ProfileSettingsRow = ({
  icon,
  label,
  type,
  valueText,
  switchValue = false,
  onSwitchChange,
  onPress,
}: ProfileSettingsRowProps): React.JSX.Element => {
  const { theme } = useTheme();

  const isDestructive = type === "destructive";
  const iconColor = isDestructive
    ? theme.colors.semantic.error
    : theme.colors.text.secondary;
  const labelColor = isDestructive
    ? theme.colors.semantic.error
    : theme.colors.text.primary;

  const handlePress = useCallback((): void => {
    onPress?.();
  }, [onPress]);

  const handleSwitchChange = useCallback(
    (value: boolean): void => {
      onSwitchChange?.(value);
    },
    [onSwitchChange],
  );

  const rowContent = (
    <View style={styles.inner}>
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: theme.colors.depth.level1 },
        ]}
      >
        <MaterialIcons name={icon} size={20} color={iconColor} />
      </View>

      <Typography
        variant="bodyMd"
        color={labelColor}
        style={styles.label}
      >
        {label}
      </Typography>

      {type === "switch" ? (
        <Switch
          value={switchValue}
          onValueChange={handleSwitchChange}
          trackColor={{
            false: theme.colors.border.level1,
            true: theme.colors.accent.amber,
          }}
          thumbColor={theme.colors.text.primary}
        />
      ) : null}

      {type === "chevron" ? (
        <>
          {valueText !== undefined ? (
            <Typography
              variant="bodyMd"
              color={theme.colors.text.secondary}
              style={styles.valueText}
            >
              {valueText}
            </Typography>
          ) : null}
          <MaterialIcons
            name="chevron-right"
            size={22}
            color={theme.colors.text.secondary}
          />
        </>
      ) : null}
    </View>
  );

  if (type === "switch") {
    return <View style={styles.row}>{rowContent}</View>;
  }

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        hitSlop={4}
        onPress={handlePress}
        style={({ pressed }) => [
          styles.pressable,
          { opacity: pressed ? 0.72 : 1 },
        ]}
      >
        {rowContent}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
  },
  pressable: {
    width: "100%",
  },
  inner: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 4,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    flex: 1,
  },
  valueText: {
    marginRight: 2,
  },
});

export default ProfileSettingsRow;
