import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { SocialProvider } from "@/components/auth";
import { useAuth } from "@/hooks/useAuth";
import type { AuthStackParamList } from "@/navigation/types";
import type { User } from "@/types";
import type { AuthTokenPair } from "@/types/api";

type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

interface LoginFieldErrors {
  email?: string;
  password?: string;
}

export interface UseLoginScreenResult {
  email: string;
  password: string;
  rememberMe: boolean;
  errors: LoginFieldErrors;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onRememberToggle: () => void;
  onSubmit: () => void;
  onForgotPassword: () => void;
  onCreateAccount: () => void;
  onBack: () => void;
  onSocialPress: (provider: SocialProvider) => void;
}

function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

const DEMO_TOKENS: AuthTokenPair = {
  accessToken: "demo-access-token",
  refreshToken: "demo-refresh-token",
  expiresAt: Date.now() + 3_600_000,
};

export function useLoginScreen(): UseLoginScreenResult {
  const navigation = useNavigation<LoginNavigationProp>();
  const { login } = useAuth();
  const [email, setEmail] = useState("daniel_austin@yourdomain.com");
  const [password, setPassword] = useState("stylequest");
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<LoginFieldErrors>({});

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
    const nextErrors: LoginFieldErrors = {};

    if (!isEmailValid(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(nextErrors);

    const hasErrors = Object.keys(nextErrors).length > 0;
    if (!hasErrors) {
      const demoUser: User = {
        id: "demo-user-001",
        email,
        phoneNumber: "",
        displayName: "Daniel Austin",
        avatarUrl: null,
        xpPoints: 0,
        level: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      login(demoUser, DEMO_TOKENS);
      // RootNavigator sees isAuthenticated = true and replaces Auth with App automatically
    }
  }, [email, password, login]);

  const onForgotPassword = useCallback((): void => {
    setErrors({});
    navigation.navigate("ForgotPasswordMethods");
  }, [navigation]);

  const onCreateAccount = useCallback((): void => {
    navigation.navigate("Register");
  }, [navigation]);

  const onBack = useCallback((): void => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
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
    onForgotPassword,
    onCreateAccount,
    onBack,
    onSocialPress,
  };
}
