import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Importando Componentes e Contextos
import CourseCard from '../components/CourseCard';
import { useAuth } from '../context/AuthContext';
import { MOCKED_COURSES } from '../data/courses';

export default function MyCoursesScreen() {
  const router = useRouter();
  const { user } = useAuth();

  // LÓGICA DE FILTRAGEM:
  // Filtra os cursos cujo ID esteja na lista 'enrolledCoursesIds' do usuário
  const myCoursesList = user 
    ? MOCKED_COURSES.filter(course => user.enrolledCoursesIds?.includes(course.id))
    : [];

  // Componente para quando a lista estiver vazia
  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.iconCircle}>
        <Ionicons name="school-outline" size={64} color="#9CA3AF" />
      </View>
      <Text style={styles.emptyTitle}>Nenhuma inscrição ativa</Text>
      <Text style={styles.emptySubtitle}>
        Você ainda não se matriculou em nenhum curso. Explore nosso catálogo e comece a aprender hoje!
      </Text>
      
      <TouchableOpacity 
        style={styles.exploreButton} 
        onPress={() => router.push('/(tabs)/explore')} 
      >
        <Text style={styles.exploreButtonText}>Buscar Cursos</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Simples com Botão Voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#1F1B54" />
        </TouchableOpacity>
        <View>
            <Text style={styles.headerTitle}>Meus Cursos</Text>
            <Text style={styles.headerSubtitle}>
            {myCoursesList.length} {myCoursesList.length === 1 ? 'curso em andamento' : 'cursos em andamento'}
            </Text>
        </View>
      </View>

      <FlatList
        data={myCoursesList}
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
        contentContainerStyle={myCoursesList.length === 0 ? styles.scrollContentEmpty : styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  backButton: {
    padding: 8,
    backgroundColor: '#E0E7FF',
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 24, // Um pouco menor que o da Home para caber com a seta
    fontWeight: 'bold',
    color: '#1F1B54',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  // Listas e Grid
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  scrollContentEmpty: {
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
    gap: 12,
  },
  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 40,
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