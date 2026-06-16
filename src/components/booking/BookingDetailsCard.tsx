import React from "react";
import { StyleSheet, View } from "react-native";
import { GlassPanel } from "@/components/common";
import SummaryDetailRow from "./SummaryDetailRow";
import SummarySectionHeader from "./SummarySectionHeader";
import { useTheme } from "@/hooks/useTheme";

export interface BookingDetailItem {
  label: string;
  value: string;
  emphasizeValue?: boolean;
}

interface BookingDetailsCardProps {
  items: readonly BookingDetailItem[];
}

const BookingDetailsCard = ({ items }: BookingDetailsCardProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <GlassPanel style={styles.panel}>
      <View style={[styles.content, { padding: theme.spacing.stackMd, gap: theme.spacing.stackMd }]}>
        <SummarySectionHeader title="Booking Details" icon="storefront" />
        <View>
          {items.map((item, index) => (
            <SummaryDetailRow
              key={item.label}
              label={item.label}
              value={item.value}
              emphasizeValue={item.emphasizeValue === true}
              isLast={index === items.length - 1}
            />
          ))}
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
});

export default BookingDetailsCard;
