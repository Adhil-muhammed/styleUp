import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { PaymentMethodKind } from "@/data/paymentMethodMock";

const ICON_SLOT_WIDTH = 40;
const ICON_SLOT_HEIGHT = 32;

interface PaymentMethodIconProps {
  kind: PaymentMethodKind;
}

const MastercardIcon = (): React.JSX.Element => (
  <View style={styles.mastercardRow}>
    <View style={[styles.mastercardCircle, styles.mastercardRed]} />
    <View style={[styles.mastercardCircle, styles.mastercardOrange]} />
  </View>
);

const PaymentMethodIcon = ({ kind }: PaymentMethodIconProps): React.JSX.Element => {
  if (kind === "saved_card") {
    return (
      <View style={[styles.slot, styles.cardSlot]}>
        <MastercardIcon />
      </View>
    );
  }

  if (kind === "paypal") {
    return (
      <View style={[styles.slot, styles.brandSlot]}>
        <Text style={styles.paypalMark}>P</Text>
      </View>
    );
  }

  if (kind === "google_pay") {
    return (
      <View style={[styles.slot, styles.brandSlot]}>
        <MaterialCommunityIcons name="google" size={22} color="#1F1F1F" />
      </View>
    );
  }

  return (
    <View style={[styles.slot, styles.brandSlot]}>
      <MaterialCommunityIcons name="apple" size={20} color="#000000" />
    </View>
  );
};

const styles = StyleSheet.create({
  slot: {
    width: ICON_SLOT_WIDTH,
    height: ICON_SLOT_HEIGHT,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  brandSlot: {
    backgroundColor: "#FFFFFF",
  },
  cardSlot: {
    backgroundColor: "#1A1F36",
    borderWidth: 1,
    borderColor: "#374151",
  },
  paypalMark: {
    color: "#003087",
    fontSize: 20,
    fontWeight: "700",
  },
  mastercardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  mastercardCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  mastercardRed: {
    backgroundColor: "#EB001B",
    zIndex: 1,
  },
  mastercardOrange: {
    backgroundColor: "#F79E1B",
    marginLeft: -8,
  },
});

export default PaymentMethodIcon;
