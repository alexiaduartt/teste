import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// IMPORTANTE: Usamos '../../' para sair de (tabs), sair de app, e chegar na raiz onde está 'data'
import { Course, MOCKED_COURSES } from '../../data/courses';
// IMPORTANTE: Mesmo raciocínio para components
import CourseCard from '../../components/CourseCard';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(MOCKED_COURSES);
  const router = useRouter();

  // Função para filtrar os cursos
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      setFilteredCourses(MOCKED_COURSES);
      return;
    }

    const filtered = MOCKED_COURSES.filter((course) => {
      const query = text.toLowerCase();
      return (
        course.title.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
      );
    });

    setFilteredCourses(filtered);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Cabeçalho de Busca */}
        <View style={styles.searchHeader}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Buscar cursos, categorias..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Lista de Resultados */}
        <View style={styles.content}>
          <Text style={styles.resultText}>
            {searchQuery ? `Resultados para "${searchQuery}"` : 'Todos os Cursos'}
          </Text>

          <FlatList
            data={filteredCourses}
            keyExtractor={(item) => item.id}
            numColumns={2} // Grid de 2 colunas
            renderItem={({ item }) => (
              <CourseCard
                id={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
              />
            )}
            columnWrapperStyle={styles.columnWrapper} // Estilo para alinhar as colunas
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={64} color="#E5E7EB" />
                <Text style={styles.emptyText}>Nenhum curso encontrado.</Text>
                <Text style={styles.emptySubText}>Tente buscar por outro termo.</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  searchHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Espaça os itens igualmente
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
});