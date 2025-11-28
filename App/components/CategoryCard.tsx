import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';

import { Colors } from '@/constants/theme'; 

type CategoryCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function CategoryCard({ icon, title, subtitle, onPress, style }: CategoryCardProps) {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <View style={styles.content}>
        <Ionicons name={icon} size={30} color={Colors.light.categoryIcon} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Gestão de {title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: Colors.light.categoryBackground,
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.categoryTitle,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.categorySubtitle,
  },
  button: {
    backgroundColor: '#38761D',
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.light.buttonText,
    fontWeight: 'bold',
    fontSize: 16,
  },
});