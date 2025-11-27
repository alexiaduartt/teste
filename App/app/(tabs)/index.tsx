import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CategoryTag from '../../components/CategoryTag';
import CourseCard from '../../components/CourseCard';
import { CATEGORIES, MOCKED_COURSES } from '../../data/courses';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Tecnologia');

  const filteredCourses = MOCKED_COURSES.filter(
    (course) => course.category === activeCategory
  );

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* TOPO AZUL ESCURO MODIFICADO */}
      <View style={styles.topContainer}>
          <Text style={styles.headerTitle}>EDUCA AI</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>

        {/* CATEGORIAS */}
        <Text style={styles.sectionTitle}>Categorias</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesBox}>
          {CATEGORIES.map((cat) => (
            <CategoryTag
              key={cat}
              title={cat}
              isActive={activeCategory === cat}
              onPress={() => setActiveCategory(cat)}
            />
          ))}
        </ScrollView>

        {/* CURSOS */}
        <Text style={styles.sectionTitle}>Cursos</Text>

        <View style={styles.courseGrid}>
          {filteredCourses.map((item) => (
            <CourseCard
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
            />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* TOPO MODIFICADO */
  topContainer: {
    backgroundColor: '#1F1B54',
    // Ajustei o padding para ficar visualmente equilibrado
    paddingVertical: 30, 
    paddingHorizontal: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    // Estas propriedades centralizam o conteúdo (o texto)
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Estilos removidos: topRow, topRightIcons, logoContainer, headerSubtitle

  headerTitle: {
    fontSize: 24, // Aumentei ligeiramente a fonte para destaque
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },


  /* CONTEÚDO */
  content: {
    paddingHorizontal: 16,
    marginTop: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827',
    textAlign: 'left',
  },

  categoriesBox: {
    marginBottom: 20,
  },

  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
});