import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Link, router, useNavigation } from 'expo-router';
import { Redirect } from 'expo-router';

// Redireciona imediatamente para a tela principal dentro do Drawer
export default function InitialRedirect() {
  return <Redirect href="/(drawer)/index" />;
}

import CategoryCard from '@/components/CategoryCard'; 

const Header = ({ title }: { title: string }) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation();

  return (
    <View style={[styles.header, { backgroundColor: themeColors.primary }]}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={30} color={themeColors.headerText} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: themeColors.headerText }]}>AGROSYS</Text>
      <Link href="/modal" asChild>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color={themeColors.headerText} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default function CadastroGeralScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.primary }]}>
      <Header title="AGROSYS" />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.pageTitle, { color: themeColors.primary }]}>Cadastros Gerais</Text>
        <Text style={[styles.pageSubtitle, { color: themeColors.subtleText }]}>
          Controle e Acompanhamento de Cadastros
        </Text>

        <View style={styles.cardContainer}>
          {/* Card Insumos */}
          <CategoryCard
            icon="leaf-outline"
            title="Insumos"
            subtitle="Controle e Acompanhamento de Insumos"
            onPress={() => router.push('/inputs')}
          />
          {/* Card Produtos */}
          <CategoryCard
            icon="cube-outline"
            title="Produtos"
            subtitle="Controle e Acompanhamento de Produtos"
            onPress={() => router.push('/products')}
          />
          {/* Card UAPs */}
          <CategoryCard
            icon="aperture-outline"
            title="UAPs"
            subtitle="Controle e Acompanhamento de UAPs"
            onPress={() => router.push('/uaps')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#165B33',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 'auto',
    marginLeft: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pageSubtitle: {
    fontSize: 14,
    marginBottom: 30,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
});