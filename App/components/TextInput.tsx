import React from 'react';
import { TextInput as NativeInput, StyleSheet, Text, TextInputProps, View } from 'react-native';

type Props = TextInputProps & {
  label: string;
};

export default function TextInput({ label, ...props }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <NativeInput 
        style={styles.input} 
        placeholderTextColor="#9CA3AF"
        {...props} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
  },
});