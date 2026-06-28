import React, { useCallback, useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import Typography from "@/components/common/Typography";
import { useTheme } from "@/hooks/useTheme";

export interface EditProfileDateFieldProps {
  value: Date | null;
  label: string;
  onChange: (date: Date) => void;
}

const PLACEHOLDER = "Date of Birth";

const EditProfileDateField = ({
  value,
  label,
  onChange,
}: EditProfileDateFieldProps): React.JSX.Element => {
  const { theme } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  const handleOpen = useCallback((): void => {
    setShowPicker(true);
  }, []);

  const handleClose = useCallback((): void => {
    setShowPicker(false);
  }, []);

  const handleChange = useCallback(
    (event: DateTimePickerEvent, selected: Date | undefined): void => {
      if (Platform.OS === "android") {
        setShowPicker(false);
      }
      if (event.type === "set" && selected !== undefined) {
        onChange(selected);
      }
    },
    [onChange],
  );

  const displayDate = value !== null ? new Date(value) : new Date();

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
            label.length > 0
              ? theme.colors.text.primary
              : theme.colors.text.secondary
          }
          style={styles.label}
        >
          {label.length > 0 ? label : PLACEHOLDER}
        </Typography>
        <MaterialIcons
          name="calendar-today"
          size={20}
          color={theme.colors.text.secondary}
        />
      </Pressable>

      {Platform.OS === "ios" ? (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
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
                styles.iosSheet,
                { backgroundColor: theme.colors.depth.level1 },
              ]}
            >
              <DateTimePicker
                value={displayDate}
                mode="date"
                display="spinner"
                maximumDate={new Date()}
                onChange={handleChange}
                themeVariant="dark"
              />
              <Pressable
                hitSlop={8}
                onPress={handleClose}
                style={({ pressed }) => [
                  styles.doneButton,
                  {
                    backgroundColor: theme.colors.accent.amber,
                    borderRadius: theme.borderRadius.md,
                    opacity: pressed ? 0.82 : 1,
                  },
                ]}
              >
                <Typography
                  variant="labelMd"
                  color={theme.colors.depth.level0}
                >
                  Done
                </Typography>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      ) : null}

      {Platform.OS === "android" && showPicker ? (
        <DateTimePicker
          value={displayDate}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={handleChange}
        />
      ) : null}
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
    justifyContent: "flex-end",
  },
  iosSheet: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  doneButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginTop: 8,
  },
});

export default EditProfileDateField;
