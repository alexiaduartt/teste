// app/(drawer)/inputs/index.tsx
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { AGROSYS_DATA } from '@/data/agrosys-data';
import BottomNavButton from '@/components/BottomNavButton';

const InputListItem = ({ input }: { input: any }) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];

  const onPressDetails = () => {
    router.push(
      {
        pathname: '/details/[id]',
        params: { id: String(input.id), type: 'Insumo' },
      } as any, // 👈 cast pra TS parar
    );
  };

  return (
    <View
      style={[
        styles.listItem,
        {
          backgroundColor: themeColors.detailBackground,
          borderColor: themeColors.inputBorder,
        },
      ]}
    >
      <View style={styles.listItemContent}>
        <Text
          style={[
            styles.listItemText,
            { color: themeColors.detailLabel, fontWeight: 'bold' },
          ]}
        >
          {input.name}
        </Text>
        <Text
          style={[
            styles.listItemText,
            { color: themeColors.detailLabel },
          ]}
        >
          Tipo: {input.type} | Quantidade: {input.quantity}
        </Text>
        <Text
          style={[
            styles.listItemText,
            { color: themeColors.detailLabel },
          ]}
        >
          Fornecedor: {input.supplier}
        </Text>
      </View>
      <TouchableOpacity style={styles.detailsButton} onPress={onPressDetails}>
        <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );
};

const Header = ({ title }: { title: string }) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];
  const navigation = useNavigation<any>(); // 👈 any

  return (
    <View
      style={[styles.header, { backgroundColor: themeColors.primary }]}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={30} color={themeColors.headerText} />
      </TouchableOpacity>
      <Text
        style={[
          styles.headerTitle,
          { color: themeColors.headerText },
        ]}
      >
        {title}
      </Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={30} color={themeColors.headerText} />
      </TouchableOpacity>
    </View>
  );
};

export default function InputsScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];
  const inputs = AGROSYS_DATA.inputs;

  const navigateToInputRegistration = () => {
    router.push('/inputs/add' as any);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: themeColors.primary }]}
    >
      <Header title="Gestão de Insumos" />
      <View
        style={[
          styles.container,
          { backgroundColor: themeColors.background },
        ]}
      >
        <Text
          style={[
            styles.pageTitle,
            { color: themeColors.primary },
          ]}
        >
          Gestão de Insumos
        </Text>
        <Text
          style={[
            styles.pageSubtitle,
            { color: themeColors.subtleText },
          ]}
        >
          Controle e Acompanhamento de Insumos
        </Text>

        <View
          style={[
            styles.searchContainer,
            { backgroundColor: themeColors.detailBackground },
          ]}
        >
          <Ionicons
            name="funnel-outline"
            size={24}
            color={themeColors.detailLabel}
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={[
              styles.searchInput,
              {
                borderColor: themeColors.inputBorder,
                backgroundColor: themeColors.inputBackground,
                color: themeColors.detailLabel,
              },
            ]}
            placeholder="Filtros de Busca"
            placeholderTextColor={themeColors.subtleText}
          />
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: themeColors.buttonBackground },
            ]}
          >
            <Text
              style={[
                styles.filterButtonText,
                { color: themeColors.buttonText },
              ]}
            >
              Filtrar por
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.listContainer}>
          {inputs.map((input: any) => (
            <InputListItem key={input.id} input={input} />
          ))}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>

      <BottomNavButton
        title="+ Cadastrar Insumo"
        onPress={navigateToInputRegistration}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  filterButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContainer: { width: '100%' },
  listItem: {
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
  listItemContent: { marginBottom: 10 },
  listItemText: { fontSize: 14, marginBottom: 2 },
  detailsButton: {
    backgroundColor: '#93C47D',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});