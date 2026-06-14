import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface BookingStepHeaderProps {
  title: string;
  stepLabel: string;
}

const BookingStepHeader = ({
  title,
  stepLabel,
}: BookingStepHeaderProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={styles.row}>
      <Text
        style={[
          toTextStyle(theme.typography.headlineLgMobile),
          { color: theme.colors.text.primary },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          toTextStyle(theme.typography.labelSm),
          { color: theme.colors.primary.dim, textTransform: "none" },
        ]}
      >
        {stepLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});

export default BookingStepHeader;
