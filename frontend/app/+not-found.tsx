"use client";
import { Stack, Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center px-6 bg-white">
        <Text className="text-2xl font-bold text-red-500 mb-4">
          404 – Page Not Found
        </Text>
        <Text className="text-lg text-gray-700 mb-6 text-center">
          This screen doesn’t exist. Please check the route or return home.
        </Text>

        <Link href="/" asChild>
          <Pressable className="bg-blue-600 px-6 py-3 rounded-xl">
            <Text className="text-white font-medium text-base">
              🏠 Go to Home
            </Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}
