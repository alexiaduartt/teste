// app/(drawer)/products/add.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';

import LabelledInput from '@/components/LabelledInput';
import BottomNavButton from '@/components/BottomNavButton';

const Header = ({ title }: { title: string }) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];
  const navigation = useNavigation<any>();

  return (
    <View
      style={[styles.header, { backgroundColor: themeColors.primary }]}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons
          name="chevron-back"
          size={30}
          color={themeColors.headerText}
        />
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
        <Ionicons
          name="menu"
          size={30}
          color={themeColors.headerText}
        />
      </TouchableOpacity>
    </View>
  );
};

export default function RegisterProductScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];

  const [productName, setProductName] = useState('');

  const handleCancel = () => {
    router.back();
  };

  const handleRegister = () => {
    console.log('Registrar Produto: ' + productName);
    router.back();
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: themeColors.primary }]}
    >
      <Header title="Cadastrar Produto" />
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
          Cadastrar Produto
        </Text>
        <Text
          style={[
            styles.pageSubtitle,
            { color: themeColors.subtleText },
          ]}
        >
          Controle de Cadastros de Produtos
        </Text>

        <ScrollView
          style={styles.formContainer}
          contentContainerStyle={styles.formContent}
        >
          <View
            style={[
              styles.inputGroup,
              { backgroundColor: themeColors.detailBackground },
            ]}
          >
            <LabelledInput
              label="NOME DO PRODUTO"
              required
              value={productName}
              onChangeText={setProductName}
            />

            <View style={styles.row}>
              <LabelledInput
                label="CATEGORIA"
                required
                containerStyle={styles.halfInput}
              />
              <LabelledInput
                label="PREÇO UNITÁRIO"
                required
                keyboardType="numeric"
                containerStyle={styles.halfInput}
              />
            </View>

            <View style={styles.row}>
              <LabelledInput
                label="STATUS"
                required
                containerStyle={styles.halfInput}
              />
              <LabelledInput
                label="QUANTIDADE"
                required
                keyboardType="numeric"
                containerStyle={styles.halfInput}
              />
            </View>

            <LabelledInput label="FORNECEDOR" required />
            <LabelledInput label="LOCAL DE ARMAZENAMENTO" required />
            <LabelledInput
              label="DATA DE VALIDADE"
              required
              placeholder="DD/MM/AAAA"
            />
            <LabelledInput
              label="Descrição"
              multiline
              numberOfLines={4}
              style={{ height: 100 }}
            />

            <TouchableOpacity
              onPress={handleCancel}
              style={styles.cancelButton}
            >
              <Text
                style={[
                  styles.cancelButtonText,
                  { color: themeColors.cancelButtonText },
                ]}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>

      <BottomNavButton
        title="+ Registrar Produto"
        onPress={handleRegister}
        iconName="checkmark-circle-outline"
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
  formContainer: {
    width: '100%',
    flex: 1,
  },
  formContent: {
    paddingBottom: 40,
  },
  inputGroup: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
    marginBottom: 16,
  },
  cancelButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    marginTop: 20,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});