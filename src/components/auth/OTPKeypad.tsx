import React, { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";

export interface OTPKeypadProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
}

const ROWS: readonly (readonly string[])[] = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["*", "0", "⌫"],
] as const;

const OTPKeypad = ({
  onKeyPress,
  onBackspace,
}: OTPKeypadProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handleKeyPress = useCallback(
    (key: string): void => {
      if (key === "⌫") {
        onBackspace();
      } else if (key !== "*") {
        onKeyPress(key);
      }
    },
    [onKeyPress, onBackspace],
  );

  return (
    <View style={styles.keypad}>
      {ROWS.map((row) => (
        <View key={row.join("")} style={styles.row}>
          {row.map((key) => {
            const isBackspace = key === "⌫";
            const isStar = key === "*";

            if (isStar) {
              return <View key={key} style={styles.key} />;
            }

            return (
              <Pressable
                key={key}
                accessibilityRole="button"
                accessibilityLabel={isBackspace ? "Backspace" : key}
                hitSlop={8}
                onPress={() => handleKeyPress(key)}
                style={({ pressed }) => [
                  styles.key,
                  {
                    backgroundColor: pressed
                      ? theme.colors.depth.level2
                      : "transparent",
                    borderRadius: theme.borderRadius.full,
                    transform: [{ scale: pressed ? 0.92 : 1 }],
                  },
                ]}
              >
                {isBackspace ? (
                  <MaterialIcons
                    name="backspace"
                    size={24}
                    color={theme.colors.text.primary}
                  />
                ) : (
                  <Typography
                    variant="headlineMd"
                    color={theme.colors.text.primary}
                  >
                    {key}
                  </Typography>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keypad: {
    width: "100%",
    gap: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  key: {
    flex: 1,
    minHeight: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OTPKeypad;
