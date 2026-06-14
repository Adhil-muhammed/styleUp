import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { ShopSpecialist } from "@/data/barberProfileMock";

interface SpecialistCardProps {
  specialist: ShopSpecialist;
}

const CARD_WIDTH = 128;
const AVATAR_SIZE = 96;

const SpecialistCard = ({ specialist }: SpecialistCardProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          width: CARD_WIDTH,
          backgroundColor: theme.colors.depth.level1,
          borderColor: theme.colors.border.level1,
          borderRadius: theme.borderRadius.xl,
          padding: 12,
        },
      ]}
    >
      <Image
        source={{ uri: specialist.avatarUri }}
        style={[
          styles.avatar,
          {
            borderRadius: theme.borderRadius.xl,
            backgroundColor: theme.colors.depth.level2,
          },
        ]}
      />
      <Text
        style={[
          toTextStyle(theme.typography.labelMd),
          { color: theme.colors.text.primary, fontWeight: "700" },
        ]}
      >
        {specialist.name}
      </Text>
      <Text
        style={[
          styles.role,
          toTextStyle(theme.typography.labelSm),
          { color: theme.colors.text.disabled, textTransform: "none" },
        ]}
      >
        {specialist.role}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    borderWidth: 1,
    gap: 8,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    resizeMode: "cover",
    marginBottom: 4,
  },
  role: {
    fontSize: 10,
  },
});

export { CARD_WIDTH };
export default SpecialistCard;
