import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "@/navigation/types";

type MethodsNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ForgotPasswordMethods"
>;

const DEMO_DEFAULT_EMAIL = "dan***in@yourdomain.com";

export interface UseForgotPasswordMethodsScreenResult {
  emailContact: string;
  onEmailContactChange: (text: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function useForgotPasswordMethodsScreen(): UseForgotPasswordMethodsScreenResult {
  const navigation = useNavigation<MethodsNavigationProp>();
  const [emailContact, setEmailContact] = useState(DEMO_DEFAULT_EMAIL);

  const onEmailContactChange = useCallback((text: string): void => {
    setEmailContact(text);
  }, []);

  const onContinue = useCallback((): void => {
    navigation.navigate("ForgotPasswordOTP", {
      maskedContact: emailContact,
      method: "email",
    });
  }, [navigation, emailContact]);

  const onBack = useCallback((): void => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  return {
    emailContact,
    onEmailContactChange,
    onContinue,
    onBack,
  };
}
