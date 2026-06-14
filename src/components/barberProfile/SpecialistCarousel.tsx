import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import SpecialistCard from "./SpecialistCard";
import { useTheme } from "@/hooks/useTheme";
import { toTextStyle } from "@/config/theme";
import type { ShopSpecialist } from "@/data/barberProfileMock";

interface SpecialistCarouselProps {
  specialists: ShopSpecialist[];
  onSeeAllPress?: () => void;
}

const SpecialistCarousel = ({
  specialists,
  onSeeAllPress,
}: SpecialistCarouselProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.stackMd, marginBottom: theme.spacing.stackLg }}>
      <View
        style={[
          styles.header,
          { paddingHorizontal: theme.spacing.containerMargin },
        ]}
      >
        <Text
          style={[
            toTextStyle(theme.typography.headlineMd),
            { color: theme.colors.text.primary },
          ]}
        >
          Our Specialist
        </Text>
        <Pressable
          onPress={onSeeAllPress}
          hitSlop={8}
          style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
        >
          <Text
            style={[
              toTextStyle(theme.typography.labelMd),
              { color: theme.colors.accent.amber, fontWeight: "700" },
            ]}
          >
            See All
          </Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: theme.spacing.containerMargin,
            gap: theme.spacing.gutter,
          },
        ]}
      >
        {specialists.map((specialist) => (
          <SpecialistCard key={specialist.id} specialist={specialist} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

export default SpecialistCarousel;
