import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { AuthStackParamList } from "@/navigation/types";

type OTPNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ForgotPasswordOTP"
>;
type OTPRouteProp = RouteProp<AuthStackParamList, "ForgotPasswordOTP">;

const COUNTDOWN_SECONDS = 60;
const OTP_LENGTH = 4;

export interface UseForgotPasswordOTPScreenResult {
  maskedContact: string;
  otp: string;
  isFull: boolean;
  secondsLeft: number;
  canResend: boolean;
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onResend: () => void;
  onVerify: () => void;
  onBack: () => void;
}

export function useForgotPasswordOTPScreen(): UseForgotPasswordOTPScreenResult {
  const navigation = useNavigation<OTPNavigationProp>();
  const route = useRoute<OTPRouteProp>();
  const { maskedContact } = route.params;

  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = useCallback((): void => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    setSecondsLeft(COUNTDOWN_SECONDS);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startCountdown();
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startCountdown]);

  const isFull = otp.length === OTP_LENGTH;
  const canResend = secondsLeft === 0;

  const onKeyPress = useCallback((key: string): void => {
    setOtp((current) => {
      if (current.length >= OTP_LENGTH) return current;
      return current + key;
    });
  }, []);

  const onBackspace = useCallback((): void => {
    setOtp((current) => current.slice(0, -1));
  }, []);

  const onResend = useCallback((): void => {
    setOtp("");
    startCountdown();
  }, [startCountdown]);

  const onVerify = useCallback((): void => {
    navigation.navigate("CreateNewPassword");
  }, [navigation]);

  const onBack = useCallback((): void => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  return {
    maskedContact,
    otp,
    isFull,
    secondsLeft,
    canResend,
    onKeyPress,
    onBackspace,
    onResend,
    onVerify,
    onBack,
  };
}
