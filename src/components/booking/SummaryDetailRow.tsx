import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface SummaryDetailRowProps {
  label: string;
  value: string;
  emphasizeValue?: boolean;
  isLast?: boolean;
}

const SummaryDetailRow = ({
  label,
  value,
  emphasizeValue = false,
  isLast = false,
}: SummaryDetailRowProps): React.JSX.Element => {
  const { theme } = useTheme();

  const resolvedValueColor = emphasizeValue
    ? theme.colors.primary.dim
    : theme.colors.text.primary;

  return (
    <View
      style={[
        styles.row,
        {
          paddingVertical: theme.spacing.stackSm,
          borderBottomColor: `${theme.colors.border.level1}80`,
          borderBottomWidth: isLast ? 0 : 1,
        },
      ]}
    >
      <Text
        style={[
          toTextStyle(theme.typography.labelMd),
          { color: theme.colors.text.secondary, textTransform: "none" },
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.value,
          toTextStyle(theme.typography.bodyMd),
          {
            color: resolvedValueColor,
            fontWeight: emphasizeValue ? "600" : "400",
          },
        ]}
        numberOfLines={3}
      >
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  value: {
    flex: 1,
    textAlign: "right",
    marginLeft: 16,
    maxWidth: "60%",
  },
});

export default SummaryDetailRow;
