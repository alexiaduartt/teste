import React from 'react';
import { StyleSheet, Text, TextInput, View, TextInputProps, StyleProp, ViewStyle } from 'react-native';

import { Colors } from '@/constants/theme'; 

type LabelledInputProps = TextInputProps & {
  label: string;
  required?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function LabelledInput({
  label,
  required = false,
  style,
  containerStyle,
  ...rest
}: LabelledInputProps) {
  const finalLabel = required ? `${label} *` : label;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{finalLabel}</Text>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={Colors.light.subtleText}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.detailLabel,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.light.detailInputBackground,
    color: Colors.light.detailInputText,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    minHeight: 45,
    borderWidth: 1,
    borderColor: Colors.light.inputBorder,
  },
});