import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

// Reutilizando os mesmos componentes
import Button from '../components/Button';
import TextInput from '../components/TextInput';

export default function RecoverPasswordScreen() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRecovery = () => {
    // Validação simples
    if (!email.trim() || !email.includes('@')) {
      Alert.alert("Atenção", "Por favor, insira um e-mail válido.");
      return;
    }

    setIsLoading(true);

    // Simulação de envio para o backend
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Botão Voltar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1F1B54" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons 
              name={isSuccess ? "mail-unread-outline" : "key-outline"} 
              size={48} 
              color="#4C1D95" 
            />
          </View>
          
          <Text style={styles.title}>
            {isSuccess ? "Verifique seu E-mail" : "Recuperar Senha"}
          </Text>
          
          <Text style={styles.description}>
            {isSuccess 
              ? `Um link de redefinição foi enviado para ${email}. Não esqueça de checar a caixa de spam.`
              : "Digite o e-mail cadastrado e enviaremos as instruções para você criar uma nova senha."}
          </Text>
        </View>

        {!isSuccess ? (
          // Formulário
          <View style={styles.form}>
            <TextInput 
              label="E-MAIL CADASTRADO" 
              placeholder="exemplo@email.com" 
              value={email} 
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View style={{ marginTop: 16 }}>
              <Button 
                title="Enviar Instruções" 
                onPress={handleRecovery} 
                isLoading={isLoading} 
              />
            </View>
          </View>
        ) : (
          // Tela de Sucesso
          <View style={styles.successActions}>
            <Button 
              title="Voltar para Login" 
              onPress={() => router.dismissTo('/login')} 
            />
            
            <TouchableOpacity 
              style={styles.resendButton} 
              onPress={() => setIsSuccess(false)}
            >
              <Text style={styles.resendText}>Tentar outro e-mail</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  topBar: {
    marginTop: 20, // Margem segura superior simples
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 10,
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#F3E8FF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E1065',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  form: {
    width: '100%',
  },
  successActions: {
    width: '100%',
    marginTop: 16,
    gap: 16
  },
  resendButton: {
    alignItems: 'center',
    padding: 12,
  },
  resendText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
});