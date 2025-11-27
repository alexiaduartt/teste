import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1F1B54', // Roxo escuro quando ativo
        tabBarInactiveTintColor: '#9CA3AF', // Cinza quando inativo
        headerShown: false, // Esconde o cabeçalho padrão em todas as abas
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        }
      }}
    >
      <Tabs.Screen
        name="index" // Corresponde ao arquivo index.tsx (Cursos)
        options={{
          title: 'Cursos',
          tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore" // Corresponde ao arquivo explore.tsx
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites" // Corresponde ao arquivo favorites.tsx
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile" // Corresponde ao arquivo profile.tsx
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}