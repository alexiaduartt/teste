import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from '@/hooks/use-color-scheme'; 
import { Colors } from '@/constants/theme'; 
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Platform, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Configurações globais para todas as rotas */}
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

// Componente para o conteúdo do Drawer Personalizado (similar à imagem 44)
function CustomDrawerContent() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const DrawerItem = ({ name, href }: { name: string; href: string }) => (
    <Link href={href as any} asChild>
      <TouchableOpacity style={styles.drawerItem}>
        <Text style={styles.drawerItemText}>{name}</Text>
      </TouchableOpacity>
    </Link>
  );

  const DrawerHeader = () => (
    <View style={styles.drawerHeader}>
      <Text style={styles.headerText}>AGROSYS</Text>
      <Link href="/modal" asChild>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color={themeColors.headerText} />
        </TouchableOpacity>
      </Link>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.menuBackground }}>
      <DrawerHeader />
      <View style={styles.drawerMenu}>
        <DrawerItem name="Gestão de Colheitas" href="/harvests" />
        <DrawerItem name="Gestão de Vendas" href="/sales" />
        <DrawerItem name="Gestão de Ferramentas" href="/tools" />
        <DrawerItem name="Cadastros Gerais" href="/(drawer)/index" />
        <DrawerItem name="Meu Perfil" href="/profile" />
        <DrawerItem name="SAIR" href="/logout" />
      </View>
    </SafeAreaView>
  );
}

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false, 
        drawerActiveBackgroundColor: themeColors.buttonBackground,
        drawerInactiveTintColor: themeColors.menuText,
        drawerActiveTintColor: themeColors.buttonText,
        drawerStyle: {
          backgroundColor: themeColors.menuBackground,
        },
      }}
    >
      {/* Telas visíveis no menu lateral */}
      <Drawer.Screen name="index" options={{ title: 'Cadastros Gerais' }} />
      <Drawer.Screen name="products" options={{ title: 'Gestão de Produtos' }} />
      <Drawer.Screen name="inputs" options={{ title: 'Gestão de Insumos' }} />
      <Drawer.Screen name="uaps" options={{ title: 'Gestão de UAPs' }} />
      
      {/* Telas que NÃO aparecerão no menu, mas usam o layout do drawer */}
      <Drawer.Screen name="products/add" options={{ title: 'Cadastrar Produto', drawerLabel: () => null }} />
      <Drawer.Screen name="inputs/add" options={{ title: 'Cadastrar Insumo', drawerLabel: () => null }} />
      <Drawer.Screen name="uaps/add" options={{ title: 'Cadastrar UAP', drawerLabel: () => null }} />
      <Drawer.Screen name="details/[id]" options={{ drawerLabel: () => null, title: 'Detalhes' }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.primary,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.headerText,
  },
  drawerMenu: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  drawerItem: {
    paddingVertical: 12,
    marginBottom: 8,
    paddingLeft: 4,
    borderRadius: 8,
  },
  drawerItemText: {
    fontSize: 16,
    color: Colors.light.menuText,
    fontWeight: '500',
  },
});