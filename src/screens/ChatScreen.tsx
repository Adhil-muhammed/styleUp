import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";
import type { AppTabScreenProps } from "@/navigation/types";

type Props = AppTabScreenProps<"Chat">;

const ChatScreen = (_props: Props): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.depth.level0 }]}>
      <Typography variant="headlineLgMobile" color={theme.colors.text.primary}>
        Chat
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatScreen;
