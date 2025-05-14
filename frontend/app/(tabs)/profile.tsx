"use client";
import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  Avatar,
  useTheme,
  List,
  Switch,
  ActivityIndicator,
  Appbar,
  Divider,
} from "react-native-paper";
import axios from "axios";
import { useColorScheme } from "react-native";
import { useRouter } from "expo-router";

interface IUser {
  _id: string;
  fullName: string;
  email: string;
}

export default function UserProfileScreen() {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === "dark");
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.EXPO_PUBLIC_API_URL}/api/user/me`)
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    router.replace(`/?theme=${darkMode ? "dark" : "light"}`);
  }, [darkMode]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#008BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Appbar.Header elevated style={{ backgroundColor: "#000000" }}>
        <Appbar.Content
          title="Profile"
          titleStyle={{ fontWeight: "bold", color: "#008BFF" }}
        />
      </Appbar.Header> */}

      <ScrollView contentContainerStyle={styles.content}>
        {user ? (
          <>
            <Avatar.Text
              size={96}
              label={getInitials(user.fullName)}
              style={[styles.avatar, { backgroundColor: "#008BFF" }]}
            />

            <Text variant="headlineMedium" style={[styles.name]}>
              {user.fullName}
            </Text>

            <Text style={[styles.email]}>{user.email}</Text>

            <Divider style={styles.divider} />

            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Settings
              </Text>
              <List.Item
                title="Dark Mode"
                titleStyle={{ color: "#ccc" }}
                left={() => (
                  <List.Icon icon="theme-light-dark" color="#008BFF" />
                )}
                right={() => (
                  <Switch
                    value={darkMode}
                    onValueChange={() => setDarkMode(!darkMode)}
                    color="#008BFF"
                  />
                )}
                style={{ backgroundColor: "#1a1a1a" }}
              />
            </View>
          </>
        ) : (
          <Text style={{ marginTop: 100, color: theme.colors.error }}>
            Failed to load profile.
          </Text>
        )}
        <Text style={styles.footer}>© 2025 Card Vault • Profile</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  avatar: {
    marginTop: 32,
    marginBottom: 16,
  },
  name: {
    marginBottom: 4,
    color: "#ffffff",
  },
  email: {
    marginBottom: 32,
    color: "#ccc",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#333",
    marginVertical: 24,
  },
  section: {
    width: "100%",
  },
  sectionTitle: {
    marginBottom: 8,
    marginLeft: 8,
    color: "#008BFF",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#666",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#1a1a1a",
  },
});
