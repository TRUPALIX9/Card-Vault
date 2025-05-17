"use client";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {
  Button,
  Text,
  Dialog,
  Portal,
  useTheme,
  IconButton,
} from "react-native-paper";

export default function AddContactModal() {
  const [visible, setVisible] = useState(true);
  const theme = useTheme();
  const router = useRouter();

  const closeModal = () => {
    setVisible(false);
    router.back();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={closeModal} style={styles.dialog}>
        <Dialog.Title style={styles.title}>Add New Contact</Dialog.Title>
        <Dialog.Content>
          <View style={styles.optionContainer}>
            <Button
              mode="contained"
              onPress={() => router.push("/scan")}
              style={styles.button}
              buttonColor="#1976D2"
            >
              📷 Scan Business Card
            </Button>

            <Button
              mode="contained"
              onPress={() => router.push("/manualAdd")}
              style={styles.button}
              buttonColor="#1976D2"
            >
              📝 Enter Info Manually
            </Button>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={closeModal}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
    marginHorizontal: 16,
  },
  title: {
    color: "#1976D2",
  },
  optionContainer: {
    gap: 12,
    marginTop: 8,
  },
  button: {
    borderRadius: 8,
  },
});
