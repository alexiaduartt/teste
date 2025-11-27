import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

type CourseCardProps = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function CourseCard({ id, title, imageUrl }: CourseCardProps) {
  const { width } = useWindowDimensions();
  // Cálculo para 2 colunas com margens (32px de padding total + 12px de gap)
  const cardWidth = (width - 32 - 12) / 2; 

  return (
    <Link href={`/course/${id}`} asChild>
      <TouchableOpacity 
        // StyleSheet.flatten converte o array de estilos em um objeto único,
        // garantindo compatibilidade total (especialmente na Web)
        style={StyleSheet.flatten([styles.container, { width: cardWidth }])}
      >
        <View style={styles.card}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 12,
  },
  card: {
    backgroundColor: '#1F1B54',
    borderRadius: 12,
    height: 180, // Altura fixa para manter o grid alinhado
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});