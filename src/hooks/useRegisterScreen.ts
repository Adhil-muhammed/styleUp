import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { SocialProvider } from "@/components/auth";
import { useAuth } from "@/hooks/useAuth";
import type { AuthStackParamList } from "@/navigation/types";
import type { User } from "@/types";
import type { AuthTokenPair } from "@/types/api";

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

const DEMO_TOKENS: AuthTokenPair = {
  accessToken: "demo-register-access-token",
  refreshToken: "demo-register-refresh-token",
  expiresAt: Date.now() + 3_600_000,
};

export function useRegisterScreen(): UseRegisterScreenResult {
  const navigation = useNavigation<RegisterNavigationProp>();
  const { login, setPostAuthInitialTab } = useAuth();
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

    const hasErrors = Object.keys(nextErrors).length > 0;
    if (hasErrors) {
      return;
    }

    const demoUser: User = {
      id: "demo-new-user-001",
      email,
      phoneNumber: "",
      displayName: "New StyleQuest User",
      avatarUrl: null,
      xpPoints: 0,
      level: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPostAuthInitialTab("Profile");
    login(demoUser, DEMO_TOKENS);
  }, [email, password, login, setPostAuthInitialTab]);

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
