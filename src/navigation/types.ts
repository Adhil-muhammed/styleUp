import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { ModalType } from "../types";

// ─── Param Lists ──────────────────────────────────────────────────────────────

export type RootStackParamList = {
  Auth: undefined;
  App: NavigatorScreenParams<AppTabParamList> | undefined;
  Modal: { modalType: ModalType };
  BarberProfile: { shopId: string };
  PackageDetails: { shopId: string; packageId: string };
  BookAppointment: { shopId: string };
  PaymentMethod: { shopId: string };
  PaymentSummary: { shopId: string };
  PaymentSuccess: { shopId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  OTP: { phoneNumber: string };
};

export type AppTabParamList = {
  Home: undefined;
  Discover: undefined;
  Feed: undefined;
  Profile: undefined;
};

// ─── Typed Screen Props ───────────────────────────────────────────────────────

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type AppTabScreenProps<T extends keyof AppTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

// ─── Global Navigation Type Augmentation ─────────────────────────────────────

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // Augments useNavigation() to be typed against the root stack
    interface RootParamList extends RootStackParamList {}
  }
}
