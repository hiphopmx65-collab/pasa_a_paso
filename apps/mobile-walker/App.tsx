import React, { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const WALKER_LOCATION_TASK = 'paso-a-paso-walker-location';

if (!TaskManager.isTaskDefined(WALKER_LOCATION_TASK)) {
  TaskManager.defineTask(WALKER_LOCATION_TASK, async ({ error }) => {
    if (error) {
      console.warn('Background location task error', error.message);
      return;
    }

    // FASE 1: placeholder técnico real. En fases posteriores se enviará la ubicación sólo si existe un paseo activo.
  });
}

export default function App() {
  const [foregroundStatus, setForegroundStatus] = useState<string>('pending');
  const [backgroundStatus, setBackgroundStatus] = useState<string>('pending');

  const apiBaseUrl = useMemo(
    () => process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api/v1',
    [],
  );

  const requestPermissions = async () => {
    const foreground = await Location.requestForegroundPermissionsAsync();
    setForegroundStatus(foreground.status);

    if (foreground.status !== 'granted') {
      setBackgroundStatus('blocked-by-foreground');
      return;
    }

    const background = await Location.requestBackgroundPermissionsAsync();
    setBackgroundStatus(background.status);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ecfeff' }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: '#0f172a' }}>PASO A PASO Walker</Text>
          <Text style={{ fontSize: 16, color: '#334155' }}>
            Base Expo preparada para permisos de ubicación y futura transmisión durante paseos activos.
          </Text>
        </View>

        <View style={{ backgroundColor: '#ffffff', borderRadius: 18, padding: 20, gap: 10 }}>
          <Text style={{ fontWeight: '700', color: '#0f172a' }}>Estado técnico FASE 1</Text>
          <Text style={{ color: '#475569' }}>API esperada: {apiBaseUrl}</Text>
          <Text style={{ color: '#475569' }}>Foreground permission: {foregroundStatus}</Text>
          <Text style={{ color: '#475569' }}>Background permission: {backgroundStatus}</Text>
          <Text style={{ color: '#475569' }}>Background task: {WALKER_LOCATION_TASK}</Text>
        </View>

        <Pressable
          onPress={requestPermissions}
          style={{
            backgroundColor: '#0f766e',
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderRadius: 14,
          }}
        >
          <Text style={{ color: '#ffffff', fontWeight: '700', textAlign: 'center' }}>
            Solicitar permisos de ubicación
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
