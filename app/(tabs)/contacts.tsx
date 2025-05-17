"use client";
import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Searchbar, List, IconButton, FAB, useTheme } from "react-native-paper";
import axios from "axios";
import { useRouter } from "expo-router";

interface IContact {
  _id: string;
  fullName: string;
  email: string;
  company: string;
  jobTitle?: string;
  phone?: string;
}

export default function ContactsPage() {
  const theme = useTheme();
  const router = useRouter();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filtered, setFiltered] = useState<IContact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/contacts`
      );
      setContacts(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Failed to load contacts", err);
    }
  };

  const deleteContact = async (id: string) => {
    await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/api/contacts/${id}`);
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    setFiltered(
      contacts.filter(
        (c) =>
          c.fullName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q)
      )
    );
  }, [searchQuery, contacts]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Searchbar
        placeholder="Search by name, email, or company"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={[styles.searchbar, { backgroundColor: theme.colors.surface }]}
        inputStyle={{ color: theme.colors.text }}
        placeholderTextColor={theme.colors.outline}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <List.Item
            title={item.fullName}
            description={`${item.jobTitle || "Contact"} @ ${item.company}`}
            titleStyle={{ color: theme.colors.primary }}
            descriptionStyle={{ color: theme.colors.onSurface }}
            style={{ backgroundColor: theme.colors.surface, marginBottom: 4 }}
            left={() => (
              <List.Icon icon="account" color={theme.colors.primary} />
            )}
            right={() => (
              <IconButton
                icon="delete"
                onPress={() => deleteContact(item._id)}
                iconColor={theme.colors.error || "#FF6B6B"}
              />
            )}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push("../add")}
        color={theme.colors.onPrimary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  searchbar: {
    marginBottom: 8,
    borderRadius: 12,
  },
  listContent: {
    paddingBottom: 80,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
