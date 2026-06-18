import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import HomeCategoryChip from "./HomeCategoryChip";
import { useTheme } from "@/hooks/useTheme";
import type { HomeCategory } from "@/data/homeMock";

interface HomeCategoryRowProps {
  categories: readonly HomeCategory[];
  onCategoryPress: (categoryId: string) => void;
}

const HomeCategoryRow = ({
  categories,
  onCategoryPress,
}: HomeCategoryRowProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        {
          gap: theme.spacing.stackMd,
          paddingHorizontal: theme.spacing.containerMargin,
        },
      ]}
    >
      {categories.map((category) => (
        <HomeCategoryChip
          key={category.id}
          category={category}
          onPress={onCategoryPress}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

export default HomeCategoryRow;
