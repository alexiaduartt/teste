import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type CategoryTagProps = {
  title: string;
  isActive: boolean;
  onPress: () => void;
};

export default function CategoryTag({ title, isActive, onPress }: CategoryTagProps) {
  return (
    <TouchableOpacity
      style={[styles.tag, isActive ? styles.tagActive : styles.tagInactive]}
      onPress={onPress}
    >
      <Text style={[styles.text, isActive ? styles.textActive : styles.textInactive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  tagActive: {
    backgroundColor: '#E9D5FF', // Lavanda claro
    borderColor: '#E9D5FF',
  },
  tagInactive: {
    backgroundColor: 'transparent',
    borderColor: '#7f62f3ff', // Borda lavanda
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  textActive: {
    color: '#3d0377ff', // Roxo escuro 
  },
  textInactive: {
    color: '#1F1B54',
  },
});