import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface ServiceRadioIndicatorProps {
  isSelected: boolean;
}

const OUTER_SIZE = 24;
const INNER_SIZE = 12;

const ServiceRadioIndicator = ({
  isSelected,
}: ServiceRadioIndicatorProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.outer,
        {
          borderColor: isSelected
            ? theme.colors.primary.default
            : theme.colors.border.level1,
          borderWidth: 2,
        },
      ]}
    >
      {isSelected ? (
        <View
          style={[
            styles.inner,
            { backgroundColor: theme.colors.primary.dim },
          ]}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    width: OUTER_SIZE,
    height: OUTER_SIZE,
    borderRadius: OUTER_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    width: INNER_SIZE,
    height: INNER_SIZE,
    borderRadius: INNER_SIZE / 2,
  },
});

export default ServiceRadioIndicator;
