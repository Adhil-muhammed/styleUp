import React from "react";
import { StyleSheet, View } from "react-native";
import { GlassPanel } from "@/components/common";
import PriceBreakdownRow from "./PriceBreakdownRow";
import SummarySectionHeader from "./SummarySectionHeader";
import SummaryTotalRow from "./SummaryTotalRow";
import { useTheme } from "@/hooks/useTheme";
import type { PriceLineItem } from "@/data/paymentSummaryMock";
import { computeTotalCents } from "@/data/paymentSummaryMock";

interface PriceBreakdownCardProps {
  lineItems: readonly PriceLineItem[];
}

const PriceBreakdownCard = ({ lineItems }: PriceBreakdownCardProps): React.JSX.Element => {
  const { theme } = useTheme();
  const totalCents = computeTotalCents(lineItems);

  return (
    <GlassPanel style={styles.panel}>
      <View style={[styles.content, { padding: theme.spacing.stackMd, gap: theme.spacing.stackMd }]}>
        <SummarySectionHeader title="Price Breakdown" icon="receipt-long" />
        <View>
          {lineItems.map((item, index) => (
            <View key={item.label}>
              <PriceBreakdownRow label={item.label} amountCents={item.amountCents} />
              {index === lineItems.length - 1 ? (
                <View
                  style={[
                    styles.dashedDivider,
                    {
                      borderBottomColor: theme.colors.border.level1,
                      marginBottom: theme.spacing.stackSm,
                    },
                  ]}
                />
              ) : null}
            </View>
          ))}
          <SummaryTotalRow totalCents={totalCents} />
        </View>
      </View>
    </GlassPanel>
  );
};

const styles = StyleSheet.create({
  panel: {
    width: "100%",
  },
  content: {},
  dashedDivider: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    marginTop: 4,
  },
});

export default PriceBreakdownCard;
