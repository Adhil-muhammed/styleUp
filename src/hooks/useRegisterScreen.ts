import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { SocialProvider } from "@/components/auth";
import type { AuthStackParamList } from "@/navigation/types";

type RegisterNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Register"
>;

interface RegisterFieldErrors {
  email?: string;
  password?: string;
}

export interface UseRegisterScreenResult {
  email: string;
  password: string;
  rememberMe: boolean;
  errors: RegisterFieldErrors;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onRememberToggle: () => void;
  onSubmit: () => void;
  onSignIn: () => void;
  onBack: () => void;
  onSocialPress: (provider: SocialProvider) => void;
}

function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function useRegisterScreen(): UseRegisterScreenResult {
  const navigation = useNavigation<RegisterNavigationProp>();
  const [email, setEmail] = useState("daniel_austin@yourdomain.com");
  const [password, setPassword] = useState("stylequest");
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<RegisterFieldErrors>({});

  const onEmailChange = useCallback((text: string): void => {
    setEmail(text);
    setErrors((current) => {
      const { email: _emailError, ...remainingErrors } = current;
      return remainingErrors;
    });
  }, []);

  const onPasswordChange = useCallback((text: string): void => {
    setPassword(text);
    setErrors((current) => {
      const { password: _passwordError, ...remainingErrors } = current;
      return remainingErrors;
    });
  }, []);

  const onRememberToggle = useCallback((): void => {
    setRememberMe((current) => !current);
  }, []);

  const onSubmit = useCallback((): void => {
    const nextErrors: RegisterFieldErrors = {};

    if (!isEmailValid(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (password.length < 8) {
      nextErrors.password = "Use at least 8 characters for your password.";
    }

    setErrors(nextErrors);
  }, [email, password]);

  const onSignIn = useCallback((): void => {
    navigation.navigate("Login");
  }, [navigation]);

  const onBack = useCallback((): void => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("Login");
  }, [navigation]);

  const onSocialPress = useCallback((_provider: SocialProvider): void => {
    setErrors({});
  }, []);

  return {
    email,
    password,
    rememberMe,
    errors,
    onEmailChange,
    onPasswordChange,
    onRememberToggle,
    onSubmit,
    onSignIn,
    onBack,
    onSocialPress,
  };
}
