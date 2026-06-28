import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/hooks/useAuth";
import type { RootStackParamList } from "@/navigation/types";

type SettingsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface UseProfileSettingsScreenResult {
  displayName: string;
  email: string;
  avatarUri: string | null;
  darkMode: boolean;
  onAvatarPress: () => Promise<void>;
  onDarkModeToggle: (value: boolean) => void;
  onMenuPress: (id: string) => void;
  onLogout: () => void;
}

export function useProfileSettingsScreen(): UseProfileSettingsScreenResult {
  const navigation = useNavigation<SettingsNavigationProp>();
  const { user, updateUser, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const displayName = user?.displayName ?? "";
  const email = user?.email ?? "";
  const avatarUri = user?.avatarUrl ?? null;

  const onAvatarPress = useCallback(async (): Promise<void> => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      if (asset !== undefined) {
        updateUser({ avatarUrl: asset.uri });
      }
    }
  }, [updateUser]);

  const onDarkModeToggle = useCallback((value: boolean): void => {
    setDarkMode(value);
  }, []);

  const onMenuPress = useCallback(
    (id: string): void => {
      if (id === "edit-profile") {
        navigation.navigate("EditProfile");
      }
      // Other menu items are not yet implemented
    },
    [navigation],
  );

  const onLogout = useCallback((): void => {
    logout();
  }, [logout]);

  return {
    displayName,
    email,
    avatarUri,
    darkMode,
    onAvatarPress,
    onDarkModeToggle,
    onMenuPress,
    onLogout,
  };
}
