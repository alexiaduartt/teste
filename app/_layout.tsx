// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Grupo do Drawer */}
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

      {/* Modal global */}
      <Stack.Screen
        name="modal"
        options={{ presentation: 'modal', title: 'Notificações' }}
      />
    </Stack>
  );
}