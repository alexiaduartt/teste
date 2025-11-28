// app/(drawer)/_layout.tsx
import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import {
  Text,
  View,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Link } from 'expo-router';

function CustomDrawerContent() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];

  const DrawerItem = ({ name, href }: { name: string; href: string }) => (
    <Link href={href as any} asChild>
      <TouchableOpacity style={styles.drawerItem}>
        <Text
          style={[
            styles.drawerItemText,
            { color: themeColors.menuText },
          ]}
        >
          {name}
        </Text>
      </TouchableOpacity>
    </Link>
  );

  const DrawerHeader = () => (
    <View
      style={[
        styles.drawerHeader,
        { backgroundColor: themeColors.primary },
      ]}
    >
      <Text
        style={[
          styles.headerText,
          { color: themeColors.headerText },
        ]}
      >
        AGROSYS
      </Text>
      <Link href={'/modal' as any} asChild>
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={themeColors.headerText}
          />
        </TouchableOpacity>
      </Link>
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: themeColors.menuBackground }}
    >
      <DrawerHeader />
      <View className="drawerMenu" style={styles.drawerMenu}>
        <DrawerItem name="Cadastros Gerais" href="/index" />
        <DrawerItem name="Gestão de Produtos" href="/products" />
        <DrawerItem name="Gestão de Insumos" href="/inputs" />
        <DrawerItem name="Gestão de UAPs" href="/uaps" />

        {/* Rotas extras (se quiser implementar depois) */}
        <DrawerItem name="Gestão de Colheitas" href="/harvests" />
        <DrawerItem name="Gestão de Vendas" href="/sales" />
        <DrawerItem name="Gestão de Ferramentas" href="/tools" />
        <DrawerItem name="Meu Perfil" href="/profile" />
        <DrawerItem name="SAIR" href="/logout" />
      </View>
    </SafeAreaView>
  );
}

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];

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
      <Drawer.Screen name="index" options={{ title: 'Cadastros Gerais' }} />
      <Drawer.Screen
        name="products"
        options={{ title: 'Gestão de Produtos' }}
      />
      <Drawer.Screen
        name="inputs"
        options={{ title: 'Gestão de Insumos' }}
      />
      <Drawer.Screen name="uaps" options={{ title: 'Gestão de UAPs' }} />

      <Drawer.Screen
        name="products/add"
        options={{ title: 'Cadastrar Produto', drawerLabel: () => null }}
      />
      <Drawer.Screen
        name="inputs/add"
        options={{ title: 'Cadastrar Insumo', drawerLabel: () => null }}
      />
      <Drawer.Screen
        name="uaps/add"
        options={{ title: 'Cadastrar UAP', drawerLabel: () => null }}
      />
      <Drawer.Screen
        name="details/[id]"
        options={{ title: 'Detalhes', drawerLabel: () => null }}
      />
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
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
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
    fontWeight: '500',
  },
});