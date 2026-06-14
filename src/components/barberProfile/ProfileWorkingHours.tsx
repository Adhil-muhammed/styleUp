import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { ShopWorkingHours } from "@/data/barberProfileMock";

interface ProfileWorkingHoursProps {
  workingHours: ShopWorkingHours[];
}

const ProfileWorkingHours = ({
  workingHours,
}: ProfileWorkingHoursProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.stackMd }}>
      <Text
        style={[
          toTextStyle(theme.typography.headlineMd),
          { color: theme.colors.text.primary },
        ]}
      >
        Working Hours
      </Text>
      <View style={{ gap: 12 }}>
        {workingHours.map((entry) => (
          <View key={entry.label} style={styles.row}>
            <Text
              style={[
                toTextStyle(theme.typography.bodyMd),
                { color: theme.colors.text.secondary },
              ]}
            >
              {entry.label}
            </Text>
            <Text
              style={[
                toTextStyle(theme.typography.labelMd),
                { color: theme.colors.text.primary, fontWeight: "700" },
              ]}
            >
              : {entry.hours}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ProfileWorkingHours;
