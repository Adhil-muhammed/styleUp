import React, { useCallback, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";

export interface SelectOption {
  label: string;
  value: string;
}

export interface EditProfileSelectFieldProps {
  value: string;
  options: readonly SelectOption[];
  placeholder: string;
  onChange: (value: string) => void;
}

const EditProfileSelectField = ({
  value,
  options,
  placeholder,
  onChange,
}: EditProfileSelectFieldProps): React.JSX.Element => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  const handleOpen = useCallback((): void => {
    setOpen(true);
  }, []);

  const handleClose = useCallback((): void => {
    setOpen(false);
  }, []);

  const handleSelect = useCallback(
    (optionValue: string): void => {
      onChange(optionValue);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <>
      <Pressable
        accessibilityRole="button"
        hitSlop={4}
        onPress={handleOpen}
        style={({ pressed }) => [
          styles.field,
          {
            backgroundColor: theme.colors.depth.level1,
            borderRadius: theme.borderRadius.md,
            paddingHorizontal: theme.spacing.stackMd,
            opacity: pressed ? 0.82 : 1,
          },
        ]}
      >
        <Typography
          variant="bodyMd"
          color={
            selectedLabel !== undefined
              ? theme.colors.text.primary
              : theme.colors.text.secondary
          }
          style={styles.label}
        >
          {selectedLabel ?? placeholder}
        </Typography>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={22}
          color={theme.colors.text.secondary}
        />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <Pressable
          style={[
            styles.backdrop,
            { backgroundColor: `${theme.colors.depth.level0}CC` },
          ]}
          onPress={handleClose}
        >
          <View
            style={[
              styles.sheet,
              {
                backgroundColor: theme.colors.depth.level1,
                borderRadius: theme.borderRadius.lg,
              },
            ]}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.sheetContent}
            >
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="button"
                    hitSlop={4}
                    onPress={() => handleSelect(option.value)}
                    style={({ pressed }) => [
                      styles.optionRow,
                      {
                        backgroundColor: isSelected
                          ? `${theme.colors.accent.amber}1A`
                          : pressed
                            ? theme.colors.depth.level2
                            : "transparent",
                        borderRadius: theme.borderRadius.md,
                      },
                    ]}
                  >
                    <Typography
                      variant="bodyMd"
                      color={
                        isSelected
                          ? theme.colors.accent.amber
                          : theme.colors.text.primary
                      }
                    >
                      {option.label}
                    </Typography>
                    {isSelected ? (
                      <MaterialIcons
                        name="check"
                        size={18}
                        color={theme.colors.accent.amber}
                      />
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  field: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  sheet: {
    maxHeight: 320,
    paddingVertical: 8,
  },
  sheetContent: {
    paddingHorizontal: 8,
    gap: 4,
  },
  optionRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});

export default EditProfileSelectField;
