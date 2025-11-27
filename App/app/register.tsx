import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { useAuth } from '../context/AuthContext'; // Usa o Hook
import { User } from '../data/user';

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuth(); // Pega a função de cadastro do contexto
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const newUser: User = {
        id: String(Date.now()),
        name,
        email,
        password,
        avatarUrl: `https://placehold.co/200x200/E9D5FF/2E1065?text=${name.charAt(0).toUpperCase()}&font=sans-serif`,
        role: 'student',
        bio: 'Novo estudante!',
        enrolledCoursesIds: [],
        completedCoursesIds: []
      };

      const success = signUp(newUser); // Tenta registrar no contexto

      if (success) {
        Alert.alert("Sucesso", "Conta criada! Faça login agora.", [
          { text: "OK", onPress: () => router.back() }
        ]);
      } else {
        Alert.alert("Erro", "Este email já está cadastrado.");
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crie uma conta</Text>
        <Link href="/login">
          <Text style={styles.linkText}>Já é registrado? Faça o login aqui</Text>
        </Link>
      </View>

      <View style={styles.form}>
        <TextInput label="NOME" placeholder="Seu Nome" value={name} onChangeText={setName} />
        <TextInput label="EMAIL" placeholder="seuemail@email.com" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <TextInput label="SENHA" placeholder="*****" secureTextEntry value={password} onChangeText={setPassword} />
        <Button title="Registrar" onPress={handleRegister} isLoading={isLoading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2E1065', marginBottom: 8 },
  linkText: { color: '#4C1D95', fontSize: 14, textDecorationLine: 'underline' },
  form: { width: '100%' },
});