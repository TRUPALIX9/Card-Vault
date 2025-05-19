"use client";
import { useRef, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useTheme, Text, ActivityIndicator } from "react-native-paper";
import { useRouter } from "expo-router";
import type { CameraViewRef } from "expo-camera";

export default function ScanAddPage() {
  const theme = useTheme();
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraViewRef>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, []);

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      setIsProcessing(true);
      const photo = await cameraRef.current.takePicture({
        base64: true,
        quality: 0.7,
      });

      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64: photo?.base64 }),
      });

      if (!res.ok) throw new Error("Scan failed");

      const result = await res.json();
      console.log("🧠 Extracted data:", result);

      router.push("../add/manual");
    } catch (err) {
      Alert.alert("Error", "Failed to scan the image.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission not granted.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={"back"}
        onCameraReady={() => console.log("Camera ready")}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={takePhoto} disabled={isProcessing}>
          <View
            style={[styles.shutter, { backgroundColor: theme.colors.primary }]}
          />
        </TouchableOpacity>
      </View>
      {isProcessing && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  controls: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  shutter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#fff",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
