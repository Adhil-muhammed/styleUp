import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

type SummarySectionIcon = "storefront" | "receipt-long";

interface SummarySectionHeaderProps {
  title: string;
  icon?: SummarySectionIcon;
}

const SummarySectionHeader = ({
  title,
  icon,
}: SummarySectionHeaderProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.row, { gap: theme.spacing.stackSm }]}>
      {icon !== undefined ? (
        <MaterialIcons name={icon} size={18} color={theme.colors.primary.dim} />
      ) : null}
      <Text
        style={[
          toTextStyle(theme.typography.labelSm),
          {
            color: theme.colors.text.secondary,
            letterSpacing: 1.2,
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SummarySectionHeader;
