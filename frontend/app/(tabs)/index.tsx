"use client";
import { useRouter } from "expo-router";
import { View, StyleSheet, Image } from "react-native";
import {
  Text,
  Button,
  useTheme,
  Surface,
  Appbar,
  Divider,
} from "react-native-paper";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* <Appbar.Header elevated style={{ backgroundColor: "#000000" }}>
        <Appbar.Content
          title="Card Vault"
          titleStyle={{ fontWeight: "bold", color: "#008BFF" }}
        />
      </Appbar.Header> */}

      <Surface style={styles.card} elevation={4}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.logo}
        />

        <Text variant="headlineMedium" style={styles.heading}>
          Welcome to Card Vault
        </Text>

        <Text variant="bodyMedium" style={styles.subheading}>
          Your all-in-one business card manager. Scan, store, and manage
          contacts seamlessly.
        </Text>

        <Divider style={{ marginBottom: 24, backgroundColor: "#333" }} />

        <Button
          mode="contained"
          onPress={() => router.push("/(tabs)/contacts")}
          style={styles.primaryButton}
          labelStyle={styles.buttonText}
          icon="account-box-outline"
        >
          View Contacts
        </Button>

        <Button
          mode="outlined"
          onPress={() => router.push("/modal")}
          style={styles.outlineButton}
          labelStyle={styles.outlineButtonText}
          icon="plus"
        >
          Add Contact
        </Button>

        <Button
          mode="text"
          onPress={() => router.push("/(tabs)/profile")}
          style={styles.textButton}
          labelStyle={styles.outlineButtonText}
          icon="cog-outline"
        >
          Profile & Settings
        </Button>
      </Surface>

      <Text style={styles.footer}>© 2025 Card Vault • v1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#000000",
  },
  card: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
    borderRadius: 16,
  },
  heading: {
    color: "#008BFF",
    marginBottom: 8,
    textAlign: "center",
  },
  subheading: {
    marginBottom: 16,
    color: "#ccc",
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: "#008BFF",
    marginVertical: 8,
    width: "100%",
  },
  outlineButton: {
    borderColor: "#008BFF",
    borderWidth: 1,
    marginVertical: 8,
    width: "100%",
  },
  textButton: {
    marginVertical: 8,
    width: "100%",
  },
  buttonText: {
    color: "white",
  },
  outlineButtonText: {
    color: "#008BFF",
  },
  footer: {
    textAlign: "center",
    marginBottom: 12,
    fontSize: 12,
    color: "#666",
  },
});
