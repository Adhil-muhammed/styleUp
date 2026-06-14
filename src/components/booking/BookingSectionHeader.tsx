import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface BookingSectionHeaderProps {
  title: string;
  onSeeAllPress?: () => void;
}

const BookingSectionHeader = ({
  title,
  onSeeAllPress,
}: BookingSectionHeaderProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={styles.header}>
      <Text
        style={[
          toTextStyle(theme.typography.headlineMd),
          { color: theme.colors.text.primary },
        ]}
      >
        {title}
      </Text>
      {onSeeAllPress !== undefined ? (
        <Pressable
          onPress={onSeeAllPress}
          hitSlop={8}
          style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
        >
          <Text
            style={[
              toTextStyle(theme.typography.labelMd),
              { color: theme.colors.accent.amber, fontWeight: "700" },
            ]}
          >
            See All
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default BookingSectionHeader;
