import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

interface BookingAppointmentHeaderProps {
  onGoBack: () => void;
}

const BookingAppointmentHeader = ({
  onGoBack,
}: BookingAppointmentHeaderProps): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.row,
        {
          paddingTop: insets.top + theme.spacing.stackMd,
          paddingBottom: theme.spacing.stackMd,
          paddingHorizontal: theme.spacing.containerMargin,
        },
      ]}
    >
      <Pressable
        onPress={onGoBack}
        hitSlop={8}
        style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
      >
        <MaterialIcons name="arrow-back" size={24} color={theme.colors.text.primary} />
      </Pressable>

      <Text
        style={[
          toTextStyle(theme.typography.headlineLgMobile),
          { color: theme.colors.text.primary },
        ]}
      >
        Book Appointment
      </Text>

      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  spacer: {
    width: 24,
  },
});

export default BookingAppointmentHeader;
