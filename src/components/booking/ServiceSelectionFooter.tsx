import React from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Price } from "@/components/common";
import Typography from "@/components/common/Typography";
import ConfirmBookingBar, { CONFIRM_CTA_APPROX_HEIGHT } from "./ConfirmBookingBar";
import { useTheme } from "@/hooks/useTheme";

interface ServiceSelectionFooterProps {
  onApply: () => void;
  estimateCents: number | null;
}

export const SERVICE_SELECTION_FOOTER_APPROX_HEIGHT = CONFIRM_CTA_APPROX_HEIGHT + 40;

const ServiceSelectionFooter = ({
  onApply,
  estimateCents,
}: ServiceSelectionFooterProps): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: insets.bottom + theme.spacing.stackMd,
          paddingTop: theme.spacing.stackMd,
          paddingHorizontal: theme.spacing.containerMargin,
          borderTopColor: theme.colors.border.level1,
        },
      ]}
    >
      <BlurView
        intensity={theme.glassmorphism.blur}
        tint="dark"
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: `${theme.colors.depth.level0}CC` },
        ]}
        pointerEvents="none"
      />

      <View style={styles.row}>
        {estimateCents !== null ? (
          <View style={styles.estimateCol}>
            <Typography variant="labelSm" color={theme.colors.text.secondary}>
              Total Estimate
            </Typography>
            <Price
              amountMinor={estimateCents}
              variant="bodyMd"
              color={theme.colors.text.primary}
            />
          </View>
        ) : null}

        <View style={styles.buttonCol}>
          <ConfirmBookingBar
            onConfirm={onApply}
            label="Apply Selection"
            showArrow={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  estimateCol: {
    gap: 2,
  },
  buttonCol: {
    flex: 1,
  },
});

export default ServiceSelectionFooter;
