import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  // --- ALTERAÇÃO AQUI ---
  // A função agora é assíncrona e executa direto sem perguntar
  const handleLogout = async () => {
    await signOut();
    router.replace('../login'); 
  };

  if (!user) return null;

  // Componente de Botão Reutilizável
  const MenuButton = ({ title, icon, onPress }: { title: string, icon: keyof typeof Ionicons.glyphMap, onPress?: () => void }) => (
    <TouchableOpacity style={styles.menuButton} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.menuIconContainer}>
        <Ionicons name={icon} size={24} color="#1F1B54" />
      </View>
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#1F1B54" style={{ marginLeft: 'auto', opacity: 0.5 }} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      {/* Header em Caixa (Box Style) */}
      <View style={styles.headerBox}>
        <SafeAreaView style={styles.safeAreaContent}>
          
          {/* Barra Superior */}
          <View style={styles.topBar}>
            
            {/* Esquerda: Home */}
            <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.iconHitBox}>
               <Ionicons name="home" size={26} color="white" />
            </TouchableOpacity>
            
            {/* Direita: Apenas Sair */}
            <View style={styles.topBarRight}>
              {/* O onPress aqui agora chama o logout direto */}
              <TouchableOpacity onPress={handleLogout} style={styles.iconHitBox}>
                <Ionicons name="log-out-outline" size={26} color="white" />
              </TouchableOpacity>
            </View>

          </View>

          {/* Info do Usuário */}
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              {user.avatarUrl ? (
                <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#E0E7FF' }]}>
                    <Text style={{fontSize: 24, fontWeight: 'bold', color: '#1F1B54'}}>
                        {user.name.substring(0,2).toUpperCase()}
                    </Text>
                </View>
              )}
            </View>
            
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>{user.role === 'student' ? 'ESTUDANTE' : 'PROFESSOR'}</Text>
              </View>
            </View>
          </View>

        </SafeAreaView>
      </View>

      {/* Lista de Botões de Navegação */}
      <ScrollView contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>
        
        {/* 1. Meus Cursos */}
        <MenuButton 
          icon="school-outline" 
          title="Meus cursos" 
          onPress={() => router.push('/my-courses')} 
        />
        
        {/* 2. Meus Certificados (NOVO) */}
        <MenuButton 
          icon="document-text-outline" 
          title="Meus certificados" 
          onPress={() => router.push('/my-certificates')} 
        />
        
        {/* 3. Adquirir Certificados (NOVO) */}
        <MenuButton 
          icon="add-circle-outline" 
          title="Adquirir certificados" 
          onPress={() => router.push('/request-certificate')} 
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  
  // --- HEADER ---
  headerBox: {
    backgroundColor: '#1F1B54', // Azul Sólido
    paddingBottom: 40, 
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    
    // Sombra suave
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  safeAreaContent: {
    paddingHorizontal: 32, // Espaçamento lateral confortável
    paddingTop: 10,
  },

  // --- TOP BAR ---
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  topBarRight: {
    flexDirection: 'row',
    gap: 20,
  },
  iconHitBox: {
    padding: 4, // Aumenta a área de toque
  },

  // --- PERFIL ---
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  avatarContainer: {
    padding: 3,
    backgroundColor: 'transparent',
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#8B5CF6', // Borda roxa vibrante
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF', // Borda branca interna
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  userEmail: {
    color: '#CBD5E1', // Cinza azulado claro
    fontSize: 14,
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)', // Roxo translúcido
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#DDD6FE', // Roxo muito claro
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  // --- BOTÕES ---
  bodyContent: {
    padding: 24,
    gap: 16,
  },
  menuButton: {
    backgroundColor: '#D6D3F0', // Fundo Lilás
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // Sombra leve
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIconContainer: {
    marginRight: 16,
    width: 32,
    alignItems: 'center'
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1B54',
  },
});