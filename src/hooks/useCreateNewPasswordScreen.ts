import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "@/navigation/types";

type CreatePasswordNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "CreateNewPassword"
>;

interface CreatePasswordErrors {
  newPassword?: string;
  confirmPassword?: string;
}

export interface UseCreateNewPasswordScreenResult {
  newPassword: string;
  confirmPassword: string;
  rememberMe: boolean;
  errors: CreatePasswordErrors;
  onNewPasswordChange: (text: string) => void;
  onConfirmPasswordChange: (text: string) => void;
  onRememberToggle: () => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function useCreateNewPasswordScreen(): UseCreateNewPasswordScreenResult {
  const navigation = useNavigation<CreatePasswordNavigationProp>();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<CreatePasswordErrors>({});

  const onNewPasswordChange = useCallback((text: string): void => {
    setNewPassword(text);
    setErrors((current) => {
      const { newPassword: _np, ...rest } = current;
      return rest;
    });
  }, []);

  const onConfirmPasswordChange = useCallback((text: string): void => {
    setConfirmPassword(text);
    setErrors((current) => {
      const { confirmPassword: _cp, ...rest } = current;
      return rest;
    });
  }, []);

  const onRememberToggle = useCallback((): void => {
    setRememberMe((current) => !current);
  }, []);

  const onSubmit = useCallback((): void => {
    const nextErrors: CreatePasswordErrors = {};

    if (newPassword.length < 3) {
      nextErrors.newPassword = "Password must be at least 3 characters.";
    }

    if (confirmPassword.length === 0) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (newPassword !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      // Demo: reset flow back to Login
      navigation.navigate("Login");
    }
  }, [navigation, newPassword, confirmPassword]);

  const onBack = useCallback((): void => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  return {
    newPassword,
    confirmPassword,
    rememberMe,
    errors,
    onNewPasswordChange,
    onConfirmPasswordChange,
    onRememberToggle,
    onSubmit,
    onBack,
  };
}
