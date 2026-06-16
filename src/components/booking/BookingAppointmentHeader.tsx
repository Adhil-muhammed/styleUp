import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";

type TitleAlign = "left" | "center";

interface BookingAppointmentHeaderProps {
  title?: string;
  titleAlign?: TitleAlign;
  onGoBack: () => void;
}

const DEFAULT_TITLE = "Book Appointment";

const BookingAppointmentHeader = ({
  title = DEFAULT_TITLE,
  titleAlign = "left",
  onGoBack,
}: BookingAppointmentHeaderProps): React.JSX.Element => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const isCentered = titleAlign === "center";

  const titleColor = isCentered
    ? theme.colors.primary.dim
    : theme.colors.text.primary;

  const titleTypography = isCentered
    ? theme.typography.headlineMd
    : theme.typography.headlineLgMobile;

  return (
    <View
      style={[
        isCentered ? styles.containerCentered : styles.containerLeft,
        {
          paddingTop: insets.top + theme.spacing.stackMd,
          paddingBottom: theme.spacing.stackMd,
          paddingHorizontal: theme.spacing.containerMargin,
          borderBottomColor: theme.colors.border.level1,
          borderBottomWidth: 1,
        },
      ]}
    >
      <Pressable
        onPress={onGoBack}
        hitSlop={8}
        style={({ pressed }) => [
          isCentered ? styles.sideSlot : undefined,
          { opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <MaterialIcons name="arrow-back" size={24} color={theme.colors.text.primary} />
      </Pressable>

      <Text
        style={[
          isCentered ? styles.centeredTitle : undefined,
          toTextStyle(titleTypography),
          { color: titleColor },
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>

      {isCentered ? <View style={styles.sideSlot} /> : <View style={styles.spacer} />}
    </View>
  );
};

const styles = StyleSheet.create({
  containerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  containerCentered: {
    flexDirection: "row",
    alignItems: "center",
  },
  sideSlot: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  centeredTitle: {
    flex: 1,
    textAlign: "center",
  },
  spacer: {
    width: 24,
  },
});

export default BookingAppointmentHeader;
