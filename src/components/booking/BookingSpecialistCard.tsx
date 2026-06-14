import React, { useCallback } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { ShopSpecialist } from "@/data/barberProfileMock";

interface BookingSpecialistCardProps {
  specialist: ShopSpecialist;
  isSelected: boolean;
  onPress: (specialistId: string) => void;
}

const CARD_WIDTH = 128;
const AVATAR_SIZE = 96;

const BookingSpecialistCard = ({
  specialist,
  isSelected,
  onPress,
}: BookingSpecialistCardProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback((): void => {
    onPress(specialist.id);
  }, [onPress, specialist.id]);

  const focusGlowStyle = isSelected
    ? {
        shadowColor: theme.colors.focus.glow,
        shadowOffset: { width: 0, height: 0 } as const,
        shadowOpacity: 1,
        shadowRadius: 8,
      }
    : undefined;

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          width: CARD_WIDTH,
          backgroundColor: theme.colors.depth.level1,
          borderColor: isSelected
            ? theme.colors.primary.default
            : theme.colors.border.level1,
          borderRadius: theme.borderRadius.xl,
          borderWidth: isSelected ? 2 : 1,
          opacity: pressed ? 0.9 : 1,
        },
        focusGlowStyle,
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
          {
            color: isSelected ? theme.colors.primary.dim : theme.colors.text.primary,
            fontWeight: "700",
          },
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    padding: 12,
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
export default BookingSpecialistCard;
