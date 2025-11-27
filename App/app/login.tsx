import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { 
  Alert, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Importação dos componentes base do projeto
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Validação simples
    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha seu e-mail e senha.");
      return;
    }

    setIsLoading(true);

    // Pequeno delay artificial para feedback visual (melhora a UX)
    setTimeout(async () => {
      const success = await signIn(email, password);
      setIsLoading(false);

      if (success) {
        // Redireciona para a área logada (Tabs)
        router.replace('/(tabs)');
      } else {
        Alert.alert("Falha no Login", "E-mail ou senha incorretos. Verifique suas credenciais.");
      }
    }, 1000);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="school" size={48} color="#4C1D95" />
          </View>
          <Text style={styles.title}>Educa AI</Text>
          <Text style={styles.subtitle}>Bem-vindo de volta! 👋</Text>
        </View>

        <View style={styles.form}>
          <TextInput 
            label="E-MAIL" 
            placeholder="seuemail@exemplo.com" 
            value={email} 
            onChangeText={setEmail} 
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <TextInput 
            label="SENHA" 
            placeholder="••••••••" 
            secureTextEntry 
            value={password} 
            onChangeText={setPassword} 
          />
          
          {/* Link para Recuperação de Senha */}
          <View style={styles.forgotPasswordContainer}>
            <Link href="/recover-password" asChild>
              <TouchableOpacity>
                 <Text style={styles.linkText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <Button 
            title="Entrar" 
            onPress={handleLogin} 
            isLoading={isLoading} 
          />

          <View style={styles.registerContainer}>
            <Text style={styles.text}>Não tem conta? </Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text style={[styles.text, styles.bold]}>Crie agora</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 40 
  },
  iconCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#F3E8FF', // Roxo bem claro para contraste
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#2E1065', 
    marginBottom: 8 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#6B7280' 
  },
  form: { 
    width: '100%' 
  },
  forgotPasswordContainer: { 
    alignItems: 'flex-end', 
    marginBottom: 24,
    marginTop: 4
  },
  linkText: { 
    color: '#4C1D95', 
    fontSize: 14,
    fontWeight: '600'
  },
  registerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 24 
  },
  text: { 
    color: '#6B7280', 
    fontSize: 14 
  },
  bold: { 
    fontWeight: 'bold', 
    color: '#4C1D95' 
  },
});