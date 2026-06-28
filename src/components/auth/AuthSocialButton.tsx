import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import GoogleIcon from "./GoogleIcon";

type SocialProvider = "facebook" | "google" | "apple";
type FontAwesomeName = React.ComponentProps<typeof FontAwesome>["name"];

export interface AuthSocialButtonProps {
  provider: SocialProvider;
  onPress: (provider: SocialProvider) => void;
}

const PROVIDER_ICON: Record<Exclude<SocialProvider, "google">, FontAwesomeName> = {
  facebook: "facebook",
  apple: "apple",
};

const PROVIDER_COLOR: Record<Exclude<SocialProvider, "google">, string> = {
  facebook: "#1877F2",
  apple: "#F4F4F5",
};

const PROVIDER_LABEL: Record<SocialProvider, string> = {
  facebook: "Continue with Facebook",
  google: "Continue with Google",
  apple: "Continue with Apple",
};

const ICON_SIZE = 24;

const AuthSocialButton = ({
  provider,
  onPress,
}: AuthSocialButtonProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback((): void => {
    onPress(provider);
  }, [onPress, provider]);

  const renderIcon = (): React.JSX.Element => {
    if (provider === "google") {
      return <GoogleIcon size={ICON_SIZE} />;
    }
    return (
      <FontAwesome
        name={PROVIDER_ICON[provider]}
        size={ICON_SIZE}
        color={PROVIDER_COLOR[provider]}
      />
    );
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={PROVIDER_LABEL[provider]}
      hitSlop={8}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.root,
        {
          backgroundColor: pressed
            ? theme.colors.depth.level2
            : theme.colors.depth.level1,
          borderColor: theme.colors.border.level1,
          borderRadius: theme.borderRadius.lg,
          opacity: pressed ? 0.82 : 1,
          transform: [{ scale: pressed ? 0.96 : 1 }],
        },
      ]}
    >
      {renderIcon()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    minHeight: 58,
    flex: 1,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthSocialButton;
export type { SocialProvider };
