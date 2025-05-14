// scan.tsx
"use client";
import { View, StyleSheet } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

export default function ScanContactScreen() {
  const theme = useTheme();
  const router = useRouter();

  const handleScan = () => {
    // TODO: integrate camera/ocr logic
    alert("Scanning feature coming soon!");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text variant="headlineMedium" style={styles.title}>
        Scan a Business Card
      </Text>
      <Text style={styles.subtitle}>
        Use your camera to scan and extract contact info.
      </Text>
      <Button
        mode="contained"
        onPress={handleScan}
        style={styles.button}
        buttonColor="#1976D2"
      >
        Open Camera
      </Button>
      <Button onPress={() => router.back()} style={styles.backButton}>
        Back
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 24,
    textAlign: "center",
    color: "gray",
  },
  button: {
    marginBottom: 16,
  },
  backButton: {
    alignSelf: "center",
  },
});
