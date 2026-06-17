import React, { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GlassPanel, Price } from "@/components/common";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";
import { formatDuration, type BookServiceOption } from "@/data/bookMock";

interface BookingServiceOptionRowProps {
  service: BookServiceOption;
  isSelected: boolean;
  onPress: (serviceId: string) => void;
}

const BookingServiceOptionRow = ({
  service,
  isSelected,
  onPress,
}: BookingServiceOptionRowProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback((): void => {
    onPress(service.id);
  }, [onPress, service.id]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : isSelected ? 1 : 0.7 }]}
    >
      <GlassPanel selected={isSelected} style={styles.panel}>
        <View style={[styles.content, { padding: theme.spacing.stackMd }]}>
          <View style={styles.textCol}>
            <Typography variant="bodyMd" color={theme.colors.text.primary}>
              {service.title}
            </Typography>
            <View style={styles.metaRow}>
              <Typography
                variant="labelSm"
                color={theme.colors.text.secondary}
                style={{ textTransform: "none" }}
              >
                {formatDuration(service.durationMinutes)} •{" "}
              </Typography>
              <Price
                amountMinor={service.priceCents}
                variant="labelSm"
                color={theme.colors.text.secondary}
              />
            </View>
          </View>
          <MaterialIcons
            name={isSelected ? "check-circle" : "radio-button-unchecked"}
            size={22}
            color={
              isSelected
                ? theme.colors.primary.dim
                : theme.colors.text.disabled
            }
          />
        </View>
      </GlassPanel>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  panel: {
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textCol: {
    flex: 1,
    gap: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export default React.memo(BookingServiceOptionRow);
