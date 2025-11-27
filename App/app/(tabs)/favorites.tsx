import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Importando Componentes e Contextos
import CourseCard from '../../components/CourseCard';
import { useAuth } from '../../context/AuthContext';
import { MOCKED_COURSES } from '../../data/courses';

export default function FavoritesScreen() {
  const router = useRouter();
  const { user } = useAuth();

  // LÓGICA DE FILTRAGEM:
  // 1. Se não tiver usuário logado, retorna lista vazia.
  // 2. Se tiver, filtra os cursos cujo ID esteja dentro do array 'favoriteCoursesIds' do usuário.
  const favoriteList = user 
    ? MOCKED_COURSES.filter(course => user.favoriteCoursesIds?.includes(course.id))
    : [];

  // Componente para renderizar quando a lista estiver vazia
  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.iconCircle}>
        <Ionicons name="heart-dislike-outline" size={64} color="#9CA3AF" />
      </View>
      <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
      <Text style={styles.emptySubtitle}>
        Os cursos que você marcar com "Gostei" aparecerão aqui para fácil acesso.
      </Text>
      
      <TouchableOpacity 
        style={styles.exploreButton} 
        onPress={() => router.push('/(tabs)/explore')} // Ajuste a rota conforme suas tabs
      >
        <Text style={styles.exploreButtonText}>Explorar Cursos</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Favoritos</Text>
        <Text style={styles.headerSubtitle}>
          {favoriteList.length} {favoriteList.length === 1 ? 'curso salvo' : 'cursos salvos'}
        </Text>
      </View>

      <FlatList
        data={favoriteList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard 
            id={item.id} 
            title={item.title} 
            imageUrl={item.imageUrl} 
          />
        )}
        // Configuração do Grid (2 colunas)
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={favoriteList.length === 0 ? styles.scrollContentEmpty : styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Fundo levemente cinza para destacar os cards
    paddingTop: 20, // Ajuste para StatusBar
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F1B54', // Azul escuro da identidade visual
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  // Estilos da Lista
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  scrollContentEmpty: {
    flexGrow: 1, // Garante que o empty state ocupe a tela toda
  },
  row: {
    justifyContent: 'space-between',
    gap: 12, // Espaço entre as colunas (se suportado, senão o justify resolve)
  },
  // Estilos do Estado Vazio (Empty State)
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 60,
  },
  iconCircle: {
    width: 120,
    height: 120,
    backgroundColor: '#E5E7EB',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  exploreButton: {
    backgroundColor: '#1F1B54',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  exploreButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});