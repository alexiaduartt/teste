import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '../../context/AuthContext';
import { MOCKED_COURSES } from '../../data/courses';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const { enrollInCourse, unenrollFromCourse, isEnrolled, toggleFavorite, isFavorite, user } = useAuth();

  const courseId = Array.isArray(id) ? id[0] : id;
  const course = MOCKED_COURSES.find(c => c.id === courseId);

  const userHasCourse = courseId ? isEnrolled(courseId) : false;
  const courseIsFavorite = courseId ? isFavorite(courseId) : false;

  if (!course || !courseId) return null;

  // Lógica do Botão Principal
  const handleMainButtonPress = () => {
    if (!user) return; 

    if (userHasCourse) {
      // SE JÁ INSCRITO: PERGUNTA SE QUER SAIR
      Alert.alert(
        "Cancelar Inscrição",
        "Deseja cancelar sua inscrição? Seu progresso será perdido.",
        [
          { text: "Voltar", style: "cancel" },
          { 
            text: "Cancelar Inscrição", 
            style: 'destructive', 
            onPress: () => unenrollFromCourse(courseId) // Chama a função do AuthContext
          }
        ]
      );
    } else {
      // SE NÃO INSCRITO: INSCREVE
      enrollInCourse(courseId);
    }
  };

  const handleFavoritePress = () => {
    if (!user) return;
    toggleFavorite(courseId);
  };

  const handleOpenVideo = (lessonTitle: string) => {
    if (!userHasCourse) {
      Alert.alert("Bloqueado", "Inscreva-se no curso para liberar o conteúdo!");
      return;
    }
    Alert.alert("Reproduzindo", `Iniciando a aula: ${lessonTitle}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()}>
           <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon} onPress={handleFavoritePress}>
            <Ionicons 
                name={courseIsFavorite ? "heart" : "heart-outline"} 
                size={28} 
                color="white" 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Card */}
        <View style={styles.heroCard}>
           <View style={styles.heroImageContainer}>
              <Image source={{ uri: course.imageUrl }} style={styles.heroImage} resizeMode="contain" />
           </View>
           <Text style={styles.heroTitle}>{course.title}</Text>
        </View>

        {/* Descrição */}
        <View style={styles.sectionContainer}>
           <Text style={styles.sectionLabel}>Descrição:</Text>
           <Text style={styles.descriptionText}>{course.description}</Text>
        </View>

        {/* Playlist */}
        {course.lessons && course.lessons.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>
              Conteúdo do Curso ({course.lessons.length} aulas)
            </Text>
            
            <View style={styles.playlistContainer}>
              {course.lessons.map((lesson, index) => (
                <TouchableOpacity 
                  key={lesson.id} 
                  style={styles.lessonItem} 
                  onPress={() => handleOpenVideo(lesson.title)}
                  activeOpacity={userHasCourse ? 0.7 : 1}
                >
                  <View style={styles.lessonThumbnailContainer}>
                    <Image 
                      source={{ uri: `https://placehold.co/100x60/1F1B54/FFFFFF?text=Play` }} 
                      style={styles.lessonThumbnail} 
                    />
                    {!userHasCourse && <View style={styles.lockedOverlay} />}
                    <View style={styles.durationBadge}>
                      <Text style={styles.durationText}>{lesson.duration}</Text>
                    </View>
                  </View>

                  <View style={styles.lessonInfo}>
                    <Text style={styles.lessonIndex}>Aula {index + 1}</Text>
                    <Text style={styles.lessonTitle} numberOfLines={2}>{lesson.title}</Text>
                  </View>

                  <View style={styles.lessonAction}>
                    <Ionicons 
                        name={userHasCourse ? "play-circle" : "lock-closed"} 
                        size={32} 
                        color={userHasCourse ? "#1F1B54" : "#9CA3AF"} 
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.subscribeButton, 
            userHasCourse && styles.subscribedButton 
          ]} 
          onPress={handleMainButtonPress}
          // REMOVIDO: disabled={userHasCourse}
          // O botão agora é clicável SEMPRE
        >
          <Text style={styles.subscribeText}>
            {userHasCourse ? "Inscrito ✓" : "Inscrever-se"}
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBar: {
    backgroundColor: '#1F1B54', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40, 
    paddingBottom: 20,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 15,
  },
  headerIcon: {
    padding: 4,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  heroCard: {
    backgroundColor: '#1F1B54',
    borderRadius: 20,
    padding: 12,
    marginBottom: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  heroImageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 180,
    width: '100%',
    marginBottom: 12,
    backgroundColor: '#1F1B54',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 4,
    marginBottom: 4,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  playlistContainer: {
    gap: 12,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  lessonThumbnailContainer: {
    width: 90,
    height: 56,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E5E7EB',
  },
  lessonThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', 
  },
  durationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  durationText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
  },
  lessonInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  lessonIndex: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 2,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 18,
  },
  lessonAction: {
    paddingLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  subscribeButton: {
    backgroundColor: '#1F1B54',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscribedButton: {
    backgroundColor: '#10B981', 
  },
  subscribeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});