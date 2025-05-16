"use client";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import axios from "axios";

export default function ContactDetailScreen() {
  const { id } = useLocalSearchParams();
  const [contact, setContact] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.EXPO_PUBLIC_API_URL}/api/contacts/${id}`)
        .then((res) => setContact(res.data))
        .catch(() => setContact(null))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4 text-gray-600">Loading contact...</Text>
      </View>
    );
  }

  if (!contact) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-4">
        <Text className="text-xl text-gray-800">Contact not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-6 pt-10">
      <Text className="text-3xl font-bold text-gray-900 mb-2">
        {contact.fullName}
      </Text>
      {contact.email && (
        <Text className="text-lg text-gray-700 mb-1">📧 {contact.email}</Text>
      )}
      {contact.company && (
        <Text className="text-lg text-gray-700 mb-1">🏢 {contact.company}</Text>
      )}
      {contact.notes && (
        <Text className="text-base text-gray-500 mt-4">{contact.notes}</Text>
      )}
    </View>
  );
}
