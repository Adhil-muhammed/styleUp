import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  BookingPillButton,
  PaymentSuccessHero,
} from "@/components/booking";
import { usePaymentSuccessScreen } from "@/hooks/usePaymentSuccessScreen";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"PaymentSuccess">;

const CARD_PADDING = 32;

const PaymentSuccessScreen = ({ route }: Props): React.JSX.Element => {
  const { theme } = useTheme();
  const { onViewReceipt, onHome } = usePaymentSuccessScreen(route.params.shopId);
  const cardScale = useSharedValue(0.92);

  useEffect(() => {
    cardScale.value = withSpring(1, {
      stiffness: theme.motion.spring.stiffness,
      damping: theme.motion.spring.damping,
    });
  }, [cardScale, theme.motion.spring.damping, theme.motion.spring.stiffness]);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  return (
    <View style={styles.root} pointerEvents="box-none">
      <BlurView
        intensity={theme.glassmorphism.blur}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: theme.colors.nav.surfaceScrim },
        ]}
        pointerEvents="none"
      />

      <View
        style={[
          styles.centeredContent,
          { paddingHorizontal: theme.spacing.containerMargin },
        ]}
      >
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.nav.surface,
              borderColor: theme.colors.border.level1,
              borderRadius: theme.borderRadius.xl,
              padding: CARD_PADDING,
            },
            cardStyle,
          ]}
        >
          <PaymentSuccessHero />

          <Text
            style={[
              toTextStyle(theme.typography.headlineMd),
              styles.title,
              { color: theme.colors.accent.amber },
            ]}
          >
            Payment Successful!
          </Text>

          <Text
            style={[
              toTextStyle(theme.typography.bodyMd),
              styles.subtitle,
              { color: theme.colors.text.secondary },
            ]}
          >
            Your booking has been successfully done
          </Text>

          <View style={[styles.actions, { gap: theme.spacing.stackMd }]}>
            <BookingPillButton
              variant="primary"
              label="View E-Receipt"
              onPress={onViewReceipt}
            />
            <BookingPillButton variant="secondary" label="Home" onPress={onHome} />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    textAlign: "center",
    maxWidth: 240,
    lineHeight: 24,
    marginBottom: 40,
  },
  actions: {
    width: "100%",
  },
});

export default PaymentSuccessScreen;
