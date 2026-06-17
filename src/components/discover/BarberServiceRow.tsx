import React, { useCallback } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Price } from "@/components/common";
import { useTheme } from "@/hooks/useTheme";
import { focusGlowStyle, toTextStyle } from "@/config/theme";
import type { BarberServiceOption } from "@/data/discoverMock";

interface BarberServiceRowProps {
  service: BarberServiceOption;
  isSelected: boolean;
  onPress: (serviceId: string) => void;
}

const IMAGE_SIZE = 56;

const BarberServiceRow = ({
  service,
  isSelected,
  onPress,
}: BarberServiceRowProps): React.JSX.Element => {
  const { theme } = useTheme();

  const handlePress = useCallback((): void => {
    onPress(service.id);
  }, [onPress, service.id]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: theme.colors.depth.level1,
          borderColor: isSelected
            ? theme.colors.primary.default
            : theme.colors.border.level1,
          borderRadius: theme.borderRadius.lg,
          opacity: pressed ? 0.9 : 1,
        },
        isSelected && focusGlowStyle(theme),
      ]}
    >
      {service.imageUri ? (
        <Image
          source={{ uri: service.imageUri }}
          style={[
            styles.image,
            { borderRadius: theme.borderRadius.md },
          ]}
        />
      ) : (
        <View
          style={[
            styles.imagePlaceholder,
            {
              borderRadius: theme.borderRadius.md,
              backgroundColor: theme.colors.depth.level2,
              borderColor: theme.colors.border.level1,
            },
          ]}
        >
          <MaterialIcons
            name="content-cut"
            size={24}
            color={theme.colors.text.secondary}
          />
        </View>
      )}

      <View style={styles.content}>
        <Text
          style={[
            toTextStyle(theme.typography.bodyMd),
            { color: theme.colors.text.primary },
          ]}
        >
          {service.title}
        </Text>
        <Text
          style={[
            toTextStyle(theme.typography.labelSm),
            { color: theme.colors.text.secondary, textTransform: "none" },
          ]}
        >
          {service.subtitle}
        </Text>
        {service.badge !== undefined && (
          <View
            style={[
              styles.badge,
              {
                backgroundColor: `${theme.colors.primary.default}26`,
                borderRadius: theme.borderRadius.full,
              },
            ]}
          >
            <Text
              style={[
                toTextStyle(theme.typography.labelSm),
                { color: theme.colors.primary.dim, textTransform: "none" },
              ]}
            >
              {service.badge}
            </Text>
          </View>
        )}
      </View>

      <Price
        amountMinor={service.priceCents}
        color={theme.colors.text.primary}
        style={{ fontWeight: "700" }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 2,
    gap: 16,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: "cover",
  },
  imagePlaceholder: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    gap: 4,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
  },
});

export default React.memo(BarberServiceRow);
