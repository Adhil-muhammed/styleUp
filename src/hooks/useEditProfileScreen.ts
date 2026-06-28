import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "@/hooks/useAuth";
import type { SelectOption } from "@/components/profile";
import type { RootStackParamList } from "@/navigation/types";

type EditProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditProfile"
>;

export const COUNTRY_OPTIONS: readonly SelectOption[] = [
  { label: "United States", value: "united_states" },
  { label: "India", value: "india" },
  { label: "United Kingdom", value: "united_kingdom" },
  { label: "Australia", value: "australia" },
  { label: "Canada", value: "canada" },
] as const;

export const GENDER_OPTIONS: readonly SelectOption[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "prefer_not" },
] as const;

function formatDateOfBirth(date: Date | null): string {
  if (date === null) {
    return "";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

export interface UseEditProfileScreenResult {
  fullName: string;
  nickname: string;
  dateOfBirth: Date | null;
  dateOfBirthLabel: string;
  email: string;
  country: string;
  phoneNumber: string;
  gender: string;
  address: string;
  countryOptions: readonly SelectOption[];
  genderOptions: readonly SelectOption[];
  onFullNameChange: (text: string) => void;
  onNicknameChange: (text: string) => void;
  onDateOfBirthChange: (date: Date) => void;
  onEmailChange: (text: string) => void;
  onCountryChange: (value: string) => void;
  onPhoneNumberChange: (text: string) => void;
  onGenderChange: (value: string) => void;
  onAddressChange: (text: string) => void;
  onUpdate: () => void;
  onBack: () => void;
}

export function useEditProfileScreen(): UseEditProfileScreenResult {
  const navigation = useNavigation<EditProfileNavigationProp>();
  const { user, updateUser } = useAuth();

  const [fullName, setFullName] = useState(user?.displayName ?? "");
  const [nickname, setNickname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [email, setEmail] = useState(user?.email ?? "");
  const [country, setCountry] = useState("united_states");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? "");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const onDateOfBirthChange = useCallback((date: Date): void => {
    setDateOfBirth(date);
  }, []);

  const onUpdate = useCallback((): void => {
    const trimmed = fullName.trim();
    updateUser({
      displayName: trimmed.length > 0 ? trimmed : (user?.displayName ?? ""),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
    });
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation, fullName, email, phoneNumber, updateUser, user]);

  const onBack = useCallback((): void => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  return {
    fullName,
    nickname,
    dateOfBirth,
    dateOfBirthLabel: formatDateOfBirth(dateOfBirth),
    email,
    country,
    phoneNumber,
    gender,
    address,
    countryOptions: COUNTRY_OPTIONS,
    genderOptions: GENDER_OPTIONS,
    onFullNameChange: setFullName,
    onNicknameChange: setNickname,
    onDateOfBirthChange,
    onEmailChange: setEmail,
    onCountryChange: setCountry,
    onPhoneNumberChange: setPhoneNumber,
    onGenderChange: setGender,
    onAddressChange: setAddress,
    onUpdate,
    onBack,
  };
}
