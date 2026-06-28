import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";

export interface OTPBoxProps {
  char: string;
  isActive: boolean;
  isFilled: boolean;
}

const OTPBox = ({ char, isActive, isFilled }: OTPBoxProps): React.JSX.Element => {
  const { theme } = useTheme();

  const borderColor = isActive
    ? theme.colors.accent.amber
    : isFilled
      ? theme.colors.primary.default
      : theme.colors.border.level1;

  return (
    <View
      style={[
        styles.box,
        {
          backgroundColor: theme.colors.depth.level1,
          borderColor,
          borderRadius: theme.borderRadius.md,
        },
      ]}
    >
      {char.length > 0 ? (
        <Typography variant="headlineMd" color={theme.colors.text.primary}>
          {char}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 72,
    height: 72,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OTPBox;
