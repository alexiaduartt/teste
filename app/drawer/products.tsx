import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { AGROSYS_DATA } from '@/data/agrosys-data'; // 👈 CAMINHO CORRIGIDO

import BottomNavButton from '@/components/BottomNavButton'; 

const ProductListItem = ({ product }: { product: any }) => {
  const themeColors = Colors[useColorScheme() ?? 'light'];
  
  const onPressDetails = () => {
    router.push({
      pathname: '/details/[id]',
      params: { id: product.id, type: 'Produto' } 
    });
  };

  return (
    <View style={[styles.listItem, { backgroundColor: themeColors.detailBackground }]}>
      <View style={styles.listItemContent}>
        <Text style={[styles.listItemText, { color: themeColors.detailLabel, fontWeight: 'bold' }]}>{product.name}</Text>
        <Text style={[styles.listItemText, { color: themeColors.detailLabel }]}>Categoria: {product.category} | Preço: {product.price}</Text>
        <Text style={[styles.listItemText, { color: themeColors.detailLabel }]}>Fornecedor: {product.supplier}</Text>
      </View>
      <TouchableOpacity style={styles.detailsButton} onPress={onPressDetails}>
        <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );
};

const Header = ({ title }: { title: string }) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation();

  return (
    <View style={[styles.header, { backgroundColor: themeColors.primary }]}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={30} color={themeColors.headerText} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: themeColors.headerText }]}>AGROSYS</Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={30} color={themeColors.headerText} />
      </TouchableOpacity>
    </View>
  );
};

export default function ProductsScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const products = AGROSYS_DATA.products; 

  const navigateToProductRegistration = () => {
    router.push('/products/add');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.primary }]}>
      <Header title="Gestão de Produtos" />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.pageTitle, { color: themeColors.primary }]}>Gestão de Produtos</Text>
        <Text style={[styles.pageSubtitle, { color: themeColors.subtleText }]}>
          Controle e Acompanhamento de Produtos
        </Text>

        <View style={styles.searchContainer}>
          <Ionicons name="funnel-outline" size={24} color={themeColors.detailLabel} style={{ marginRight: 8 }} />
          <TextInput
            style={[styles.searchInput, { borderColor: themeColors.inputBorder, backgroundColor: themeColors.inputBackground }]}
            placeholder="Filtros de Busca"
            placeholderTextColor={themeColors.subtleText}
          />
          <TouchableOpacity style={styles.filterButton}>
             <Text style={styles.filterButtonText}>Filtrar por</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.listContainer}>
          {products.map(product => (
            <ProductListItem key={product.id} product={product} />
          ))}
          <View style={{ height: 100 }} /> 
        </ScrollView>
      </View>
      
      <BottomNavButton title="+ Cadastrar Produtos" onPress={navigateToProductRegistration} />
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
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: Colors.light.detailBackground, 
    padding: 10,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: Colors.light.buttonBackground,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  filterButtonText: {
    color: Colors.light.buttonText,
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContainer: {
    width: '100%',
  },
  listItem: {
    backgroundColor: Colors.light.detailBackground,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listItemContent: {
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 14,
    marginBottom: 2,
  },
  detailsButton: {
    backgroundColor: '#93C47D', 
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  detailsButtonText: {
    color: Colors.light.buttonText,
    fontWeight: 'bold',
  },
});