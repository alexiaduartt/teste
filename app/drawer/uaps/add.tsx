import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';

import LabelledInput from '@/components/LabelledInput';
import BottomNavButton from '@/components/BottomNavButton';

// Componente de Header com Back/Menu
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

export default function RegisterUAPScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  
  const [uapName, setUapName] = useState('');

  const handleCancel = () => {
    router.back();
  };

  const handleRegister = () => {
    console.log('Registrar UAP: ' + uapName);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.primary }]}>
      <Header title="Cadastrar UAP" />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.pageTitle, { color: themeColors.primary }]}>Cadastrar UAP</Text>
        <Text style={[styles.pageSubtitle, { color: themeColors.subtleText }]}>
          Controle de Cadastros de UAPs
        </Text>

        <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContent}>
          <View style={[styles.inputGroup, { backgroundColor: themeColors.detailBackground }]}>
            <LabelledInput
              label="NOME DA UAP"
              required
              value={uapName}
              onChangeText={setUapName}
            />
            
            <LabelledInput label="ÁREA (HECTARES)" required keyboardType="numeric" />
            <LabelledInput label="RESPONSÁVEL" required />
            <LabelledInput label="LOCALIZAÇÃO" required />
            <LabelledInput label="TIPO DE CULTIVO" required />
            
            <LabelledInput label="Observações" multiline numberOfLines={4} style={{ height: 100 }} />

            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Text style={[styles.cancelButtonText, { color: themeColors.cancelButtonText }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
      
      <BottomNavButton 
        title="+ Registrar UAP"
        onPress={handleRegister} 
        iconName="checkmark-circle-outline"
      />
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
    backgroundColor: Colors.light.detailBackground,
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