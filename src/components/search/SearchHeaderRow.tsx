import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DiscoverSearchBar } from "@/components/discover";
import { useTheme } from "@/hooks/useTheme";

interface SearchHeaderRowProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onFilterPress: () => void;
  onClose: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const CLOSE_BUTTON_SIZE = 48;

const SearchHeaderRow = ({
  searchQuery,
  onSearchChange,
  onFilterPress,
  onClose,
  placeholder = "Salon",
  autoFocus = true,
}: SearchHeaderRowProps): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.row, { gap: theme.spacing.stackSm }]}>
      <View style={styles.searchWrap}>
        <DiscoverSearchBar
          value={searchQuery}
          onChangeText={onSearchChange}
          onFilterPress={onFilterPress}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      </View>
      {/* <Pressable
        onPress={onClose}
        hitSlop={8}
        style={({ pressed }) => [
          styles.closeButton,
          {
            width: CLOSE_BUTTON_SIZE,
            height: CLOSE_BUTTON_SIZE,
            backgroundColor: theme.colors.depth.level1,
            borderColor: theme.colors.border.level1,
            borderRadius: theme.borderRadius.xl,
            opacity: pressed ? 0.85 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
      >
        <MaterialIcons
          name="close"
          size={22}
          color={theme.colors.text.primary}
        />
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchWrap: {
    flex: 1,
    minWidth: 0,
  },
  closeButton: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
});

export default SearchHeaderRow;
