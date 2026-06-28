import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

export interface ProfileAvatarPickerProps {
  avatarUri: string | null;
  onPress: () => void;
}

const AVATAR_SIZE = 128;

const ProfileAvatarPicker = ({
  avatarUri,
  onPress,
}: ProfileAvatarPickerProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Edit profile photo"
        hitSlop={8}
        onPress={onPress}
        style={({ pressed }) => [
          styles.avatar,
          {
            backgroundColor: theme.colors.depth.level2,
            borderColor: theme.colors.border.level1,
            opacity: pressed ? 0.82 : 1,
          },
        ]}
      >
        {avatarUri !== null ? (
          <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
        ) : (
          <MaterialIcons
            name="person"
            size={64}
            color={theme.colors.text.secondary}
          />
        )}
        <View
          style={[
            styles.editButton,
            {
              backgroundColor: theme.colors.text.primary,
              borderColor: theme.colors.depth.level0,
            },
          ]}
        >
          <MaterialIcons
            name="camera-alt"
            size={14}
            color={theme.colors.depth.level0}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    // overflow must NOT be "hidden" here — it clips the absolute edit badge
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: AVATAR_SIZE / 2,
    overflow: "hidden",
    resizeMode: "cover",
  },
  editButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 10,
  },
});

export default ProfileAvatarPicker;
