import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

// ─── Placeholder Screen Shells ────────────────────────────────────────────────
// Feature implementation is deferred. Each shell returns null intentionally.

const LoginScreen = (): null => null; /* Feature Screen Shell */
const RegisterScreen = (): null => null; /* Feature Screen Shell */
const OTPScreen = (): null => null; /* Feature Screen Shell */

// ─── Navigator ────────────────────────────────────────────────────────────────

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
