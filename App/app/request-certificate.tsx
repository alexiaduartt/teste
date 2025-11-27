import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// 1. Importamos o contexto para pegar o nome real
import { useAuth } from '../context/AuthContext';

export default function RequestCertificateScreen() {
  const router = useRouter();
  const { user } = useAuth(); // Pega os dados do usuário logado
  
  const [courseName, setCourseName] = useState('');
  const [observation, setObservation] = useState('');

  const handleRequest = () => {
    if (!courseName.trim()) {
      Alert.alert("Erro", "Por favor, informe o nome do curso.");
      return;
    }
    
    Alert.alert(
      "Solicitação Enviada!",
      `O certificado para "${user?.name}" será gerado e enviado em até 24h.`,
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <SafeAreaView style={styles.safeAreaContent}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => router.back()}>
               <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Solicitar Certificado</Text>
            <View style={{ width: 28 }} /> 
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBox}>
           <Ionicons name="information-circle" size={24} color="#4C1D95" />
           <Text style={styles.infoText}>
             Certifique-se de ter completado 100% das aulas antes de solicitar.
           </Text>
        </View>

        {/* Input: Nome Completo (BLOQUEADO) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo no Certificado</Text>
          <TextInput 
            // Adicionamos o estilo 'inputDisabled' para ficar cinza
            style={[styles.input, styles.inputDisabled]} 
            // Valor vem direto do contexto (Auth)
            value={user?.name} 
            // Bloqueia a edição
            editable={false}
            // Ícone de cadeado opcional para reforçar visualmente (seria um View extra, mas o cinza já basta)
          />
          <Text style={styles.helperText}>Este é o nome cadastrado no seu perfil.</Text>
        </View>

        {/* Input: Curso */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Qual curso você concluiu?</Text>
          <TextInput 
            style={styles.input} 
            value={courseName} 
            onChangeText={setCourseName}
            placeholder="Ex: Robótica com Arduino"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Input: Observações */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Observações (Opcional)</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            value={observation} 
            onChangeText={setObservation}
            placeholder="Alguma mensagem para a secretaria?"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleRequest}>
           <Text style={styles.submitButtonText}>Enviar Solicitação</Text>
           <Ionicons name="send" size={20} color="white" style={{marginLeft: 8}}/>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  headerBox: {
    backgroundColor: '#1F1B54',
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  safeAreaContent: { paddingHorizontal: 24, paddingTop: 10 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },

  formContainer: { padding: 24, gap: 20 },
  
  infoBox: {
    backgroundColor: '#EDE9FE',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  infoText: { color: '#4C1D95', fontSize: 14, flex: 1, lineHeight: 20 },

  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#374151', marginLeft: 4 },
  
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D6D3F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937', 
  },
  
  // ESTILO PARA CAMPO DESABILITADO
  inputDisabled: {
    backgroundColor: '#F3F4F6', // Fundo cinza claro
    color: '#6B7280', // Texto cinza médio
    borderColor: '#E5E7EB',
  },
  
  helperText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
    marginTop: -4,
  },

  textArea: { height: 100 },

  submitButton: {
    backgroundColor: '#1F1B54',
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#1F1B54',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  submitButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});