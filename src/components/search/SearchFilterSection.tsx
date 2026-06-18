import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";

interface SearchFilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const SearchFilterSection = ({
  title,
  children,
}: SearchFilterSectionProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.section, { gap: theme.spacing.stackMd }]}>
      <Typography variant="labelMd" color={theme.colors.text.primary}>
        {title}
      </Typography>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: "100%",
  },
});

export default SearchFilterSection;
